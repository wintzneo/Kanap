(async function () {
  const articleId = getArticleId();
  console.log(articleId);
  const article = await getArticle(articleId);
  viewArticle(article);
})();

function getArticleId() {
  return new URL(location.href).searchParams.get("id");
}

function getArticle(articleId) {
  return fetch("http://localhost:3000/api/products/" + articleId)
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

function viewArticle(article) {
  document.getElementById("item__imgId").src = article.imageUrl;
  document.getElementById("item__imgId").alt = article.altTxt;
  document.getElementById("title").textContent = article.name;
  document.getElementById("price").textContent = article.price;
  document.getElementById("description").textContent = article.description;

  let color = document.getElementById("colors");
      for (let i = 0; i < article.colors.length; i++) {
        let option = document.createElement("option");
        option.innerText = article.colors[i];
        color.appendChild(option);
      }
}
