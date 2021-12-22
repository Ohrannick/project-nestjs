import { Injectable } from '@nestjs/common';
import { Comment } from './comments/comments.service';

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
  private readonly news: News[] = [
    {
      id: 1,
      title: 'Наша первая новостя',
      description: 'Урра!!!',
      author: 'Ohrannick',
      countViews: 12,
      cover: '/news-static/4ea1e3c1-dd34-4dc9-85dc-abaaa32b5821.jpeg'
    }
  ];

  create(news: News): News {
    const id = Date.now()
    const finalNews = {
      ...news,
      id,
    }
    this.news.push(finalNews);
    return finalNews;
  }

  edit(id: number, news: NewsEdit): News | undefined {
    const newEdit = this.news.findIndex((news: News) => news.id === id)
    if (newEdit !== -1) {
      this.news[newEdit] = {
        ...this.news[newEdit],
        ...news,
      };

      return this.news[newEdit];
    }

    return undefined;
  }

  find(id: News['id']): News | undefined {
    return this.news.find((news: News) => news.id === id)
  }

  getAll(): News[] {
    return this.news
  }

  remove(id: News['id']): Boolean {
    const indexRemoveNews = this.news.findIndex((news: News) => news.id === id);
    if (indexRemoveNews !== -1) {
      this.news.splice(indexRemoveNews, 1);
      return true
    }
    return false
  }


}
