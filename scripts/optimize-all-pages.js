#!/usr/bin/env node

/**
 * Script d'optimisation automatique pour toutes les pages HTML
 * Applique les optimisations SEO à toutes les pages du site
 */

const fs = require('fs');
const path = require('path');

class PageOptimizer {
  constructor() {
    this.pages = [];
    this.template = {
      metaTags: {
        title: '',
        description: '',
        keywords: '',
        canonical: '',
        ogTitle: '',
        ogDescription: '',
        ogImage: '',
        twitterTitle: '',
        twitterDescription: '',
        twitterImage: ''
      },
      schema: {
        type: '',
        data: {}
      },
      breadcrumbs: []
    };
  }

  // Scan pour les fichiers HTML
  scanFiles(dir = '.') {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules' && item !== 'scripts') {
        this.scanFiles(fullPath);
      } else if (item.endsWith('.html')) {
        this.pages.push(fullPath);
      }
    }
  }

  // Configuration des pages
  getPageConfig(filePath) {
    const fileName = path.basename(filePath, '.html');
    const relativePath = path.relative('.', filePath);
    
    const configs = {
      'index.html': {
        title: 'TOSAN PRODUCTIONS - Photographe Professionnel | Portraits, Mariages, Événements à Nivelles',
        description: 'Samuel Tosan, photographe professionnel à Nivelles et Bruxelles. Spécialisé en portraits, mariages, événements et photographie commerciale. Découvrez mon portfolio et réservez votre séance photo.',
        keywords: 'photographe Nivelles, photographe Bruxelles, portrait professionnel, mariage photographie, événement photographie, photographie commerciale, Samuel Tosan, TOSAN PRODUCTIONS',
        canonical: 'https://tosanproductions.com/',
        schema: {
          type: 'LocalBusiness',
          data: {
            name: 'TOSAN PRODUCTIONS',
            description: 'Photographe professionnel spécialisé en portraits, mariages, événements et photographie commerciale',
            url: 'https://tosanproductions.com',
            telephone: '+32-XXX-XXX-XXX',
            address: {
              addressLocality: 'Nivelles',
              addressRegion: 'Brabant wallon',
              addressCountry: 'BE'
            },
            geo: {
              latitude: '50.5978',
              longitude: '4.3245'
            },
            priceRange: '€€',
            openingHours: 'Mo-Fr 09:00-18:00',
            hasOfferCatalog: {
              name: 'Services de photographie',
              itemListElement: [
                {
                  itemOffered: {
                    name: 'Portraits professionnels',
                    description: 'Séances de portraits artistiques et professionnels'
                  }
                },
                {
                  itemOffered: {
                    name: 'Photographie de mariage',
                    description: 'Couverture complète de votre journée de mariage'
                  }
                },
                {
                  itemOffered: {
                    name: 'Photographie d\'événements',
                    description: 'Couverture d\'événements privés et professionnels'
                  }
                },
                {
                  itemOffered: {
                    name: 'Photographie commerciale',
                    description: 'Photographie pour entreprises et restaurants'
                  }
                }
              ]
            }
          }
        },
        breadcrumbs: ['Accueil']
      },
      'a-propos.html': {
        title: 'À propos - Samuel Tosan | Photographe Professionnel à Nivelles et Bruxelles',
        description: 'Découvrez Samuel Tosan, photographe professionnel passionné basé à Nivelles et Bruxelles. Spécialisé en portraits, mariages et événements. Découvrez mon parcours et ma vision artistique.',
        keywords: 'Samuel Tosan photographe, photographe Nivelles, photographe Bruxelles, portrait professionnel, mariage photographie, événement photographie, Samuel Labarces',
        canonical: 'https://tosanproductions.com/pages/a-propos.html',
        schema: {
          type: 'Person',
          data: {
            name: 'Samuel Tosan',
            alternateName: 'Samuel Labarces',
            jobTitle: 'Photographe professionnel',
            worksFor: {
              name: 'TOSAN PRODUCTIONS'
            },
            description: 'Photographe professionnel spécialisé en portraits, mariages, événements et photographie commerciale',
            url: 'https://tosanproductions.com',
            image: 'https://tosanproductions.com/assets/images/ui/Tosan-1.webp',
            address: {
              addressLocality: 'Nivelles',
              addressRegion: 'Brabant wallon',
              addressCountry: 'BE'
            },
            geo: {
              latitude: '50.5978',
              longitude: '4.3245'
            },
            knowsAbout: [
              'Photographie de portrait',
              'Photographie de mariage',
              'Photographie d\'événements',
              'Photographie commerciale',
              'Photographie artistique'
            ]
          }
        },
        breadcrumbs: ['Accueil', 'À propos']
      },
      'contact.html': {
        title: 'Contact - Samuel Tosan | Photographe Professionnel à Nivelles et Bruxelles',
        description: 'Contactez Samuel Tosan, photographe professionnel à Nivelles et Bruxelles. Email, téléphone, WhatsApp et Instagram. Réservez votre séance photo dès maintenant.',
        keywords: 'contact photographe Nivelles, contact photographe Bruxelles, Samuel Tosan contact, réservation séance photo, photographe professionnel contact',
        canonical: 'https://tosanproductions.com/pages/contact.html',
        schema: {
          type: 'ContactPage',
          data: {
            name: 'Contact - TOSAN PRODUCTIONS',
            description: 'Contactez Samuel Tosan, photographe professionnel à Nivelles et Bruxelles',
            url: 'https://tosanproductions.com/pages/contact.html',
            mainEntity: {
              type: 'Person',
              name: 'Samuel Tosan',
              jobTitle: 'Photographe professionnel',
              worksFor: {
                name: 'TOSAN PRODUCTIONS'
              },
              email: 'tosanportraits@gmail.com',
              telephone: '+32472610104',
              address: {
                addressLocality: 'Nivelles',
                addressRegion: 'Brabant wallon',
                addressCountry: 'BE'
              },
              sameAs: [
                'https://www.instagram.com/tosanportraits',
                'https://wa.me/32472610104'
              ]
            }
          }
        },
        breadcrumbs: ['Accueil', 'Contact']
      },
      'tarifs.html': {
        title: 'Tarifs - Samuel Tosan | Photographe Professionnel à Nivelles et Bruxelles',
        description: 'Découvrez les tarifs de Samuel Tosan, photographe professionnel à Nivelles et Bruxelles. Portraits, mariages, événements et photographie commerciale. Devis personnalisé disponible.',
        keywords: 'tarifs photographe Nivelles, prix séance photo, tarifs mariage photographie, devis photographe professionnel, Samuel Tosan tarifs',
        canonical: 'https://tosanproductions.com/pages/tarifs.html',
        schema: {
          type: 'Service',
          data: {
            name: 'Services de photographie - TOSAN PRODUCTIONS',
            description: 'Services de photographie professionnelle : portraits, mariages, événements et photographie commerciale',
            provider: {
              type: 'Person',
              name: 'Samuel Tosan'
            },
            areaServed: [
              {
                type: 'City',
                name: 'Nivelles'
              },
              {
                type: 'City',
                name: 'Bruxelles'
              }
            ],
            hasOfferCatalog: {
              name: 'Tarifs et services',
              itemListElement: [
                {
                  itemOffered: {
                    name: 'Portraits professionnels',
                    description: 'Séances de portraits artistiques et professionnels'
                  }
                },
                {
                  itemOffered: {
                    name: 'Photographie de mariage',
                    description: 'Couverture complète de votre journée de mariage'
                  }
                },
                {
                  itemOffered: {
                    name: 'Photographie d\'événements',
                    description: 'Couverture d\'événements privés et professionnels'
                  }
                },
                {
                  itemOffered: {
                    name: 'Photographie commerciale',
                    description: 'Photographie pour entreprises et restaurants'
                  }
                }
              ]
            }
          }
        },
        breadcrumbs: ['Accueil', 'Tarifs']
      }
    };

    return configs[fileName] || {
      title: 'TOSAN PRODUCTIONS - Photographe Professionnel',
      description: 'Samuel Tosan, photographe professionnel à Nivelles et Bruxelles',
      keywords: 'photographe Nivelles, photographe Bruxelles, Samuel Tosan',
      canonical: `https://tosanproductions.com/${relativePath}`,
      schema: {
        type: 'WebPage',
        data: {
          name: 'TOSAN PRODUCTIONS',
          description: 'Page du site TOSAN PRODUCTIONS'
        }
      },
      breadcrumbs: ['Accueil']
    };
  }

  // Générer les meta tags
  generateMetaTags(config) {
    return `
    <!-- SEO Meta Tags -->
    <title>${config.title}</title>
    <meta name="description" content="${config.description}">
    <meta name="keywords" content="${config.keywords}">
    <meta name="author" content="Samuel Tosan">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <link rel="canonical" href="${config.canonical}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="${config.canonical}">
    <meta property="og:title" content="${config.title}">
    <meta property="og:description" content="${config.description}">
    <meta property="og:image" content="https://tosanproductions.com/assets/images/ui/Tosan-1.webp">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="Samuel Tosan, photographe professionnel">
    <meta property="og:locale" content="fr_FR">
    <meta property="og:site_name" content="TOSAN PRODUCTIONS">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="${config.canonical}">
    <meta property="twitter:title" content="${config.title}">
    <meta property="twitter:description" content="${config.description}">
    <meta property="twitter:image" content="https://tosanproductions.com/assets/images/ui/Tosan-1.webp">
    <meta property="twitter:image:alt" content="Samuel Tosan, photographe professionnel">`;
  }

  // Générer le Schema.org
  generateSchema(config) {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": config.schema.type,
      ...config.schema.data
    };

    return `
    <!-- Schema.org structured data -->
    <script type="application/ld+json">
    ${JSON.stringify(schemaData, null, 4)}
    </script>`;
  }

  // Générer les breadcrumbs
  generateBreadcrumbs(config) {
    if (config.breadcrumbs.length <= 1) return '';

    const breadcrumbItems = config.breadcrumbs.map((item, index) => {
      if (index === config.breadcrumbs.length - 1) {
        return `
            <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                <span itemprop="name">${item}</span>
                <meta itemprop="position" content="${index + 1}" />
            </li>`;
      } else {
        const href = index === 0 ? '/' : `../${config.breadcrumbs.slice(1, index + 1).join('/')}.html`;
        return `
            <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                <a href="${href}" itemprop="item">
                    <span itemprop="name">${item}</span>
                </a>
                <meta itemprop="position" content="${index + 1}" />
            </li>`;
      }
    }).join('');

    return `
    <!-- Breadcrumb navigation -->
    <nav aria-label="Fil d'Ariane" class="breadcrumb-nav">
        <ol class="breadcrumb" itemscope itemtype="https://schema.org/BreadcrumbList">
            <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                <a href="/" itemprop="item">
                    <span itemprop="name">Accueil</span>
                </a>
                <meta itemprop="position" content="1" />
            </li>${breadcrumbItems}
        </ol>
    </nav>`;
  }

  // Optimiser une page
  optimizePage(filePath) {
    console.log(`🔧 Optimisation de: ${filePath}`);
    
    try {
      let html = fs.readFileSync(filePath, 'utf8');
      const config = this.getPageConfig(filePath);
      
      // Ajouter les meta tags SEO
      const metaTags = this.generateMetaTags(config);
      html = html.replace(/<title>.*?<\/title>/, metaTags);
      
      // Ajouter le Schema.org
      const schema = this.generateSchema(config);
      html = html.replace(/<\/head>/, `${schema}\n</head>`);
      
      // Ajouter les breadcrumbs
      const breadcrumbs = this.generateBreadcrumbs(config);
      if (breadcrumbs) {
        html = html.replace(/<body[^>]*>/, `$&${breadcrumbs}`);
      }
      
      // Ajouter aria-current aux liens actifs
      const fileName = path.basename(filePath);
      html = html.replace(
        new RegExp(`href="[^"]*${fileName}[^"]*"[^>]*class="[^"]*nav__link[^"]*nav__link--active[^"]*"`, 'g'),
        `href="${fileName}" class="nav__link nav__link--active" aria-current="page"`
      );
      
      // Ajouter aria-hidden aux icônes
      html = html.replace(/<i class="([^"]*)"([^>]*)>/g, '<i class="$1"$2 aria-hidden="true">');
      
      // Ajouter aria-label aux liens sociaux
      html = html.replace(
        /<a href="[^"]*wa\.me[^"]*"[^>]*>/g,
        '<a href="$&" target="_blank" rel="noopener noreferrer" aria-label="Contactez-nous sur WhatsApp">'
      );
      html = html.replace(
        /<a href="[^"]*instagram[^"]*"[^>]*>/g,
        '<a href="$&" target="_blank" rel="noopener noreferrer" aria-label="Suivez-nous sur Instagram">'
      );
      
      // Corriger les liens du footer
      html = html.replace(
        /href="https:\/\/wa\.me\/your-number"/g,
        'href="https://wa.me/32472610104"'
      );
      html = html.replace(
        /href="https:\/\/instagram\.com\/your-account"/g,
        'href="https://www.instagram.com/tosanportraits"'
      );
      
      // Écrire le fichier optimisé
      fs.writeFileSync(filePath, html, 'utf8');
      console.log(`✅ ${filePath} optimisé avec succès`);
      
    } catch (error) {
      console.error(`❌ Erreur lors de l'optimisation de ${filePath}:`, error.message);
    }
  }

  // Exécuter l'optimisation
  run() {
    console.log('🚀 Début de l\'optimisation automatique des pages...\n');
    
    this.scanFiles();
    
    if (this.pages.length === 0) {
      console.log('❌ Aucun fichier HTML trouvé');
      return;
    }
    
    console.log(`📁 ${this.pages.length} fichiers HTML trouvés\n`);
    
    for (const page of this.pages) {
      this.optimizePage(page);
    }
    
    console.log('\n🎉 Optimisation terminée !');
    console.log(`📊 ${this.pages.length} pages optimisées`);
  }
}

// Exécuter si appelé directement
if (require.main === module) {
  const optimizer = new PageOptimizer();
  optimizer.run();
}

module.exports = PageOptimizer; 