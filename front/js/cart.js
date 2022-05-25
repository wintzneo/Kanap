let sendLocalStorage = JSON.parse(localStorage.getItem("product"));

viewArticle();
function viewArticle() {
  if (!sendLocalStorage) {

    const titleCart = document.querySelector("h1");
    const sectionCart = document.querySelector(".cart");

    titleCart.innerHTML = "Votre panier est vide !";
    sectionCart.style.display = "none";

  } else {

    for (let i = 0; i < sendLocalStorage.length; i++) {

      let productCart = document.createElement("article");
      document.querySelector("#cart__items").appendChild(productCart);
      productCart.className = "cart__item";
      productCart.setAttribute("data-id", sendLocalStorage[i].id);

      let productCartImage = document.createElement("div");
      productCart.appendChild(productCartImage);
      productCartImage.className = "cart__item__img";

      let productImage = document.createElement("img");
      productCartImage.appendChild(productImage);
      productImage.src = sendLocalStorage[i].image;
      productImage.alt = sendLocalStorage[i].alt;

      let productItemContent = document.createElement("div");
      productCart.appendChild(productItemContent);
      productItemContent.className = "cart__item__content";

      let productItemContentTitlePrice = document.createElement("div");
      productItemContent.appendChild(productItemContentTitlePrice);
      productItemContentTitlePrice.className = "cart__item__content__titlePrice";

      let productTitle = document.createElement("h2");
      productItemContentTitlePrice.appendChild(productTitle);
      productTitle.innerHTML = sendLocalStorage[i].name;

      let productColor = document.createElement("p");
      productTitle.appendChild(productColor);
      productColor.innerHTML = sendLocalStorage[i].color;
      productColor.style.fontSize = "20px";

      let productPrice = document.createElement("p");
      productItemContentTitlePrice.appendChild(productPrice);
      productPrice.innerHTML = sendLocalStorage[i].price + " €";

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
      productSupprimer.addEventListener("click", (event) => {
        event.preventDefault;

        let deleteId = sendLocalStorage[i].id;
        let deleteColor = sendLocalStorage[i].color;

        sendLocalStorage = sendLocalStorage.filter(elt => elt.id !== deleteId || elt.color !== deleteColor);

        localStorage.setItem("product", JSON.stringify(sendLocalStorage));

        alert('Votre article a bien été supprimé.');

        if (sendLocalStorage.length === 0) {
          localStorage.clear();
        }

        location.reload();
      });
    }
  }
}

getTotals();
function getTotals() {

  let quantityElements = document.getElementsByClassName("itemQuantity");
  let myProducts = quantityElements.length,
    quantityTotal = 0;

  for (let i = 0; i < myProducts; ++i) {
    quantityTotal += quantityElements[i].valueAsNumber;
  }

  let productTotalQuantity = document.getElementById("totalQuantity");
  productTotalQuantity.innerHTML = quantityTotal;

  totalPrice = 0;
  for (let i = 0; i < myProducts; ++i) {
    totalPrice += (quantityElements[i].value * sendLocalStorage[i].price);
  }

  let productTotalPrice = document.getElementById("totalPrice");
  productTotalPrice.innerHTML = totalPrice;
}

modifyQuantity();
function modifyQuantity() {
  let modifNumber = document.getElementsByClassName("itemQuantity");

  for (let k = 0; k < modifNumber.length; k++) {
    modifNumber[k].addEventListener("change", (event) => {
      event.preventDefault();

      let quantityModif = sendLocalStorage[k].quantity;
      let quantityValue = modifNumber[k].value;

      const result = sendLocalStorage.find((el) => el.quantityValue !== quantityModif);

      result.quantity = quantityValue;
      sendLocalStorage[k].quantity = result.quantity;

      localStorage.setItem("product", JSON.stringify(sendLocalStorage));

      location.reload();
    })
  }
}