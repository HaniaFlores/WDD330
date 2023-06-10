import {renderListWithTemplate, getLocalStorage } from "./utils.mjs";

const discountRate = 0.1;

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
    calculateListTotal(cartItems, discountRate);
    document.querySelector(".hide").style.display = "flex";
  }

  deleteCartItems(cartItems);
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
      loading="lazy"
    />
  </a>
  <a href="/product_pages/index.html?product=${item.Id}">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <div class="price-div">
    <p class="original-price">$${item.ListPrice}</p>
    <p class="discounted-price">$${(item.ListPrice - (item.ListPrice * discountRate)).toFixed(2)}</p>
  </div>
  <span data-id="${item.Id}" class="cart-delete">x</span>
</li>`;

  return newItem;
}

// Total in cart
function calculateListTotal(list, discount) {
  let total = 0;
  // const order = getLocalStorage("so-cart");
  list.map((product) => (total += (product.FinalPrice * (1 - discount))));

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

