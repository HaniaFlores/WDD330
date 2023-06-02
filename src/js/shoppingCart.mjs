import {renderListWithTemplate, getLocalStorage } from "./utils.mjs";

export default function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  //renderListWithTemplate will run if "so-cart" exist in localStorage
  if (
  localStorage.getItem("so-cart") !== null &&
  Object.keys(cartItems).length > 0
  ) {
    const el = document.querySelector(".product-list");
    renderListWithTemplate(cartItemTemplate, el, cartItems);
    
  //The total element will only appear when the cart is not empty.
    calculateListTotal(cartItems);
    document.querySelector(".hide").style.display = "block";
  }

  deleteCartItems(cartItems);
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="/product_pages/index.html?product=${item.Id}">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span data-id="${item.Id}" class="cart-delete">x</span>
</li>`;

  return newItem;
}

// Total in cart
function calculateListTotal(list) {
  let total = 0;
  // const order = getLocalStorage("so-cart");
  list.map((product) => (total += product.FinalPrice));

  const totalElement = document.querySelector(".list-total");
  const totalParagraph = document.createElement("p");
  totalParagraph.style.display = "inline";
  totalParagraph.style.fontWeight = "lighter";
  totalParagraph.innerHTML = `$${total.toFixed(2)}`;
  totalElement.appendChild(totalParagraph);
}

function deleteCartItems(list) {
  const cartElements = document.getElementsByClassName("cart-delete");

  for (let i = 0; i < cartElements.length; i++) {
    cartElements[i].addEventListener("click", function (e) {
      const dataId = e.target.getAttribute("data-id");
      /* const items = getLocalStorage("so-cart"); */
      const itemsFiltered = list.filter(
        (item, index) => index !== i || dataId !== item.Id
      );
      localStorage.setItem("so-cart", JSON.stringify(itemsFiltered));
      window.location.reload();
    });
  }
}

