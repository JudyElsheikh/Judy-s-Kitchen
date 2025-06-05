document.addEventListener('DOMContentLoaded', () => { 
   
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
   
    const updateCartDisplay = () => {
        const cartDisplay = document.querySelector('.cart-display');
       
        cartDisplay.innerHTML = '<h2>Your Cart</h2>';
       
        if (cart.length > 0) {
            let total = 0;
           
            cart.forEach(item => {
                cartDisplay.innerHTML += `<p>${item.name}: ${item.price} EGP x ${item.quantity}</p>`;
                total += item.price * item.quantity;
            });
            cartDisplay.innerHTML += `<p><strong>Total: ${total} EGP</strong></p>`;
            cartDisplay.innerHTML += `
                <button id="clear-cart">Clear Cart</button>
                <a href="checkout.html"><button id="checkout">Checkout</button></a>
                
            `;
          
            document.getElementById('clear-cart').addEventListener('click', () => {
                cart = [];
           
                
                localStorage.setItem('cart', JSON.stringify(cart));
                
                
                updateCartDisplay();
               
                
                alert('Cart cleared!');
               
            });
        } else {
            cartDisplay.innerHTML += '<p>Your cart is empty.</p>';
            
        }
    };

    // Add to Cart
    const addToCart = (productId, productName, productPrice) => {
        const existingProduct = cart.find(item => item.id === productId);
       
        if (existingProduct) {
            existingProduct.quantity += 1;
           
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
  }
        
        localStorage.setItem('cart', JSON.stringify(cart));
    
        updateCartDisplay();
        
        alert('Product added to cart!');
  };

   
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', event => {
            const productCard = event.target.closest('.pro');
          
            const productId = parseInt(productCard.getAttribute('data-id'));
           
            const productName = productCard.querySelector('h5').innerText;
            
            const productPrice = parseFloat(productCard.querySelector('h4').innerText.replace('$', ''));
            
            addToCart(productId, productName, productPrice);
           
        });
    });

 
    document.querySelector('.cart-icon').addEventListener('click', () => {
        document.querySelector('.cart-display').classList.toggle('show');
         });

 
    const searchForm = document.getElementById('search-form');
  

    if (searchForm) {
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const searchTerm = document.getElementById('search-input').value.toLowerCase();
           
            const products = document.querySelectorAll('.product-card');
            
            products.forEach(product => {
                const productName = product.querySelector('h3').innerText.toLowerCase();
               
                if (productName.includes(searchTerm)) {
                    product.style.display = 'block';
                            } else {
                    product.style.display = 'none';
                   
                }
            });
        });
    }

    updateCartDisplay();
    
});
