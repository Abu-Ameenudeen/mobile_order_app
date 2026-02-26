import { menuArray } from './data.js'

// =============================
// DOM Elements
// =============================

const menuItemsEl = document.getElementById('menu-items-area')
const checkoutEl = document.getElementById('checkout-area')

// =============================
// App State
// =============================

let cart = []

// =============================
// Render Menu
// =============================

function renderMenu() {
    const menuHtml = menuArray.map( (menu) => {
         return `
         <div class="img-text-btn"> 
            <div class="img-n-text"> 
                <img src="./images/${menu.img}" class="item-img" alt="${menu.name} image"> 
                <div class="menu-discrptn"> 
                    <h2>${menu.name}</h2> 
                    <p class="ingredients">${menu.ingredients}</p> 
                    <h3>$${menu.price}</h3> 
                </div> 
            </div> 
            <button class="add-btn" data-id="${menu.id}">+</button> 
        </div> 
        ` 
    }
    ).join('') 
    
    menuItemsEl.innerHTML = menuHtml  
}

// =============================
// Add To Cart
// =============================

function addToCart(id) {
    const selectedItem = menuArray.find( (item) => {
        return item.id === Number(id)
    })
    cart.push(selectedItem)
    renderCart()
}

// =============================
// Render Cart
// =============================

function renderCart() {

    if (cart.length === 0) {
        checkoutEl.innerHTML = ''
        return
    }
    
    const totalPrice = cart.reduce( (totalAmt, item) => {
        return totalAmt + item.price
    }, 0)

    const cartHtml = `
    <h2 class="section-title">Your Order</h2>

    <div class="order-items">
        ${cart.map(item => `
            <div class="order-row">
                <span>${item.name}</span>
                <span>$${item.price}</span>
            </div>
        `).join('')}
    </div>

    <div class="order-total-row">
        <span>Total price:</span>
        <span>$${totalPrice}</span>
    </div>

    <button class="place-order-btn">
        Complete order
    </button>
    `
    checkoutEl.innerHTML = cartHtml
}

// =============================
// Event Delegation
// =============================

document.addEventListener('click', function(event) {
    if (event.target.dataset.id) {
        addToCart(event.target.dataset.id)
    }
})

// =============================
// Initialize App
// =============================

renderMenu()