import { getLocalStorage } from "./utils.mjs";
import { animationIcon } from "./utils.mjs";

// Add a superscript number of items in the cart to the backpack icon.
animationIcon();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // while (cartItems !== "") {
  //   calculateTotal(cartItems);
  // }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

// Total in cart
function calculateTotal(cartItems) {
  let total;
  cartItems.map((item) => total += item.FinalPrice)
  console.log(total);
}

renderCartContents();
