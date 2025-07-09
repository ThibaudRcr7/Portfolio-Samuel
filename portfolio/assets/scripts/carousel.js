document.addEventListener('DOMContentLoaded', function () {
  const section = document.querySelector('.carousel-section');
  if (!section) return;
  const track = section.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const leftBtn = section.querySelector('.carousel-arrow--left');
  const rightBtn = section.querySelector('.carousel-arrow--right');
  let currentIndex = 0;
  let isTransitioning = false;
  let slideWidth = slides[0].offsetWidth;

  // Initialisation des positions
  function initializeSlides() {
    slides.forEach((slide, index) => {
      slide.classList.remove('active', 'left', 'right');
      
      if (index === currentIndex) {
        slide.classList.add('active');
      } else if (index === (currentIndex - 1 + slides.length) % slides.length) {
        slide.classList.add('left');
      } else if (index === (currentIndex + 1) % slides.length) {
        slide.classList.add('right');
      }
    });
  }

  // Mise à jour des positions lors du changement de slide
  function updateSlides() {
    slides.forEach((slide, index) => {
      slide.classList.remove('active', 'left', 'right');
      
      if (index === currentIndex) {
        slide.classList.add('active');
      } else if (index === (currentIndex - 1 + slides.length) % slides.length) {
        slide.classList.add('left');
      } else if (index === (currentIndex + 1) % slides.length) {
        slide.classList.add('right');
      }
    });
  }

  // Gestion des clics sur les slides
  function handleSlideClick(e) {
    const clickedSlide = e.target.closest('.carousel-slide');
    if (!clickedSlide) return;

    const clickedIndex = slides.indexOf(clickedSlide);
    
    // Si on clique sur l'image active, ne rien faire
    if (clickedIndex === currentIndex) return;

    // Si on clique sur l'image de gauche
    if (clickedSlide.classList.contains('left')) {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    }
    // Si on clique sur l'image de droite
    else if (clickedSlide.classList.contains('right')) {
      currentIndex = (currentIndex + 1) % slides.length;
    }
    // Si on clique sur une autre image
    else {
      currentIndex = clickedIndex;
    }

    updateSlides();
  }

  // Fonction pour naviguer
  function goTo(idx) {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex = (idx + slides.length) % slides.length;
    updateSlides();
    setTimeout(() => { isTransitioning = false; }, 600);
  }

  // Gestion des boutons de navigation
  function handleNavigation() {
    if (leftBtn) {
      leftBtn.addEventListener('click', () => goTo(currentIndex - 1));
    }
    if (rightBtn) {
      rightBtn.addEventListener('click', () => goTo(currentIndex + 1));
    }
  }

  // Initialisation
  initializeSlides();
  track.addEventListener('click', handleSlideClick);
  handleNavigation();

  // Responsive : adaptation pour mobile
  function checkMobile() {
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      // Sur mobile, on garde les flèches visibles et fonctionnelles
      if (leftBtn) leftBtn.style.display = 'flex';
      if (rightBtn) rightBtn.style.display = 'flex';
      
      // Réinitialiser les slides pour mobile
      slideWidth = slides[0].offsetWidth;
      updateSlides();
    } else {
      // Sur desktop, on garde le comportement normal
      if (leftBtn) leftBtn.style.display = 'none';
      if (rightBtn) rightBtn.style.display = 'none';
      slideWidth = slides[0].offsetWidth;
      updateSlides();
    }
  }

  // Écouter les changements de taille d'écran
  window.addEventListener('resize', checkMobile);
  
  // Vérifier au chargement
  setTimeout(checkMobile, 100);
  checkMobile();
}); 