import { findProductById, getProductsByCategory } from "./externalServices.mjs";
import productList from "./productList.mjs";


// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  // localStorage.setItem(
  //   key,
  //   JSON.stringify(
  //     getLocalStorage("so-cart")
  //       ? [...getLocalStorage("so-cart"), data]
  //       : [data]
  //   )
  // );
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

// Animation of icon when an item or tent is added by Fernando
/* export function animationIcon() {
  let cartStorage = getLocalStorage("so-cart");
  if (!cartStorage) {
    cartStorage = 0;
  } else {
    cartStorage = cartStorage.length;
  }
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
} */

export function animationIcon() {
  let cartStorage = getNumberInCart();
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


export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}

export async function renderWithTemplate(
  templateFn,
  parentElement,
  data,
  callback,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = await templateFn(data);
  parentElement.insertAdjacentHTML(position, htmlString);
  if (callback) {
    callback();
  }
}

function loadTemplate(path) {
  // wait what?  we are returning a new function? this is called currying and can be very helpful.
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      return html;
    }
  };
}

export function capitalize(str) {
  let capitalizedString = str;
  if (str.includes("-")) {
    capitalizedString = str.replace(/-/g, " ");
  }

  capitalizedString = capitalizedString.replace(/(?:^|\s)\S/g, function (char) {
    return char.toUpperCase();
  });

  return capitalizedString;
}

export async function loadHeaderFooter() {
  // header template will still be a function! But one where we have pre-supplied the argument.
  // headerTemplate and footerTemplate will be almost identical, but they will remember the path we passed in when we created them
  // why is it important that they stay functions?  The renderWithTemplate function is expecting a template function...if we sent it a string it would break, if we changed it to expect a string then it would become less flexible.
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");
  const headerEl = document.querySelector("#main-header");
  const footerEl = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplateFn, headerEl, null, animationIcon); // Add a superscript number of items in the cart to the backpack icon.
  renderWithTemplate(footerTemplateFn, footerEl);
}

export function alertMessage(message, scroll = true) {
  // create element to hold our alert
  const alert = document.createElement("div");
  // add a class to style the alert
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;
  // set the contents. You should have a message and an X or something the user can click on to remove

  // add a listener to the alert to see if they clicked on the X
  // if they did then remove the child
  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      // how can we tell if they clicked on our X or on something else?  hint: check out e.target.tagName or e.target.innerText
      main.removeChild(this);
    }
  });
  // add the alert to the top of main
  const main = document.querySelector("main");
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}

export function breadcrumbs(page) {
  const breadcrumbList = document.getElementById("breadcrumb__list");
  switch (page) {
    case "product_page": {
      const productId = getParam("product");
      findProductById(productId).then((data) => {
        const breadcrumbItem = `<li class="breadcrumb__item"><a href="../product-list/index.html?category=${
          data.Category
        }">${data.Category.toUpperCase()}</a></li><li class="breadcrumb__item"><a href="../product_pages/index.html?product=${
          data.Id
        }">Product - ${data.Id}</a></li>`;
        breadcrumbList.insertAdjacentHTML("beforeend", breadcrumbItem);
      });
      break;
    }
    case "cart": {
      const cartStorage = getNumberInCart();
      const breadcrumbItem = `<li class="breadcrumb__item"><a href="../cart/index.html">CART (${cartStorage ?? 0})</a></li>`;
      breadcrumbList.insertAdjacentHTML("beforeend", breadcrumbItem);
      break;
    }
    case "product_list": {
      const category = getParam("category");
      productList(".product-list", category);
      getProductsByCategory(category).then((data) => {
        const length = data.length;
        const breadcrumbItem = `<li class="breadcrumb__item"><a href="../product-list/index.html?category=${category}">${category.toUpperCase()} (${length})</a></li>`;
        breadcrumbList.insertAdjacentHTML("beforeend", breadcrumbItem);
      });
      break;
    }
    default:
      break;
  }
}

// Returns the number of items in localstorage (duplicate items included)
function getNumberInCart() {
  let cartStorage = getLocalStorage("so-cart");
  if (!cartStorage) {
    cartStorage = 0;
  } else {
    cartStorage = cartStorage.reduce((total, item) => total + item.Quantity, 0);
  }
  return cartStorage;
}