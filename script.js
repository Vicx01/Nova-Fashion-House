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
// COUNTDOWN TIMER JS for events.html
        // Wrapped in an IIFE to prevent "identifier has already been declared" errors if the script runs multiple times
        (function() {
            // Set the date we're counting down to (Dec 15th of the current or next year)
            const currentYear = new Date().getFullYear();
            let galaDate = new Date(`December 15, ${currentYear} 19:00:00`).getTime();
            
            // If date has passed, add a year
            if (new Date().getTime() > galaDate) {
                galaDate = new Date(`December 15, ${currentYear + 1} 19:00:00`).getTime();
            }

            // Update the count down every 1 second
            const timerInterval = setInterval(function() {

                // Get today's date and time
                const now = new Date().getTime();

                // Find the distance between now and the count down date
                const distance = galaDate - now;

                // Time calculations for days, hours, minutes and seconds
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                // Output the result in elements
                const daysEl = document.getElementById("days");
                const hoursEl = document.getElementById("hours");
                const minutesEl = document.getElementById("minutes");
                const secondsEl = document.getElementById("seconds");

                if (daysEl) daysEl.innerHTML = days < 10 ? '0' + days : days;
                if (hoursEl) hoursEl.innerHTML = hours < 10 ? '0' + hours : hours;
                if (minutesEl) minutesEl.innerHTML = minutes < 10 ? '0' + minutes : minutes;
                if (secondsEl) secondsEl.innerHTML = seconds < 10 ? '0' + seconds : seconds;

                // If the count down is over, write some text 
                if (distance < 0) {
                    clearInterval(timerInterval);
                    const countdownEl = document.getElementById("countdown");
                    if (countdownEl) countdownEl.innerHTML = "<div class='text-2xl font-bold col-span-4'>The Event Has Started!</div>";
                }
            }, 1000);
        })();