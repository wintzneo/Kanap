function object(image, description, name, price, color, quantity) {
  this.image = image;
  this.description = description;
  this.price = price;
  this.name = name;
  this.color = color;
  this.quantity = quantity;
}

let basket = [];
let sendLocalStorage = JSON.parse(localStorage.getItem("product"));
if (sendLocalStorage === null || sendLocalStorage === 0) {
  document.getElementsByClassName("cart").innerHTML = "";
} else {
  sendLocalStorage.forEach((sendLocalStorage) => {
    let productsBasket = new object(
      sendLocalStorage.image,
      sendLocalStorage.description,
      sendLocalStorage.name,
      sendLocalStorage.price,
      sendLocalStorage.color,
      sendLocalStorage.quantity
    );
    basket.push(productsBasket);
  });
}

basketList();

function basketList() {
  let articleBasket = "";
  basket.forEach(article => {
    return (articleBasket += `
        <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="${article.image}" alt="${article.description}"
                  >
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${article.name}</h2>
                    <p>${article.color}</p>
                    <p>${article.price}€</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : ${article.quantity}</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${article.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
        `);
  });
  document.getElementById("cart__items").innerHTML = articleBasket;
}
