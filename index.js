import { menuArray } from "./data.js";

function getMenuListHtml() {
  let menuListHtml = "";

  menuArray.forEach((menuItem) => {
    menuListHtml +=`
    <div class="item">
      <div class="item-inner">
        <p class="item-emoji">${menuItem.emoji}</p>
        <div class="item-info">
          <p class="item-name">${menuItem.name}</p>
          <p class="item-ingredients">${menuItem.ingredients}</p>
          <p class="item-price">$${menuItem.price}</p>
        </div>
        <button class="add-btn">+</button>
      </div>
    </div>
    `
  })
  return menuListHtml;
}

function renderHtml() {
  const menuList = document.querySelector("#menu-list");
  menuList.innerHTML = getMenuListHtml();
}

renderHtml()