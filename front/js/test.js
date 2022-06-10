viewArticle();
function viewArticle() {
  const sendLocalStorage = getCartStorage();

  
  for (let i = 0; i < sendLocalStorage.length; i++) {

    let id = sendLocalStorage[i].id

    fetch("http://localhost:3000/api/products/" + id)
    .then(response => response.json())
    .then (product => {
      console.log(product)
      let productCart = document.createElement("article");
    document.querySelector("#cart__items").appendChild(productCart);
    productCart.className = "cart__item";
    productCart.setAttribute("data-id", sendLocalStorage[i].id);
    productCart.setAttribute("data-color", product.color);

    let productCartImage = document.createElement("div");
    productCart.appendChild(productCartImage);
    productCartImage.className = "cart__item__img";

    let productImage = document.createElement("img");
    productCartImage.appendChild(productImage);
    productImage.src = product.imageUrl;
    productImage.alt = product.altTxt;

    let productItemContent = document.createElement("div");
    productCart.appendChild(productItemContent);
    productItemContent.className = "cart__item__content";

    let productItemContentTitlePrice = document.createElement("div");
    productItemContent.appendChild(productItemContentTitlePrice);
    productItemContentTitlePrice.className = "cart__item__content__titlePrice";

    let productTitle = document.createElement("h2");
    productItemContentTitlePrice.appendChild(productTitle);
    productTitle.innerHTML = product.name;

    let productColor = document.createElement("p");
    productTitle.appendChild(productColor);
    productColor.innerHTML = sendLocalStorage[i].color;
    productColor.style.fontSize = "20px";

    let productPrice = document.createElement("p");
    productItemContentTitlePrice.appendChild(productPrice);
    productPrice.innerHTML = product.price + " €";

    let productItemContentSettings = document.createElement("div");
    productItemContent.appendChild(productItemContentSettings);
    productItemContentSettings.className = "cart__item__content__settings";

    let productItemContentSettingsQuantity = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsQuantity);
    productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

    let productQty = document.createElement("p");
    productItemContentSettingsQuantity.appendChild(productQty);
    productQty.innerHTML = "Quantité : ";

    let productQuantity = document.createElement("input");
    productItemContentSettingsQuantity.appendChild(productQuantity);
    productQuantity.value = sendLocalStorage[i].quantity;
    productQuantity.className = "itemQuantity";
    productQuantity.setAttribute("type", "number");
    productQuantity.setAttribute("min", "1");
    productQuantity.setAttribute("max", "100");
    productQuantity.setAttribute("name", "itemQuantity");

    let productItemContentSettingsDelete = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsDelete);
    productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

    let productSupprimer = document.createElement("p");
    productItemContentSettingsDelete.appendChild(productSupprimer);
    productSupprimer.className = "deleteItem";
    productSupprimer.innerHTML = "Supprimer l'article";
    })
    .catch(error => alert("Erreur : " + error));
  }
}