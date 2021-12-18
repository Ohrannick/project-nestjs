import { News } from 'src/news/news.service';

export default function renderNewsAll(news: News[]) {
  let newsListHtml = '';
  for (const newsItem of news) {
    newsListHtml += renderNewsBlock(newsItem)
  }
  return `<h1>Список новостей</h1> 
  <div class="row">
    ${newsListHtml}
  </div>
`;
}

const renderNewsBlock = (news: News) => {
  return `
  <div class="col-lg-3 mb-2">
    <div class="card" style="width: 90%; height: 400px; object-fit: cover;">
      ${news.cover
      ? `<img src= "${news.cover}" style="height: 200px" class="card-img-top" alt = "${news.id}" >`
      : ``
    }
      <div class="card-body">
        <h5 class="card-title">${news.title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${news.author}</h6>
        <p class="card-text">${news.description}</p>
        <a href="http://localhost:3000/news/detail/${news.id}" class="btn btn-primary">К новости</a>
      </div>
    </div>
  </div>
  `
}