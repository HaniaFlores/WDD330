import productList, { sortBy } from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

productList(".product-list", "tents");

document
  .querySelector("#sort-by-name")
  .addEventListener("click", () => sortBy("sort-by-name"));
document
  .querySelector("#sort-by-price")
  .addEventListener("click", () => sortBy("sort-by-price"));
