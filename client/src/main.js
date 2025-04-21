import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import customAxios from "./config/axios.config.js";

if (module.hot) {
  module.hot.accept();
}

customAxios
  .get("/user", {
    headers: {
      authorization: "ahj cadkcakscj cakjcdaj",
    },
  })
  .then((data) => console.log(data));


customAxios.defaults.headers.common["Authorization"] = "Bearer access token";
console.log("hello")
