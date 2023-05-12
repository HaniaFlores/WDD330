import { getParam, animationIcon } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

// Add a superscript number of items in the cart to the backpack icon.
animationIcon();

const productId = getParam("product");
productDetails(productId);
