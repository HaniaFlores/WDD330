import { login } from "./auth.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

document.forms["login"].addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  // { email: "user1@email.com" , password: "user1" }
  login({ email: email, password: password });
  getParam("redirect");
});

/* Load the contents of the Header and the Footer */
loadHeaderFooter();
