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