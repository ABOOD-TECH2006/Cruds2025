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
const closeConfirmation = document.getElementById("closeConfirmation");
const confirmation = document.getElementById("confirmation");
const YesAndNo = document.querySelectorAll(".confirmation button");
const Yes = document.getElementById("Yes");
console.log(YesAndNo);

let tbody = document.getElementById("tbody");
let GlobalProduct;
let mode = "Create";
// ! The start Of Operations Room
const GetTotal = () => {
  if (price.value !== "") {
    const result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "green";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "red";
  }
};
price_inputs.forEach((input) => {
  input.addEventListener("keyup", () => {
    GetTotal();
  });
});
const ClearInputs = () => {
  inputs.forEach((input) => {
    input.value = "";
  });
};
const localStorageKeyForCreatingNewProduct = "cruds.product";
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
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (mode === "Create") {
    if (newProduct.count !== "" && newProduct.count > 1) {
      for (let i = 0; i < newProduct.count; i++) {
        dataProduct.push(newProduct);
      }
    } else {
      dataProduct.push(newProduct);
    }
  } else {
    dataProduct[GlobalProduct] = newProduct;
    submit.innerHTML = "Create";
    mode = "Create";
    count.style.display = "";
  }
  localStorage.setItem(
    localStorageKeyForCreatingNewProduct,
    JSON.stringify(dataProduct)
  );
  ClearInputs();
  GetTotal();
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
                    <th><button id="Single_delete" onclick="Single_delete(${product})" >delete</button></th>
              </tr> `;
  }
  tbody.innerHTML = table;
  const ButtonForDeletingAllData = document.getElementById("DeleteAll");
  if (dataProduct.length > 1) {
    ButtonForDeletingAllData.innerHTML = ` <button id="DeleteAllButton" onclick="Delete_all()"> DeleteAll (${dataProduct.length})</button>`;
  } else {
    ButtonForDeletingAllData.innerHTML = "";
  }
};
const Single_delete = (CurrentProduct) => {
  dataProduct.splice(CurrentProduct, 1);
  localStorage.setItem(
    localStorageKeyForCreatingNewProduct,
    JSON.stringify(dataProduct)
  );
  Showdata();
};
const UpdateData = (CurrentProduct) => {
  title.value = dataProduct[CurrentProduct].title;
  price.value = dataProduct[CurrentProduct].price;
  taxes.value = dataProduct[CurrentProduct].taxes;
  ads.value = dataProduct[CurrentProduct].ads;
  discount.value = dataProduct[CurrentProduct].discount;
  GetTotal();
  category.value = dataProduct[CurrentProduct].category;
  submit.innerHTML = "Update";
  mode = "Update";
  GlobalProduct = CurrentProduct;
  count.style.display = "none";
  Up();
  Showdata();
};
const Delete_all = () => {
  confirmation.classList.add("show");
  closeConfirmation.addEventListener("click", () => {
    confirmation.classList.remove("show");
  });
  YesAndNo.forEach((one) => {
    one.addEventListener("click", () => {
      confirmation.classList.remove("show");
    });
  });
  Yes.addEventListener("click", () => {
    localStorage.clear();
    dataProduct.splice(0);
    Showdata();
  });
  Showdata();
};
let SearchMode = "Title";
const getSearchMode = (id) => {
  const search = document.getElementById("search_input");
  if (id === "searchByTitle") {
    SearchMode = "Title";
  } else {
    SearchMode = "Category";
  }
  search.placeholder = "Search By " + SearchMode;
  search.focus();
};
const SearchData = (value) => {
  let table = "";
  for (let product = 0; product < dataProduct.length; product++) {
    if (SearchMode === "Title") {
      if (dataProduct[product].title.includes(value.toLowerCase())) {
        table += `<tr>
                    <td>${product + 1}</td>
                    <td>${dataProduct[product].title}</td>
                    <td>${dataProduct[product].price}$</td>
                    <td>${dataProduct[product].taxes}$</td>
                    <td>${dataProduct[product].ads}$</td>
                    <td>${dataProduct[product].discount}$</td>
                    <td>${dataProduct[product].total}$</td>
                    <td>${dataProduct[product].category}</td>
                    <th><button onclick="UpdateData(${product})" id="Single_update">update</button></th>
                    <th><button id="Single_delete" onclick="Single_delete(${product})" >delete</button></th>
                  </tr> `;
      }
    } else {
      if (dataProduct[product].category.includes(value.toLowerCase())) {
        table += `<tr>
                    <td>${product + 1}</td>
                    <td>${dataProduct[product].title}</td>
                    <td>${dataProduct[product].price}$</td>
                    <td>${dataProduct[product].taxes}$</td>
                    <td>${dataProduct[product].ads}$</td>
                    <td>${dataProduct[product].discount}$</td>
                    <td>${dataProduct[product].total}$</td>
                    <td>${dataProduct[product].category}</td>
                    <th><button onclick="UpdateData(${product})" id="Single_update">update</button></th>
                    <th><button id="Single_delete" onclick="Single_delete(${product})" >delete</button></th>
              </tr> `;
      }
    }
  }

  tbody.innerHTML = table;
};
Showdata();
// ! The start Of Operations Room
