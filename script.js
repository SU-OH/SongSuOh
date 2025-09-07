// Language Management
class LanguageManager {
    constructor() {
        this.currentLang = 'ko';
        this.elements = [];
        this.init();
    }

    init() {
        this.scanElements();
        this.setupToggle();
        this.loadSavedLanguage();
    }

    scanElements() {
        this.elements = document.querySelectorAll('[data-ko][data-en]');
    }

    setupToggle() {
        const toggle = document.getElementById('langToggle');
        if (toggle) {
            toggle.addEventListener('click', () => this.toggleLanguage());
        }
    }

    loadSavedLanguage() {
        const savedLang = localStorage.getItem('preferred-language');
        if (savedLang && savedLang !== this.currentLang) {
            this.currentLang = savedLang;
            this.updateContent();
            this.updateToggleButton();
        }
    }

    toggleLanguage() {
        this.currentLang = this.currentLang === 'ko' ? 'en' : 'ko';
        this.updateContent();
        this.updateToggleButton();
        this.saveLanguage();
    }

    updateContent() {
        this.elements.forEach(element => {
            const text = element.getAttribute(`data-${this.currentLang}`);
            if (text) {
                if (element.tagName === 'TITLE') {
                    element.textContent = text;
                } else {
                    element.textContent = text;
                }
            }
        });

        // Update document language
        document.documentElement.lang = this.currentLang;
    }

    updateToggleButton() {
        const toggleText = document.querySelector('.lang-text');
        if (toggleText) {
            toggleText.textContent = this.currentLang === 'ko' ? 'EN' : '한국어';
        }
    }

    saveLanguage() {
        localStorage.setItem('preferred-language', this.currentLang);
    }
}

// Navigation Manager
class NavigationManager {
    constructor() {
        this.nav = document.querySelector('.nav');
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        this.init();
    }

    init() {
        this.setupMobileToggle();
        this.setupSmoothScrolling();
        this.setupScrollSpy();
        this.setupScrollHandler();
    }

    setupMobileToggle() {
        if (this.navToggle && this.navMenu) {
            this.navToggle.addEventListener('click', () => {
                this.navMenu.classList.toggle('active');
                this.updateToggleIcon();
            });

            // Close menu when clicking on a link
            this.navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.navMenu.classList.remove('active');
                    this.updateToggleIcon();
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.nav.contains(e.target)) {
                    this.navMenu.classList.remove('active');
                    this.updateToggleIcon();
                }
            });
        }
    }

    updateToggleIcon() {
        const spans = this.navToggle.querySelectorAll('span');
        const isActive = this.navMenu.classList.contains('active');
        
        if (isActive) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        }
    }

    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupScrollSpy() {
        const observerOptions = {
            root: null,
            rootMargin: '-80px 0px -50% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.updateActiveNavLink(entry.target.id);
                }
            });
        }, observerOptions);

        this.sections.forEach(section => {
            observer.observe(section);
        });
    }

    updateActiveNavLink(activeId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    }

    setupScrollHandler() {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Hide/show navigation on scroll
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                this.nav.style.transform = 'translateY(-100%)';
            } else {
                this.nav.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        }, { passive: true });
    }
}

// Animation Manager
class AnimationManager {
    constructor() {
        this.observedElements = new Set();
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupLoadAnimations();
    }

    setupScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.observedElements.has(entry.target)) {
                    this.animateElement(entry.target);
                    this.observedElements.add(entry.target);
                }
            });
        }, observerOptions);

        // Observe sections and cards
        const elementsToAnimate = document.querySelectorAll(`
            .section,
            .timeline-item,
            .activity-item,
            .award-item,
            .cert-item,
            .military-card,
            .contact-item-large
        `);

        elementsToAnimate.forEach(element => {
            element.classList.add('loading');
            observer.observe(element);
        });
    }

    animateElement(element) {
        element.classList.remove('loading');
        element.classList.add('loaded');
        
        // Add staggered animation for child elements
        const children = element.querySelectorAll('.activity-item, .timeline-item');
        children.forEach((child, index) => {
            setTimeout(() => {
                child.classList.add('fade-in-up');
            }, index * 100);
        });
    }

    setupLoadAnimations() {
        // Animate hero section on page load
        window.addEventListener('load', () => {
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.classList.add('fade-in-up');
            }
        });
    }
}

// Back to Top Button
class BackToTopButton {
    constructor() {
        this.button = document.getElementById('backToTop');
        this.init();
    }

