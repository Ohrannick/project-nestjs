import { Injectable } from '@nestjs/common';

export interface News {
  id?: number;
  title: string;
  description: string;
  author: string;
  countViews?: number;
}

@Injectable()
export class NewsService {
  private readonly news: News[] = [
    {
      id: 1,
      title: 'Наша первая новостя', 
      description: 'Урра!!!', 
      author: 'Ohrannick', 
      countViews: 12
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

  edit(id: News['id']): News {
    const title = 'Совершенно новая новость.......................................'
    const newEdit = this.news.find((news: News) => news.id === id)
    const finalNews = {
      ...newEdit,
      title,
    }
    this.news.push(finalNews);
    return finalNews;
  }

  find(id: News['id']): News | undefined {
    return this.news.find((news: News) => news.id === id)
  }

  remove(id: News['id']): Boolean {
    const indexRemoveNews = this.news.findIndex((news: News) => news.id === id);
    if(indexRemoveNews !== -1) {
      this.news.splice(indexRemoveNews, 1);
      return true
    }
    return false
  }


}
