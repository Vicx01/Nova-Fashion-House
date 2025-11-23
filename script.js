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
// BOOKING JS
  // Make switchTab global for HTML onclick events
        window.switchTab = (tabName) => {
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active', 'text-black', 'border-black');
                btn.classList.add('text-gray-500');
            });
            document.getElementById('content-' + tabName).classList.add('active');
            const activeBtn = document.getElementById('tab-' + tabName);
            activeBtn.classList.add('active', 'text-black');
            activeBtn.classList.remove('text-gray-500');
        };

        // Reusable Formspree Handler
        async function handleFormspreeSubmit(event) {
            event.preventDefault();
            const form = event.target;
            const btn = form.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = "Processing...";
            btn.disabled = true;

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: new FormData(form),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    btn.innerText = "Success!";
                    btn.classList.replace('bg-black', 'bg-green-600');
                    btn.classList.replace('bg-stone-900', 'bg-green-600');
                    form.reset();
                    
                    setTimeout(() => {
                        btn.innerText = originalText;
                        btn.disabled = false;
                        btn.classList.replace('bg-green-600', 'bg-black');
                        btn.classList.replace('bg-green-600', 'bg-stone-900');
                    }, 3000);
                } else {
                    const data = await response.json();
                    if (Object.hasOwn(data, 'errors')) {
                        alert(data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        btn.innerText = "Error. Try again.";
                    }
                    btn.disabled = false;
                }
            } catch (error) {
                console.error("Error:", error);
                btn.innerText = "Error. Check Network.";
                btn.disabled = false;
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            const forms = document.querySelectorAll('form');
            forms.forEach(form => {
                form.addEventListener('submit', handleFormspreeSubmit);
            });
        });