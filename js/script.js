// --- 1. Active Navigation Link ---
// This code highlights the current page in the navigation bar.
const navLinks = document.querySelectorAll('nav a');
const currentPage = window.location.pathname.split('/').pop(); // Gets the current file name (e.g., "about.html")

alert('Welcome to Nova Fashion House!');