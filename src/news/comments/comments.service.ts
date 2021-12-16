import { Injectable } from '@nestjs/common';

export type Comment = {
  id?: number;
  message: string;
  author: string;
}

export type NewComment = {
  id?: number;
  message?: string;
  author?: string;
}

export function getRandomInt(min = 1, max = 9999): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

@Injectable()
export class CommentsService {
  private readonly comments = {};

  create(idNews: number, comments: Comment) {
    if (!this.comments[idNews]) {
      this.comments[idNews] = []
    }

    this.comments[idNews].push({ ...comments, id: getRandomInt() })
    return 'Комментарий был создан...'
  }

  find(idNews: number): Comment[] | null {
    return this.comments[idNews] || null
  }

  remove(idNews: number, idComment: number): Comment[] | null {
    if (!this.comments[idNews]) {
      return null
    }

    const indexComment = this.comments[idNews].findIndex((c) => c.id === idComment)
    if (indexComment === -1) {
      return null
    }

    return this.comments[idNews].splice(indexComment, 1)
  }

  edit(idNews: number, idComment: number, comments: NewComment) {
    const newEditComment = this.comments[idNews]?.findIndex((c) => c.id === idComment) === -1;
    if (!this.comments[idNews] || newEditComment) {
      return false;
    }

    this.comments[idNews][newEditComment] = {
      ...this.comments[idNews][newEditComment],
      comments,
    }
    return 'Комментарий отредактирован...'
  }
}
