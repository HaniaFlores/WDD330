import { getData } from "./productData.mjs";

export default async function productList(selector, category) {
  let el = document.querySelector(selector);
  const products = await getData(category);
  renderList(products, el);
}

export function productCardTemplate(product) {
  return (
    `<li class="product-card">
    <a href="product_pages/index.html?product=` +
    product.Id +
    `" >
        <img
            src="` +
    product.Image +
    `"
            alt="` +
    product.Name +
    `"
        />
        <h3 class="card__brand">` +
    product.Brand.Name +
    `</h3>
        <h2 class="card__name">` +
    product.NameWithoutBrand +
    `</h2>
        <p class="product-card__price">$` +
    product.FinalPrice +
    `</p></a
    >
</li>`
  );
}

function renderList(list, el) {
  const listImages = ["880RR", "985RF", "985PR", "344YJ"];
  const htmlStrings = list
    .filter((tent) => listImages.includes(tent.Id))
    .map(productCardTemplate);
  el.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
}
