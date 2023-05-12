import productList from "./productList.mjs";
import { animationIcon } from "./utils.mjs";

// Add a superscript number of items in the cart to the backpack icon.
animationIcon();

productList(".product-list", "tents");
