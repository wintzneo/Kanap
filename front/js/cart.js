
function getCartStorage() {
  return JSON.parse(localStorage.getItem("product"));
}

// Récupération de l'id
async function getProduct(id) {
  return fetch("http://localhost:3000/api/products/" + id)
    .then(response => response.json())
    .catch(error => alert("Erreur : " + error));
}

// Création des différents éléments et insertion dans la section
viewArticle();

async function viewArticle() {
  const sendLocalStorage = getCartStorage();

  for (let i = 0; i < sendLocalStorage.length; i++) {
    let product = await getProduct(sendLocalStorage[i].id)

    // Création de la balise "article" et insertion dans la section
    let productCart = document.createElement("article");
    document.querySelector("#cart__items").appendChild(productCart);
    productCart.className = "cart__item";
    productCart.setAttribute("data-id", sendLocalStorage[i].id);
    productCart.setAttribute("data-color", sendLocalStorage[i].color);

    // Insertion de l'élément "div" pour l'image produit
    let productCartImage = document.createElement("div");
    productCart.appendChild(productCartImage);
    productCartImage.className = "cart__item__img";

    // Insertion de l'image
    let productImage = document.createElement("img");
    productCartImage.appendChild(productImage);
    productImage.src = sendLocalStorage[i].image;
    productImage.alt = sendLocalStorage[i].alt;

    // Insertion de l'élément "div" pour la description produit
    let productItemContent = document.createElement("div");
    productCart.appendChild(productItemContent);
    productItemContent.className = "cart__item__content";

    // Insertion de l'élément "div"
    let productItemContentTitlePrice = document.createElement("div");
    productItemContent.appendChild(productItemContentTitlePrice);
    productItemContentTitlePrice.className = "cart__item__content__titlePrice";

    // Insertion du titre h2
    let productTitle = document.createElement("h2");
    productItemContentTitlePrice.appendChild(productTitle);
    productTitle.innerHTML = sendLocalStorage[i].name;

    // Insertion de la couleur
    let productColor = document.createElement("p");
    productTitle.appendChild(productColor);
    productColor.innerHTML = sendLocalStorage[i].color;
    productColor.style.fontSize = "20px";

    // Insertion du prix
    let productPrice = document.createElement("p");
    productItemContentTitlePrice.appendChild(productPrice);
    productPrice.innerHTML = product.price + " €";

    // Insertion de l'élément "div"
    let productItemContentSettings = document.createElement("div");
    productItemContent.appendChild(productItemContentSettings);
    productItemContentSettings.className = "cart__item__content__settings";

    // Insertion de l'élément "div"
    let productItemContentSettingsQuantity = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsQuantity);
    productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

    // Insertion de "Qté : "
    let productQty = document.createElement("p");
    productItemContentSettingsQuantity.appendChild(productQty);
    productQty.innerHTML = "Quantité : ";

    // Insertion de la quantité
    let productQuantity = document.createElement("input");
    productItemContentSettingsQuantity.appendChild(productQuantity);
    productQuantity.value = sendLocalStorage[i].quantity;
    productQuantity.className = "itemQuantity";
    productQuantity.setAttribute("type", "number");
    productQuantity.setAttribute("min", "1");
    productQuantity.setAttribute("max", "100");
    productQuantity.setAttribute("name", "itemQuantity");

    // Insertion de l'élément "div"
    let productItemContentSettingsDelete = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsDelete);
    productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

    // Insertion de "p" supprimer
    let productSupprimer = document.createElement("p");
    productItemContentSettingsDelete.appendChild(productSupprimer);
    productSupprimer.className = "deleteItem";
    productSupprimer.innerHTML = "Supprimer l'article";
  }
  // Récupération du prix et quantités total
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


  // Modification des quantités des articles dans le panier
  modifyQuantity();
  function modifyQuantity() {
    const sendLocalStorage = getCartStorage();
    const modifNumber = document.querySelectorAll('.itemQuantity');

    let totalQuantity = 0;  

    for (let i = 0; i < sendLocalStorage.length; i++) {
      basketProduct = sendLocalStorage[i];
      totalQuantity += basketProduct.quantity;
    }
    

    if (parseInt(totalQuantity) >= 100) {
      alert("Vous ne pouvez ajouter plus de 100 articles dans le panier !");
    }

    if (parseInt(totalQuantity) <= 100) {

      for (let k = 0; k < modifNumber.length; k++) {
        modifNumberItem = modifNumber[k];
        modifNumberItem.addEventListener('change', function (event) {

          for (let l = 0; l < sendLocalStorage.length; l++) {
            basketProduct = sendLocalStorage[l];
            let Item = event.target.closest('article');
            let ItemID = Item.getAttribute("data-id");
            let ItemColor = Item.getAttribute("data-color");
            newQuantityValue = event.target.valueAsNumber;
            console.log(basketProduct)
            console.log(newQuantityValue)

            if (basketProduct.id == ItemID && basketProduct.color == ItemColor) {
              qtyToAdd = newQuantityValue - basketProduct.quantity;
              basketProduct.quantity = newQuantityValue;
              sendLocalStorage.totalQuantity = sendLocalStorage.totalQuantity + qtyToAdd;
              let lineProduct = JSON.stringify(sendLocalStorage);
              localStorage.setItem("product", lineProduct);
            }
          }
          showPrice();
        }
        )
      };
    }

    // Suppression de l'article dans le panier
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
  }



  //Création des expressions régulières
  let emailReg = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
  let charReg = new RegExp("^[a-zA-Z ,.'-]+$");
  let addressReg = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

  getForm();
  //Instauration formulaire avec regex
  function getForm() {

    // Ajout des Regex
    let form = document.querySelector(".cart__order__form");

    //Ecoute de la modification du prénom
    form.firstName.addEventListener('change', function () {
      validFirstName(this);
    });

    //Ecoute de la modification du nom
    form.lastName.addEventListener('change', function () {
      validLastName(this);
    });

    //Ecoute de la modification de l'adresse
    form.address.addEventListener('change', function () {
      validAddress(this);
    });

    //Ecoute de la modification de la ville
    form.city.addEventListener('change', function () {
      validCity(this);
    });

    //Ecoute de la modification de l'email
    form.email.addEventListener('change', function () {
      validEmail(this);
    });

    //validation du prénom
    const validFirstName = function (inputFirstName) {
      let firstNameErrorMsg = inputFirstName.nextElementSibling;

      if (charReg.test(inputFirstName.value)) {
        firstNameErrorMsg.innerHTML = '';
      } else {
        firstNameErrorMsg.innerHTML = 'Veuillez renseigner votre prénom.';
      }
    };

    //validation du nom
    const validLastName = function (inputLastName) {
      let lastNameErrorMsg = inputLastName.nextElementSibling;

      if (charReg.test(inputLastName.value)) {
        lastNameErrorMsg.innerHTML = '';
      } else {
        lastNameErrorMsg.innerHTML = 'Veuillez renseigner votre nom.';
      }
    };

    //validation de l'adresse
    const validAddress = function (inputAddress) {
      let addressErrorMsg = inputAddress.nextElementSibling;

      if (addressReg.test(inputAddress.value)) {
        addressErrorMsg.innerHTML = '';
      } else {
        addressErrorMsg.innerHTML = 'Veuillez renseigner votre adresse.';
      }
    };

    //validation de la ville
    const validCity = function (inputCity) {
      let cityErrorMsg = inputCity.nextElementSibling;

      if (charReg.test(inputCity.value)) {
        cityErrorMsg.innerHTML = '';
      } else {
        cityErrorMsg.innerHTML = 'Veuillez renseigner votre ville.';
      }
    };

    //validation de l'email
    const validEmail = function (inputEmail) {
      let emailErrorMsg = inputEmail.nextElementSibling;

      if (emailReg.test(inputEmail.value)) {
        emailErrorMsg.innerHTML = '';
      } else {
        emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
      }
    };
  }

  // Envoi du formulaire
  sendForm();
  function sendForm() {
    let sendLocalStorage = getCartStorage();
    const orderID = document.querySelector('#order');
    orderID.addEventListener('click', function (event) {
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
      } else if (charReg.test(inputFirstName.value) == false || charReg.test(inputLastName.value) == false || addressReg.test(inputAddress.value) == false || charReg.test(inputCity.value) == false || emailReg.test(inputEmail.value) == false) {
        alert("Vérifiez vos coordonnées pour passer la commande !");
        event.preventDefault();

        //Construction d'un array d'id depuis le local storage
      } else {
        products = [];
        for (let m = 0; m < sendLocalStorage.length; m++) {
          products.push(sendLocalStorage[m].id);
        }

        // Récupèration des données du formulaire dans un objet
        let order = {
          contact: {
            firstName: inputFirstName.value,
            lastName: inputLastName.value,
            address: inputAddress.value,
            city: inputCity.value,
            email: inputEmail.value,
          },
          products: products
        }




        // Envoi du formulaire + localStorage

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
    })
  }
}