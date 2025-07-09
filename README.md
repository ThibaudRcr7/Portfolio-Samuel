# Portfolio Photographe - Samuel Tosan

Portfolio professionnel de Samuel Tosan, photographe spécialisé en portraits, mariages, événements et photographie commerciale.

## 🎯 Description

Site web moderne et responsive présentant le travail de Samuel Tosan, photographe professionnel. Le portfolio met en valeur ses compétences dans différents domaines de la photographie avec une interface élégante et intuitive.

## 🚀 Technologies Utilisées

- **HTML5** - Structure sémantique
- **SCSS/CSS3** - Styles modulaires et responsive
- **JavaScript (Vanilla)** - Interactions et animations
- **Sass** - Préprocesseur CSS
- **Font Awesome** - Icônes
- **Fontshare** - Typographies (Satoshi, Flaviotte)

## 📁 Structure du Projet

```
Portfolio/
├── index.html                 # Page d'accueil
├── pages/                     # Pages secondaires
│   ├── a-propos.html         # Page À propos
│   ├── contact.html          # Page Contact
│   ├── projets.html          # Page principale des projets
│   ├── projets-portraits.html
│   ├── projets-mariages.html
│   ├── projets-evenements.html
│   └── projets-commercial.html
├── projets/                   # Pages de projets individuels
│   ├── portrait-1.html à portrait-6.html
│   ├── mariage-1.html à mariage-6.html
│   ├── evenement-1.html à evenement-6.html
│   └── commercial-1.html à commercial-6.html
├── assets/                    # Ressources
│   ├── css/                  # Styles compilés
│   ├── scss/                 # Styles source
│   ├── scripts/              # JavaScript
│   └── images/               # Images et photos
└── README.md                 # Documentation
```

## 🛠️ Installation et Développement

### Prérequis
- Node.js (v14+)
- npm

### Installation
```bash
npm install
```

### Développement
```bash
# Compilation SCSS en mode watch + serveur de développement
npm start

# Compilation SCSS uniquement (mode watch)
npm run sass

# Compilation SCSS (mode développement)
npm run sass:dev

# Compilation SCSS (mode production)
npm run sass:build

# Serveur de développement uniquement
npm run dev
```

## 📱 Responsive Design

Le site est entièrement responsive avec des breakpoints optimisés :

- **Mobile** : max-width: 768px
- **Tablette** : max-width: 992px  
- **Desktop** : min-width: 993px

### Fonctionnalités Mobile
- Menu burger fonctionnel
- Navigation tactile optimisée
- Images adaptatives
- Galeries scrollables
- Pas de débordement horizontal
- Touch targets de 44px minimum

## 🎨 Système de Design

### Couleurs
- **Background** : `#252422`
- **Background Secondary** : `#403D39`
- **Accent** : `#EB2828`
- **Tertiary** : `#CCC5B9`
- **Text** : `#FFFCF2`

### Typographies
- **Primaire** : Satoshi Variable (sans-serif)
- **Secondaire** : Flaviotte (serif)

### Espacements
- **Spacing 1** : 0.5rem
- **Spacing 2** : 1rem
- **Spacing 3** : 2rem
- **Spacing 4** : 4rem
- **Spacing 5** : 6rem

## 🎨 Fonctionnalités

- **Design moderne** : Interface épurée et professionnelle
- **Responsive** : Optimisé pour tous les appareils
- **Navigation fluide** : Menu fullpage avec animations
- **Galerie interactive** : Carrousel et galeries avec effets
- **Projets** : 4 catégories (Portraits, Mariages, Événements, Commercial)
- **Performance** : Optimisé pour le web

## 🚀 Déploiement

### Préparation
1. Compiler les styles : `npm run sass:build`