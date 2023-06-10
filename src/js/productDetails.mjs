import { findProductById } from "./externalServices.mjs";
import { setLocalStorage, animationIcon, capitalize, alertMessage, getLocalStorage } from "./utils.mjs";
let product = {};
const discountRate = 0.1;

// function addToCart() {
//   setLocalStorage("so-cart", product);
//   animationIcon();
// }
function addToCart() {
  let cartContents = getLocalStorage("so-cart");
  //check to see if there was anything there
  if (!cartContents) {
    cartContents = [];
  }
  // then add the current product to the list
  cartContents.push(product);
  setLocalStorage("so-cart", cartContents);
  animationIcon();
  alertMessage("Item added succesfully!");
}

function renderProductDetails() {
  document.getElementById("productName").innerText = product.Name;
  document.getElementById("productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
  const imgEl = document.getElementById("productImage");
  imgEl.setAttribute("src", product.Images.PrimaryLarge);
  imgEl.setAttribute("alt", product.NameWithoutBrand);
  imgEl.setAttribute("loading", "lazy");
  document.getElementById("productFinalPrice").innerText = `$${product.ListPrice}`;
  document.getElementById("productDiscountedPrice").innerText = `$${(product.ListPrice - (product.ListPrice * discountRate)).toFixed(2)}`;
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
