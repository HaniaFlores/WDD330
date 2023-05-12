import { getData } from "./productData.mjs"


export default async function productList(selector, category) {
    const products = await getData(category);
    renderList(products, selector)
}

export function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="product_pages/index.html?product=` + product.Id + `" >
        <img
            src="` + product.Image + `"
            alt="` + product.Name + `"
        />
        <h3 class="card__brand">` + product.Brand.Name + `</h3>
        <h2 class="card__name">` + product.NameWithoutBrand + `</h2>
        <p class="product-card__price">$` + product.FinalPrice + `</p></a
    >
</li>`
}

function renderList(list, el) { 
    const htmlStrings = list.filter(x => x.Image != "").map(productCardTemplate); 
    el.insertAdjacentHTML("afterbegin", htmlStrings.join("")); }


function checkIfImageExists(url, callback) {
    const img = new Image();
    img.src = url;

    if (img.complete) {
      callback(true);
    } else {
      img.onload = () => {
        callback(true);
      };
      
      img.onerror = () => {
        callback(false);
      };
    }
  }