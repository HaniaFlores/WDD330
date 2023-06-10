import { breadcrumbs, getParam, loadHeaderFooter } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

loadHeaderFooter();

const productId = getParam("product");
productDetails(productId);

breadcrumbs("product_page");
