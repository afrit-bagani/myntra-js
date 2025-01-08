let bagItems;
onLoad();

/* 
  at insdustry level there is a function called onLoad. Which is used to insitilised something when page is load 
*/

function onLoad() {
  let bagItemsStr = localStorage.getItem("bagItems");
  bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
  displayItemOnHomepage();
  displayBagIcon();
}

function displayItemOnHomepage() {
  let itemsContainerdElement = document.querySelector(".items-container");
  if (!itemsContainerdElement) {
    // ignoring element if it not found and throwing error
    return;
  }
  let innerHTML = ``;
  // running loop on database(items) and adding them in variable innerHTML and assign it to the main container (sContainerdElement)
  items.forEach((item) => {
    innerHTML += `
   <div class="item-container">
      <img class="item-image" src="${item.image}" alt="item image" />
      <div class="rating">${item.rating.stars} 🌟 | ${item.rating.count}</div>
      <div class="company-name">${item.company}</div>
      <div class="item-name">${item.item_name}</div>
      <div class="price">
         <span class="current-price">₹ ${item.current_price}</span>
         <span class="original-price">₹ ${item.original_price}</span>
         <span class="discount">${item.discount_percentage} % OFF</span>
      </div>
      <button class="btn-add-to-bag" onclick="addToBag(${item.id})">Add to Bag</button>
   </div>`;
  });

  itemsContainerdElement.innerHTML = innerHTML;
}

function addToBag(itemID) {
  bagItems.push(itemID);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  displayBagIcon();
}

function displayBagIcon() {
  let bagItemCount = document.querySelector(".bag-item-count");
  if (bagItems.length == 0) {
    bagItemCount.style.visibility = `hidden`;
  } else {
    bagItemCount.style.visibility = `visible`;
    bagItemCount.textContent = bagItems.length;
  }
}
