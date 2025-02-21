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
        e.preventDefault(); // Prevent default anchor behavior
        const targetId = this.getAttribute('href').substring(1); // Get section ID
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