// ---------------- SOUND EFFECT ----------------
const clickSound = new Audio("/static/sound/click.mp3");

function playSound() {
    clickSound.currentTime = 0;
    clickSound.play();
}

// ------------------ CART STORAGE ------------------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save cart to localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}



// ------------------ MENU PAGE ------------------
function loadMenu() {
    fetch("/api/menu")
        .then(res => res.json())
        .then(menu => {
            let list = document.getElementById("menu-list");
            list.innerHTML = "";

            menu.forEach((item) => {
                list.innerHTML += `
                    <div class="card">
                        <img src="${item.image}" class="coffee-img">

                        <h3>${item.name}</h3>
                        <p class="price">$${item.price.toFixed(2)}</p>

                        <button class="btn" onclick="addToCart('${item.name}', ${item.price}, '${item.image}')">
                            Add to Cart
                        </button>
                    </div>
                `;
            });
        });
}



// ------------------ ADD TO CART ------------------
function addToCart(name, price, image) {
    // Check if already in cart
    let existing = cart.find(item => item.name === name);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name, price, image, qty: 1 });
    }

    saveCart();
    alert(`${name} added to your cart ☕`);
}



// ------------------ CART / ORDER PAGE ------------------
function loadOrder() {
    let list = document.getElementById("order-list");
    let totalArea = document.getElementById("total");

    list.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;

        list.innerHTML += `
            <div class="item">

                <img src="${item.image}" class="cart-img">

                <div class="item-info">
                    <h3>${item.name}</h3>
                    <p>$${item.price.toFixed(2)}</p>
                </div>

                <div class="qty-box">
                    <button class="qty-btn" onclick="decreaseQty(${index})">−</button>
                    <span class="qty">${item.qty}</span>
                    <button class="qty-btn" onclick="increaseQty(${index})">+</button>
                </div>

                <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    totalArea.innerHTML = `Total: $${total.toFixed(2)}`;
}



// ------------------ CHANGE QUANTITY ------------------
function increaseQty(index) {
    cart[index].qty += 1;
    saveCart();
    loadOrder();
}

function decreaseQty(index) {
    if (cart[index].qty > 1) {
        cart[index].qty -= 1;
    } else {
        cart.splice(index, 1);
    }
    saveCart();
    loadOrder();
}



// ------------------ REMOVE ITEM ------------------
function removeItem(index) {
    cart.splice(index, 1);  
    saveCart();  
    loadOrder();
}



// ------------------ CLEAR CART ------------------
function clearCart() {
    if (confirm("Clear your whole cart?")) {
        cart = [];
        saveCart();
        loadOrder();
    }
}



// ------------------ CHECKOUT --------------
function increaseQty(index) {
    cart[index].qty += 1;
    saveCart();
    loadOrder();
}

function decreaseQty(index) {
    if (cart[index].qty > 1) {
        cart[index].qty -= 1;
    } else {
        cart.splice(index, 1);
    }
    saveCart();
    loadOrder();
}



// ------------------ REMOVE ITEM ------------------
function removeItem(index) {
    cart.splice(index, 1);  
    saveCart();  
    loadOrder();
}



// ------------------ CLEAR CART ------------------
function clearCart() {
    if (confirm("Clear your whole cart?")) {
        cart = [];
        saveCart();
        loadOrder();
    }
}



// ------------------ CHECKOUT ------------------
function checkout() {
    fetch("/api/checkout", { method: "POST" });
    alert("Order Confirmed! Thank you ☕🤎");

    cart = [];
    saveCart();
    window.location.href = "/";
}
