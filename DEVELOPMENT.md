# Guide de développement - TOSAN PRODUCTIONS

## 🛠️ Configuration de l'environnement

### Prérequis
- Node.js 18+
- npm 9+
- Git

### Installation
```bash
git clone https://github.com/your-username/tosan-productions.git
cd tosan-productions
npm install
```

## 📁 Architecture du projet

### Structure SCSS
```
scss/
├── abstracts/
│   ├── _index.scss      # Import de tous les abstracts
│   ├── _variables.scss  # Variables CSS
│   └── _mixins.scss     # Mixins réutilisables
├── base/
│   ├── _reset.scss      # Reset CSS
│   ├── _typography.scss # Styles de typographie
│   └── _utilities.scss  # Classes utilitaires
├── components/
│   ├── _buttons.scss    # Boutons
│   ├── _navigation.scss # Navigation
│   ├── _hero.scss       # Section hero
│   ├── _gallery.scss    # Galeries
│   ├── _carousel.scss   # Carrousel
│   └── _menu-fullpage.scss # Menu plein écran
├── layout/
│   ├── _header.scss     # En-tête
│   ├── _footer.scss     # Pied de page
│   ├── _grid.scss       # Système de grille
│   └── _hero-wrapper.scss # Wrapper hero
├── pages/
│   ├── _home.scss       # Styles page d'accueil
│   ├── _about.scss      # Styles page à propos
│   ├── _projects.scss   # Styles pages projets
│   ├── _contact.scss    # Styles page contact
│   ├── _tarifs.scss     # Styles page tarifs
│   └── _shooting.scss   # Styles page shooting
└── responsive/
    ├── _tablet.scss     # Styles tablette
    └── _mobile.scss     # Styles mobile
```

### Conventions de nommage

#### Classes CSS
- **BEM (Block Element Modifier)** : `.block__element--modifier`
- **Exemple** : `.nav__link--active`, `.hero__title`

#### Variables CSS
- **Couleurs** : `--color-{nom}`
- **Espacements** : `--spacing-{taille}`
- **Typographie** : `--font-{type}`, `--font-size-{taille}`

#### Fichiers
- **Partiels SCSS** : `_nom-du-fichier.scss`
- **Composants** : `_component-name.scss`
- **Pages** : `_page-name.scss`

## 🎨 Système de design

### Couleurs
```scss
:root {
  --color-bg: #252422;           // Fond principal
  --color-bg-secondary: #403D39; // Fond secondaire
  --color-accent: #EB2828;       // Couleur d'accent
  --color-tertiary: #CCC5B9;     // Couleur tertiaire
  --color-text: #FFFCF2;         // Texte principal
  --color-text-muted: rgba(255, 252, 242, 0.8); // Texte atténué
  --color-border: rgba(255, 252, 242, 0.1);     // Bordures
}
```

### Typographie
```scss
:root {
  --font-primary: "Satoshi Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-secondary: "Flaviotte", serif;
  --font-size-base: 1rem;
  --font-size-sm: 0.875rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 2rem;
  --font-size-4xl: 2.5rem;
}
```

### Espacements
```scss
:root {
  --spacing-xs: 0.25rem;   // 4px
  --spacing-sm: 0.5rem;    // 8px
  --spacing-md: 1rem;      // 16px
  --spacing-lg: 1.5rem;    // 24px
  --spacing-xl: 2rem;      // 32px
  --spacing-2xl: 3rem;     // 48px
  --spacing-3xl: 4rem;     // 64px
}
```

## 🔧 Scripts de développement

### Développement
```bash
npm run dev          # Serveur de développement + watch SCSS
npm run sass:watch   # Compilation SCSS en mode watch
npm run serve        # Serveur de développement uniquement
```

### Production
```bash
npm run build        # Build complet pour production
npm run sass:build   # Compilation SCSS pour production
npm run optimize     # Optimisations supplémentaires
```

### Qualité
```bash
npm run test         # Tests de linting
npm run lint:css     # Linting CSS/SCSS
npm run lint:html    # Validation HTML
npm run clean        # Nettoyage des fichiers temporaires
```

## 📱 Responsive Design

### Breakpoints
```scss
// Mobile first approach
$mobile: 768px;
$tablet: 1024px;
$desktop: 1200px;

// Usage
@media (min-width: $mobile) { /* Tablet and up */ }
@media (min-width: $tablet) { /* Desktop and up */ }
```

### Classes utilitaires
- `.hide-mobile` : Masqué sur mobile
- `.hide-tablet` : Masqué sur tablette
- `.hide-desktop` : Masqué sur desktop

## ♿ Accessibilité

### Bonnes pratiques
- Utiliser des balises sémantiques (`<nav>`, `<main>`, `<article>`)
- Ajouter des `alt` descriptifs aux images
- Utiliser des `aria-label` pour les éléments interactifs
- Respecter la hiérarchie des titres (H1 → H6)
- Assurer la navigation au clavier

### Classes d'accessibilité
- `.sr-only` : Éléments pour screen readers
- `.skip-link` : Liens de navigation rapide
- `[aria-hidden="true"]` : Éléments décoratifs

## ⚡ Performance

### Optimisations
- Images WebP avec fallback
- Lazy loading des images
- CSS/JS minifiés en production
- Preload des ressources critiques
- Compression Gzip

### Métriques à surveiller
- First Contentful Paint (FCP) < 1.5s
- Largest Contentful Paint (LCP) < 2.5s
- Cumulative Layout Shift (CLS) < 0.1
- Total Blocking Time (TBT) < 300ms

## 🔍 SEO

### Meta tags
- Title unique et descriptif
- Description de 150-160 caractères
- Open Graph pour réseaux sociaux
- Twitter Cards

### Structure
- URLs propres et descriptives
- Sitemap XML
- Robots.txt
- Schema.org markup (si nécessaire)

## 🧪 Tests

### Tests manuels
- [ ] Navigation au clavier
- [ ] Screen reader (NVDA, JAWS)
- [ ] Responsive sur différents appareils
- [ ] Performance (Lighthouse)
- [ ] Accessibilité (axe-core)

### Tests automatisés
```bash
npm run test         # Linting CSS et HTML
npm run lighthouse   # Tests de performance
```

## 🚀 Déploiement

### Netlify
1. Connecter le repository GitHub
2. Configuration automatique via `netlify.toml`
3. Déploiement automatique à chaque push sur `main`

### Variables d'environnement
```bash
NODE_ENV=production
NODE_VERSION=18
NPM_VERSION=9
```

## 📝 Contribution

### Workflow Git
1. Créer une branche feature : `git checkout -b feature/nom-feature`
2. Développer et tester
3. Commit avec message descriptif : `git commit -m "feat: ajouter nouvelle fonctionnalité"`
4. Push et créer Pull Request

### Standards de code
- Suivre les conventions BEM
- Commenter le code complexe
- Tester sur différents navigateurs
- Respecter les standards d'accessibilité

## 🐛 Debugging

### Outils recommandés
- Chrome DevTools
- Lighthouse
- axe-core (accessibilité)
- WebPageTest (performance)

### Problèmes courants
- Images non optimisées
- CSS non minifié en production
- Liens cassés
- Problèmes d'accessibilité

## 📚 Ressources

### Documentation
- [Sass Documentation](https://sass-lang.com/documentation)
- [BEM Methodology](http://getbem.com/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web Performance](https://web.dev/performance/)

### Outils
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [axe-core](https://github.com/dequelabs/axe-core)
- [WebPageTest](https://www.webpagetest.org/)
- [Can I Use](https://caniuse.com/) 