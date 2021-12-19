import { Controller, Param, Post, Body, Get, Delete, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HelperFileLoader } from 'src/utils/HelperFileLoader';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create-comment-dto';
import { EditCommentDto } from './dtos/edit-comment-dto';

const PATH_NEWS = '/news-static/';
HelperFileLoader.path = PATH_NEWS;
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Post('/api/:idNews')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: HelperFileLoader.destinationPath,
        filename: HelperFileLoader.customFileName,
      }),
    }),
  )
  create(
    @Param('idNews') idNews: string,
    @Body() comments: CreateCommentDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    if (avatar?.filename) {
      comments.avatar = PATH_NEWS + avatar.filename;
    }

    let idNewsInt = parseInt(idNews);
    return this.commentsService.create(idNewsInt, comments)
  }

  @Get('/api/details/:idNews')
  get(@Param('idNews') idNews: string) {
    let idNewsInt = parseInt(idNews);
    return this.commentsService.find(idNewsInt)
  }

  @Delete('/api/details/:idNews/:idComment')
  remove(@Param('idNews') idNews: string, @Param('idComment') idComment: string) {
    let idNewsInt = parseInt(idNews);
    let idCommentInt = parseInt(idComment);
    return this.commentsService.remove(idNewsInt, idCommentInt)
  }

  @Put('/api/:idNews/:idComment')
  edit(
    @Param('idNews') idNews: string,
    @Param('idComment') idComment: string,
    @Body() comments: EditCommentDto) {
    let idNewsInt = parseInt(idNews);
    let idCommentInt = parseInt(idComment);
    return this.commentsService.edit(idNewsInt, idCommentInt, comments)
  }

}