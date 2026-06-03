//Cart constants
const header = document.querySelector("header");
const cartIcon = header.lastElementChild;
const cart = document.querySelector(".cart");

//cart toggle
cartIcon.addEventListener("click", () => {
  cart.classList.toggle("show-cart");
});

//Menu constants
const menuIcon = header.firstElementChild;
const menu = document.querySelector(".menu");

//menu toggle
menuIcon.addEventListener("click", () => {
  menu.classList.toggle("show-menu");
});

//Close menu icon and buttons
const closeIcon = document.querySelector(".close-icon");

//close menu toggle
closeIcon.addEventListener("click", () => {
  menu.classList.toggle("show-menu");
});

//cart content and badge
const cartContent = [];
const cartBadge = document.querySelector(".cart-badge p");
const addToCartBtns = document.querySelectorAll(".add-to-cart");
const cartItems = document.querySelector(".cart__items");

cartBadge.style.display = "none";

addToCartBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    const img = item.querySelector("img").src;
    const name = item.querySelector("h3").innerText;
    const priceStr = item.querySelector("p").innerText;
    const price = parseInt(priceStr.slice(1));

    const product = {
      img,
      name,
      price,
      cuantity: 1,
    };

    const existingProduct = cartContent.find(
      (product) => product.name === name,
    );

    if (existingProduct) {
      existingProduct.cuantity++;
    } else {
      cartContent.push(product);
    }

    updateCart();

    // Update cart content
    function updateCart() {
      cartItems.innerHTML = "";

      cartContent.forEach((product) => {
        const realPrice = product.price * product.cuantity;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart__item"); 
        cartItem.dataset.name = product.name;

        cartItem.innerHTML = `
        <img src="${product.img}" alt="${product.name}"/>
        <p>${product.name} x ${product.cuantity}</p>
        <p>$${realPrice}</p>
        
        <button class="cart__btn cart__btn--remove">-</button> 
        <button class="cart__btn cart__btn--add">+</button>
        <i class="cart__icon-delete">
          <img src="./img/trash-can.png" alt="Icono quitar" class="cart__img-delete" />
        </i>`;

        cartItems.appendChild(cartItem);
      });

      let totalItems = 0;
      cartContent.forEach((product) => (totalItems += product.cuantity));

      if (totalItems > 0) {
        cartBadge.style.display = "flex";
        cartBadge.innerText = totalItems;
      } else {
        cartBadge.style.display = "none";
        cartItems.innerHTML = "<p>Tu carrito está vacío</p>";
      }

      //erase completely
      const deleteIcons = cartItems.querySelectorAll(".cart__icon-delete");
      deleteIcons.forEach((icon) => {
        icon.addEventListener("click", () => {
          const parent = icon.closest(".cart__item");
          const productName = parent.dataset.name;
          const index = cartContent.findIndex(product => product.name === productName);

          if (index !== -1) {
            cartContent.splice(index, 1);
          }
          updateCart();
        });
      });

      //subtract product btn
      const substractBtns = cartItems.querySelectorAll(".cart__btn--remove");
      substractBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const parentItem = btn.closest(".cart__item");
          const productName = parentItem.dataset.name;
          const product = cartContent.find(product => product.name === productName);

          if(product) {
            product.cuantity--;
            if(product.cuantity === 0) {
              const index = cartContent.findIndex(product => product.name === productName);
              cartContent.splice(index, 1);
            }

            updateCart();
          }
        });
      });

      //add product btn
      const addBtns = cartItems.querySelectorAll(".cart__btn--add");
      addBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const parentItem = btn.closest(".cart__item");
          const productName = parentItem.dataset.name;
          const product = cartContent.find(product => product.name === productName);

          if (product) {
            product.cuantity++;
            updateCart();
          }
        });
      });

    }
  });
});