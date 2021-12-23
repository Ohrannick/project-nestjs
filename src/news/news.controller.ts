import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Render, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CommentsService } from './comments/comments.service';
import { News, NewsService } from './news.service';
// import renderNewsAll from '../views/news/news-all';
// import renderTemplate from '../views/template'
// import renderNewsDetail from 'src/views/news/news-detail';
import { CreateNewsDto } from './dtos/create-news-dto';
import { EditNewsDto } from './dtos/edit-news-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HelperFileLoader } from 'src/utils/HelperFileLoader';
import { MailService } from 'src/mail/mail.service';

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
  get(@Param('id') id: string): News {
    let idInt = parseInt(id);
    const news = this.newsService.find(idInt);
    const comments = this.commentsService.find(idInt);

    return {
      ...news,
      comments
    }
  }

  @Get('/api/all')
  getAll(): News[] {
    return this.newsService.getAll();
  }

  @Get('all')
  @Render('news-list')
  getAllView() {
    const news = this.newsService.getAll();
    return { news, title: 'Список крутых новостей' }
  }

  @Get('create/new')
  @Render('create-news')
  async createView() {
    return {}
  }

  @Get('/detail/:id')
  @Render('news-detail')
  async getDetailView(@Param('id') id: string) {
    let idInt = parseInt(id);
    const news = await this.newsService.find(idInt);
    const comments = this.commentsService.find(idInt);
    return { news, comments }
  }

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
  ): Promise<News> {
    const fileExtention = cover.originalname.split('.').reverse()[0];
    if (!fileExtention || !fileExtention.match(/(jpg|jpeg|png|gif)$/)) {
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

    const createNews = this.newsService.create(news);
    // await this.mailservice.sendNewNewsForAdmins(['ohrannick.pupkin@yandex.ru'], createNews)
    return createNews

  }

  @Put('/api/:id')
  edit(@Param('id') id: string, @Body() news: EditNewsDto): News {
    let idInt = parseInt(id);
    return this.newsService.edit(idInt, news);
  }

  @Delete('/api/:id')
  remove(@Param('id') id: string): string {
    const idInt = parseInt(id);
    const isRemoved = this.newsService.remove(idInt);
    return isRemoved ? 'Новость удалена' : 'Передан неверный идентификатор';
  }
}
