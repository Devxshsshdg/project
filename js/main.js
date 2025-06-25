// DOM Elements untuk modal detail
const detailModal = document.getElementById('detailModal');
const detailClose = document.getElementById('detailClose');
const viewDetailButtons = document.querySelectorAll('.view-detail');
const detailImg = document.getElementById('detailImg');
const detailName = document.getElementById('detailName');
const detailDesc = document.getElementById('detailDesc');
const originalPrice = document.getElementById('originalPrice');
const discountBadge = document.getElementById('discountBadge');
const discountAmount = document.getElementById('discountAmount');
const totalPrice = document.getElementById('totalPrice');

// Simpan data produk yang sedang dilihat
let currentProduct = null;
   // Keranjang belanja
   let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
// Tampilkan detail produk ketika tombol view diklik
viewDetailButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Ambil data dari atribut
        const id = this.getAttribute('data-id');
        const name = this.getAttribute('data-name');
        const desc = this.getAttribute('data-desc');
        const price = parseInt(this.getAttribute('data-price'));
        const discount = parseInt(this.getAttribute('data-discount'));
        const img = this.getAttribute('data-img');
        
        // Simpan produk saat ini
        currentProduct = {
            id, name, desc, price, discount, img
        };
        
        // Tampilkan data di modal
        detailImg.src = img;
        detailImg.alt = name;
        detailName.textContent = name;
        detailDesc.textContent = desc;
        
        // Hitung harga diskon
        const discountAmountValue = price * discount / 100;
        const total = price - discountAmountValue;
        
        // Tampilkan informasi harga
        originalPrice.textContent = `Rp ${price.toLocaleString('id-ID')}`;
        discountAmount.textContent = `-Rp ${discountAmountValue.toLocaleString('id-ID')} (${discount}%)`;
        totalPrice.textContent = `Rp ${total.toLocaleString('id-ID')}`;
        discountBadge.textContent = `${discount}% OFF`;
        
        // Tampilkan modal
        detailModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

// Tutup modal detail
detailClose.addEventListener('click', function() {
    detailModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Fungsi untuk menambahkan produk ke keranjang
function addToCart(product) {
    // Cek apakah produk sudah ada di keranjang
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    // Simpan ke localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update tampilan keranjang
    updateCart();
    
    // Tampilkan notifikasi
    showNotification(`${product.name} telah ditambahkan ke keranjang!`);
}

// Fungsi untuk menampilkan notifikasi
function showNotification(message) {
    // Buat elemen notifikasi
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style notifikasi
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.backgroundColor = 'var(--primary)';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '30px';
    notification.style.zIndex = '9999';
    notification.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    notification.style.transition = 'all 0.3s ease';
    
    // Tambahkan ke body
    document.body.appendChild(notification);
    
    // Hilangkan notifikasi setelah 3 detik
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}
 // Fungsi untuk memperbarui tampilan keranjang
 function updateCart() {
    // Hitung total item
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    floatingCartCount.textContent = totalItems;
    
    // Update tampilan keranjang modal jika terbuka
    if (cartModal.style.display === 'block') {
        renderCartItems();
    }
}
 // Fungsi untuk menampilkan item keranjang di modal
 function renderCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart fa-2x"></i>
                <p>Keranjang belanja kosong</p>
            </div>
        `;
        cartTotal.textContent = 'Rp 0';
        return;
    }
      // Hitung total harga
      let total = 0;
            
      cartItems.innerHTML = '';
      
      cart.forEach(item => {
          // Hitung harga dengan diskon
          const discountAmount = item.price * item.discount / 100;
          const finalPrice = item.price - discountAmount;
          const itemTotal = finalPrice * item.quantity;
          
          total += itemTotal;
          cartItems.innerHTML += `
          <div class="cart-item" data-id="${item.id}">
              <div class="cart-item-img">
                  <img src="${item.img}" alt="${item.name}">
              </div>
              <div class="cart-item-info">
                  <div class="cart-item-name">${item.name}</div>
                  <div class="cart-item-price">Rp ${finalPrice.toLocaleString('id-ID')}</div>
                  <div class="cart-item-actions">
                      <button class="quantity-btn minus">-</button>
                      <input type="number" class="quantity-input" value="${item.quantity}" min="1">
                      <button class="quantity-btn plus">+</button>
                      <button class="remove-item">
                          <i class="fas fa-trash"></i>
                      </button>
                       </div>
                        </div>
                    </div>
                `;
            });
            cartTotal.textContent = `Rp ${total.toLocaleString('id-ID')}`;
            
            // Tambahkan event listener untuk tombol di keranjang
            document.querySelectorAll('.minus').forEach(button => {
                button.addEventListener('click', function() {
                    const itemId = this.closest('.cart-item').getAttribute('data-id');
                    const item = cart.find(item => item.id === itemId);
                    
                    if (item.quantity > 1) {
                        item.quantity -= 1;
                    } else {
                        cart = cart.filter(item => item.id !== itemId);
                    }
                    
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCart();
                });

                document.querySelectorAll('.remove-item').forEach(button => {
                    button.addEventListener('click', function() {
                        const itemId = this.closest('.cart-item').getAttribute('data-id');
                        cart = cart.filter(item => item.id !== itemId);
                        localStorage.setItem('cart', JSON.stringify(cart));
                        updateCart();
                    });
                });
                
                document.querySelectorAll('.quantity-input').forEach(input => {
                    input.addEventListener('change', function() {
                        const itemId = this.closest('.cart-item').getAttribute('data-id');
                        const item = cart.find(item => item.id === itemId);
                        const newQuantity = parseInt(this.value) || 1;
                        
                        if (newQuantity < 1) {
                            this.value = 1;
                            item.quantity = 1;
                        } else {
                            item.quantity = newQuantity;
                        }
                        
                        localStorage.setItem('cart', JSON.stringify(cart));
                        updateCart();
                    });
                });
            }
            
            // Tambahkan ke keranjang dari modal detail
            addToCartFromDetail.addEventListener('click', function() {
                if (currentProduct) {
                    addToCart(currentProduct);
                    
                    // Tutup modal
                    detailModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
            
            // Tambahkan ke keranjang dari tombol di card
            addToCartButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const product = {
                        id: this.getAttribute('data-id'),
                        name: this.getAttribute('data-name'),
                        price: parseInt(this.getAttribute('data-price')),
                        discount: parseInt(this.getAttribute('data-discount')) || 0,
                        img: this.getAttribute('data-img')
                    };
                    
                    addToCart(product);
                });
            });
            
           