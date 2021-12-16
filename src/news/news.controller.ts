import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CommentsService } from './comments/comments.service';
import { News, NewsService, NewsEdit } from './news.service';
import renderNewsAll from '../views/news/news-all';
import renderTemplate from '../views/template'

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly commentsService: CommentsService
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

  @Get('/all')
  getAllView() {
    const news = this.newsService.getAll();
    const content = renderNewsAll(news)
    return renderTemplate(content, { title: 'Список новостей', description: 'Крутейшие новости на свете' })
  }

  @Post('/api')
  create(@Body() news: News): News {
    return this.newsService.create(news);
  }

  @Put('/api/:id')
  edit(@Param('id') id: string, @Body() news: NewsEdit): News {
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
