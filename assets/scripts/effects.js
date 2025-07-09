// Constantes pour la configuration
const CONFIG = {
  MOBILE_BREAKPOINT: 768,
  BLUR: {
    RADIUS: 300,
    INNER_RADIUS: 100,
    FILTER: 'blur(18px) brightness(0.4)',
    INVERSE_FILTER: 'blur(0px) brightness(1)'
  },
  PARALLAX: {
    SPEED: 0.3,
    OFFSET: 500
  }
};

// Gestionnaire d'effets de flou
class BlurEffect {
  constructor() {
    this.wrapper = document.querySelector('.hero-wrapper');
    this.bg = document.querySelector('.placeholder-bg');
    
    if (!this.wrapper || !this.bg) {
      console.warn('Elements nécessaires pour BlurEffect non trouvés');
      return;
    }

    this.boundMouseMove = this.onMouseMove.bind(this);
    this.boundMouseEnter = this.onMouseEnter.bind(this);
    this.boundMouseLeave = this.onMouseLeave.bind(this);
    this.boundCheckMobile = this.checkMobile.bind(this);

    this.init();
  }

  updateMask(x, y) {
    if (!this.wrapper || !this.bg) return;

    this.bg.style.filter = CONFIG.BLUR.FILTER;
    
    if (!this.wrapper.querySelector('.blur-effect')) {
      const blurEffect = document.createElement('div');
      blurEffect.className = 'blur-effect';
      blurEffect.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        background: url('/assets/images/ui/Hero-bg.webp') center center / cover no-repeat;
        background-size: cover;
        background-position: center;
        filter: ${CONFIG.BLUR.INVERSE_FILTER};
        mask-image: radial-gradient(circle ${CONFIG.BLUR.RADIUS}px at ${x}px ${y}px, 
          rgba(0,0,0,1) ${CONFIG.BLUR.INNER_RADIUS}px, 
          rgba(0,0,0,0) ${CONFIG.BLUR.RADIUS}px);
        -webkit-mask-image: radial-gradient(circle ${CONFIG.BLUR.RADIUS}px at ${x}px ${y}px, 
          rgba(0,0,0,1) ${CONFIG.BLUR.INNER_RADIUS}px, 
          rgba(0,0,0,0) ${CONFIG.BLUR.RADIUS}px);
        transition: mask-image 0.3s ease-out, -webkit-mask-image 0.3s ease-out;
        pointer-events: none;
      `;
      this.wrapper.appendChild(blurEffect);
    } else {
      const blurEffect = this.wrapper.querySelector('.blur-effect');
      const mask = `radial-gradient(circle ${CONFIG.BLUR.RADIUS}px at ${x}px ${y}px, 
        rgba(0,0,0,1) ${CONFIG.BLUR.INNER_RADIUS}px, 
        rgba(0,0,0,0) ${CONFIG.BLUR.RADIUS}px)`;
      blurEffect.style.maskImage = mask;
      blurEffect.style.webkitMaskImage = mask;
    }
  }

  clearMask() {
    if (!this.bg) return;
    
    this.bg.style.filter = CONFIG.BLUR.FILTER;
    const blurEffect = this.wrapper?.querySelector('.blur-effect');
    if (blurEffect) {
      blurEffect.style.maskImage = 'none';
      blurEffect.style.webkitMaskImage = 'none';
      setTimeout(() => {
        if (blurEffect && blurEffect.parentNode) {
          blurEffect.remove();
        }
      }, 300);
    }
  }

  onMouseMove(e) {
    if (window.innerWidth < CONFIG.MOBILE_BREAKPOINT) {
      this.clearMask();
      return;
    }
    const rect = this.wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    requestAnimationFrame(() => this.updateMask(x, y));
  }

  onMouseEnter() {
    if (!this.bg) return;
    this.bg.style.transition = 'filter 0.3s';
    document.body.style.cursor = 'none';
  }

  onMouseLeave() {
    this.clearMask();
    document.body.style.cursor = '';
  }

  checkMobile() {
    if (!this.wrapper) return;

    if (window.innerWidth < CONFIG.MOBILE_BREAKPOINT) {
      this.clearMask();
      this.removeEventListeners();
      document.body.style.cursor = '';
    } else {
      this.addEventListeners();
    }
  }

  addEventListeners() {
    if (!this.wrapper) return;
    this.wrapper.addEventListener('mousemove', this.boundMouseMove);
    this.wrapper.addEventListener('mouseenter', this.boundMouseEnter);
    this.wrapper.addEventListener('mouseleave', this.boundMouseLeave);
  }

  removeEventListeners() {
    if (!this.wrapper) return;
    this.wrapper.removeEventListener('mousemove', this.boundMouseMove);
    this.wrapper.removeEventListener('mouseenter', this.boundMouseEnter);
    this.wrapper.removeEventListener('mouseleave', this.boundMouseLeave);
  }

  init() {
    this.checkMobile();
    window.addEventListener('resize', this.boundCheckMobile);
  }

  destroy() {
    this.removeEventListeners();
    window.removeEventListener('resize', this.boundCheckMobile);
    this.clearMask();
  }
}

// Gestionnaire d'effet parallax
class ParallaxEffect {
  constructor() {
    this.section = document.querySelector('.gallery-section');
    if (!this.section) {
      console.warn('Section galerie non trouvée');
      return;
    }

    this.left = this.section.querySelector('.column-left');
    this.center = this.section.querySelector('.column-center');
    this.right = this.section.querySelector('.column-right');

    if (!this.left || !this.center || !this.right) {
      console.warn('Colonnes de la galerie non trouvées');
      return;
    }

    this.ticking = false;
    this.boundParallax = this.parallax.bind(this);
    this.boundOnScroll = this.onScroll.bind(this);

    this.init();
  }

  parallax() {
    if (window.innerWidth < CONFIG.MOBILE_BREAKPOINT) {
      this.resetTransforms();
      return;
    }

    const scroll = window.scrollY;
    const offset = (scroll - this.section.offsetTop) * CONFIG.PARALLAX.SPEED;
    
    this.left.style.transform = `translateY(${-offset - CONFIG.PARALLAX.OFFSET}px)`;
    this.right.style.transform = `translateY(${-offset - CONFIG.PARALLAX.OFFSET}px)`;
    this.center.style.transform = `translateY(${offset}px)`;
  }

  resetTransforms() {
    this.left.style.transform = '';
    this.center.style.transform = '';
    this.right.style.transform = '';
  }

  onScroll() {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.parallax();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  init() {
    if ('requestAnimationFrame' in window) {
      window.addEventListener('scroll', this.boundOnScroll);
      window.addEventListener('resize', this.boundParallax);
      this.parallax();
    }
  }

  destroy() {
    window.removeEventListener('scroll', this.boundOnScroll);
    window.removeEventListener('resize', this.boundParallax);
    this.resetTransforms();
  }
}

// Initialisation des effets
document.addEventListener('DOMContentLoaded', () => {
  const blurEffect = new BlurEffect();
  const parallaxEffect = new ParallaxEffect();

  // Nettoyage lors de la destruction de la page
  window.addEventListener('unload', () => {
    blurEffect.destroy();
    parallaxEffect.destroy();
  });
}); 