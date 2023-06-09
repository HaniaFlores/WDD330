import { breadcrumbs, loadHeaderFooter } from "./utils.mjs";
import renderCartContents from "./shoppingCart.mjs";

/* Load the contents of the Header and the Footer */
loadHeaderFooter();
renderCartContents();

breadcrumbs("cart");
