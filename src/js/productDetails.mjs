import { findProductById } from "./externalServices.mjs";
import { setLocalStorage, animationIcon, capitalize, alertMessage, getLocalStorage } from "./utils.mjs";
let product = {};
const discountRate = 0.1;

/* function addToCart() {
  let cartContents = getLocalStorage("so-cart");
  product.Quantity = 1;
  //check to see if there was anything there
  if (!cartContents) {
    cartContents = [];
  }

  const duplicateProduct = cartContents.find(item => item.Id === product.Id);
  if (duplicateProduct) {
    product.Quantity += 1;
  } else {
    cartContents.push(product);
  }
  // then add the current product to the list
  // cartContents.push(product);
  console.log(product);
  setLocalStorage("so-cart", cartContents);
  animationIcon();
  alertMessage("Item added succesfully!");
} */

function addToCart() {
  let cartContents = getLocalStorage("so-cart");
  product.Quantity = 1;

  // Check to see if there was anything in the cart
  if (!cartContents) {
    cartContents = [];
  }

  const existingProductIndex = cartContents.findIndex(item => item.Id === product.Id);
  if (existingProductIndex !== -1) {
    // Product already exists in the cart
    cartContents[existingProductIndex].Quantity += 1;
  } else {
    // Product is new, add it to the cart
    cartContents.push(product);
  }

  setLocalStorage("so-cart", cartContents);
  animationIcon();
  alertMessage("Item added successfully!");
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
  document.getElementById("productDiscountedPrice").innerText = `$${product.FinalPrice.toFixed(2)}`;
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
  //update the FinalPrice of the product before passing it as an argument
  product.FinalPrice = parseFloat(product.FinalPrice * (1 - discountRate));
  console.log("product", product);
  // Title
  document.title = "Sleep Outside | " + capitalize(product.Name);
  //GR--html-error-empty-cart-main
  renderProductDetails();
  document.getElementById("addToCart").addEventListener("click", addToCart);
}
