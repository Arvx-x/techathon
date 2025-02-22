// Wait for the page to load
document.addEventListener('DOMContentLoaded', function() {
    // Animate the text in the Home section
    var typed = new Typed('#typed', {
        strings: ["Laura, Your AI Teacher"],
        typeSpeed: 50,
        loop: true
    });
});
// Navigation logic
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // If it's an external page (contains .html), let the default behavior happen
        if (href.includes('.html')) {
            return;
        }
        
        e.preventDefault(); // Prevent default anchor behavior only for section links
        const targetId = href.substring(1); // Get section ID
        sections.forEach(section => {
            if (section.id === targetId) {
                section.classList.remove('d-none'); // Show target section
            } else {
                section.classList.add('d-none'); // Hide others
            }
        });
    });
});
// Chat simulation
document.getElementById('chat-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const userInput = document.getElementById('user-input').value;
    const chatWindow = document.getElementById('chat-window');
    
    // Add user message
    chatWindow.innerHTML += `<p><strong>You:</strong>\ ${userInput}</p>`;
    
    // Simulate Laura's response
    setTimeout(() => {
        chatWindow.innerHTML += `<p><strong>Laura:</strong> Hello! This is a test response.</p>`;
        chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to bottom
    }, 1000);
    
    document.getElementById('user-input').value = ''; // Clear input
});

// Counter Animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // Update every 16ms (60fps)
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Intersection Observer for counter animation
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter-number');
            counters.forEach(counter => {
                counter.classList.add('animated');
                animateCounter(counter);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe the counter section
document.addEventListener('DOMContentLoaded', () => {
    const counterSection = document.querySelector('.counter-section');
    if (counterSection) {
        observer.observe(counterSection);
    }
});