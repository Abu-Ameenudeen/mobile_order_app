import { menuArray } from './data.js'

// =============================
// DOM Elements
// =============================

const menuItemsEl = document.getElementById('menu-items-area')
const checkoutEl = document.getElementById('checkout-area')
const modalContainer = document.getElementById('modal-container')

// =============================
// App State
// =============================

let cart = []

// =============================
// Render Menu
// =============================

function renderMenu() {
    const menuHtml = menuArray.map(menu => `
        <div class="img-text-btn">
            <div class="img-n-text">
                <img src="./images/${menu.img}" class="item-img" alt="${menu.name}">
                <div class="menu-discrptn">
                    <h2>${menu.name}</h2>
                    <p class="ingredients">${menu.ingredients}</p>
                    <h3>$${menu.price}</h3>
                </div>
            </div>
            <button class="add-btn" data-id="${menu.id}">+</button>
        </div>
    `).join('')

    menuItemsEl.innerHTML = menuHtml
}

// =============================
// Add To Cart
// =============================

function addToCart(id) {
    const selectedItem = menuArray.find(item => item.id === Number(id))
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

    const totalPrice = cart.reduce((total, item) => total + item.price, 0)

    checkoutEl.innerHTML = `
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
}

// =============================
// Render Modal
// =============================

function renderModal() {
    modalContainer.innerHTML = `
        <div class="modal-overlay">
            <div class="modal">
                <h3>Enter card details</h3>
                <form id="payment-form">
                    <input type="text" placeholder="Enter your name" id="user-name" required />
                    <input type="text" placeholder="Enter card number" required />
                    <input type="text" placeholder="Enter CVV" required />
                    <button type="submit">Pay</button>
                </form>
            </div>
        </div>
    `
}

// =============================
// Event Delegation (Clicks)
// =============================

document.addEventListener('click', function(event) {

    // Add to cart
    if (event.target.dataset.id) {
        addToCart(event.target.dataset.id)
    }

    // Open modal
    if (event.target.classList.contains('place-order-btn')) {
        renderModal()
    }

})

// =============================
// Handle Payment Submission
// =============================

document.addEventListener('submit', function(event) {

    if (event.target.id === 'payment-form') {
        event.preventDefault()

        // Capture name BEFORE clearing modal
        const userName = document.getElementById('user-name').value

        // Close modal
        modalContainer.innerHTML = ''

        // Clear cart
        cart = []

        // Show success message
        checkoutEl.innerHTML = `
            <div class="success-message">
                Thanks, ${userName}! Your order is on its way!
            </div>
        `
    }

})

// =============================
// Initialize App
// =============================

renderMenu()