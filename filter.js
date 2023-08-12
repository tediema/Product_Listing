import {
  generateItem,
  loadBtn,
  Obj,
} from "./app.js";

let filterBtns = document.querySelectorAll(".btn-category");
let categoryName = document.querySelector(".categoryName");

filterBtns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    let category = e.currentTarget.dataset.banana;
    let filteredProducts = Obj.filter((item) => item.category === category);
    console.log(filteredProducts);
    loadBtn.style.display = "none";
    categoryName.textContent = category.toUpperCase(); 
    generateItem(filteredProducts);
   
  });
});