    init() {
        if (!this.button) return;

        this.setupScrollListener();
        this.setupClickHandler();
    }

    setupScrollListener() {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                this.button.classList.add('show');
            } else {
                this.button.classList.remove('show');
            }
        }, { passive: true });
    }

    setupClickHandler() {
        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            if ('performance' in window) {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', Math.round(perfData.loadEventEnd - perfData.fetchStart), 'ms');
            }
        });

        // Monitor memory usage (if available)
        if ('memory' in performance) {
            setInterval(() => {
                const memory = performance.memory;
                if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.9) {
                    console.warn('High memory usage detected');
                }
            }, 30000); // Check every 30 seconds
        }
    }
}

// Accessibility Manager
class AccessibilityManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupARIA();
    }

    setupKeyboardNavigation() {
        // Handle Escape key for mobile menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const navMenu = document.getElementById('navMenu');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            }
        });

        // Handle Enter/Space for custom buttons
        document.querySelectorAll('[role="button"]').forEach(button => {
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
            });
        });
    }

    setupFocusManagement() {
        // Skip to content link (for screen readers)
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-color);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    setupARIA() {
        // Update ARIA labels for language toggle
        const langToggle = document.getElementById('langToggle');
        if (langToggle) {
            const updateARIA = () => {
                const currentLang = document.documentElement.lang;
                const nextLang = currentLang === 'ko' ? 'English' : '한국어';
                langToggle.setAttribute('aria-label', `Switch to ${nextLang}`);
            };
            
            langToggle.addEventListener('click', updateARIA);
            updateARIA(); // Set initial state
        }

        // Set proper roles for navigation
        const navMenu = document.getElementById('navMenu');
        if (navMenu) {
            navMenu.setAttribute('role', 'menu');
            navMenu.querySelectorAll('li').forEach(li => {
                li.setAttribute('role', 'none');
                const link = li.querySelector('a');
                if (link) {
                    link.setAttribute('role', 'menuitem');
                }
            });
        }
    }
}

