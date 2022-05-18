(async function () {
  const articleId = getArticleId();
  const article = await getArticle(articleId);
  viewArticle(article);
  addToBasket(article);
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

function addToBasket(article) {
  let numberProduct = document.getElementById("quantity");
  let sendToCart = document.getElementById("addToCart");
  let color = document.getElementById("colors");

  sendToCart.addEventListener("click", (event) => {
    event.preventDefault();
    let articleBasket = {
      id: article._id,
      name: article.name,
      image: article.imageUrl,
      prix: article.price /100,
      quantity: Number (numberProduct.value),
      color: color.value,
    };
    let sendLocalStorage = JSON.parse(localStorage.getItem("product"));

    let confirmation = () => {
      if (
        window.confirm(`Votre produit 
        Nom : ${article.name},
        Couleur : ${color.value},
        Quantité : ${numberProduct.value}, 
        a bien été ajouté au panier
        Pour consulter le panier, appuyer sur OK
        Pour revenir a l'accueil, appuyer sur ANNULER`)
      ) {
        window.location.href = "cart.html";
      } else {
        window.location.href = "index.html";
      }
    };
    if (sendLocalStorage) {
      let InBasket = false;
      sendLocalStorage.forEach((article) => {
        if (
          article._id === articleBasket._id &&
          color.value === articleBasket.color
        ) {
          article.quantity += articleBasket.quantity;
          InBasket = true;
        }
      });
      if (!InBasket) {
        sendLocalStorage.push(productBasket);
      }
      localStorage.setItem("product", JSON.stringify(sendLocalStorage));
      confirmation();
    } else {
      sendLocalStorage = [];
      sendLocalStorage.push(productBasket);
      localStorage.setItem("product", JSON.stringify(sendLocalStorage));
      confirmation();
    }
  });
}
