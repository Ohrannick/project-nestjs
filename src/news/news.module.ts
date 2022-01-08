import { UsersModule } from '../users/users.module';
import { MailModule } from '../mail/mail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { CommentsModule } from './comments/comments.module';
import { NewsEntity } from './news.entity';

@Module({
  controllers: [NewsController],
  providers: [NewsService],
  imports: [TypeOrmModule.forFeature([NewsEntity]), CommentsModule, MailModule, UsersModule],
  exports: [TypeOrmModule.forFeature([NewsEntity]), NewsService],
})
export class NewsModule { }
