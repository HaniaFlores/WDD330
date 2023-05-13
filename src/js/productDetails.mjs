import { findProductById } from "./productData.mjs";
import { setLocalStorage, animationIcon } from "./utils.mjs";
let product = {};

function addToCart() {
  setLocalStorage("so-cart", product);
  animationIcon();
}

function renderProductDetails() {
  document.getElementById("productName").innerText = product.Name;
  document.getElementById("productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
  document.getElementById("productImage").setAttribute("src", product.Image);
  document
    .getElementById("productImage")
    .setAttribute("alt", product.NameWithoutBrand);
  document.getElementById("productFinalPrice").innerText = product.FinalPrice;
  document.getElementById("productColorName").innerText =
    product.Colors[0].ColorName;
  document.getElementById("productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.getElementById("addToCart").setAttribute("data-id", product.Id);
}

export default async function productDetails(productId) {
  // product deatails
  product = await findProductById(productId);
  //GR--html-error-empty-cart-main
  renderProductDetails();
  document.getElementById("addToCart").addEventListener("click", addToCart);
}
