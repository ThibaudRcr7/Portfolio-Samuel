/**
 * Gestionnaire de galerie pour les pages de projets individuels
 */
class ProjectGallery {
    constructor() {
        this.galleries = document.querySelectorAll('.project-gallery');
        this.init();
    }

    init() {
        this.galleries.forEach(gallery => {
            this.setupGallery(gallery);
        });
    }

    setupGallery(gallery) {
        const scroll = gallery.querySelector('.project-gallery__scroll');
        const items = gallery.querySelectorAll('.project-gallery__item');
        const itemWidth = 400; // Largeur d'un item en px
        
        // Créer les flèches de navigation
        this.createNavigationArrows(gallery, scroll, items, itemWidth);
        
        // Créer les indicateurs
        this.createIndicators(gallery, items);
        
        // Gérer les événements clavier
        this.handleKeyboardEvents(scroll, items, itemWidth);
        
        // Gérer le swipe sur mobile
        this.handleTouchEvents(scroll, items, itemWidth);
    }

    createNavigationArrows(gallery, scroll, items, itemWidth) {
        const wrapper = gallery.querySelector('.project-gallery__wrapper');
        
        // Flèche précédente
        const prevBtn = document.createElement('button');
        prevBtn.className = 'project-gallery__nav project-gallery__nav--prev';
        prevBtn.innerHTML = '&#8592;';
        prevBtn.setAttribute('aria-label', 'Image précédente');
        prevBtn.addEventListener('click', () => {
            this.navigateToItem(scroll, items, itemWidth, 'prev');
        });
        
        // Flèche suivante
        const nextBtn = document.createElement('button');
        nextBtn.className = 'project-gallery__nav project-gallery__nav--next';
        nextBtn.innerHTML = '&#8594;';
        nextBtn.setAttribute('aria-label', 'Image suivante');
        nextBtn.addEventListener('click', () => {
            this.navigateToItem(scroll, items, itemWidth, 'next');
        });
        
        wrapper.appendChild(prevBtn);
        wrapper.appendChild(nextBtn);
        
        // Mettre à jour l'état des flèches
        this.updateNavigationState(scroll, items, itemWidth, prevBtn, nextBtn);
    }

    createIndicators(gallery, items) {
        const wrapper = gallery.querySelector('.project-gallery__wrapper');
        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.className = 'project-gallery__indicators';
        
        items.forEach((item, index) => {
            const indicator = document.createElement('button');
            indicator.className = 'project-gallery__indicator';
            indicator.setAttribute('aria-label', `Aller à l'image ${index + 1}`);
            
            if (index === 0) {
                indicator.classList.add('active');
            }
            
            indicator.addEventListener('click', () => {
                this.goToItem(gallery, index);
            });
            
            indicatorsContainer.appendChild(indicator);
        });
        
        wrapper.appendChild(indicatorsContainer);
    }

    navigateToItem(scroll, items, itemWidth, direction) {
        const currentScroll = scroll.scrollLeft || parseInt(scroll.style.transform.replace('translateX(', '').replace('px)', '') || 0);
        const currentIndex = Math.round(currentScroll / itemWidth);
        
        let newIndex;
        if (direction === 'prev') {
            newIndex = Math.max(0, currentIndex - 1);
        } else {
            newIndex = Math.min(items.length - 1, currentIndex + 1);
        }
        
        this.goToItem(scroll.closest('.project-gallery'), newIndex);
    }

    goToItem(gallery, index) {
        const scroll = gallery.querySelector('.project-gallery__scroll');
        const items = gallery.querySelectorAll('.project-gallery__item');
        const itemWidth = 400;
        const prevBtn = gallery.querySelector('.project-gallery__nav--prev');
        const nextBtn = gallery.querySelector('.project-gallery__nav--next');
        const indicators = gallery.querySelectorAll('.project-gallery__indicator');
        
        // Calculer la position
        const targetPosition = index * itemWidth;
        
        // Animer le scroll
        scroll.style.transform = `translateX(-${targetPosition}px)`;
        
        // Mettre à jour les indicateurs
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        // Mettre à jour l'état des flèches
        this.updateNavigationState(scroll, items, itemWidth, prevBtn, nextBtn, index);
    }

    updateNavigationState(scroll, items, itemWidth, prevBtn, nextBtn, currentIndex = null) {
        if (currentIndex === null) {
            const currentScroll = scroll.scrollLeft || parseInt(scroll.style.transform.replace('translateX(', '').replace('px)', '') || 0);
            currentIndex = Math.round(currentScroll / itemWidth);
        }
        
        // Désactiver/activer les flèches
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === items.length - 1;
    }

    handleKeyboardEvents(scroll, items, itemWidth) {
        document.addEventListener('keydown', (e) => {
            const gallery = scroll.closest('.project-gallery');
            if (!gallery) return;
            
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.navigateToItem(scroll, items, itemWidth, 'prev');
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.navigateToItem(scroll, items, itemWidth, 'next');
            }
        });
    }

    handleTouchEvents(scroll, items, itemWidth) {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        scroll.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });
        
        scroll.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            currentX = e.touches[0].clientX;
        });
        
        scroll.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            
            const diff = startX - currentX;
            const threshold = 50; // Seuil minimum pour déclencher la navigation
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    // Swipe gauche - image suivante
                    this.navigateToItem(scroll, items, itemWidth, 'next');
                } else {
                    // Swipe droite - image précédente
                    this.navigateToItem(scroll, items, itemWidth, 'prev');
                }
            }
        });
    }
}

// Initialiser la galerie quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    new ProjectGallery();
}); 