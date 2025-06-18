// Pastikan elemen ada sebelum menambahkan event listener
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

if (hamburger && sidebar && overlay) {
  // Buka/tutup sidebar saat hamburger diklik
  hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : 'auto';
  });

  // Tutup sidebar saat overlay diklik
  overlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
}
// Sidebar functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const sidebarClose = document.getElementById('sidebarClose');
    const overlay = document.getElementById('overlay');
    
    // Toggle sidebar
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close sidebar
    sidebarClose.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close sidebar when clicking outside
    overlay.addEventListener('click', (e) => {
        if (sidebar.classList.contains('active') && !sidebar.contains(e.target)) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close sidebar when clicking on links
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Smooth scrolling for sidebar links
    document.querySelectorAll('.sidebar-menu a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile search toggle
    const mobileSearchToggle = document.getElementById('mobileSearchToggle');
    const searchForm = document.getElementById('searchForm');
    
    mobileSearchToggle.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        searchForm.classList.toggle('active');
        if (searchForm.classList.contains('active')) {
            document.getElementById('searchInput').focus();
        }
    });
});
// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Terima kasih atas pesan Anda! Kami akan segera menghubungi Anda.');
    this.reset();
});

// Active navigation link based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a, .sidebar-menu a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Cart functionality
let cart = [];
const cartCount = document.getElementById('cartCount');
const mobileCartCount = document.getElementById('mobileCartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartToggle = document.getElementById('cartToggle');
const mobileCartToggle = document.getElementById('mobileCartToggle');
const cartModal = document.getElementById('cartModal');
const cartClose = document.getElementById('cartClose');
const addToCartButtons = document.querySelectorAll('.add-to-cart, .btn-cart');
const searchToggle = document.getElementById('searchToggle');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchModal = document.getElementById('searchModal');
const searchModalClose = document.getElementById('searchModalClose');
const searchResults = document.getElementById('searchResults');
const mobileSearchToggle = document.getElementById('mobileSearchToggle');

// Toggle search form
searchToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    searchForm.classList.toggle('active');
    if (searchForm.classList.contains('active')) {
        searchInput.focus();
    }
});

mobileSearchToggle.addEventListener('click', () => {
    // Close sidebar first
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Then open search form
    searchForm.classList.toggle('active');
    if (searchForm.classList.contains('active')) {
        searchInput.focus();
    }
});

// Close search form when clicking outside
document.addEventListener('click', (e) => {
    if (!searchForm.contains(e.target) && e.target !== searchToggle) {
        searchForm.classList.remove('active');
    }
});

// Search functionality
searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    performSearch();
});

// Real-time search as user types
searchInput.addEventListener('input', function() {
    if (this.value.trim().length > 0) {
        performSearch();
    } else {
        searchResults.innerHTML = '<div class="no-results"><i class="fas fa-search fa-2x"></i><p>Masukkan kata kunci untuk mencari produk</p></div>';
    }
});

function performSearch() {
    const keyword = searchInput.value.trim().toLowerCase();
    
    if (keyword === '') {
        searchResults.innerHTML = '<div class="no-results"><i class="fas fa-search fa-2x"></i><p>Masukkan kata kunci untuk mencari produk</p></div>';
        return;
    }
    
    const searchableItems = document.querySelectorAll('.searchable');
    let resultsHTML = '';
    let foundResults = false;
    
    searchableItems.forEach(item => {
        const itemName = item.dataset.name.toLowerCase();
        const itemPrice = item.dataset.price;
        
        if (itemName.includes(keyword)) {
            foundResults = true;
            const imgSrc = item.querySelector('img') ? item.querySelector('img').src : 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3';
            
            resultsHTML += `
                <div class="search-result-item" data-id="${item.dataset.id}">
                    <img src="${imgSrc}" alt="${item.dataset.name}">
                    <div class="search-result-item-info">
                        <h4>${item.dataset.name}</h4>
                        <div class="price">Rp ${parseInt(itemPrice).toLocaleString()}</div>
                    </div>
                </div>
            `;
        }
    });
    
    if (!foundResults) {
        resultsHTML = '<div class="no-results"><i class="fas fa-search fa-2x"></i><p>Tidak ditemukan hasil untuk "' + keyword + '"</p></div>';
    }
    
    searchResults.innerHTML = resultsHTML;
    
    // Add event listeners to search results
    document.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
            const id = item.dataset.id;
            const targetCard = document.querySelector(`.add-to-cart[data-id="${id}"], .btn-cart[data-id="${id}"]`);
            
            if (targetCard) {
                // Simulate click on add to cart button
                targetCard.click();
                
                // Close search modals
                searchModal.classList.remove('active');
                overlay.classList.remove('active');
                searchForm.classList.remove('active');
            }
        });
    });
    
    // Show search modal
    searchModal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close search modal
searchModalClose.addEventListener('click', () => {
    searchModal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Toggle cart modal
const openCartModal = () => {
    cartModal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
};

cartToggle.addEventListener('click', openCartModal);
mobileCartToggle.addEventListener('click', openCartModal);

cartClose.addEventListener('click', () => {
    cartModal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

overlay.addEventListener('click', () => {
    cartModal.classList.remove('active');
    overlay.classList.remove('active');
    searchModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Add to cart functionality
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const id = button.dataset.id;
        const name = button.dataset.name;
        const price = parseInt(button.dataset.price);
        const img = button.dataset.img;
        
        // Check if item already in cart
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                id,
                name,
                price,
                img,
                quantity: 1
            });
        }
        
        updateCart();
        
        // Show cart modal
        cartModal.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Close sidebar if open
        if (sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        }
        
        // Show success notification
        const notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '15px 25px';
        notification.style.backgroundColor = '#4CAF50';
        notification.style.color = 'white';
        notification.style.borderRadius = '5px';
        notification.style.zIndex = '2000';
        notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        notification.innerHTML = `<i class="fas fa-check-circle"></i> ${name} ditambahkan ke keranjang!`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    });
});



