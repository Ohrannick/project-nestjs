import { Controller, Param, Post, Body, Get, Delete, Put, UseInterceptors, UploadedFile, Render, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
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
  @UseGuards(JwtAuthGuard)
  @Render('create-comments')
  async create(
    @Param('idNews', ParseIntPipe) idNews: number,
    @Body() comment: CreateCommentDto,
    @Req() req,
  ) {
    const jwtUserId = req.user.userId;
    return this.commentsService.create(idNews, comment.message, jwtUserId);
  }

  @Put('/api/:idComment')
  edit(
    @Param('idComment', ParseIntPipe) idComment: number,
    @Body() comments: EditCommentDto) {

    return this.commentsService.edit(idComment, comments)
  }

  @Get('/api/details/:idNews')
  get(@Param('idNews', ParseIntPipe) idNews: number) {
    return this.commentsService.findAll(idNews)
  }

  @Delete('/api/details/:idNews/:idComment')
  remove(@Param('idComment', ParseIntPipe) idComment: number) {

    return this.commentsService.remove(idComment)
  }

}