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

getForm();
function getForm() {

  let form = document.querySelector(".cart__order__form");

  let emailReg = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
  let charReg = new RegExp("^[a-zA-Z ,.'-]+$");
  let addressReg = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

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
  const order = document.getElementById('order');
  order.addEventListener('click', (event) => {
    event.preventDefault();

    const contact = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      email: document.getElementById('email').value
    }

    let products = [];
    for (let i = 0; i < sendLocalStorage.length; i++) {
      products.push(sendLocalStorage[i].id);
    }

    const valueData = {
      contact,
      products,
    }

    const sendData = {
      method: 'POST',
      body: JSON.stringify(valueData),
      headers: {
        'Content-Type': 'application/json',
      }
    };

    fetch("http://localhost:3000/api/products/order", sendData)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('orderId', data.orderId);
        document.location.href = 'confirmation.html?id=' + data.orderId;
      });
  });
}