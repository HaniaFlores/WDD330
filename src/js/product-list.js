import productList, { sortBy } from "./productList.mjs";
import { getParam, loadHeaderFooter, capitalize } from "./utils.mjs";

loadHeaderFooter();
const category = getParam("category");
productList(".product-list", category);

//Capitalize the name of the category
document.querySelector(".title").innerHTML = capitalize(category);
// Change the title of the page
document.title = "Sleep Outside | " + capitalize(category);

//sort products by name or price
document
  .querySelector("#sort-by-name")
  .addEventListener("click", () => sortBy("sort-by-name", category));
document
  .querySelector("#sort-by-price")
  .addEventListener("click", () => sortBy("sort-by-price", category));
