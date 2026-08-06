// ============================================
// LUXE HOTEL - JAVASCRIPT====

document.addEventListener('DOMContentLoaded', function() {
    
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.main-image');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Update main image source
            const newSrc = this.getAttribute('src');
            mainImage.src = newSrc;
        });
    });

    if (thumbnails.length > 0) {
        thumbnails[0].classList.add('active');
    }


    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const nameInput = this.querySelector('input[name="name"]');
            const emailInput = this.querySelector('input[name="email"]');
            const messageInput = this.querySelector('textarea[name="message"]');
            const messageDiv = this.querySelector('.form-message');
            
            // Reset message display
            messageDiv.textContent = '';
            messageDiv.className = 'form-message';
            
            // Validation
            if (!nameInput.value.trim()) {
                showFormMessage(messageDiv, 'Please enter your name', 'error');
                nameInput.focus();
                return;
            }
            
            if (!validateEmail(emailInput.value)) {
                showFormMessage(messageDiv, 'Please enter a valid email address', 'error');
                emailInput.focus();
                return;
            }
            
            if (!messageInput.value.trim()) {
                showFormMessage(messageDiv, 'Please enter your message', 'error');
                messageInput.focus();
                return;
            }
            
            showFormMessage(messageDiv, 'Thank you for your message! We will contact you soon.', 'success');
            
            // Reset form after 2 seconds
            setTimeout(() => {
                this.reset();
            }, 2000);
        });
    }

    // Email validation function
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showFormMessage(messageDiv, message, type) {
        messageDiv.textContent = message;
        messageDiv.className = `form-message ${type}`;
    }


    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Optional: Add active state to current nav link
            navLinks.forEach(l => l.style.color = '');
            this.style.color = 'var(--primary-teal)';
        });
    });


    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Scroll to rooms section or redirect
            const roomsPage = document.querySelector('.page#rooms');
            if (roomsPage) {
                roomsPage.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.location.href = 'rooms.html';
            }
        });
    }

    // Book room buttons
    const bookButtons = document.querySelectorAll('.book-button');
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('This would open a booking system. Room has been added to cart.');
        });
    });


    // Fade in elements as they scroll into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe feature cards, room cards, amenity cards
    const animatedElements = document.querySelectorAll(
        '.feature-card, .room-card, .amenity-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    function highlightCurrentNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.navbar a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.style.color = 'var(--primary-teal)';
                link.style.fontWeight = '700';
            }
        });
    }

    highlightCurrentNav();

});

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);