import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { News } from 'src/news/news.service';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) { }

  async sendTest() {
    console.log('Отправляется письмо установки');
    return await this.mailerService
      .sendMail({
        to: 'ohrannick.pupkin@yandex.ru',
        subject: '🤩 Наше второе письмо!',
        template: './test',
      })
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }

  async sendNewNewsForAdmins(emails: string[], news: News) {
    console.log('Отправляются письма о новой новости администрации ресурса');

    for (const email of emails) {
      await this.mailerService
        .sendMail({
          to: email,
          subject: `Создана новая новость: ${news.title}`,
          template: './new-news',
          context: news,
        })
        .then((res) => {
          console.log('res', res);
        })
        .catch((err) => {
          console.log('err', err);
        });
    }
  }
}
