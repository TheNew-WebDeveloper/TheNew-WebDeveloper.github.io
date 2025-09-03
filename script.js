// Portfolio JavaScript - Fixed Version

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initThemeToggle();
    initNavigation();
    initScrollEffects();
    initTypingEffect();
    initContactForm();
    initSkillBars();
    initCountUpAnimation();
});

// =================================
// Theme Toggle Functionality - FIXED
// =================================
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const darkCss = document.getElementById('dark-theme-css');
    const lightCss = document.getElementById('light-theme-css');

    if (!themeToggle || !darkCss || !lightCss) {
        console.error('Theme toggle elements not found');
        return;
    }

    // Check for saved theme preference or default to 'dark'
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    applyTheme(savedTheme);

    themeToggle.addEventListener('click', function() {
        const currentTheme = localStorage.getItem('portfolio-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        
        // Add smooth rotation animation
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    });

    function applyTheme(theme) {
        if (theme === 'dark') {
            darkCss.disabled = false;
            lightCss.disabled = true;
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            document.body.setAttribute('data-theme', 'dark');
        } else {
            darkCss.disabled = true;
            lightCss.disabled = false;
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            document.body.setAttribute('data-theme', 'light');
        }
        localStorage.setItem('portfolio-theme', theme);
        console.log('Theme switched to:', theme);
    }
}

// =================================
// Navigation and Mobile Menu - FIXED
// =================================
function initNavigation() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const header = document.querySelector('header');

    if (!mobileMenu || !navLinks) {
        console.error('Navigation elements not found');
        return;
    }

    // Mobile menu toggle
    mobileMenu.addEventListener('click', function() {
        console.log('Mobile menu clicked');
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close mobile menu when clicking on a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!header.contains(e.target) && navLinks.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Smooth scroll for navigation links
    navLinksItems.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            if (targetId === '#resume') {
                const resumeSection = document.querySelector('#resume');
                if (resumeSection) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = resumeSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
                return;
            }
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// =================================
// Scroll Effects and Animations
// =================================
function initScrollEffects() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Scroll reveal animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Trigger animations for specific elements
                if (entry.target.classList.contains('about')) {
                    setTimeout(animateStats, 500);
                }
                if (entry.target.classList.contains('skills')) {
                    setTimeout(animateSkills, 500);
                }
            }
        });
    }, observerOptions);

    // Add scroll-reveal class to elements
    const revealElements = document.querySelectorAll('.about, .skills, .projects, .contact');
    revealElements.forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });
}

// =================================
// Typing Effect for Hero Section
// =================================
function initTypingEffect() {
    const tagline = document.querySelector('.tagline');
    if (!tagline) return;

    const texts = [
        'Front-End Developer | Problem Solver | Tech Enthusiast',
        'Java Developer | Data-driven Developer | Code Artist',
        'Web Developer | Creative Thinker | Digital Innovator',
        'JavaScript Developer | Design Lover | Tech Explorer'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (!isDeleting && charIndex < currentText.length) {
            tagline.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeWriter, 100);
        } else if (isDeleting && charIndex > 0) {
            tagline.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(typeWriter, 50);
        } else if (!isDeleting && charIndex === currentText.length) {
            setTimeout(() => {
                isDeleting = true;
                typeWriter();
            }, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeWriter, 500);
        }
    }
    
    setTimeout(typeWriter, 2000);
}

// =================================
// Contact Form Handling
// =================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success state
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
            submitBtn.style.background = '#10b981';
            
            // Reset form
            contactForm.reset();
            
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            
        } catch (error) {
            // Error state
            submitBtn.innerHTML = '<i class="fas fa-times"></i> Failed to Send';
            submitBtn.style.background = '#ef4444';
            
            showNotification('Failed to send message. Please try again.', 'error');
        }
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 3000);
    });
}

// =================================
// Skill Progress Bars Animation
// =================================
function initSkillBars() {
    // This function is called when needed
}

function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = 'scale(0) rotate(0deg)';
            item.style.opacity = '0';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                item.style.transform = 'scale(1) rotate(360deg)';
                item.style.opacity = '1';
            }, 50);
        }, index * 100);
    });
}

// =================================
// Count Up Animation for Stats
// =================================
function initCountUpAnimation() {
    // This function is called when needed
}

let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;
    statsAnimated = true;
    
    const stats = document.querySelectorAll('.stat h3');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            stat.textContent = Math.floor(current);
            
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            }
        }, 40);
    });
}

// =================================
// Utility Functions
// =================================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="close-notification">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Manual close
    notification.querySelector('.close-notification').addEventListener('click', () => {
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    if (!notification || !notification.parentNode) return;
    
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// =================================
// Dynamic Styles
// =================================
const dynamicStyles = `
/* Menu open state */
body.menu-open {
    overflow: hidden;
}

/* Mobile menu active styles */
.menu-toggle.active .bar:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.menu-toggle.active .bar:nth-child(2) {
    opacity: 0;
}

.menu-toggle.active .bar:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
}

/* Notification Styles */
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    gap: 1rem;
    z-index: 10000;
    transform: translateX(400px);
    opacity: 0;
    transition: all 0.3s ease;
    min-width: 300px;
    border-left: 4px solid #3182ce;
}

.notification.show {
    transform: translateX(0);
    opacity: 1;
}

.notification.success {
    border-left-color: #10b981;
    color: #10b981;
}

.notification.error {
    border-left-color: #ef4444;
    color: #ef4444;
}

.close-notification {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: inherit;
    padding: 0;
    margin-left: auto;
    opacity: 0.7;
    transition: opacity 0.3s ease;
}

.close-notification:hover {
    opacity: 1;
}

/* Scroll reveal animations */
.scroll-reveal {
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.scroll-reveal.revealed {
    opacity: 1;
    transform: translateY(0);
}

/* Animation keyframes */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.fa-spinner {
    animation: spin 1s linear infinite;
}

/* Focus states for accessibility */
.btn:focus,
input:focus,
textarea:focus,
.nav-links a:focus,
.theme-toggle:focus {
    outline: 2px solid var(--accent-color);
    outline-offset: 2px;
}

/* Smooth transitions */
* {
    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

/* Performance optimizations */
.hero-content,
.project-card,
.skill-category,
.stat {
    will-change: transform;
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
    
    .scroll-reveal {
        transform: none;
        opacity: 1;
    }
}
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);

// Error handling
window.addEventListener('error', function(e) {
    console.error('Portfolio Error:', e.error);
});

// Performance monitoring
window.addEventListener('load', function() {
    console.log('Portfolio loaded successfully! 🚀');
});

console.log('Portfolio JavaScript initialized');