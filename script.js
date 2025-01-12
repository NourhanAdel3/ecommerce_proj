const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.backgroundColor = 'transparent';
    }
});
const sections = document.querySelectorAll('.section');
window.addEventListener('scroll', () => {
    const scroll_Position = window.scrollY; // to know how many pixels scrolled  from above  to calculate affecting in background
    sections.forEach((section, index) => {
        let scrollval = scroll_Position *0.04; // store  main value of scrolling 
        if (index === 0) {
            section.style.background_Position = `center ${-scrollval}px`;
        } else if (index === 1){
                section.style.background_Position = `center ${-scrollval*1.5}px`;
        } else if (index === 2) {
            section.style.background_Position = `center ${-scrollval *2}px`;
        } else if (index === 3) {
            section.style.background_Position = `center ${-scrollval}px`;
        }
    });
});

let cart=[];
let total = 0;
function addToCart(itemName, price) {
    const existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: itemName, price, quantity: 1});
    }
    UpdateCart();
}
function UpdateCart(){
    const Items = document.getElementById("cart-items");
    const Count = document.getElementById("cart-count");
    const Total = document.getElementById("cart-total");
    const empty = document.getElementById("cart-empty");
    Items.innerHTML="";
    cart.forEach((item)=>{
        const itemElement = document.createElement("li");
        itemElement.className = "cart-item";
        itemElement.innerHTML =`
                <div class="cart-item-details">
                   <p>${item.name} - $${item.price.toFixed(2)}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <button class="cart-item-button" onclick="incrementItem('${item.name}')"> + </button>
                    <button class="cart-item-button" onclick="decrementItem('${item.name}')"> - </button>
                    </div>
            `;
        Items.appendChild(itemElement);

        total += item.price * item.quantity;
    });

    Count.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    Total.textContent = total.toFixed(2);

    empty.style.display = cart.length === 0 ? "block" : "none";
}
function incrementItem(itemName) {
    const item = cart.find(item => item.name === itemName);
    if (item) {
        item.quantity++;
        UpdateCart();
    }
}
function decrementItem(itemName) {
    const item = cart.find(item => item.name === itemName);
    if (item) {
        item.quantity--;
        UpdateCart();
    }
}
function toggleCart() {
    const cartElement = document.querySelector(".cart");
    cartElement.style.display = cartElement.style.display === "none" || cartElement.style.display === "" ? "block" : "none";
}
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Thank u for ur order");
    cart = [];
    total = 0;
    UpdateCart();
}
