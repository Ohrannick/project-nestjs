import { Controller, Param, Post, Body, Get, Delete, Put } from '@nestjs/common';
import { Comment, NewComment, CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create-comment-dto';
import { EditCommentDto } from './dtos/edit-comment-dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Post('/api/:idNews')
  create(@Param('idNews') idNews: string, @Body() comments: CreateCommentDto) {
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