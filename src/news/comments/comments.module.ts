import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsModule } from '../news.module';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentsEntity } from './comments.entity';
import { UsersModule } from '../../users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { SocketCommentsGateway } from './socket-comments.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([CommentsEntity]),
  forwardRef(() => NewsModule), UsersModule, AuthModule,],
  controllers: [CommentsController],
  providers: [CommentsService, SocketCommentsGateway],
  exports: [CommentsService, TypeOrmModule.forFeature([CommentsEntity])],
})
export class CommentsModule { }
