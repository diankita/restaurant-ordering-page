import { menuArray } from "./data.js";

let orderArray = [];

document.addEventListener("click", (e) => {
  if (e.target.dataset.addBtn) {
    handleAddBtnClick(e.target.dataset.addBtn);
  }
});

function handleAddBtnClick(itemId) {
  const targetItemObj = menuArray.find((item) => item.id === Number(itemId));
  orderArray.push(targetItemObj);

  renderHtml();
}

function getMenuListHtml() {
  let menuListHtml = "";

  menuArray.forEach((menuItem) => {
    menuListHtml += `
    <div class="item">
      <div class="item-inner">
        <p class="item-emoji">${menuItem.emoji}</p>
        <div class="item-info">
          <p class="item-name">${menuItem.name}</p>
          <p class="item-ingredients">${menuItem.ingredients}</p>
          <p class="item-price">${menuItem.price}€</p>
        </div>
        <button class="add-btn" data-add-btn="${menuItem.id}">+</button>
      </div>
    </div>
    `;
  });
  return menuListHtml;
}

function getOrderHtml() {
  let orderHtml = "";
  let orderList = "";
  let totalPrice = 0;

  orderArray.forEach((orderItem) => {
    totalPrice += orderItem.price;

    orderList += `
    <div class="order-item">
      <p class="item-name">${orderItem.name}</p>
      <button class="remove-btn">Remove</button>
      <p class="item-price">${orderItem.price}€</p>
    </div>
  `;

    orderHtml = `
  <div class="order">
    <div class="order-inner">
      <p class="order-title">Your order</p>
      <div class="order-list">
        ${orderList}
      </div>
      <div class="order-total">
        <p class="order-title">Total price:</p>
        <p class="item-price">${totalPrice}€</p>
      </div>
      <button class="order-btn">Complete order</button>
    </div>
  </div>
`;
  });
  return orderHtml;
}

function renderHtml() {
  const menuList = document.querySelector("#menu-list");
  menuList.innerHTML = getMenuListHtml();

  const orderDetail = document.querySelector("#order-detail");
  orderDetail.innerHTML = getOrderHtml();
}

renderHtml();
