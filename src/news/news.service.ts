import { Injectable } from '@nestjs/common';
import { Comment } from './comments/comments.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsEntity } from './news.entity';
import { CreateNewsDto } from './dtos/create-news-dto';

export interface News {
  id?: number;
  title: string;
  description: string;
  author: string;
  countViews?: number;
  comments?: Comment[];
  cover?: string
}

export interface NewsEdit {
  id?: number;
  title?: string;
  description?: string;
  author?: string;
  countViews?: number;
  comments?: Comment[];
  cover?: string
}

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private newsRepository: Repository<NewsEntity>,
  ) { }

  async create(news: CreateNewsDto): Promise<NewsEntity> {
    const newsEntity = new NewsEntity()
    newsEntity.title = news.title;
    newsEntity.description = news.description;
    newsEntity.cover = news.cover;
    return this.newsRepository.save(news)
  }

  async edit(id: number, news: NewsEdit): Promise<NewsEntity | null> {
    const editableNews = await this.findById(id)
    if (editableNews) {
      const newsEntity = new NewsEntity()
      newsEntity.title = news.title || editableNews.title;
      newsEntity.description = news.description || editableNews.description;
      newsEntity.cover = news.cover || editableNews.cover;

      return this.newsRepository.save(newsEntity);
    }

    return null;
  }

  findById(id: News['id']): Promise<NewsEntity> {
    return this.newsRepository.findOne(id)
  }

  getAll(): Promise<NewsEntity[]> {
    return this.newsRepository.find({})
  }

  async remove(id: News['id']): Promise<NewsEntity | null> {
    const removeNews = await this.findById(id);
    if (removeNews) {
      return this.newsRepository.remove(removeNews)
    }
    return null
  }


}
