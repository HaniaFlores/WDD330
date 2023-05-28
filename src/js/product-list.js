import productList, {sortBy} from "./productList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const category = getParam("category");
productList(".product-list", category);

//sort products by name or price
document
  .querySelector("#sort-by-name")
  .addEventListener("click", () => sortBy("sort-by-name", category));
document
  .querySelector("#sort-by-price")
  .addEventListener("click", () => sortBy("sort-by-price"));
