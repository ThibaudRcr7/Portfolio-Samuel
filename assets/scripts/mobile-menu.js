/**
 * Mobile Menu Handler
 * Gère l'ouverture/fermeture du menu mobile avec accessibilité
 */

class MobileMenu {
    constructor() {
        this.burgers = document.querySelectorAll('.nav__burger');
        this.overlay = document.querySelector('.nav__mobile-overlay');
        this.body = document.body;
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        if (!this.burgers.length || !this.overlay) return;
        
        this.bindEvents();
    }
    
    bindEvents() {
        // Toggle menu on burger click (both desktop and mobile)
        this.burgers.forEach(burger => {
            burger.addEventListener('click', () => this.toggle());
        });
        
        // Close on overlay click
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });
        
        // Close on link click
        const mobileLinks = this.overlay.querySelectorAll('.nav__link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => this.close());
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }
    
    toggle() {
        this.isOpen ? this.close() : this.open();
    }
    
    open() {
        this.isOpen = true;
        this.overlay.classList.add('nav__mobile-overlay--active');
        this.overlay.setAttribute('aria-hidden', 'false');
        
        // Update all burger buttons
        this.burgers.forEach(burger => {
            burger.setAttribute('aria-expanded', 'true');
        });
        
        this.body.style.overflow = 'hidden';
        
        // Focus management
        const firstLink = this.overlay.querySelector('.nav__link');
        if (firstLink) {
            firstLink.focus();
        }
    }
    
    close() {
        this.isOpen = false;
        this.overlay.classList.remove('nav__mobile-overlay--active');
        this.overlay.setAttribute('aria-hidden', 'true');
        
        // Update all burger buttons
        this.burgers.forEach(burger => {
            burger.setAttribute('aria-expanded', 'false');
        });
        
        this.body.style.overflow = '';
        
        // Return focus to the mobile burger button
        const mobileBurger = document.querySelector('.nav__burger--mobile');
        if (mobileBurger) {
            mobileBurger.focus();
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new MobileMenu();
}); 