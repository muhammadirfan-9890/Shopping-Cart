const products = [
    {
        id: 1,
        name: "T-Shirt",
        price: 20,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        name: "Shoes",
        price: 50,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        name: "Backpack",
        price: 40,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        name: "Watch",
        price: 70,
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        name: "Headphones",
        price: 35,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 6,
        name: "Water Bottle",
        price: 15,
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=500&q=80"
    }
];

let cart = [];

// Get HTML elements
let productList = document.getElementById("productList");
let cartList = document.getElementById("cartList");
let cartCount = document.getElementById("cartCount");
let total = document.getElementById("total");

function showProducts() {

    productList.innerHTML = "";

    for (let i = 0; i < products.length; i++) {

        productList.innerHTML += `
            <div class="product-card">

                <img src="${products[i].image}" alt="${products[i].name}">

                <h3>${products[i].name}</h3>

                <p class="price">$${products[i].price}</p>

                <button class="add-button"
                    onclick="addToCart(${products[i].id})">
                    Add to Cart
                </button>

            </div>
        `;
    }
}

function addToCart(id) {

    let product = products[id - 1];

    let found = false;

    for (let i = 0; i < cart.length; i++) {

        if (cart[i].id == id) {
            cart[i].quantity++;
            found = true;
        }
    }

    if (found == false) {

        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    showCart();
}

function showCart() {

    cartList.innerHTML = "";

    if (cart.length == 0) {

        cartList.innerHTML = "<p>Your cart is empty.</p>";
    }

    let totalPrice = 0;
    let numberOfItems = 0;

    for (let i = 0; i < cart.length; i++) {

        let item = cart[i];

        let itemTotal = item.price * item.quantity;

        totalPrice = totalPrice + itemTotal;
        numberOfItems = numberOfItems + item.quantity;

        cartList.innerHTML += `
            <div class="cart-item">

                <h3>${item.name}</h3>

                <p>Price: $${item.price}</p>

                <div class="quantity">

                    <button onclick="decreaseQuantity(${item.id})">
                        -
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQuantity(${item.id})">
                        +
                    </button>

                </div>

                <p>Subtotal: $${itemTotal}</p>

                <button class="remove-button"
                    onclick="removeItem(${item.id})">
                    Remove
                </button>

            </div>
        `;
    }

    total.innerText = totalPrice;
    cartCount.innerText = numberOfItems;
}

// Increase quantity
function increaseQuantity(id) {

    for (let i = 0; i < cart.length; i++) {

        if (cart[i].id == id) {
            cart[i].quantity++;
        }
    }

    showCart();
}

// Decrease quantity
function decreaseQuantity(id) {

    for (let i = 0; i < cart.length; i++) {

        if (cart[i].id == id) {

            if (cart[i].quantity > 1) {
                cart[i].quantity--;
            }
        }
    }

    showCart();
}

function removeItem(id) {

    for (let i = 0; i < cart.length; i++) {

        if (cart[i].id == id) {
            cart.splice(i, 1);
        }
    }

    showCart();
}

showProducts();
showCart();
