import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

export default async function productList(selector, category) {
  let el = document.querySelector(selector);
  const products = await getData(category);
  
  /* List of products filter */
  const listImages = ["880RR", "985RF", "985PR", "344YJ"];
  const filteredProducts = products
    .filter((tent) => listImages.includes(tent.Id));
  
  /* renderList(products, el); */
  renderListWithTemplate(productCardTemplate, el, filteredProducts);
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
