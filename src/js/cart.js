import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

/* Load the contents of the Header and the Footer */
loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  //The total element will only appear when the cart is not empty.
  if (cartItems !== "") {
    calculateTotal();
    document.querySelector(".hide").style.display = "block";
  }
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
function calculateTotal() {
  let total = 0;
  const order = getLocalStorage("so-cart");
  order.map((product) => (total += product.FinalPrice));

  const totalElement = document.querySelector(".cart-total");
  const totalParagraph = document.createElement("p");
  totalParagraph.style.display = "inline";
  totalParagraph.style.fontWeight = "lighter";
  totalParagraph.innerHTML = `$${total}`;
  totalElement.appendChild(totalParagraph);
}

//renderCartContents will run if "so-cart" exist in localStorage
if (localStorage.getItem("so-cart") !== null) {
  renderCartContents();
}
