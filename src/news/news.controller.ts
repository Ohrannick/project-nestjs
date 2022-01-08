import { CommentsEntity } from './comments/comments.entity';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Render, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CommentsService } from './comments/comments.service';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dtos/create-news-dto';
import { EditNewsDto } from './dtos/edit-news-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HelperFileLoader } from 'src/utils/HelperFileLoader';
import { MailService } from 'src/mail/mail.service';
import { NewsEntity } from './news.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/role/roles.decorator';
import { Role } from 'src/auth/role/role.enum';

const PATH_NEWS = '/news-static/';
HelperFileLoader.path = PATH_NEWS;
@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly commentsService: CommentsService,
    private readonly mailservice: MailService,
  ) { }

  @Get('/api/details/:id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<NewsEntity> {
    const news = this.newsService.findById(id);
    if (!news) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Новость была не найдена',
        },
        HttpStatus.NOT_FOUND,
      )
    }
    return news
  }

  @Get('/api/all')
  async getAll(): Promise<NewsEntity[]> {
    return await this.newsService.getAll();
  }

  @Get('/all')
  @Render('news-list')
  async getAllView() {
    const news = await this.newsService.getAll();
    return { news, title: 'Список крутых новостей' }
  }

  @Get('create/new')
  @Render('create-news')
  async createView() {
    return {}
  }

  @Get('/detail/:id')
  @Render('news-detail')
  async getDetailView(@Param('id', ParseIntPipe) id: number) {
    const news = await this.newsService.findById(id);
    if (!news) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Новость была не найдена',
        },
        HttpStatus.NOT_FOUND,
      )
    }

    return { news }
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.Moderator)
  @Post('/api')
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: HelperFileLoader.destinationPath,
        filename: HelperFileLoader.customFileName,
      }),
    }),
  )

  async create(
    @Body() news: CreateNewsDto,
    @UploadedFile() cover: Express.Multer.File,
  ): Promise<NewsEntity> {
    const fileExtention = cover.originalname.split('.').reverse()[0];
    if (!fileExtention || !fileExtention.match(/(jpg|jpeg|png|gif)$/i)) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Неверный формат файла',
      },
        HttpStatus.BAD_REQUEST,
      )
    }
    if (cover?.filename) {
      news.cover = PATH_NEWS + cover.filename;
    }
    const createNews = await this.newsService.create(news);
    // await this.mailservice.sendNewNewsForAdmins(['ohrannick.pupkin@yandex.ru'], createNews)
    return createNews
  }

  @Put('/api/:id')
  async edit(@Param('id', ParseIntPipe) id: number, @Body() news: EditNewsDto): Promise<NewsEntity> {
    const newsEditable = await this.newsService.findById(id);
    if (!news) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Новость была не найдена',
        },
        HttpStatus.NOT_FOUND,
      )
    }
    return newsEditable;
  }

  @Delete('/api/:id')
  async remove(@Param('id') id: number): Promise<NewsEntity> {
    const isRemoved = await this.newsService.remove(id);
    // console.log(isRemoved)
    throw new HttpException(
      {
        status: HttpStatus.OK,
        error: isRemoved ? 'Новость удалена' : 'Передан неверный идентификатор',
      },
      HttpStatus.OK,
    );
  }
}
