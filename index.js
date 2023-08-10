import { menuArray } from "./data.js";

let orderArray = [];

document.addEventListener("click", (e) => {
  if (e.target.id === "add-btn") {
    handleAddBtnClick(e.target.dataset.itemToAdd);
  } else if (e.target.id === "remove-btn") {
    handleRemoveBtnClick(e.target.dataset.itemToRemove);
  } else if (e.target.id === "decrement-btn") {
    decrementOrderQuantity(e.target.dataset.itemToDecrement);
  } else if (e.target.id === "increment-btn") {
    incrementOrderQuantity(e.target.dataset.itemToIncrement);
  } else if (e.target.id === "order-btn") {
    handleOrderBtnClick();
  } else if (e.target.classList.contains("emoji-btn")) {
    displayThankYouMessage();
  }
});

document.addEventListener("submit", (e) => {
  if (e.target.id === "payment-details-form") {
    handlePayBtnClick(e);
  }
});

function handleAddBtnClick(menuItemId) {
  const targetMenuObj = menuArray.find(
    (item) => item.id === Number(menuItemId)
  );
  const objWithQuantity = {
    ...targetMenuObj,
    quantity: 1,
  };
  const objAlreadyAdded = orderArray.some(
    (item) => item.id === objWithQuantity.id
  );

  if (!objAlreadyAdded) {
    orderArray.push(objWithQuantity);
  }
  renderHtml();
}

function handleRemoveBtnClick(orderItemId) {
  const targetOrderObj = orderArray.find(
    (item) => item.id === Number(orderItemId)
  );
  const indexToRemove = orderArray.indexOf(targetOrderObj);

  orderArray.splice(indexToRemove, 1);
  renderHtml();
}

function decrementOrderQuantity(orderItemId) {
  const targetOrderObj = orderArray.find(
    (item) => item.id === Number(orderItemId)
  );

  if (targetOrderObj.quantity > 1) {
    targetOrderObj.quantity--;
    renderHtml();
  }
}

function incrementOrderQuantity(orderItemId) {
  const targetOrderObj = orderArray.find(
    (item) => item.id === Number(orderItemId)
  );

  targetOrderObj.quantity++;
  renderHtml();
}

function handleOrderBtnClick() {
  document.querySelector("#payment-modal").classList.toggle("hidden");
}

function handlePayBtnClick(e) {
  e.preventDefault();
  const paymentDetailsForm = document.querySelector("#payment-details-form");
  const paymentFormData = new FormData(paymentDetailsForm);
  const name = paymentFormData.get("name");

  document.querySelector("#payment-modal").classList.toggle("hidden");

  document.querySelector("#order-inner").innerHTML = `
    <p class="confirmation-message">Thanks ${name}! Your order is on its way!</p>
    `;

  setTimeout(() => {
    document.querySelector("#feedback-modal").classList.remove("hidden");
  }, 2000);
}

function displayThankYouMessage() {
  document.querySelector("#feedback-modal-inner").innerHTML = `
    <p class="confirmation-message">Thank you for your feedback!</p>
    <div class="emoji-btn">❤️</div>
    `;
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
        <button class="ordering-circle" id="add-btn" data-item-to-add="${menuItem.id}">+</button>
      </div>
    </div>
    `;
  });
  return menuListHtml;
}

function getOrderHtml() {
  let orderListHtml = "";
  let orderItemHtml = "";
  let totalPrice = 0;

  orderArray.forEach((orderItem) => {
    let totalItemPrice = orderItem.quantity * orderItem.price;

    totalPrice += totalItemPrice;

    orderItemHtml += `
    <div class="order-item">
      <p class="item-name">${orderItem.name}</p>
      <div class="item-quantity">
      <span><button class="ordering-circle quantity-btn" id="decrement-btn" data-item-to-decrement="${orderItem.id}">-</button></span>
      <span class>${orderItem.quantity}</span>
      <span><button class="ordering-circle quantity-btn" id="increment-btn" data-item-to-increment="${orderItem.id}">+</button></span>
      </div>
      <button id="remove-btn" data-item-to-remove="${orderItem.id}">Remove</button>
      <p class="item-price">${totalItemPrice}€</p>
    </div>
  `;

    orderListHtml = `
  <div class="order">
    <div class="order-inner" id="order-inner">
      <p class="order-title">Your order</p>
      <div class="order-list">
        ${orderItemHtml}
      </div>
      <div class="order-total">
        <p class="order-title">Total price:</p>
        <p class="item-price">${totalPrice}€</p>
      </div>
      <button class="submit-btn" id="order-btn">Complete order</button>
    </div>
  </div>
`;
  });
  return orderListHtml;
}

function renderHtml() {
  const menuList = document.querySelector("#menu-list");
  menuList.innerHTML = getMenuListHtml();

  const orderDetail = document.querySelector("#order-list");
  orderDetail.innerHTML = getOrderHtml();
}

renderHtml();
