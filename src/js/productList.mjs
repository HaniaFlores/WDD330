import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

export default async function productList(
  selector,
  category,
  orderAscDesc = "asc",
  idBtn = "sort-by-name"
) {
  let el = document.querySelector(selector);
  const products = await getData(category);

  /* List of products filter */
  const listImages = ["880RR", "985RF", "985PR", "344YJ"];
  const filteredProducts = products.filter((tent) =>
    listImages.includes(tent.Id)
  );
  const orderedList = orderList(filteredProducts, orderAscDesc, idBtn);
  /* renderList(products, el); */
  renderListWithTemplate(productCardTemplate, el, orderedList);
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

export function sortBy(option) {
  document.querySelector(".product-list").innerHTML = "";
  let button = document.querySelector(`#${option}`);
  if (button.classList.contains("asc")) {
    button.classList.remove("asc");
    button.classList.add("desc");
    productList(".product-list", "tents", "asc", option);
  } else {
    button.classList.remove("desc");
    button.classList.add("asc");
    productList(".product-list", "tents", "desc", option);
  }
}

function orderList(list, orderAscDesc, idBtn) {
  const order = orderAscDesc;
  const id = idBtn;
  const attribute = id == "sort-by-name" ? "Name" : "FinalPrice";
  if (id == "sort-by-name" && order == "asc") {
    return list.sort((a, b) => compare(a, b, attribute));
  } else if (id === "sort-by-name" && order === "desc") {
    return list.sort((a, b) => compare(b, a, attribute));
  } else if (id === "sort-by-price" && order === "asc") {
    return list.sort((a, b) => compare(a, b, attribute));
  } else if (id === "sort-by-price" && order === "desc") {
    return list.sort((a, b) => compare(b, a, attribute));
  }
}

function compare(a, b, attribute) {
  if (a[attribute] < b[attribute]) {
    return -1;
  }
  if (a[attribute] > b[attribute]) {
    return 1;
  }
  return 0;
}
