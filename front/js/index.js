(async function() {
  const articles = await getArticles()
  
  for (article of articles) {
    viewArticle(article)
  }
})()

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
  const templateElt = document.getElementById("templateArticle")
  const cloneElt = document.importNode(templateElt.content, true)

  cloneElt.getElementById("link").href += "?id=" + article._id
  cloneElt.getElementById("img").src = article.imageUrl
  cloneElt.getElementById("img").alt = article.altTxt
  cloneElt.getElementById("productName").textContent = article.name
  cloneElt.getElementById("productDescription").textContent = article.description

  document.getElementById("items").appendChild(cloneElt)
}
