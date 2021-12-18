import { Comment } from 'src/news/comments/comments.service';
import { News } from 'src/news/news.service';

export default function renderNewsDetail(news: News, comments: Comment[]): string {
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

function renderNewsComments(comments: Comment[]): string {
  let commentsHtml = ' <h1>Список комментариев</h1> ';
  for (const comment of comments) {
    commentsHtml += `
    <div class="row">
      <div class="col-lg-1">
        <div style="background: #ccc; width: 75px; height: 75px;" class="rounded-lg mb-2"></div>
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