// Error Handler
class ErrorHandler {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('error', (e) => {
            console.error('JavaScript Error:', e.error);
            this.showFallback();
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled Promise Rejection:', e.reason);
        });
    }

    showFallback() {
        // Show fallback content if JavaScript fails
        document.body.classList.add('js-error');
        
        // Ensure basic navigation works without JavaScript
        const style = document.createElement('style');
        style.textContent = `
            .js-error .nav-menu {
                position: static !important;
                transform: none !important;
                opacity: 1 !important;
                visibility: visible !important;
            }
            .js-error .nav-toggle {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Form Validation (for future contact forms)
class FormValidator {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.init();
    }

    init() {
        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        });
    }

    handleSubmit(e) {
        const form = e.target;
        const isValid = this.validateForm(form);
        
        if (!isValid) {
            e.preventDefault();
        }
    }

    validateForm(form) {
        const inputs = form.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            const error = this.validateInput(input);
            if (error) {
                this.showError(input, error);
                isValid = false;
            } else {
                this.clearError(input);
            }
        });

        return isValid;
    }

    validateInput(input) {
        const value = input.value.trim();
        const type = input.type;
        const required = input.hasAttribute('required');

        if (required && !value) {
            return 'This field is required';
        }

        if (type === 'email' && value && !this.isValidEmail(value)) {
            return 'Please enter a valid email address';
        }

        if (type === 'tel' && value && !this.isValidPhone(value)) {
            return 'Please enter a valid phone number';
        }

        return null;
    }

    isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    isValidPhone(phone) {
        const regex = /^[\d\s\-\+\(\)]+$/;
        return regex.test(phone) && phone.replace(/\D/g, '').length >= 10;
    }

    showError(input, message) {
        const errorId = `${input.name}-error`;
        let errorElement = document.getElementById(errorId);

        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.id = errorId;
            errorElement.className = 'error-message';
            errorElement.style.cssText = 'color: #dc2626; font-size: 0.875rem; margin-top: 0.25rem;';
            input.parentNode.appendChild(errorElement);
        }

        errorElement.textContent = message;
        input.style.borderColor = '#dc2626';
        input.setAttribute('aria-describedby', errorId);
        input.setAttribute('aria-invalid', 'true');
    }

    clearError(input) {
        const errorId = `${input.name}-error`;
        const errorElement = document.getElementById(errorId);

        if (errorElement) {
            errorElement.remove();
        }

        input.style.borderColor = '';
        input.removeAttribute('aria-describedby');
        input.removeAttribute('aria-invalid');
    }
}

// Theme Manager (for future dark mode support)
class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.init();
    }

    init() {
        this.loadSavedTheme();
        this.setupSystemThemeListener();
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('preferred-theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        this.currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
        this.applyTheme();
    }

    setupSystemThemeListener() {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('preferred-theme')) {
                this.currentTheme = e.matches ? 'dark' : 'light';
                this.applyTheme();
            }
        });
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        this.saveTheme();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        
        // Update meta theme-color for mobile browsers
        let themeColorMeta = document.querySelector('meta[name="theme-color"]');
        if (!themeColorMeta) {
            themeColorMeta = document.createElement('meta');
            themeColorMeta.name = 'theme-color';
            document.head.appendChild(themeColorMeta);
        }
        
        themeColorMeta.content = this.currentTheme === 'dark' ? '#1f2937' : '#1e3a8a';
    }

    saveTheme() {
        localStorage.setItem('preferred-theme', this.currentTheme);
    }
}

// Analytics (for future implementation)
class AnalyticsManager {
    constructor() {
        this.events = [];
        this.init();
    }

    init() {
        this.trackPageView();
        this.setupEventTracking();
    }

    trackPageView() {
        this.track('page_view', {
            page: window.location.pathname,
            timestamp: new Date().toISOString(),
            language: document.documentElement.lang
        });
    }

    setupEventTracking() {
        // Track navigation clicks
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                this.track('navigation_click', {
                    target: link.getAttribute('href'),
                    text: link.textContent
                });
            });
        });

        // Track contact interactions
        document.querySelectorAll('[href^="mailto:"], [href^="tel:"]').forEach(link => {
            link.addEventListener('click', () => {
                this.track('contact_interaction', {
                    type: link.href.startsWith('mailto:') ? 'email' : 'phone',
                    value: link.href
                });
            });
        });

        // Track language changes
        document.getElementById('langToggle')?.addEventListener('click', () => {
            this.track('language_change', {
                from: document.documentElement.lang,
                to: document.documentElement.lang === 'ko' ? 'en' : 'ko'
            });
        });
    }

    track(eventName, data = {}) {
        const event = {
            name: eventName,
            data: data,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        };

        this.events.push(event);
        
        // In a real implementation, you would send this to your analytics service
        console.log('Analytics Event:', event);
    }

    getEvents() {
        return this.events;
    }
}

// Main App Initialization
class App {
    constructor() {
        this.components = {};
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        try {
            // Initialize core components
            this.components.languageManager = new LanguageManager();
            this.components.navigationManager = new NavigationManager();
            this.components.animationManager = new AnimationManager();
            this.components.backToTopButton = new BackToTopButton();
            this.components.accessibilityManager = new AccessibilityManager();
            this.components.errorHandler = new ErrorHandler();
            this.components.formValidator = new FormValidator();
            this.components.themeManager = new ThemeManager();
            this.components.performanceMonitor = new PerformanceMonitor();
            this.components.analyticsManager = new AnalyticsManager();

            console.log('Song Su Oh Portfolio - All components initialized successfully');
            
            // Mark page as loaded for CSS animations
            document.body.classList.add('loaded');
            
        } catch (error) {
            console.error('Error initializing components:', error);
            
            // Fallback initialization
            this.initializeFallback();
        }
    }

    initializeFallback() {
        // Basic functionality for when JavaScript has errors
        console.log('Running in fallback mode');
        
        // Ensure basic navigation works
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Basic language toggle
        const langToggle = document.getElementById('langToggle');
        if (langToggle) {
            langToggle.addEventListener('click', () => {
                const elements = document.querySelectorAll('[data-ko][data-en]');
                const currentLang = document.documentElement.lang;
                const newLang = currentLang === 'ko' ? 'en' : 'ko';
                
                elements.forEach(element => {
                    const text = element.getAttribute(`data-${newLang}`);
                    if (text) element.textContent = text;
                });
                
                document.documentElement.lang = newLang;
            });
        }
    }

    // Public API for external access
    getComponent(name) {
        return this.components[name];
    }

    getAllComponents() {
        return this.components;
    }
}

// Initialize the application
const app = new App();

// Expose app to global scope for debugging
if (typeof window !== 'undefined') {
    window.PortfolioApp = app;
}

// Service Worker Registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when implementing PWA
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(registrationError => console.log('SW registration failed'));
    });
}