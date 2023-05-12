import  productList  from "./productList.mjs"

// product-card
let listSelector = document.querySelector(".product-list");
console.log("listSelector",listSelector);


let products = productList(listSelector, "tents")
console.log("products",products);
