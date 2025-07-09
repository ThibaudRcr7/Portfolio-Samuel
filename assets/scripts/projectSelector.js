/**
 * Project Selector - Gestionnaire interactif pour la sélection de projets
 * 
 * Fonctionnalités :
 * - Détection automatique de l'élément actif via IntersectionObserver
 * - Mise à jour dynamique du contenu de l'aperçu
 * - Animations fluides lors des changements
 * - Gestion des événements de clic
 * - Support responsive
 */

class ProjectSelector {
    constructor() {
        // Détecter le type de page basé sur l'URL
        this.isCategoryPage = window.location.pathname.includes('projets-') && 
                             !window.location.pathname.includes('projets.html');
        
        if (this.isCategoryPage) {
            // Page de catégorie spécifique (ex: projets-portraits.html)
            this.setupCategoryPage();
        } else {
            // Page de sélection de catégories (ex: projets.html ou index.html)
            this.setupMainPage();
        }
    }

    setupCategoryPage() {
        // Configuration pour les pages de catégories individuelles
        this.projects = this.generateCategoryProjects();
        this.currentProject = this.projects[0]?.id || 'portrait-1';
        this.isAnimating = false;
        
        this.init();
    }

    setupMainPage() {
        // Configuration pour la page principale de sélection de catégories
        this.projects = [
            {
                id: 'portraits',
                title: 'PORTRAITS',
                description: 'Capturer l\'essence et l\'émotion de chaque personne à travers des portraits authentiques et artistiques. Chaque regard raconte une histoire unique.',
                image: '../assets/images/photos/portraits/placeholder-portrait.jpg'
            },
            {
                id: 'mariages',
                title: 'MARIAGES',
                description: 'Immortaliser les moments les plus précieux de votre journée spéciale. Des émotions pures et des souvenirs inoubliables capturés avec passion.',
                image: '../assets/images/photos/mariages/placeholder-mariage.jpg'
            },
            {
                id: 'evenements',
                title: 'ÉVÉNEMENTS',
                description: 'Documenter vos événements avec professionnalisme. De la préparation aux moments forts, chaque détail compte.',
                image: '../assets/images/photos/evenements/placeholder-evenement.jpg'
            },
            {
                id: 'commercial',
                title: 'COMMERCIAL',
                description: 'Créer des images percutantes pour votre communication. Des visuels qui parlent et qui vendent votre vision.',
                image: '../assets/images/photos/commercial/placeholder-commercial.jpg'
            }
        ];

        this.currentProject = 'portraits';
        this.isAnimating = false;
        
        this.init();
    }

    generateCategoryProjects() {
        // Générer les projets basés sur la catégorie détectée
        const path = window.location.pathname;
        let category = '';
        let categoryName = '';
        let imagePath = '';
        let description = '';

        if (path.includes('projets-portraits')) {
            category = 'portrait';
            categoryName = 'PORTRAIT';
            imagePath = '../assets/images/photos/portraits/Thibaud/Shooting-Thibaud (1).webp';
            description = 'Capturer l\'essence et l\'émotion de chaque personne à travers des portraits authentiques et artistiques. Chaque regard raconte une histoire unique.';
            
            // Projets spécifiques pour les portraits
            return [
                {
                    id: 'portrait-1',
                    title: 'SHOOTING MARINE',
                    image: '../assets/images/photos/portraits/Marine/Shooting-Marine (1).webp',
                    description: 'Portrait artistique de Marine'
                },
                {
                    id: 'portrait-2',
                    title: 'SHOOTING MARION',
                    image: '../assets/images/photos/portraits/Marion/Shooting-Marion (1).webp',
                    description: 'Portrait artistique de Marion'
                },
                {
                    id: 'portrait-3',
                    title: 'SHOOTING THIBAUD',
                    image: '../assets/images/photos/portraits/Thibaud/Shooting-Thibaud (1).webp',
                    description: 'Portrait artistique de Thibaud'
                }
            ];
        } else if (path.includes('projets-mariages')) {
            category = 'mariage';
            categoryName = 'MARIAGE';
            imagePath = '../assets/images/photos/mariages/Celine/Celine (17).webp';
            description = 'Immortaliser les moments les plus précieux de votre journée de mariage avec élégance et sensibilité.';
            
            // Projets spécifiques pour les mariages
            return [
                {
                    id: 'mariage-1',
                    title: 'CERISE & NICOLAS',
                    image: '../assets/images/photos/mariages/Cerise/Cerise (14).webp',
                    description: 'Mariage de Cerise et Nicolas'
                },
                {
                    id: 'mariage-2',
                    title: 'CÉLINE & SÉBASTIEN',
                    image: '../assets/images/photos/mariages/Celine/Celine (7).webp',
                    description: 'Mariage de Céline et Sébastien'
                },
                {
                    id: 'mariage-3',
                    title: 'DINO & GIOVANNA',
                    image: '../assets/images/photos/mariages/Celine/Celine (17).webp',
                    description: 'Mariage de Dino et Giovanna'
                }
            ];
        } else if (path.includes('projets-evenements')) {
            category = 'evenement';
            categoryName = 'ÉVÉNEMENT';
            imagePath = '../assets/images/photos/events/Concert/concert (1).webp';
            description = 'Capturer l\'énergie et l\'émotion de vos événements spéciaux avec dynamisme et créativité.';
            
            // Projets spécifiques pour les événements
            return [
                {
                    id: 'evenement-1',
                    title: 'CONCERT',
                    image: '../assets/images/photos/events/Concert/concert (1).webp',
                    description: 'Shooting de concert'
                },
                {
                    id: 'evenement-2',
                    title: 'CARNAVAL',
                    image: '../assets/images/photos/events/Carnaval/Carnaval (4).webp',
                    description: 'Shooting de carnaval'
                },
                {
                    id: 'evenement-3',
                    title: 'ANNIVERSAIRE',
                    image: '../assets/images/photos/events/Anniversaire/Anniversaire (3).webp',
                    description: 'Shooting d\'anniversaire'
                }
            ];
        } else if (path.includes('projets-commercial')) {
            category = 'commercial';
            categoryName = 'COMMERCIAL';
            imagePath = '../assets/images/photos/commercials/gc-barber/Gc-barbershop (4).webp';
            description = 'Mettre en valeur votre entreprise avec des images professionnelles qui reflètent votre identité et votre excellence.';
            
            // Projets spécifiques pour les commerciaux
            return [
                {
                    id: 'commercial-1',
                    title: 'GC BARBERSHOP',
                    image: '../assets/images/photos/commercials/gc-barber/Gc-barbershop (4).webp',
                    description: 'Shooting commercial pour GC Barbershop'
                },
                {
                    id: 'commercial-2',
                    title: 'GUSTO RISTORANTE',
                    image: '../assets/images/photos/commercials/gusto/gusto (8).webp',
                    description: 'Shooting commercial pour Gusto Ristorante'
                },
                {
                    id: 'commercial-3',
                    title: 'LA VITA',
                    image: '../assets/images/photos/commercials/la-vita/la-vita (1).webp',
                    description: 'Shooting commercial pour La Vita'
                }
            ];
        }

        // Retour par défaut si aucune catégorie n'est détectée
        return [];
    }

