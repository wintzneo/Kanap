
function getCartStorage() {
  return JSON.parse(localStorage.getItem("product"));
}

viewArticle();
function viewArticle() {
  const sendLocalStorage = getCartStorage();
  for (let i = 0; i < sendLocalStorage.length; i++) {

    let productCart = document.createElement("article");
    document.querySelector("#cart__items").appendChild(productCart);
    productCart.className = "cart__item";
    productCart.setAttribute("data-id", sendLocalStorage[i].id);
    productCart.setAttribute("data-color", sendLocalStorage[i].color);

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
  }
}


async function getProduct(id) {
  return fetch("http://localhost:3000/api/products/" + id)
    .then(response => response.json())
    .catch(error => alert("Erreur : " + error));
}

async function showPrice() {
  const sendLocalStorage = getCartStorage();
  if (!sendLocalStorage.length) {
    const titleCart = document.querySelector("h1");
    const sectionCart = document.querySelector(".cart");
    titleCart.innerHTML = "Votre panier est vide !";
    sectionCart.style.display = "none";
  } else {
    let totalPrice = 0;
    let totalQuantity = 0;

    for (let i = 0; i < sendLocalStorage.length; i++) {
      basketProduct = sendLocalStorage[i];
      totalQuantity += basketProduct.quantity;

      let productsPrice = await getProduct(basketProduct.id);
      totalPrice += productsPrice.price * basketProduct.quantity;
    }

    let totalPriceElt = document.querySelector('#totalPrice');
    totalPriceElt.textContent = totalPrice;

    let totalQuantityElt = document.querySelector('#totalQuantity');
    totalQuantityElt.textContent = totalQuantity;
  }
}
showPrice();

modifyQuantity();
function modifyQuantity() {
  const sendLocalStorage = getCartStorage();
  const modifNumber = document.querySelectorAll('.itemQuantity');
  for (let k = 0; k < modifNumber.length; k++) {
    modifNumberItem = modifNumber[k];
    modifNumberItem.addEventListener('change', function (event) {

      for (let l = 0; l < sendLocalStorage.length; l++) {
        basketProduct = sendLocalStorage[l];
        let Item = event.target.closest('article');
        let ItemID = Item.getAttribute("data-id");
        let ItemColor = Item.getAttribute("data-color");
        newQuantityValue = event.target.valueAsNumber;

        if (basketProduct.id == ItemID && basketProduct.color == ItemColor) {
          qtyToAdd = newQuantityValue - basketProduct.quantity;
          basketProduct.quantity = newQuantityValue;
          sendLocalStorage.totalQuantity = sendLocalStorage.totalQuantity + qtyToAdd;
          let lineProduct = JSON.stringify(sendLocalStorage);
          localStorage.setItem("product", lineProduct);
        }
      }
      showPrice();
    })
  };
}

delProduct();
function delProduct() {
  let sendLocalStorage = getCartStorage();
  let delItem = document.querySelectorAll('.deleteItem');
  for (let j = 0; j < delItem.length; j++) {

    delItemUnit = delItem[j];
    delItemUnit.addEventListener('click', function (event) {
      let delItem = event.target.closest('article');
      let delItemID = delItem.getAttribute("data-id");
      let delItemColor = delItem.getAttribute("data-color");

      productToDel = sendLocalStorage.find(el => el.id == delItemID && el.color == delItemColor);

      result = sendLocalStorage.filter(el => el.id !== delItemID || el.color !== delItemColor);
      sendLocalStorage = result;

      alert('Vous avez bien supprimé votre produit du panier !');

      let lineBasket = JSON.stringify(sendLocalStorage);
      localStorage.setItem("product", lineBasket);
      delItem.remove()
      showPrice();
    })
  };
}

let emailReg = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
let charReg = new RegExp("^[a-zA-Z ,.'-]+$");
let addressReg = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

getForm();
function getForm() {

  let form = document.querySelector(".cart__order__form");

  form.firstName.addEventListener('change', function () {
    validFirstName(this);
  });

  form.lastName.addEventListener('change', function () {
    validLastName(this);
  });

  form.address.addEventListener('change', function () {
    validAddress(this);
  });

  form.city.addEventListener('change', function () {
    validCity(this);
  });

  form.email.addEventListener('change', function () {
    validEmail(this);
  });

  const validFirstName = function (inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (charReg.test(inputFirstName.value)) {
      firstNameErrorMsg.innerHTML = '';
    } else {
      firstNameErrorMsg.innerHTML = 'Veuillez renseigner votre prénom.';
    }
  };

  const validLastName = function (inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (charReg.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = '';
    } else {
      lastNameErrorMsg.innerHTML = 'Veuillez renseigner votre nom.';
    }
  };

  const validAddress = function (inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (addressReg.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = '';
    } else {
      addressErrorMsg.innerHTML = 'Veuillez renseigner votre adresse.';
    }
  };

  const validCity = function (inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (charReg.test(inputCity.value)) {
      cityErrorMsg.innerHTML = '';
    } else {
      cityErrorMsg.innerHTML = 'Veuillez renseigner votre ville.';
    }
  };

  const validEmail = function (inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailReg.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = '';
    } else {
      emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
    }
  };
}

sendForm();
function sendForm() {
  let sendLocalStorage = getCartStorage();
  const orderID = document.querySelector('#order');
    orderID.addEventListener('click', function(event) {
      event.preventDefault();
      let inputFirstName = document.getElementById('firstName');
      let inputLastName = document.getElementById('lastName');
      let inputAddress = document.getElementById('address');
      let inputCity = document.getElementById('city');
      let inputEmail = document.getElementById('email');
  
      if (sendLocalStorage == null) {
          alert("Pour passer commande, veuillez ajouter des produits à votre panier");
          event.preventDefault();
      } else if (firstName.value === "" || lastName.value === "" || address.value === "" || city.value === "" || email.value === "") {
          alert("Vous devez renseigner vos coordonnées pour passer la commande !");
          event.preventDefault();
      } else if (charReg.test(inputFirstName.value) ==  false || charReg.test(inputLastName.value) ==  false || addressReg.test(inputAddress.value) ==  false || charReg.test(inputCity.value) ==  false || emailReg.test(inputEmail.value) ==  false) {
          alert("Vérifiez vos coordonnées pour passer la commande !");
          event.preventDefault();
      } else {
          products = [];
          for (let m = 0; m < sendLocalStorage.length; m++) {
          products.push(sendLocalStorage[m].id);
          }
  
          let order = {
          contact : {
              firstName: inputFirstName.value,
              lastName: inputLastName.value,
              address: inputAddress.value,
              city: inputCity.value,
              email: inputEmail.value,
          },
          products : products
          }

          const sendData = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
              'Accept': 'application/json', 
              'Content-Type': 'application/json' 
            }
          };
      
          fetch("http://localhost:3000/api/products/order", sendData)
            .then(response => response.json())
            .then(data => {
              localStorage.setItem('orderId', data.orderId);
              document.location.href = 'confirmation.html?id=' + data.orderId;
            });
      }
  })}