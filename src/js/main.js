/* import productList from "./productList.mjs"; */
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

//productList(".product-list", "tents");

/* document
  .querySelector("#sort-by-name")
  .addEventListener("click", () => sortBy("sort-by-name"));
document
  .querySelector("#sort-by-price")
  .addEventListener("click", () => sortBy("sort-by-price")); */

function newsletterSubscription(event) {
  event.preventDefault();

  const emailEl = document.getElementById("email-input");
  const email = emailEl.value;
  alert("Thank you for subscribing to our newsletter!\n" + email);
  emailEl.value = "";
  // Not sure about what to do with the email address. Decided to return it as a string.
  return email;
}

document.getElementById("newsletter-box").addEventListener("submit", newsletterSubscription);
