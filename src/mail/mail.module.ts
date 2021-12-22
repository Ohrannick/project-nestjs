import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: 'smtps://ohrannick.pupkin@yandex.ru:Opacity0.5@smtp.yandex.ru',
      defaults: {
        from: '"NestJS робот" <ohrannick.pupkin@yandex.ru>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  exports: [MailService],
  providers: [MailService],
  controllers: [MailController]
})
export class MailModule { }
