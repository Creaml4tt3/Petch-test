//?CONFIG
const searchProperties = ["firstname", "lastname", "email"]; //? ส่วนของ key object ที่ต้องการให้ค้นหาได้
const filterStatus = true; //? เปิดปิด filter
const filterName = "deleted_at"; //? ตั้งค่า keys ของ object ที่ต้องการจะ filter
const statusData = 0; //? ตั้งค่า value ที่ต้องกา่ร filter
let currentPage = 1; //? หน้าที่แสดง
let itemsPerPage = 3; //? จำนวน items ที่ต้องการแสดงต่อหนึ่งหน้า
let searchLength = 3; //? จำนวนตัวอักษรที่จะเริ่มการค้นหา

const dataBefore = [
  {
    id: 1,
    firstname: "firstname",
    lastname: "lastname",
    email: "test@mail.com",
    email_verified_at: null,
    level: 1,
    created_at: "2022-11-28T02:55:07.000000Z",
    updated_at: "2022-11-28T02:55:07.000000Z",
    deleted_at: 0,
  },
  {
    id: 2,
    firstname: "admin",
    lastname: "yes02",
    email: "admin02@mail.com",
    email_verified_at: null,
    level: 2,
    created_at: null,
    updated_at: null,
    deleted_at: 0,
  },
  {
    id: 3,
    firstname: "admin",
    lastname: "yes03",
    email: "admin03@mail.com",
    email_verified_at: null,
    level: 3,
    created_at: null,
    updated_at: null,
    deleted_at: 0,
  },
  {
    id: 4,
    firstname: "admin",
    lastname: "yes04",
    email: "admin04@mail.com",
    email_verified_at: null,
    level: 3,
    created_at: null,
    updated_at: null,
    deleted_at: 1,
  },
  {
    id: 5,
    firstname: "admin",
    lastname: "yes04",
    email: "admin04@mail.com",
    email_verified_at: null,
    level: 3,
    created_at: null,
    updated_at: null,
    deleted_at: 0,
  },
  {
    id: 6,
    firstname: "admin",
    lastname: "yes04",
    email: "admin04@mail.com",
    email_verified_at: null,
    level: 3,
    created_at: null,
    updated_at: null,
    deleted_at: 0,
  },
];

//? Variables
let data = [];
let searchedData = [];
let currentStage = true;

//? Function to display data for the current page
function displayData(object) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageData = object.slice(startIndex, endIndex);

  const displayContainer = document.getElementById("listing-grid");

  let display = pageData
    .map((item) => {
      return `<section class="listing-items">
      <div class="listing-id">id : ${item.id}</div>
      <div class="listing-name">name : ${item.firstname}</div>
      <div class="listing-lastname">lastname : ${item.lastname}</div>
      <div class="listing-email">email : ${item.email}</div>
      <div class="listing-email-vertified-at">email verified at : ${item.email_verified_at}</div>
      <div class="listing-level">level : ${item.level}</div>
      <div class="listing-create-at">create at : ${item.created_at}</div>
      <div class="listing-uploaded-at">uploaded at : ${item.updated_at}</div>
    </section>`;
    })
    .join("");
  displayContainer.innerHTML = display;
  setCount(object);
}

//? Filter Data
if (filterStatus) {
  data = dataBefore.filter((item) => eval(`item.${filterName}`) === statusData);
} else {
  data = dataBefore;
}

//? Function Search
function search(text) {
  if (text.length >= searchLength) {
    searchedData = data.filter((item) => {
      for (let i = 0; i < searchProperties.length; i++) {
        const thisProperty = searchProperties[i];
        let forSearch = `item.${thisProperty}`;
        if (eval(forSearch).includes(text)) {
          return item;
        }
      }
    });
    displayAll(searchedData);
    currentStage = false;
  } else {
    displayAll(data);
    currentStage = true;
  }
}

//? Function to Display Data with Pagination and selected object
function displayAll(object) {
  displayData(object);
  deletePagination();
  createPagination(object);
}

//? Function to set count items
function setCount(object) {
  const currentCount = document.getElementById("current-count");
  const totalcount = document.getElementById("total-count");

  let totalItems = object.length;
  let countStart = (currentPage - 1) * itemsPerPage + 1;
  let countEnd = countStart + itemsPerPage - 1;
  if (totalItems < 1) {
    totalItems = 0;
    countStart = 0;
    countEnd = 0;
  } else if (countEnd > totalItems) {
    countEnd = totalItems;
  }

  if (countStart === countEnd) {
    totalcount.innerText = `${totalItems}`;
    currentCount.innerText = `${countEnd}`;
  } else {
    currentCount.innerText = `${countStart} - ${countEnd}`;
    totalcount.innerText = `${totalItems}`;
  }
}

//? Function to add event to all inputs
function setInput() {
  const input = document.getElementById("input-data");
  const searchInput = document.getElementById("input-search");
  const searchReset = document.getElementById("search-reset");
  input.value = itemsPerPage;
  input.addEventListener("change", handleChange);
  searchInput.addEventListener("input", handleSearch);
  searchReset.addEventListener("click", () => {
    searchInput.value = null;
    displayAll(data);
  });
}

//? Function to get and change value on input
function handleChange(e) {
  let thisValue = Number(e.target.value);
  if (thisValue > 0) {
    itemsPerPage = thisValue;
    let totalpages = Math.ceil(data.length / itemsPerPage);
    if (thisValue > data.length) {
      itemsPerPage--;
      e.target.value--;
    }
    if (currentPage > totalpages) {
      currentPage--;
    }
  } else {
    e.target.value = 1;
    itemsPerPage = 1;
  }
  if (currentStage) {
    displayAll(data);
  } else {
    displayAll(searchedData);
  }
}

//? Function to handle search input
function handleSearch(e) {
  search(e.target.value);
}

//? Function to create Pagination Button
function createPagination(object) {
  const paginationContainer = document.getElementById("pagination-container");
  const pages = Math.ceil(object.length / itemsPerPage);
  for (let i = 1; i < pages + 1; i++) {
    let button = document.createElement("button");
    button.classList.add("pagination-button");
    button.innerHTML = `${i}`;
    button.dataset.page = i;
    button.addEventListener("click", (e) => {
      const targetPage = Number(e.target.dataset.page);
      if (targetPage) {
        currentPage = targetPage;
        displayData(object);
        setActivePagination(e.target);
      }
    });
    setActivePagination(
      document.querySelectorAll(".pagination-button")[currentPage - 1]
    );
    paginationContainer.append(button);
  }
}

//? Function to destroy or delete all pagination button
function deletePagination() {
  const paginationButtons = document.querySelectorAll(".pagination-button");
  if (paginationButtons) {
    paginationButtons.forEach((button) => {
      button.remove();
    });
  }
}

//? Function to set current Pagination button
function setActivePagination(target) {
  const paginationButtons = document.querySelectorAll(".pagination-button");
  if (paginationButtons) {
    paginationButtons.forEach((button) => {
      if (button === target) {
        return button.classList.add("page-active");
      } else {
        button.classList.remove("page-active");
      }
    });
  }
}

//? On page load
document.addEventListener("DOMContentLoaded", () => {
  displayData(data);
  createPagination(data);
  setInput();
});
