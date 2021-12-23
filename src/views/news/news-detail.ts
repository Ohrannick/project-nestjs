import { CreateCommentDto } from 'src/news/comments/dtos/create-comment-dto';
import { News } from 'src/news/news.service';

export default function renderNewsDetail(news: News, comments: CreateCommentDto[]): string {
  return `
  <div class="container">
    <img src="${news.cover}" style="width: 200px" class="card-img-top" alt="cover" />
    <h1>${news.title}</h1>
    <div>${news.description}</div>
    <div class="text-muted">Автор: ${news.author}</div>
    ${comments ? renderNewsComments(comments) : "Комментариев нет"}
  </div>
`;

}

function renderNewsComments(comments: CreateCommentDto[]): string {
  let commentsHtml = ' <h1>Список комментариев</h1> ';
  for (const comment of comments) {
    commentsHtml += `
    <div class="row">
      <div class="col-lg-1">
        <img src="${comment?.avatar ? comment.avatar : "https://hostenko.com/wpcafe/wp-content/uploads/rndavatar.png"}" style="width: 75px; height: 75px;" class="rounded-lg mb-2"/>
      </div>
      <div class="col-lg-8">
        <div>${comment.author}</div>
        <div>${comment.message}</div>
      </div>
    </div>
    `
  }
  return commentsHtml;
}