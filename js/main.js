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

// Tutup modal jika mengklik di luar area modal
window.addEventListener('click', function(event) {
    if (event.target === detailModal) {
        detailModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});