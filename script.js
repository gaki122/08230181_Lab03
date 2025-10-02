

document.addEventListener('DOMContentLoaded', () => {

    // =================================================================
    // NEW FEATURE: DARK MODE / LIGHT MODE TOGGLE (DOM & Event Handling)
    // =================================================================
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Helper function to apply the theme
    function applyTheme(isDarkMode) {
        if (isDarkMode) {
            // DOM Manipulation: Add the class to switch to dark mode
            body.classList.add('dark-mode');
            // DOM Manipulation: Change the icon to a sun (for switching back to light)
            themeToggle.querySelector('i').className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark'); // Save preference
        } else {
            // DOM Manipulation: Remove the class to switch to light mode
            body.classList.remove('dark-mode');
            // DOM Manipulation: Change the icon to a moon (for switching back to dark)
            themeToggle.querySelector('i').className = 'fas fa-moon';
            localStorage.setItem('theme', 'light'); // Save preference
        }
    }

    // Check saved preference on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        applyTheme(true);
    } else if (!savedTheme) {
        // Optional: Check system preference if no theme is saved
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            applyTheme(true);
        }
    }


    // Event Handling: Listen for clicks on the toggle button
    themeToggle.addEventListener('click', () => {
        // Toggle the theme based on the current body class
        const isCurrentlyDark = body.classList.contains('dark-mode');
        applyTheme(!isCurrentlyDark);
    });
    // =================================================================


    // =================================================================
    // 1. READ MORE / READ LESS TOGGLE (DOM Manipulation & Click Event)
    // =================================================================

    const readMoreToggles = document.querySelectorAll('.read-more-toggle');

    readMoreToggles.forEach(button => {
        const contentId = button.getAttribute('data-target');
        const content = document.getElementById(contentId);

        if (content) {
            button.addEventListener('click', () => {
                content.classList.toggle('expanded');

                if (content.classList.contains('expanded')) {
                    button.textContent = 'Read Less';
                } else {
                    button.textContent = 'Read More';
                }
            });
        }
    });

    // =================================================================
    // 2. ACTIVE NAVIGATION LINK (DOM Manipulation & Scroll Event)
    // =================================================================
    
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Offset for header height
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });


    // =================================================================
    // 3. CONTACT FORM SUBMISSION (querySelector & Form Submit Event)
    // =================================================================

    const contactForm = document.querySelector('.contact-form form');

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const nameInput = document.getElementById('name');
            const userName = nameInput.value;

            const messageArea = contactForm.querySelector('h3'); 
            
            if (userName) {
                messageArea.textContent = `Thank you, ${userName}! Your message has been sent successfully.`;
                messageArea.style.color = 'green';
                messageArea.style.textAlign = 'center';
            } else {
                messageArea.textContent = 'Please fill out all fields.';
                messageArea.style.color = 'red';
            }
            
            contactForm.reset();
        });
    }

});