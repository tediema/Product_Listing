# Product_Listing
# Summary of Implementation

In the provided code, a product display system is implemented that fetches product data from a JSON file, dynamically generates product items, and allows for interaction such as choosing categories, sorting and filtering.
Technologies Used:
    JavaScript (ES6+),
    HTML & CSS

## Features and Implementation:
    Fetching Data: Using the fetch() API, the product data is fetched asynchronously from a local JSON file. This data is stored in the global variable Obj.
    Dynamic Generation: A generateItem function is employed to map through the product list and dynamically generate individual products which are displayed into the webpage.
    Sorting and Filtering: Dropdowns are used to allow the user to select their preferred sort or filter method. Event listeners are attached to these dropdowns, which trigger sorting or filtering functions on change.
    Add to Cart Functionality: Users can add products to a local cart, which is stored in localStorage.
    Interactive Cart Display: An interactive cart display shows the number of products added and allows for clearing the cart.
    Category Selection: Users can filter products by category, offering a more specialized and targeted approach to viewing products.

## Challenges:
    Filtering Logic: One of the challenges was to ensure the filtering logic works well. The dropdown to filter by categories (filterByDropdown) was a focus point, ensuring that the sort and filter logic played well together.
    LocalStorage Management: Properly handling the add-to-cart functionality, and making sure that localStorage was consistently updated was another challenge.
    Sorting: The sorting functionality was challenging to implement due to the need to sort an array of objects while simultaneously synchronizing with the filtering method.

## Note:
First you have to sort all the products according to desired requirements and then when selecting by category they will be already sorted
