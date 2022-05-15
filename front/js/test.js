function viewArticle(article) {
    document.getElementsByClassName("item").innerHTML += `
      <article>
      <div class="item__img">
        <img src="${article.imageUrl}" alt="${article.altTxt}">
      </div>
      <div class="item__content">
  
        <div class="item__content__titlePrice">
          <h1 id="title">${article.name}</h1>
          <p>Prix : <span id="price">${article.price}</span>€</p>
        </div>
  
        <div class="item__content__description">
          <p class="item__content__description__title">Description :</p>
          <p id="description">${article.description}</p>
        </div>
  
        <div class="item__content__settings">
          <div class="item__content__settings__color">
            <label for="color-select">Choisir une couleur :</label>
            <select name="color-select" id="colors">
                <option value="">--SVP, choisissez une couleur --</option>
                <option value="vert">${article.colors}</option>
                <option value="blanc">${article.colors}</option>
            </select>
          </div>`;
  }