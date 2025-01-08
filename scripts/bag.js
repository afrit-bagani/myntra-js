let bagItemObjects;
onLoad();
function onLoad() {
  loadBagItemObjects();
  displayBagItems();
  calculateCart();
}

// finding data based on bagitems
function loadBagItemObjects() {
  bagItemObjects = bagItems.map((itemID) => {
    for (let i = 0; i < items.length; i++) {
      if (itemID == items[i].id) {
        return items[i];
      }
    }
  });
}

function displayBagItems() {
  let bagItemsContainerElement = document.querySelector(".bag-items-container");
  let innerHTML = ``;
  bagItemObjects.forEach((bagItem) => {
    innerHTML += generateItemHTML(bagItem);
  });
  bagItemsContainerElement.innerHTML = innerHTML;
}
function removeBagItem(itemID) {
  bagItems = bagItems.filter((bagItemID) => bagItemID != itemID);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  loadBagItemObjects();
  displayBagItems();
  displayBagIcon();
  calculateCart();
}

function calculateCart() {
  let bagSummaryElement = document.querySelector(".bag-summary");
  let totalItems = bagItems.length;
  let totalMRP = 0;
  let totalDiscount = 0;
  const CONVENIENCE_FEES = 99;
  console.log(bagItemObjects);
  bagItemObjects.forEach((bagItem) => {
    totalMRP += bagItem.original_price;
    totalDiscount += bagItem.original_price - bagItem.current_price;
  });

  let finalAmount = totalMRP - totalDiscount + CONVENIENCE_FEES;

  bagSummaryElement.innerHTML = `
  <div class="bag-details-container">
    <div class="price-header">PRICE DETAILS (${totalItems} Items)</div>
    <div class="price-item">
      <span class="price-item-tag">Total MRP</span>
      <span class="price-item-value">₹ ${totalMRP}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Discount on MRP</span>
      <span class="price-item-value priceDetail-base-discount"
        >- ₹ ${totalDiscount}</span
      >
    </div>
    <div class="price-item">
      <span class="price-item-tag">Convenience Fee</span>
      <span class="price-item-value">₹ ${CONVENIENCE_FEES}</span>
    </div>
    <hr />
    <div class="price-footer">
      <span class="price-item-tag">Total Amount</span>
      <span class="price-item-value">₹ ${finalAmount}</span>
    </div>
  </div>
  <button class="btn-place-order" onclick="alert('Order has been placed.')">
    <div class="css-xjhrni">PLACE ORDER</div>
  </button>
  `;
}

function generateItemHTML(item) {
  return `
  <div class="bag-item-container">
    <div class="item-left-part">
      <img class="bag-item-img" src="../${item.image}" />
    </div>
    <div class="item-right-part">
      <div class="company">${item.company}</div> 
      <div class="item-name">
      ${item.item_name}
      </div>
      <div class="price-container">
        <span class="current-price">₹  ${item.current_price}</span>
        <span class="original-price">₹ ${item.original_price}</span>
        <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
      </div>
      <div class="return-period">
        <span class="return-period-days">${item.return_period} days</span> return available
      </div>
      <div class="delivery-details">
        Delivery by
        <span class="delivery-details-days">${item.delivery_date}</span>
      </div>
    </div>

    <div class="remove-from-cart" onclick="removeBagItem(${item.id})">X</div>
  </div>`;
}
