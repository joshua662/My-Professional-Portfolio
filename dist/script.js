// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Mobile dropdown functionality - toggle button for dropdown, links navigate
document.querySelectorAll('.mobile-dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const dropdown = this.closest('.mobile-dropdown');
        const content = dropdown.querySelector('.mobile-dropdown-content');
        const icon = dropdown.querySelector('.mobile-dropdown-icon');
        
        content.classList.toggle('hidden');
        icon.classList.toggle('rotate-180');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just #
        if (href === '#' || href === '') {
            e.preventDefault();
            return;
        }
        
        // Allow all navigation links to work normally
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            // Calculate offset for sticky header
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu after clicking a link
            if (window.innerWidth < 768) {
                mobileMenu.classList.add('hidden');
                // Also close any open dropdowns
                document.querySelectorAll('.mobile-dropdown-content').forEach(dropdown => {
                    dropdown.classList.add('hidden');
                });
                document.querySelectorAll('.mobile-dropdown-icon').forEach(icon => {
                    icon.classList.remove('rotate-180');
                });
            }
        } else {
            console.warn('Target not found:', href);
        }
    });
});

// Active navigation state on scroll
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-green-500', 'font-semibold');
        link.classList.add('text-gray-700');
        const href = link.getAttribute('href');
        if (href && href.includes(current)) {
            link.classList.remove('text-gray-700');
            link.classList.add('text-green-500', 'font-semibold');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav(); // Initial call

// Close dropdowns when clicking outside (desktop)
document.addEventListener('click', function(event) {
    if (!event.target.closest('.group')) {
        // Handle any cleanup if needed
    }
});

