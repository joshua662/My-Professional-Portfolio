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

// ===== Certification Modals =====

/**
 * Opens a certification modal by ID.
 * @param {string} certId - The certification identifier (e.g., 'cert-1').
 */
function openModal(certId) {
    const modal = document.getElementById(`${certId}-modal`);
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex'); // Add flex for centering
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

/**
 * Closes a certification modal by ID.
 * @param {string} certId - The certification identifier (e.g., 'cert-1').
 */
function closeModal(certId) {
    const modal = document.getElementById(`${certId}-modal`);
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex'); // Remove flex
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Initialize modals when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Attach click handlers to certification image cards
    document.querySelectorAll('[data-cert-modal]').forEach(card => {
        card.addEventListener('click', function(e) {
            const certId = this.getAttribute('data-cert-modal');
            if (certId) {
                e.preventDefault();
                e.stopPropagation();
                openModal(certId);
            }
        });
    });

    // Close modal when clicking on the overlay (dark background)
    document.querySelectorAll('[id$="-modal"]').forEach(modal => {
        modal.addEventListener('click', function(e) {
            // Close if clicking directly on the overlay, not the modal content
            if (e.target === modal) {
                const id = modal.id.replace('-modal', '');
                closeModal(id);
            }
        });
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('[id$="-modal"]').forEach(modal => {
                if (!modal.classList.contains('hidden')) {
                    const id = modal.id.replace('-modal', '');
                    closeModal(id);
                }
            });
        }
    });
});

// Make functions globally available for onclick handlers
window.openModal = openModal;
window.closeModal = closeModal;

document.addEventListener('DOMContentLoaded', function() {
    const emailLink = document.getElementById('email-contact-link');
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            const confirmModal = document.getElementById('mailto-confirm-modal');
            if (confirmModal) {
                confirmModal.classList.remove('hidden');
                confirmModal.classList.add('flex');
                document.body.style.overflow = 'hidden';
            }
        });
    }
    const confirmBtn = document.querySelector('[data-confirm-mailto]');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function() {
            const gmailUrl = 'https://mail.google.com/mail/?view=cm&to=joshiasimpas36@gmail.com';
            const win = window.open(gmailUrl, '_blank', 'noopener');
            const confirmModal = document.getElementById('mailto-confirm-modal');
            if (confirmModal) {
                confirmModal.classList.add('hidden');
                confirmModal.classList.remove('flex');
            }
            if (!win) {
                const warningModal = document.getElementById('mailto-warning-modal');
                if (warningModal) {
                    warningModal.classList.remove('hidden');
                    warningModal.classList.add('flex');
                    document.body.style.overflow = 'hidden';
                }
            } else {
                document.body.style.overflow = '';
            }
        });
    }
    const closeConfirmBtn = document.querySelector('[data-close-mailto-confirm]');
    if (closeConfirmBtn) {
        closeConfirmBtn.addEventListener('click', function() {
            const confirmModal = document.getElementById('mailto-confirm-modal');
            if (confirmModal) {
                confirmModal.classList.add('hidden');
                confirmModal.classList.remove('flex');
                document.body.style.overflow = '';
            }
        });
    }
    const closeBtn = document.querySelector('[data-close-mailto-modal]');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            const modal = document.getElementById('mailto-warning-modal');
            if (modal) {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
                document.body.style.overflow = '';
            }
        });
    }
    const modalOverlay = document.getElementById('mailto-warning-modal');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                modalOverlay.classList.add('hidden');
                modalOverlay.classList.remove('flex');
                document.body.style.overflow = '';
            }
        });
    }
    const confirmOverlay = document.getElementById('mailto-confirm-modal');
    if (confirmOverlay) {
        confirmOverlay.addEventListener('click', function(e) {
            if (e.target === confirmOverlay) {
                confirmOverlay.classList.add('hidden');
                confirmOverlay.classList.remove('flex');
                document.body.style.overflow = '';
            }
        });
    }
});

