let url = new URL(window.location.href);
let searchParent = new URLSearchParams(url.search);
let Id = searchParent.get("id");
console.log(Id);

load();

function load() {
  const articleId = getArticleId();
  console.log();
  const article = getArticle(articleId);
  viewArticle(article);
}

function getArticleId() {
  return new URL(location.href).searchParams.get("_id");
}
console.log(getArticleId);


function getArticle(articleId) {
  return fetch("http://localhost:3000/api/products")
    .then(function (httpResponse) {
      return httpResponse.json();
    })
    .then(function (articles) {
      return articles;
    })
    .catch(function (error) {
      alert(error);
    });
}

function viewArticle(){

}