    init() {
        // Attendre que le DOM soit chargé
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.projectTitles = document.querySelectorAll('.project-title');
        this.previewImage = document.querySelector('.projets-preview__img');
        this.previewTitle = document.querySelector('.projets-preview__title');
        this.previewDescription = document.querySelector('.projets-preview__description');
        this.previewContainer = document.querySelector('.projets-preview__image');
        this.menuContainer = document.querySelector('.projets-menu__container');

        console.log('ProjectSelector setup:', {
            projectTitles: this.projectTitles.length,
            previewImage: !!this.previewImage,
            previewTitle: !!this.previewTitle,
            previewDescription: !!this.previewDescription,
            previewContainer: !!this.previewContainer,
            menuContainer: !!this.menuContainer,
            isCategoryPage: this.isCategoryPage,
            projects: this.projects.length
        });

        if (!this.projectTitles.length || !this.previewImage) {
            console.warn('ProjectSelector: Éléments requis non trouvés');
            return;
        }

        this.setupIntersectionObserver();
        this.setupScrollEvents();
        this.setupClickEvents();
        
        // Initialiser avec le premier projet et centrer automatiquement
        this.initializeFirstProject();
    }

    initializeFirstProject() {
        // Centrer automatiquement le premier élément au chargement
        const firstProject = this.projectTitles[0];
        if (firstProject && this.menuContainer) {
            const containerHeight = this.menuContainer.clientHeight;
            const elementHeight = firstProject.offsetHeight;
            const scrollTop = firstProject.offsetTop - (containerHeight / 2) + (elementHeight / 2);
            
            this.menuContainer.scrollTo({
                top: scrollTop,
                behavior: 'auto' // Pas d'animation au chargement
            });
        }
        
        // Initialiser avec le premier projet selon le type de page
        const firstProjectId = this.projects[0]?.id || this.currentProject;
        console.log('Initialisation avec le projet:', firstProjectId);
        this.setActiveProject(firstProjectId);
        
        // Forcer la mise à jour de l'opacité après un délai
        setTimeout(() => {
            this.updateOpacityBasedOnDistance();
        }, 100);
    }

