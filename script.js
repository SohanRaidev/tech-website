// Smooth scrolling for navigation links
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

// Header hide/show on scroll
let lastScrollTop = 0;
function updateHeader() {
    const header = document.querySelector('.header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Hide/show navbar based on scroll direction
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down & past 100px
        header.classList.add('hidden');
    } else {
        // Scrolling up
        header.classList.remove('hidden');
    }
    
    // Background change on scroll
    if (scrollTop > 50) {
        header.style.background = 'rgba(0, 0, 0, 0.5)';
        header.style.backdropFilter = 'blur(15px)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.3)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
}

// Scroll progress bar
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    if (scrollProgress) {
        scrollProgress.style.width = scrollPercent + '%';
    }
}

// Optimized scroll handler
let ticking = false;
function handleScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateHeader();
            updateScrollProgress();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', handleScroll);

// Enhanced scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, observerOptions);

// Initialize scroll animations
function initScrollAnimations() {
    document.querySelectorAll('.package-card, .testimonial-card, .activity-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// Form validation for newsletter
function initFormValidation() {
    const newsletterForm = document.querySelector('.newsletter-form');
    const emailInput = document.querySelector('.newsletter-input');
    const submitButton = document.querySelector('.newsletter-button');
    
    if (newsletterForm && emailInput && submitButton) {
        submitButton.addEventListener('click', function(e) {
            e.preventDefault();
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                submitButton.textContent = 'Subscribed!';
                submitButton.style.background = 'linear-gradient(135deg, #4caf50, #45a049)';
                emailInput.value = '';
                
                setTimeout(() => {
                    submitButton.textContent = 'Submit';
                    submitButton.style.background = 'linear-gradient(135deg, #64b5f6, #42a5f5)';
                }, 2000);
            } else {
                emailInput.style.borderColor = '#f44336';
                emailInput.placeholder = 'Please enter a valid email';
                
                setTimeout(() => {
                    emailInput.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    emailInput.placeholder = 'Email Address';
                }, 2000);
            }
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced activity card interactions
function initActivityCards() {
    const activityCards = document.querySelectorAll('.activity-card');
    
    activityCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Simple hover effect
            this.style.transform = 'translateX(2px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
        
        // Add click animation
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateX(5px)';
            }, 150);
        });
    });
}

// Enhanced package card animations
function initPackageCards() {
    const packageCards = document.querySelectorAll('.package-card');
    
    packageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const image = this.querySelector('.package-image');
            if (image) {
                image.style.filter = 'brightness(1.1) contrast(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const image = this.querySelector('.package-image');
            if (image) {
                image.style.filter = 'brightness(1) contrast(1)';
            }
        });
    });
}

// Enhanced testimonial card animations
function initTestimonialCards() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const avatar = this.querySelector('.testimonial-avatar');
            if (avatar) {
                avatar.style.transform = 'scale(1.1) rotate(5deg)';
                avatar.style.boxShadow = '0 10px 20px rgba(100, 181, 246, 0.3)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const avatar = this.querySelector('.testimonial-avatar');
            if (avatar) {
                avatar.style.transform = 'scale(1) rotate(0deg)';
                avatar.style.boxShadow = '0 0 0 rgba(100, 181, 246, 0)';
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initFormValidation();
    initActivityCards();
    initPackageCards();
    initTestimonialCards();
    initJourneyButton();
    initPackageNavigation();
    initTestimonialNavigation();
    updateScrollProgress();
    
    // Smooth page load
    document.body.style.opacity = '1';
});

// Horizontal scroll with dots navigation for packages
function initPackageNavigation() {
    const packagesGrid = document.querySelector('.packages-grid');
    const packagesDots = document.querySelectorAll('.packages-dot');
    const packageCards = document.querySelectorAll('.package-card');
    
    if (!packagesGrid || !packagesDots.length) return;
    
    // Add click handlers to dots
    packagesDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const cardWidth = packageCards[0].offsetWidth + 25; // card width + gap
            packagesGrid.scrollTo({
                left: index * cardWidth,
                behavior: 'smooth'
            });
            updatePackagesDots(index);
        });
    });
    
    // Update dots on scroll
    packagesGrid.addEventListener('scroll', () => {
        const scrollLeft = packagesGrid.scrollLeft;
        const cardWidth = packageCards[0].offsetWidth + 25;
        const activeIndex = Math.round(scrollLeft / cardWidth);
        updatePackagesDots(activeIndex);
    });
}

function updatePackagesDots(activeIndex) {
    const dots = document.querySelectorAll('.packages-dot');
    dots.forEach((dot, index) => {
        if (index === activeIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Horizontal scroll with dots navigation for testimonials
function initTestimonialNavigation() {
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    const testimonialsDots = document.querySelectorAll('.testimonials-dot');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    if (!testimonialsGrid || !testimonialsDots.length) return;
    
    // Add click handlers to dots
    testimonialsDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const cardWidth = testimonialCards[0].offsetWidth + 25; // card width + gap
            testimonialsGrid.scrollTo({
                left: index * cardWidth,
                behavior: 'smooth'
            });
            updateTestimonialsDots(index);
        });
    });
    
    // Update dots on scroll
    testimonialsGrid.addEventListener('scroll', () => {
        const scrollLeft = testimonialsGrid.scrollLeft;
        const cardWidth = testimonialCards[0].offsetWidth + 25;
        const activeIndex = Math.round(scrollLeft / cardWidth);
        updateTestimonialsDots(activeIndex);
    });
}

function updateTestimonialsDots(activeIndex) {
    const dots = document.querySelectorAll('.testimonials-dot');
    dots.forEach((dot, index) => {
        if (index === activeIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Journey button permanent glow effect
function initJourneyButton() {
    const journeyButton = document.querySelector('.journey-button');
    const journeyText = document.querySelector('.journey-text');
    
    if (journeyButton && journeyText) {
        journeyButton.addEventListener('click', function(e) {
            e.preventDefault();
            journeyText.classList.add('clicked');
        });
    }
}