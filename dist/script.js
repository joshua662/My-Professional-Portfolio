const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

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

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href === '#' || href === '') {
            e.preventDefault();
            return;
        }
        
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            if (window.innerWidth < 768) {
                mobileMenu.classList.add('hidden');
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
updateActiveNav(); 

document.addEventListener('click', function(event) {
    if (!event.target.closest('.group')) {
    }
});

