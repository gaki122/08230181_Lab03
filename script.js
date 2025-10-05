// ============================
// 1. JAVASCRIPT BASICS
// ============================

// Variables and Data Types
const portfolioData = {
    name: "Rinzin Wangmo",
    role: "ICT 'C' Student",
    email: "wangmor546@gmail.com",
    phone: "+975 17693456",
    location: "Samtse, Bhutan"
};

// Array of skills
const technicalSkills = ["HTML/CSS", "JavaScript", "Python", "SQL", "Git/GitHub"];
const softSkills = ["Problem Solving", "Team Collaboration", "Communication", "Time Management"];

// ============================
// 2. DOM MANIPULATION
// ============================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all features
    initNavigation();
    initThemeToggle();
    initReadMore();
    initFormValidation();
    initScrollAnimations();
    initSkillAnimations();
    initTypingEffect();
    
    console.log("Portfolio JavaScript loaded successfully!");
});

// ============================
// 3. EVENT HANDLING
// ============================

// Navigation Active State
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Click event on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            
            // Close mobile menu after clicking
            const navToggle = document.getElementById('nav-toggle');
            if (navToggle.checked) {
                navToggle.checked = false;
            }
        });
    });
    
    // Scroll event to highlight active section
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Theme Toggle (Dark/Light Mode)
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    const heroImage = document.querySelector('.person-placeholder img');
    
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        if (heroImage) heroImage.src = 'images/darkmode.jpg';
    }
    
    // Toggle theme on click
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        // Update icon and hero image
        if (body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
            if (heroImage) heroImage.src = 'images/darkmode.jpg';
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
            if (heroImage) heroImage.src = 'images/cover.jpg';
        }
    });
}

// Read More/Less Functionality
function initReadMore() {
    const readMoreButtons = document.querySelectorAll('.read-more-toggle');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement.classList.contains('expanded')) {
                // Collapse
                targetElement.classList.remove('expanded');
                this.textContent = 'Read More';
            } else {
                // Expand
                targetElement.classList.add('expanded');
                this.textContent = 'Read Less';
            }
        });
    });
}

// Form Validation and Submission
function initFormValidation() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validation
            if (name === '' || email === '' || message === '') {
                showNotification('Please fill in all fields!', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address!', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Message sent successfully! Thank you for reaching out.', 'success');
            
            // Reset form
            contactForm.reset();
        });
        
        // Real-time email validation
        const emailInput = document.getElementById('email');
        emailInput.addEventListener('blur', function() {
            if (this.value.trim() !== '' && !isValidEmail(this.value)) {
                this.style.borderColor = '#ff4444';
                showNotification('Invalid email format', 'error');
            } else {
                this.style.borderColor = '#e9ecef';
            }
        });
    }
}

// Email validation helper function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#ff4444'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animateElements = document.querySelectorAll('.project-card, .timeline-item, .skill-category');
    animateElements.forEach(el => observer.observe(el));
}

// Skill Bar Animations
function initSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                bar.style.width = '0%';
                
                // Get the target width from the class
                let targetWidth = 0;
                if (bar.classList.contains('skill-progress-30')) targetWidth = 30;
                else if (bar.classList.contains('skill-progress-10')) targetWidth = 10;
                else if (bar.classList.contains('skill-progress-70')) targetWidth = 70;
                else if (bar.classList.contains('skill-progress-50')) targetWidth = 50;
                
                // Animate to target width
                setTimeout(() => {
                    bar.style.transition = 'width 2s ease-out';
                    bar.style.width = targetWidth + '%';
                }, 100);
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Typing Effect for Hero Section
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let charIndex = 0;
    
    function typeChar() {
        if (charIndex < originalText.length) {
            heroTitle.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, 100);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeChar, 1000);
}

// Smooth Scroll Enhancement
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add CSS animations dynamically
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

// Log portfolio data on console
console.log("Portfolio Owner:", portfolioData.name);
console.log("Technical Skills:", technicalSkills);
console.log("Soft Skills:", softSkills);