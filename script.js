// 1. NAV TOGGLE FUNCTION
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

   // UPDATED FILTER LOGIC FOR STATIC HTML
        function setupFilters() {
            const buttons = document.querySelectorAll('.filter-btn');
            const items = document.querySelectorAll('.product-item');
            const countLabel = document.getElementById('product-count');
            
            buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Remove active class from all
                    buttons.forEach(b => b.classList.remove('active', 'bg-black', 'text-white'));
                    // Add active to clicked
                    btn.classList.add('active');

                    const category = btn.getAttribute('data-category');
                    let visibleCount = 0;
                    
                    items.forEach(item => {
                        // Check if item matches category or if category is 'all'
                        if (category === 'all' || item.getAttribute('data-category') === category) {
                            item.style.display = 'block'; // Show
                            visibleCount++;
                        } else {
                            item.style.display = 'none'; // Hide
                        }
                    });

                    countLabel.innerText = `Showing ${visibleCount} items`;
                });
            });
        }

        // INIT
        document.addEventListener('DOMContentLoaded', () => {
            setupFilters();
        });

        // Toggle Mobile Menu
        function toggleMenu() {
            alert("Mobile menu toggle would expand here.");
        }

 // products.html script.js content
        // Simple logic to handle size selection visuals
        function selectSize(btn) {
            // Reset all buttons
            document.querySelectorAll('.size-btn').forEach(b => {
                b.classList.remove('bg-black', 'text-white', 'border-black');
                b.classList.add('bg-transparent', 'text-gray-900', 'border-gray-300');
            });
            
            // Highlight clicked
            btn.classList.remove('bg-transparent', 'text-gray-900', 'border-gray-300');
            btn.classList.add('bg-black', 'text-white', 'border-black');
        }

