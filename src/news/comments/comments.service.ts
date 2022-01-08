import { CreateCommentDto } from 'src/news/comments/dtos/create-comment-dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../../users/users.service';
import { Repository } from 'typeorm';
import { NewsService } from '../news.service';
import { CommentsEntity } from './comments.entity';

export type Comment = {
  id?: number;
  message: string;
  author: string;
  avatar?: string;
}

export type NewComment = {
  id?: number;
  message?: string;
  author?: string;
  avatar?: string;
}

export function getRandomInt(min = 1, max = 9999): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsEntity)
    private readonly commentsRepository: Repository<CommentsEntity>,
    private readonly newsService: NewsService,
    private readonly userService: UsersService,
  ) { }
  private readonly comments = {};

  async create(idNews: number, comment: CreateCommentDto): Promise<CommentsEntity> {
    const _news = await this.newsService.findById(idNews)
    if (!_news) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Новость не найдена',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const _user = await this.userService.findById(comment.userId)
    if (!_user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Пользователь не найден',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const commentsEntity = new CommentsEntity()
    commentsEntity.news = _news
    commentsEntity.user = _user
    commentsEntity.message = comment.message

    return this.commentsRepository.save(commentsEntity)
  }

  async edit(idComment: number, comment: NewComment): Promise<CommentsEntity> {
    const _comment = await this.commentsRepository.findOne(idComment);
    _comment.message = comment.message;
    return this.commentsRepository.save(_comment);
  }

  findAll(idNews: number): Promise<CommentsEntity[]> {
    return this.commentsRepository.find({
      where: { news: idNews },
      relations: ['user'],
    })
  }

  async remove(idComment: number): Promise<CommentsEntity> {
    const _comment = await this.commentsRepository.findOne(idComment)
    if (!_comment) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Комментарий не найден',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return this.commentsRepository.remove(_comment)
  }

  async removeAll(idNews) {
    const _comments = await this.findAll(idNews);
    return await this.commentsRepository.remove(_comments);
  }

}
