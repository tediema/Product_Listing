let container = document.getElementById("container");
export let loadBtn = document.getElementById("load-more");
let itemsToShow = 10;
let productCount = document.getElementById("product-count");
const Data = "./Data.json";
let addedProducts = JSON.parse(localStorage.getItem("addedProducts")) || [];
let cartData = document.querySelector(".cartData");
let filterIcon = document.querySelector(".bi-filter-square");
let filterSection = document.querySelector(".filter-selection");
let filterByDropdown = document.querySelector(".filterMethod");
let sortOrderDropdown = document.querySelector(".sort-order");
let Obj;
let generateItem;
let SortAll;
export { filterByDropdown, sortOrderDropdown, Obj, generateItem, SortAll };


async function Get(category = null) {
  const response = await fetch(Data);
  Obj = await response.json();
  let filteredData;
  if (category) {
    filteredData = Obj.filter((item) => item.category === category);
  } else {
    filteredData = Obj;
  }

  generateItem = (filteredData) => {
    let showItems = filteredData.slice(0, itemsToShow); //max elements to show
    container.innerHTML = showItems
      .map((x) => {
        let {
          id,
          name,
          price,
          description,
          image,
          color,
          discountedPrice,
          rating,
          category,
        } = x;

        function discount(discountedPrice) {
          if (discountedPrice === null) {
            return `<h2>${price}лв. </h2>`;
          } else {
            return `<h2 style="color : red; margin-right: 10px">${discountedPrice}лв. </h2>
                <h3 style="text-decoration: line-through; align-items: center; opacity:0.5 ">${price}лв. </h3>`;
          }
        }
        let isDiscounted = discount(discountedPrice);

        function generateStars(rating) {
          // Generate rating stars
          let starsHtml = "";
          for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
              starsHtml += '<span class="bi bi-star-fill checked"></span>';
            } else {
              starsHtml += '<span class="bi bi-star"></span>';
            }
          }
          return starsHtml;
        }

        let starsHtml = generateStars(rating);

        return `
        
    <div id="${category}" class="item" id="fade-in">
        <img src=${image} class="image">
        <div class="info">
            <h3>${name}</h3>
            <p>${description}</p>
            <h4>Color-${color}</h4>
            <div class="price-quantity">
                ${isDiscounted}
            </div>
            <div class="rating">
                    <div class="stars">
                    ${starsHtml}
                    </div>
                    <h4>${rating}</h4>
            </div>
            <button data-id="${id}"class="addBtn">Add to Cart</button>
            
        </div>
    </div>`;
      })
      .join(""); //turn into string

    let addButtons = document.querySelectorAll(".addBtn");
    addButtons.forEach((button) => {
      button.addEventListener("click", function () {
        let productId = button.dataset.id;
        addedProducts.push(productId);
        console.log(addedProducts);
        calculateAll();
        alert("Product added to cart");
        localStorage.setItem("addedProducts", JSON.stringify(addedProducts));
      });
    });

    loadBtn.addEventListener("click", function () {
      itemsToShow += 10;
      if (itemsToShow >= Obj.length) {
        loadBtn.style.display = "none";
      }
      productCount.innerHTML = `${Math.min(itemsToShow, Obj.length)} of ${
        Obj.length
      }`;
      generateItem(filteredData);
    });

    let calculateAll = () => {
      let totalItems = addedProducts.length;
      cartData.innerHTML = totalItems;
    };
    calculateAll();
  };
  generateItem(filteredData);

  let originalText;

  cartData.addEventListener("mouseover", function () {
    originalText = cartData.textContent; 
    cartData.textContent = "X";
  });
  cartData.addEventListener("mouseout", function () {
    cartData.textContent = addedProducts.length; 
  });
  cartData.addEventListener("click", function () {
    addedProducts.splice(0, addedProducts.length);
    console.log(addedProducts);
    localStorage.removeItem("addedProducts");
    cartData.textContent = addedProducts.length;
  });
  filterIcon.addEventListener("click", function () {
    if (filterSection.style.display === "none") {
      filterSection.style.display = "block";
    } else {
      filterSection.style.display = "none";
    }
  });

  filterByDropdown.addEventListener("change", function () {
    let sortByValue = filterByDropdown.value; //rating or color
    console.log(sortByValue);
    let sortOrderValue = sortOrderDropdown.value;
    console.log(sortOrderValue);
    switch (sortOrderValue) {
      case "desc":
        descendingSort(sortByValue);
        break;
      case "asc":
        ascending(sortByValue);
        break;
      case "a-z":
        A_Z(sortByValue);
        break;
      case "z-a":
        Z_A(sortByValue);
        break;
    }
    generateItem(filteredData);
  });

  function descendingSort(sortByValue) {
    filteredData.sort((a, b) => b[sortByValue] - a[sortByValue]);
  }

  function ascending(sortByValue) {
    filteredData.sort((a, b) => a[sortByValue] - b[sortByValue]);
  }

  function A_Z(sortByValue) {
    filteredData.sort((a, b) => {
      return a[sortByValue].localeCompare(b[sortByValue]);
    });
  }
  function Z_A(sortByValue) {
    filteredData.sort((a, b) => {
      return b[sortByValue].localeCompare(a[sortByValue]);
    });
  }
  sortOrderDropdown.addEventListener("change", () => {
    const event = new Event("change");
    const sortByValue = filterByDropdown.value;

    if (sortByValue) {
      filterByDropdown.dispatchEvent(event);
    }
  });
}

Get();
