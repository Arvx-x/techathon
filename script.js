// Wait for the page to load
document.addEventListener('DOMContentLoaded', function() {
    // Animate the text in the Home section
    var typed = new Typed('#typed', {
        strings: ["Laura, Your AI Teacher"],
        typeSpeed: 100,
        backSpeed: 50,
        startDelay: 500,
        showCursor: true,
        cursorChar: '|',
        loop: true,
        loopCount: Infinity,
        fadeOut: true,
    });

    // Counter Animation with Intersection Observer
    const counters = document.querySelectorAll('.counter-number');
    let counted = false;

    const startCounting = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    let count = 0;
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60 FPS

                    const updateCount = () => {
                        if (count < target) {
                            count += increment;
                            counter.textContent = Math.min(Math.ceil(count), target);
                            requestAnimationFrame(updateCount);
                        } else {
                            counter.textContent = target;
                        }
                    };

                    updateCount();
                });
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(startCounting, {
        threshold: 0.5
    });

    // Observe the counter section
    const counterSection = document.querySelector('.counter-section');
    if (counterSection) {
        observer.observe(counterSection);
    }

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
    const chatForm = document.getElementById('chat-form');
    if (chatForm) {
        chatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const userInput = document.getElementById('user-input').value;
            const chatWindow = document.getElementById('chat-window');
            
            // Add user message
            chatWindow.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
            
            // Simulate Laura's response
            setTimeout(() => {
                chatWindow.innerHTML += `<p><strong>Laura:</strong> Hello! This is a test response.</p>`;
                chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll to bottom
            }, 1000);
            
            document.getElementById('user-input').value = ''; // Clear input
        });
    }

    // Handle sign-in button click
    const signInLink = document.querySelector('a[href="signin.html"]');
    if (signInLink) {
        signInLink.addEventListener('click', async function(e) {
            e.preventDefault();
            
            // Make sure Clerk is loaded
            if (typeof Clerk !== 'undefined') {
                try {
                    // Open Clerk's sign-in modal directly
                    await Clerk.openSignIn({
                        afterSignInUrl: window.location.origin + '/index.html',
                        afterSignUpUrl: window.location.origin + '/index.html',
                    });
                } catch (error) {
                    console.error('Error opening Clerk sign-in:', error);
                    // Fallback to redirect if modal fails
                    window.location.href = 'signin.html';
                }
            } else {
                // Fallback if Clerk isn't loaded
                window.location.href = 'signin.html';
            }
        });
    }
});