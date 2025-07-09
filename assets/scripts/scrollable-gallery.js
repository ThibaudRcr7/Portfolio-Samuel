/**
 * Gestionnaire de galerie scrollable verticalement - Sans scroll lock
 */
class ScrollableGallery {
    constructor() {
        this.galleries = document.querySelectorAll('.scrollable-gallery');
        this.init();
    }

    init() {
        this.galleries.forEach(gallery => {
            this.setupGallery(gallery);
        });
    }

    setupGallery(gallery) {
        const container = gallery.querySelector('.scrollable-gallery__container');
        const items = gallery.querySelectorAll('.scrollable-gallery__item');
        const scrollIndicator = gallery.querySelector('.scrollable-gallery__scroll-indicator');
        
        if (!container) return;

        // Observer pour les animations d'entrée
        this.setupIntersectionObserver(items);
        
        // Gestion de l'indicateur de scroll
        this.setupScrollIndicator(container, scrollIndicator, gallery);
        
        // Gestion des événements tactiles
        this.setupTouchEvents(container);
        
        // Gestion des événements clavier
        this.setupKeyboardEvents(container);
    }

    setupIntersectionObserver(items) {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, options);

        items.forEach(item => {
            observer.observe(item);
        });
    }

    setupScrollIndicator(container, indicator, gallery) {
        if (!indicator) return;

        const handleScroll = () => {
            const scrollTop = container.scrollTop;
            const scrollHeight = container.scrollHeight - container.clientHeight;
            const scrollProgress = scrollTop / scrollHeight;

            // Masquer l'indicateur quand on a scrollé un peu
            if (scrollProgress > 0.1) {
                gallery.classList.add('scrolled');
            } else {
                gallery.classList.remove('scrolled');
            }

            // Animation de l'indicateur basée sur le scroll
            if (indicator) {
                indicator.style.opacity = Math.max(0, 0.7 - scrollProgress * 2);
            }
        };

        container.addEventListener('scroll', handleScroll, { passive: true });
    }

    setupTouchEvents(container) {
        let startY = 0;
        let startScrollTop = 0;
        let isDragging = false;

        const handleTouchStart = (e) => {
            startY = e.touches[0].clientY;
            startScrollTop = container.scrollTop;
            isDragging = true;
        };

        const handleTouchMove = (e) => {
            if (!isDragging) return;
            
            const currentY = e.touches[0].clientY;
            const diff = startY - currentY;
            
            // Empêcher le scroll horizontal
            e.preventDefault();
            
            // Appliquer le scroll vertical
            container.scrollTop = startScrollTop + diff;
        };

        const handleTouchEnd = () => {
            isDragging = false;
        };

        container.addEventListener('touchstart', handleTouchStart, { passive: false });
        container.addEventListener('touchmove', handleTouchMove, { passive: false });
        container.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    setupKeyboardEvents(container) {
        const handleKeydown = (e) => {
            const gallery = container.closest('.scrollable-gallery');
            if (!gallery) return;

            // Vérifier si la galerie est visible
            const rect = gallery.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (!isVisible) return;

            switch (e.key) {
                case 'ArrowUp':
                case 'PageUp':
                    e.preventDefault();
                    container.scrollBy({
                        top: -100,
                        behavior: 'smooth'
                    });
                    break;
                    
                case 'ArrowDown':
                case 'PageDown':
                case ' ':
                    e.preventDefault();
                    container.scrollBy({
                        top: 100,
                        behavior: 'smooth'
                    });
                    break;
                    
                case 'Home':
                    e.preventDefault();
                    container.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    break;
                    
                case 'End':
                    e.preventDefault();
                    container.scrollTo({
                        top: container.scrollHeight,
                        behavior: 'smooth'
                    });
                    break;
            }
        };

        document.addEventListener('keydown', handleKeydown);
    }

    // Méthode pour ajouter dynamiquement des images
    static addImages(gallerySelector, images) {
        const gallery = document.querySelector(gallerySelector);
        if (!gallery) return;

        const grid = gallery.querySelector('.scrollable-gallery__grid');
        if (!grid) return;

        images.forEach((imageData, index) => {
            const item = document.createElement('div');
            item.className = 'scrollable-gallery__item';
            item.setAttribute('data-gallery-item', index + 1);

            const img = document.createElement('img');
            img.src = imageData.src;
            img.alt = imageData.alt || `Image ${index + 1}`;
            img.loading = 'lazy';

            item.appendChild(img);
            grid.appendChild(item);

            // Réobserver l'élément pour les animations
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });

            observer.observe(item);
        });
    }

    // Méthode pour changer le ratio d'aspect
    static setAspectRatio(gallerySelector, ratio) {
        const gallery = document.querySelector(gallerySelector);
        if (!gallery) return;

        gallery.classList.remove('scrollable-gallery--square', 'scrollable-gallery--landscape', 'scrollable-gallery--portrait');

        switch (ratio) {
            case 'square':
                gallery.classList.add('scrollable-gallery--square');
                break;
            case 'landscape':
                gallery.classList.add('scrollable-gallery--landscape');
                break;
            case 'portrait':
            default:
                gallery.classList.add('scrollable-gallery--portrait');
                break;
        }
    }
}

// Initialiser la galerie quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    window.scrollableGallery = new ScrollableGallery();
});

// Exposer la classe globalement
window.ScrollableGallery = ScrollableGallery; 