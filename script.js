// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Search Overlay
const searchBtn = document.getElementById('searchBtn');
const searchOverlay = document.getElementById('searchOverlay');
const searchClose = document.getElementById('searchClose');

searchBtn.addEventListener('click', () => {
    searchOverlay.classList.add('active');
    document.querySelector('.search-input').focus();
});

searchClose.addEventListener('click', () => {
    searchOverlay.classList.remove('active');
});

searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) {
        searchOverlay.classList.remove('active');
    }
});

// Category Carousel
const carouselTrack = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let scrollPosition = 0;
const scrollAmount = 300;

nextBtn.addEventListener('click', () => {
    const maxScroll = carouselTrack.scrollWidth - carouselTrack.parentElement.clientWidth;
    scrollPosition = Math.min(scrollPosition + scrollAmount, maxScroll);
    carouselTrack.style.transform = `translateX(-${scrollPosition}px)`;
});

prevBtn.addEventListener('click', () => {
    scrollPosition = Math.max(scrollPosition - scrollAmount, 0);
    carouselTrack.style.transform = `translateX(-${scrollPosition}px)`;
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Cart Functionality
let cartCount = 0;
const cartCountElement = document.querySelector('.cart-count');
const addToCartButtons = document.querySelectorAll('.btn-add-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        cartCount++;
        cartCountElement.textContent = cartCount;
        
        // Add animation
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> Added!';
        this.classList.add('added');
        
        setTimeout(() => {
            this.innerHTML = originalText;
            this.classList.remove('added');
        }, 2000);
        
        // Animate cart icon
        const cartIcon = document.querySelector('.cart-icon');
        cartIcon.style.transform = 'scale(1.3)';
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
        }, 300);
        
        // Show notification
        showNotification('Product added to cart!');
    });
});

// Wishlist Functionality
const wishlistButtons = document.querySelectorAll('.wishlist-btn');

wishlistButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const icon = this.querySelector('i');
        
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            this.classList.add('active');
            showNotification('Added to wishlist!');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            this.classList.remove('active');
            showNotification('Removed from wishlist!');
        }
    });
});

// Quick View Functionality
const quickViewButtons = document.querySelectorAll('.quick-view-btn');

quickViewButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('Quick view coming soon!');
    });
});

// Compare Functionality
const compareButtons = document.querySelectorAll('.compare-btn');

compareButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('Product added to compare!');
    });
});

// Product Filter
const filterTabs = document.querySelectorAll('.filter-tab');
const productCards = document.querySelectorAll('.product-card');

filterTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        // Remove active class from all tabs
        filterTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        productCards.forEach(card => {
            if (filter === 'all') {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                const category = card.getAttribute('data-category');
                if (category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        
        if (email) {
            showNotification('Thank you for subscribing!');
            this.reset();
        }
    });
}

// Notification System
function showNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
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

// Scroll to Top on Page Load
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s, transform 0.6s';
    observer.observe(card);
});

// Observe category items
document.querySelectorAll('.category-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s, transform 0.5s';
    observer.observe(item);
});

// Header scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        navbar.style.padding = '8px 0';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
        navbar.style.padding = '12px 0';
    }
    
    lastScroll = currentScroll;
});

// Color dot selection
document.querySelectorAll('.color-dot').forEach(dot => {
    dot.addEventListener('click', function() {
        const parent = this.parentElement;
        parent.querySelectorAll('.color-dot').forEach(d => {
            d.style.boxShadow = '0 0 0 1px var(--border-color)';
        });
        this.style.boxShadow = '0 0 0 2px var(--primary-color)';
    });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// Auto-scroll carousel
let autoScrollInterval;

function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
        const maxScroll = carouselTrack.scrollWidth - carouselTrack.parentElement.clientWidth;
        if (scrollPosition >= maxScroll) {
            scrollPosition = 0;
        } else {
            scrollPosition += scrollAmount;
        }
        carouselTrack.style.transform = `translateX(-${scrollPosition}px)`;
    }, 3000);
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

// Start auto-scroll
startAutoScroll();

// Stop auto-scroll on hover
carouselTrack.parentElement.addEventListener('mouseenter', stopAutoScroll);
carouselTrack.parentElement.addEventListener('mouseleave', startAutoScroll);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (searchOverlay.classList.contains('active') && e.key === 'Escape') {
        searchOverlay.classList.remove('active');
    }
});

console.log('Shyam Paridhan - Website loaded successfully! 🎉');
