(async function () {
  const articles = await getArticles()
  for (article of articles) {
    viewArticle(article)
  }
})()

//Récupération du tableau des produits disponibles
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

//Création des articles via la liste récupérée précédemment
function viewArticle(article) {

  //Récupération de l'élément "templateArticle"
  const templateElt = document.getElementById("templateArticle")

  //Importation du contenu
  const cloneElt = document.importNode(templateElt.content, true)

  //Importation du contenu dans l'élément "a"
  cloneElt.getElementById("link").href += "?id=" + article._id

  //Importation du contenu dans l'img et son alt
  cloneElt.getElementById("img").src = article.imageUrl
  cloneElt.getElementById("img").alt = article.altTxt

  //Importation du contenu dans le titre "h3"
  cloneElt.getElementById("productName").textContent = article.name

  //Importation du contenu dans la description "p"
  cloneElt.getElementById("productDescription").textContent = article.description

  //Attachement des différentes importations
  document.getElementById("items").appendChild(cloneElt)
}
