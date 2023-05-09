import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";
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

// Animation of icon when an item or tent is added by Fernando
function animationIcon() {
  const cartStorage = getLocalStorage("so-cart").length;
  const cart = document.querySelector(".cart");
  if (!cart.querySelector(".cart__items")) {
    const cartItems = document.createElement("div");
    cartItems.classList.add("cart__items");
    cartItems.textContent = cartStorage;
    cart.append(cartItems);
  } else {
    const cartItems = cart.querySelector(".cart__items");
    cartItems.textContent = cartStorage;
  }
}
