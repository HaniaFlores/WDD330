import { findProductById } from "./productData.mjs";
import { setLocalStorage, animationIcon, capitalize } from "./utils.mjs";
let product = {};
const discountRate = 0.1;

function addToCart() {
  setLocalStorage("so-cart", product);
  animationIcon();
}

function renderProductDetails() {
  document.getElementById("productName").innerText = product.Name;
  document.getElementById("productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
  document.getElementById("productImage").setAttribute("src", product.Images.PrimaryLarge);
  document
    .getElementById("productImage")
    .setAttribute("alt", product.NameWithoutBrand);
  document.getElementById("productFinalPrice").innerText = `$${product.FinalPrice}`;
  document.getElementById("productDiscountedPrice").innerText = `$${(product.FinalPrice - (product.FinalPrice * discountRate)).toFixed(2)}`;
  document.getElementById("product-card__discount").innerText = `${discountRate * 100}% OFF`;
  document.getElementById("productColorName").innerText =
    product.Colors[0].ColorName;
  document.getElementById("productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.getElementById("addToCart").setAttribute("data-id", product.Id);
}

export default async function productDetails(productId) {
  // product deatails
  product = await findProductById(productId);
  // Title
  document.title = "Sleep Outside | " + capitalize(product.Name);
  //GR--html-error-empty-cart-main
  renderProductDetails();
  document.getElementById("addToCart").addEventListener("click", addToCart);
}
