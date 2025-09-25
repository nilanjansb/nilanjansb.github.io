// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    initNavigation();
    
    // Publications filtering
    initPublicationsFilter();
    
    // Project details expansion
    initProjectExpansion();
    
    // Contact form handling
    initContactForm();
    
    // Mobile navigation
    initMobileNavigation();
    
    // Scroll animations
    initScrollAnimations();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active navigation link on scroll
    function updateActiveNav() {
        const scrollPos = window.scrollY + 100; // Offset for better UX
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call
}

// Publications filtering
function initPublicationsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const publicationCards = document.querySelectorAll('.publication-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter publications
            publicationCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    // Animate in
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(-20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Project details expansion
function initProjectExpansion() {
    const expandButtons = document.querySelectorAll('.project-expand');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const isHidden = targetElement.classList.contains('hidden');
                
                if (isHidden) {
                    // Show details
                    targetElement.classList.remove('hidden');
                    targetElement.style.opacity = '0';
                    targetElement.style.maxHeight = '0';
                    targetElement.style.overflow = 'hidden';
                    targetElement.style.transition = 'opacity 0.3s ease, max-height 0.3s ease';
                    
                    setTimeout(() => {
                        targetElement.style.opacity = '1';
                        targetElement.style.maxHeight = '200px';
                    }, 10);
                    
                    this.textContent = 'Hide Details';
                } else {
                    // Hide details
                    targetElement.style.opacity = '0';
                    targetElement.style.maxHeight = '0';
                    
                    setTimeout(() => {
                        targetElement.classList.add('hidden');
                        targetElement.style.removeProperty('opacity');
                        targetElement.style.removeProperty('max-height');
                        targetElement.style.removeProperty('overflow');
                        targetElement.style.removeProperty('transition');
                    }, 300);
                    
                    this.textContent = 'Show Details';
                }
            }
        });
    });
}

// Contact form handling
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                showNotification('Thank you for your message! I will get back to you soon.', 'success');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    if (type === 'success') {
        notification.style.background = 'var(--color-success)';
    } else if (type === 'error') {
        notification.style.background = 'var(--color-error)';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Mobile navigation
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isOpen = navMenu.classList.contains('open');
            
            if (isOpen) {
                navMenu.classList.remove('open');
                navToggle.classList.remove('open');
                document.body.style.overflow = '';
            } else {
                navMenu.classList.add('open');
                navToggle.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
        });
        
        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('open');
                navToggle.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
        
        // Add mobile menu styles
        const mobileStyles = document.createElement('style');
        mobileStyles.textContent = `
            @media (max-width: 768px) {
                .nav-menu {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background: var(--color-slate-900);
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    transform: translateX(-100%);
                    transition: transform 0.3s ease;
                    z-index: 999;
                }
                
                .nav-menu.open {
                    display: flex;
                    transform: translateX(0);
                }
                
                .nav-menu li {
                    margin: 20px 0;
                }
                
                .nav-link {
                    font-size: 24px;
                }
                
                .nav-toggle.open span:nth-child(1) {
                    transform: rotate(45deg) translate(5px, 5px);
                }
                
                .nav-toggle.open span:nth-child(2) {
                    opacity: 0;
                }
                
                .nav-toggle.open span:nth-child(3) {
                    transform: rotate(-45deg) translate(7px, -6px);
                }
            }
        `;
        document.head.appendChild(mobileStyles);
    }
}

// Scroll animations
function initScrollAnimations() {
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
    
    // Elements to animate
    const animatedElements = document.querySelectorAll(`
        .hero-content,
        .about-content,
        .research-card,
        .publication-card,
        .project-card,
        .award-card,
        .contact-content
    `);
    
    animatedElements.forEach(element => {
        // Set initial styles
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Observe element
        observer.observe(element);
    });
}

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(19, 52, 59, 0.95)';
    } else {
        navbar.style.background = 'rgba(19, 52, 59, 0.95)';
    }
});

// Search functionality for publications (bonus feature)
function initPublicationSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search publications...';
    searchInput.className = 'form-control';
    searchInput.style.marginBottom = 'var(--space-16)';
    
    const publicationsSection = document.querySelector('.publications .container');
    const sectionTitle = publicationsSection.querySelector('.section-title');
    
    // Insert search input after section title
    sectionTitle.insertAdjacentElement('afterend', searchInput);
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const publicationCards = document.querySelectorAll('.publication-card');
        
        publicationCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const authors = card.querySelector('.publication-authors').textContent.toLowerCase();
            const venue = card.querySelector('.publication-venue').textContent.toLowerCase();
            
            const isMatch = title.includes(searchTerm) || 
                          authors.includes(searchTerm) || 
                          venue.includes(searchTerm);
            
            if (isMatch || searchTerm === '') {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Initialize publication search
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initPublicationSearch, 1000);
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        
        if (navMenu && navMenu.classList.contains('open')) {
            navMenu.classList.remove('open');
            navToggle.classList.remove('open');
            document.body.style.overflow = '';
        }
    }
});

// Back to top functionality
function initBackToTop() {
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    
    // Style the button
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--color-primary);
        color: var(--color-btn-primary-text);
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-lg);
    `;
    
    document.body.appendChild(backToTopButton);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    backToTopButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    backToTopButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', function() {
    initBackToTop();
});

// Performance optimization: Lazy loading for images (if any are added later)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}