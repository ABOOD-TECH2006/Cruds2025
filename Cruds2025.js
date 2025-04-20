// ! The Start Setting The switch-button For Dark&Light>Mode

let darkmode = localStorage.getItem("darkmode");
const switch_Buttons = document.querySelector(".Dark-Light-Buttons");
const EnableDarkMode = () => {
  document.body.classList.add("darkMode");
  localStorage.setItem("darkmode", "active");
};
const DisableDarkMode = () => {
  document.body.classList.remove("darkMode");
  localStorage.setItem("darkmode", null);
};
if (darkmode === "active") EnableDarkMode();
switch_Buttons.addEventListener("click", () => {
  darkmode = localStorage.getItem("darkmode");
  darkmode !== "active" ? EnableDarkMode() : DisableDarkMode();
});
// ! The End Setting The switch-button For Dark&Light>Mode
// ! The Start Setting The Go Up Button
const btn_up = document.getElementById("btn_up");
const Up = () => {
  scroll({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
};
btn_up.addEventListener("click", Up);
// ! The End Setting The Go Up Button

const inputs = document.querySelectorAll("input");
const price_inputs = document.querySelectorAll(".price_container input");
const crud_form = document.querySelector(".form");
const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const category = document.getElementById("category");
const submit = document.getElementById("submit");
const Single_Delete_Button = document.getElementById("Single_delete");
const Single_Update_Button = document.getElementById("Single_update");
let mode = "Create";
let GlobalProduct;
// ! GetTotal Function
function GetTotal() {
  if (price.value != "") {
    //? + operation converts the string to number
    const result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "green";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "red";
  }
}

// ? this code below for counting the total once we add any value inside the price_inputs
price_inputs.forEach((price_input) => {
  price_input.addEventListener("keyup", () => {
    GetTotal();
  });
});

// ! Finction Clearing all the inputs
function ClearInputs() {
  inputs.forEach((input) => {
    input.value = "";
  });
  GetTotal();
}
// ! Creating Product
const localStorageKeyForCreatingNewProduct = "crud.product";
const dataProduct =
  JSON.parse(localStorage.getItem(localStorageKeyForCreatingNewProduct)) || [];
crud_form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML, //? we don't use value here because it's small not an input
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (mode === "Create") {
    if (newProduct.count > 1 && newProduct.count < 100) {
      for (let i = 0; i < newProduct.count; i++) {
        dataProduct.push(newProduct);
      }
    } else {
      dataProduct.push(newProduct);
    }
  } else {
    //? const x = [1,2,3]
    //? x[0] = 3 > so number one right now is 3
    dataProduct[GlobalProduct] = newProduct;
    submit.innerHTML = "Create";
    count.style.display = "block";
    mode = "Create";
  }

  localStorage.setItem(
    localStorageKeyForCreatingNewProduct,
    JSON.stringify(dataProduct)
  );
  ClearInputs();
  Showdata();
});

const Showdata = () => {
  let table = "";
  for (let product = 0; product < dataProduct.length; product++) {
    table += `  
              <tr>
                <td>${product + 1}</td>
                <td>${dataProduct[product].title}</td>
                <td>${dataProduct[product].price}$</td>
                <td>${dataProduct[product].taxes}$</td>
                <td>${dataProduct[product].ads}$</td>
                <td>${dataProduct[product].discount}$</td>
                <td>${dataProduct[product].total}$</td>
                <td>${dataProduct[product].category}</td>
                <th><button onclick="UpdateData(${product})" id="Single_update">update</button></th>
                <th><button id="Single_delete" onclick="singleDelete(${product})" >delete</button></th>
              </tr> 
     `;
  }

  document.getElementById("tbody").innerHTML = table;
  let ButtonForDeletingAllData = document.getElementById("DeleteAll");

  if (dataProduct.length > 0) {
    ButtonForDeletingAllData.innerHTML = ` <button id="DeleteAllButton" onclick="Delete_all()"> DeleteAll (${dataProduct.length})</button>`;
  } else {
    ButtonForDeletingAllData.innerHTML = "";
  }
};
function singleDelete(i) {
  // ? splice the first value is the begining of deleting and the second is the count
  dataProduct.splice(i, 1);
  localStorage.setItem(
    localStorageKeyForCreatingNewProduct,
    JSON.stringify(dataProduct)
  );
  Showdata();
}
const UpdateData = (i) => {
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  taxes.value = dataProduct[i].taxes;
  ads.value = dataProduct[i].ads;
  discount.value = dataProduct[i].discount;
  GetTotal();
  category.value = dataProduct[i].category;
  count.style.display = "none";
  submit.innerHTML = "Update";
  mode = "Update";
  GlobalProduct = i;
  Up();
};
function Delete_all() {
  localStorage.removeItem(localStorageKeyForCreatingNewProduct);
  dataProduct.splice(0);
  Showdata();
}
let SearchMode = "Title";
const getSearchMode = (id) => {
  let search = document.getElementById("search_input");
  if (id === "searchByTitle") {
    SearchMode = "Title";
  } else {
    SearchMode = "Category";
  }
  search.placeholder = "Search By " + SearchMode;
  search.focus();
  search.value = "";
};
const SearchData = (value) => {
  let table = "";
  for (var product = 0; product < dataProduct.length; product++) {
    if (SearchMode === "Title") {
      if (dataProduct[product].title.includes(value.toLowerCase())) {
        table += `  
              <tr>
                <td>${product + 1}</td>
                <td>${dataProduct[product].title}</td>
                <td>${dataProduct[product].price}$</td>
                <td>${dataProduct[product].taxes}$</td>
                <td>${dataProduct[product].ads}$</td>
                <td>${dataProduct[product].discount}$</td>
                <td>${dataProduct[product].total}$</td>
                <td>${dataProduct[product].category}</td>
                <th><button onclick="UpdateData(${product})" id="Single_update">update</button></th>
                <th><button id="Single_delete" onclick="singleDelete(${product})" >delete</button></th>
              </tr> 
     `;
      }
    } else {
      if (dataProduct[product].category.includes(value.toLowerCase())) {
        table += `  
              <tr>
                <td>${product + 1}</td>
                <td>${dataProduct[product].title}</td>
                <td>${dataProduct[product].price}$</td>
                <td>${dataProduct[product].taxes}$</td>
                <td>${dataProduct[product].ads}$</td>
                <td>${dataProduct[product].discount}$</td>
                <td>${dataProduct[product].total}$</td>
                <td>${dataProduct[product].category}</td>
                <th><button onclick="UpdateData(${product})" id="Single_update">update</button></th>
                <th><button id="Single_delete" onclick="singleDelete(${product})" >delete</button></th>
              </tr> 
     `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
};
Showdata();
