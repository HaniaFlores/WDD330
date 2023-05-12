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
  localStorage.setItem(
    key,
    JSON.stringify(
      getLocalStorage("so-cart")
        ? [...getLocalStorage("so-cart"), data]
        : [data]
    )
  );
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
export function animationIcon() {
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
}
