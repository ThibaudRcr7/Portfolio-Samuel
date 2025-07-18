// Hero Slider simple, sans effet de défloutage
(function() {
  const slider = document.querySelector('.slider-container');
  if (!slider) return;
  const images = Array.from(slider.querySelectorAll('.slider-img'));
  const leftBtn = slider.querySelector('.slider-arrow--left');
  const rightBtn = slider.querySelector('.slider-arrow--right');
  const counter = slider.querySelector('.slider-counter');
  if (!images.length || !leftBtn || !rightBtn || !counter) return;

  let current = 0;
  let autoplayTimer = null;
  const AUTOPLAY_DELAY = 5000; // 5s
  let isPaused = false;

  // Affiche l'image idx, masque les autres
  function showSlide(idx) {
    images.forEach((img, i) => {
      img.classList.remove('active', 'deblur');
    });
    images[idx].classList.add('active');
    current = idx;
    counter.textContent = `${idx+1}/${images.length}`;
  }

  function nextSlide() {
    showSlide((current + 1) % images.length);
  }
  function prevSlide() {
    showSlide((current - 1 + images.length) % images.length);
  }

  // Autoplay
  function startAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => {
      if (!isPaused) nextSlide();
    }, AUTOPLAY_DELAY);
  }
  function pauseAutoplay() { isPaused = true; }
  function resumeAutoplay() { isPaused = false; }

  // Flèches
  leftBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    prevSlide();
    pauseAutoplay();
    setTimeout(resumeAutoplay, 10000);
  });
  rightBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    nextSlide();
    pauseAutoplay();
    setTimeout(resumeAutoplay, 10000);
  });

  // Clavier
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      pauseAutoplay();
      setTimeout(resumeAutoplay, 10000);
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      pauseAutoplay();
      setTimeout(resumeAutoplay, 10000);
    }
  });

  // Swipe mobile
  let startX = null;
  slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });
  slider.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
      pauseAutoplay();
      setTimeout(resumeAutoplay, 10000);
    }
    startX = null;
  });

  // Pause autoplay au hover
  slider.addEventListener('mouseenter', pauseAutoplay);
  slider.addEventListener('mouseleave', resumeAutoplay);

  // Défloutage local au hover (desktop)
  images.forEach((img, i) => {
    img.addEventListener('mouseenter', () => {
      if (window.innerWidth > 1024 && i === current) {
        // On retire la classe sur toutes les autres images pour éviter les conflits
        images.forEach(im => im.classList.remove('deblur'));
        img.classList.add('deblur');
      }
    });
    img.addEventListener('mouseleave', () => {
      img.classList.remove('deblur');
    });
  });

  // Initialisation
  showSlide(0);
  startAutoplay();
})(); 