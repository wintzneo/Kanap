main();

async function main() {
  const articles = await getArticles();

  for (article of articles) {
    viewArticle(article);
  }
}

function getArticles(articleId) {
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

function viewArticle(article) {
  document.getElementById("items").innerHTML += `
    <a href="product.html?id=${article._id}">
        <article>
            <img src="${article.imageUrl}" alt="${article.altTxt}">
            <h3 class="productName">${article.name}</h3>
            <p class="productDescription">${article.description}</p>
        </article>
    </a>`;
}
