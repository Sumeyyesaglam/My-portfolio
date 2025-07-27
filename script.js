let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

// Show specific slide
function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Deactivate all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    //  Index validation
    if (index >= slides.length) {
        currentSlideIndex = 0;
    }
    if (index < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    // Activate selected slide and dot
    if (slides[currentSlideIndex]) {
        slides[currentSlideIndex].classList.add('active');
    }
    if (dots[currentSlideIndex]) {
        dots[currentSlideIndex].classList.add('active');
    }
}

// Change slide (previous/next)
function changeSlide(direction) {
    currentSlideIndex += direction;
    showSlide(currentSlideIndex);
}

// Go to specific slide (on dot click)
function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

// Auto slide change (every 5 seconds)
function autoSlide() {
    currentSlideIndex++;
    showSlide(currentSlideIndex);
}

// ===== SKILL PROGRESS ANIMATION =====

//Animate skill bars on scroll
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            //  Start the skill bar animation
            bar.style.animation = 'none';
            bar.offsetHeight; // Reflow tetikle
            bar.style.animation = null;
        }
    });
}

// ===== SMOOTH SCROLL NAVİGASYON =====

// Add smooth scroll to navbar links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== PARALLAX EFFECT =====

//  Parallax effect for the hero section
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// ===== NAVBAR SCROLL EFFECT =====

// Change the navbar background on scroll
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.1)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
    });
}

// ===== LAZY LOADING İÇİN INTERSECTION OBSERVER =====

// Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== KEYBOARD NAVİGASYON =====

//Keyboard slideshow control
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowLeft':
                changeSlide(-1);
                break;
            case 'ArrowRight':
                changeSlide(1);
                break;
            case 'Escape':
                // ESC tuşuyla focus'u body'ye al
                document.activeElement.blur();
                break;
        }
    });
}

// ===== FORM VALİDASYON (GDPR İÇİN) =====

// Contact form validation 
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = '#ff006e';
                    isValid = false;
                } else {
                    input.style.borderColor = '#06ffa5';
                }
            });
            
            if (isValid) {
                // Form gönderildi mesajı
                alert('Tack för ditt meddelande! Jag kommer att kontakta dig snart.');
                form.reset();
            } else {
                alert('Vänligen fyll i alla obligatoriska fält.');
            }
        });
    });
}

// =====  (ACCESSIBILITY) =====

// For focus trap
function initAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#hero';
    skipLink.textContent = 'Hoppa till huvudinnehåll';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #06ffa5;
        color: #000;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transform: translateY(-100%);
        transition: transform 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.transform = 'translateY(0)';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.transform = 'translateY(-100%)';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// ===== DARK/LIGHT MODE TOGGLE (BONUS) =====

// Theme switcher (extra feature)
function initThemeToggle() {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Theme toggle button 
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';
    themeToggle.style.cssText = `
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 8px;
        border-radius: 50%;
        transition: all 0.3s ease;
    `;
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        themeToggle.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
    });
    
    // Add it to the navbar (optional)
    const navbar = document.querySelector('.nav-links');
    if (navbar) {
        const li = document.createElement('li');
        li.appendChild(themeToggle);
        navbar.appendChild(li);
    }
}

// ===== PERFORMANCE MONİTÖRİNG =====

// Measure page load performance
function initPerformanceMonitoring() {
    window.addEventListener('load', () => {
        // Performance API kullanarak yükleme süresini ölç
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Sayfa yükleme süresi: ${loadTime}ms`);
        
        //  LCP measurement for Core Web Vitals
        new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log('LCP:', entry.startTime);
            }
        }).observe({entryTypes: ['largest-contentful-paint']});
    });
}

// =====  RUN WHEN DOM IS LOADED =====

//  Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start the slideshow
    if (slides.length > 0) {
        showSlide(0);
        // Auto slide (every 5 seconds)
        setInterval(autoSlide, 5000);
    }
    
    // Start other functions
    initSmoothScroll();
    initParallax();
    initNavbarScroll();
    initLazyLoading();
    initKeyboardNavigation();
    initFormValidation();
    initAccessibility();
    initPerformanceMonitoring();
    
    //Initialize theme toggle (optional)
    console.log('🚀 Portfolio loaded successfully!');
});

// ===== SCROLL EVENTS =====

// Listen to scroll events
window.addEventListener('scroll', () => {
    animateSkills();
});

// ===== RESIZE EVENTS =====

// Responsive adjustments on window resize
window.addEventListener('resize', () => {
    // Adjust slideshow size
    const slideContainer = document.querySelector('.slideshow-container');
    if (slideContainer && window.innerWidth < 768) {
        slideContainer.style.maxWidth = '100%';
    }
});

// ===== ERROR HANDLING =====

// Global error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Hatası:', e.error);
});

//  Capture unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Promise Hatası:', e.reason);
});

// ===== GDPR COOKIE BANNER (BONUS) =====

// Cookie banner for GDPR compliance
function initGDPRBanner() {
    if (!localStorage.getItem('cookies-accepted')) {
        const banner = document.createElement('div');
        banner.innerHTML = `
            <div style="
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 20px;
                text-align: center;
                z-index: 10000;
                backdrop-filter: blur(10px);
            ">
                <p style="margin-bottom: 10px;">
                    Denna webbplats använder cookies för att förbättra användarupplevelsen.
                </p>
                <button onclick="acceptCookies()" style="
                    background: #06ffa5;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    margin: 0 10px;
                ">Acceptera</button>
                <button onclick="declineCookies()" style="
                    background: #ff006e;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    color: white;
                ">Avböj</button>
            </div>
        `;
        document.body.appendChild(banner);
    }
}

// Cookie acceptance functions
function acceptCookies() {
    localStorage.setItem('cookies-accepted', 'true');
    document.querySelector('[style*="position: fixed"][style*="bottom: 0"]').remove();
}

function declineCookies() {
    localStorage.setItem('cookies-accepted', 'false');
    document.querySelector('[style*="position: fixed"][style*="bottom: 0"]').remove();
}
