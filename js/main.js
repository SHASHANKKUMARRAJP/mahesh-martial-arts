document.addEventListener('DOMContentLoaded', () => {
    
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if(mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Optional: stop observing once animated
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up, .fade-in');
    animatedElements.forEach(el => observer.observe(el));

    // Typed.js Initialization (Typing text effect)
    if (document.getElementById('typed-text')) {
        new Typed('#typed-text', {
            strings: ['Sharpen the Mind.', 'Unlock Your Potential.', 'Become Unstoppable.'],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }

    // Automation: Form Handling
    const bookingForm = document.getElementById('bookingForm');
    const formMessage = document.getElementById('formMessage');

    if(bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get values
            const name = document.getElementById('name').value;
            const program = document.getElementById('program').value;
            const date = document.getElementById('date').value;

            // Simple validation and simulated automation response
            if(name && program && date) {
                const btn = bookingForm.querySelector('button');
                const originalText = btn.innerText;
                
                // Simulate network request
                btn.innerText = 'Processing...';
                btn.disabled = true;

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                    
                    formMessage.textContent = `Success! ${name}, your booking for ${program} on ${date} is confirmed. A digital pass has been sent to your email.`;
                    formMessage.className = 'form-message success';
                    
                    bookingForm.reset();
                    
                    // Hide message after 5 seconds
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                        formMessage.className = 'form-message';
                    }, 5000);
                }, 1500);
            }
        });
    }
});