    setupIntersectionObserver() {
        // Configuration de l'IntersectionObserver pour détecter l'élément centré
        const options = {
            root: document.querySelector('.projets-menu__container'),
            rootMargin: '-40% 0px -40% 0px', // Zone centrale plus large pour une détection plus facile
            threshold: 0.5
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isAnimating) {
                    const projectId = entry.target.dataset.project;
                    if (projectId && projectId !== this.currentProject) {
                        console.log('IntersectionObserver: Changement vers', projectId);
                        this.setActiveProject(projectId);
                    }
                }
            });
        }, options);

        // Observer tous les éléments du projet
        this.projectTitles.forEach(title => {
            this.observer.observe(title);
        });
    }

    setupClickEvents() {
        // Ajouter des événements de clic sur les titres de projets
        this.projectTitles.forEach(title => {
            title.addEventListener('click', (e) => {
                e.preventDefault();
                
                const projectId = title.getAttribute('data-project');
                if (projectId) {
                    // Si on est sur une page de catégorie, naviguer vers la page du projet spécifique
                    if (this.isCategoryPage) {
                        this.navigateToProjectPage(projectId);
                    } else {
                        // Sinon, sélectionner le projet normalement
                        this.selectProject(projectId);
                    }
                }
            });
        });

        // Ajouter des événements de clic sur l'aperçu du projet
        if (this.previewContainer) {
            this.previewContainer.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Si on est sur une page de catégorie, naviguer vers la page du projet actif
                if (this.isCategoryPage) {
                    this.navigateToProjectPage(this.currentProject);
                }
            });
        }
    }

    setupScrollEvents() {
        // Détection du scroll pour mobile/tablette et mise à jour de l'opacité
        if (this.menuContainer) {
            let scrollTimeout;
            
            this.menuContainer.addEventListener('scroll', () => {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    this.updateActiveFromScroll();
                    this.updateOpacityBasedOnDistance();
                }, 100);
            });

            // Mettre à jour l'opacité au chargement
            this.updateOpacityBasedOnDistance();
        }
    }

    updateActiveFromScroll() {
        // Trouver l'élément le plus proche du centre lors du scroll
        const container = document.querySelector('.projets-menu__container');
        if (!container) return;

        const containerRect = container.getBoundingClientRect();
        const containerCenter = containerRect.top + containerRect.height / 2;

        let closestElement = null;
        let closestDistance = Infinity;

        this.projectTitles.forEach(title => {
            const rect = title.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;
            const distance = Math.abs(elementCenter - containerCenter);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestElement = title;
            }
        });

        if (closestElement && !this.isAnimating) {
            const projectId = closestElement.dataset.project;
            if (projectId && projectId !== this.currentProject) {
                console.log('Scroll: Changement vers', projectId);
                this.setActiveProject(projectId);
            }
        }
    }

    updateOpacityBasedOnDistance() {
        if (!this.menuContainer) return;

        const containerRect = this.menuContainer.getBoundingClientRect();
        const containerCenter = containerRect.top + containerRect.height / 2;

        this.projectTitles.forEach(title => {
            // Ne pas modifier l'opacité si l'élément est actif
            if (title.classList.contains('active')) {
                title.style.opacity = ''; // Supprimer le style inline pour l'élément actif
                return;
            }

            const rect = title.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;
            const distance = Math.abs(elementCenter - containerCenter);
            const maxDistance = containerRect.height / 2; // Distance maximale pour l'opacité

            // Calculer l'opacité basée sur la distance avec une réduction plus importante
            let opacity = 1 - (distance / maxDistance) * 0.9; // Réduit l'opacité de 90% max
            opacity = Math.max(0.1, Math.min(1, opacity)); // Limite entre 0.1 et 1

            // Appliquer l'opacité
            title.style.opacity = opacity;
        });
    }

    setActiveProject(projectId) {
        if (this.isAnimating) return;

        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        this.isAnimating = true;
        this.currentProject = projectId;

        // Mettre à jour les classes actives
        this.projectTitles.forEach(title => {
            title.classList.remove('active');
            if (title.dataset.project === projectId) {
                title.classList.add('active');
            }
        });

        // Mettre à jour l'opacité basée sur la distance
        this.updateOpacityBasedOnDistance();

        // Animation de transition du contenu
        this.animateContentChange(project);
    }

    animateContentChange(project) {
        // Animation de fade-out
        this.previewContainer.classList.add('fade-out');
        
        setTimeout(() => {
            // Mettre à jour le contenu
            this.previewImage.src = project.image;
            this.previewImage.alt = `Aperçu ${project.title}`;
            this.previewTitle.textContent = project.title;
            this.previewDescription.textContent = project.description;

            // Animation de fade-in
            this.previewContainer.classList.remove('fade-out');
            this.previewContainer.classList.add('fade-in');

            setTimeout(() => {
                this.previewContainer.classList.remove('fade-in');
                this.isAnimating = false;
            }, 300);
        }, 200);
    }

    // Méthode publique pour changer de projet programmatiquement
    selectProject(projectId) {
        this.setActiveProject(projectId);
    }

    // Méthode pour obtenir le projet actuel
    getCurrentProject() {
        return this.currentProject;
    }

    // Méthode pour obtenir tous les projets
    getProjects() {
        return this.projects;
    }

    navigateToProjectPage(projectId) {
        // Construire l'URL de la page du projet
        const projectPageUrl = `../projets/${projectId}.html`;
        
        // Naviguer vers la page du projet
        window.location.href = projectPageUrl;
    }
}

// Initialisation automatique
document.addEventListener('DOMContentLoaded', () => {
    window.projectSelector = new ProjectSelector();
});

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProjectSelector;
}