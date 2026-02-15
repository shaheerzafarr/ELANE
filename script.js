/* =========================================
   ÈLANÈ — Premium Interactions
   ========================================= */

// ---- Preloader ----
const hidePreloader = () => {
    const preloader = document.getElementById('preloader');
    if (preloader && !preloader.classList.contains('hidden')) {
        preloader.classList.add('hidden');
    }
    // Force remove any stuck overflow hidden on body
    document.body.style.overflow = '';
    document.body.style.removeProperty('overflow');

    // Ensure mobile menu is closed on load
    const navLinksEl = document.getElementById('navLinks');
    const hamburgerEl = document.getElementById('hamburger');
    const overlayEl = document.getElementById('mobileOverlay');
    if (navLinksEl) navLinksEl.classList.remove('active');
    if (hamburgerEl) hamburgerEl.classList.remove('active');
    if (overlayEl) overlayEl.classList.remove('active');
};

// Hide preloader after DOM is ready (don't wait for images)
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(hidePreloader, 500);
} else {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(hidePreloader, 1200);
    });
}

// Fallback: always hide preloader after 3 seconds max
setTimeout(hidePreloader, 3000);

// ---- Custom Cursor ----
const cursorDot = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');

if (cursorDot && cursorOutline && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    });

    const animateCursor = () => {
        outlineX += (mouseX - outlineX) * 0.12;
        outlineY += (mouseY - outlineY) * 0.12;

        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';

        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Hover effects on interactive elements
    const hoverElements = document.querySelectorAll('a, button, .showcase-card, .social-link, .testimonial-btn, .dot');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
    });
}

// ---- Mobile Navigation ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const mobileOverlay = document.getElementById('mobileOverlay');

if (hamburger && navLinks) {
    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        if (mobileOverlay) mobileOverlay.classList.toggle('active');
    };

    hamburger.addEventListener('click', toggleMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', toggleMenu);

    // Close on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
}

// ---- Navbar Scroll Behavior ----
const nav = document.getElementById('mainNav');
let lastScrollY = 0;
let ticking = false;

const updateNav = () => {
    const currentScroll = window.scrollY;

    if (nav) {
        if (currentScroll > 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        if (currentScroll > lastScrollY && currentScroll > 200) {
            nav.classList.add('hidden');
        } else {
            nav.classList.remove('hidden');
        }
    }

    lastScrollY = currentScroll;
    ticking = false;
};

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateNav);
        ticking = true;
    }
});

// ---- Hero Slider ----
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.hero-dot');
let currentHeroSlide = 0;
let heroSliderInterval;

const showHeroSlide = (index) => {
    heroSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    heroDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    currentHeroSlide = index;
};

const nextHeroSlide = () => {
    const next = (currentHeroSlide + 1) % heroSlides.length;
    showHeroSlide(next);
};

const startHeroSlider = () => {
    heroSliderInterval = setInterval(nextHeroSlide, 5000); // Change slide every 5 seconds
};

const resetHeroSlider = () => {
    clearInterval(heroSliderInterval);
    startHeroSlider();
};

// Dot navigation
heroDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showHeroSlide(index);
        resetHeroSlider();
    });
});

// Start auto-rotation
if (heroSlides.length > 0) {
    startHeroSlider();
}

// ---- Product Slider ----
const productSliderTrack = document.getElementById('productSliderTrack');
const productSliderPrev = document.getElementById('productSliderPrev');
const productSliderNext = document.getElementById('productSliderNext');
const productSliderProgress = document.getElementById('productSliderProgress');

if (productSliderTrack && productSliderPrev && productSliderNext) {
    let currentProductSlide = 0;
    const totalProductSlides = document.querySelectorAll('.product-slide').length;

    const getSlideWidth = () => {
        const slide = document.querySelector('.product-slide');
        if (!slide) return 280;
        const styles = window.getComputedStyle(slide);
        const width = slide.offsetWidth;
        const marginRight = parseInt(styles.marginRight) || 0;
        const gap = 48; // 3rem gap from CSS
        return width + gap;
    };

    const updateProductSlider = () => {
        const slideWidth = getSlideWidth();
        productSliderTrack.scrollTo({
            left: currentProductSlide * slideWidth,
            behavior: 'smooth'
        });

        // Update progress bar
        if (productSliderProgress) {
            const progressBar = productSliderProgress.querySelector('.progress-bar');
            const progressPercent = ((currentProductSlide + 1) / totalProductSlides) * 100;
            progressBar.style.width = `${progressPercent}%`;
        }
    };

    productSliderNext.addEventListener('click', () => {
        if (currentProductSlide < totalProductSlides - 1) {
            currentProductSlide++;
            updateProductSlider();
        }
    });

    productSliderPrev.addEventListener('click', () => {
        if (currentProductSlide > 0) {
            currentProductSlide--;
            updateProductSlider();
        }
    });

    // Initialize progress
    updateProductSlider();

    // Update on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateProductSlider();
        }, 150);
    });
}

// ---- Scroll Reveal Animations ----
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, parseInt(delay));
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
    revealObserver.observe(el);
});

// ---- Hero Parallax ----
const heroContent = document.querySelector('.hero-content');
const heroImage = document.querySelector('.hero-image');
const scrollIndicator = document.getElementById('scrollIndicator');

let parallaxTicking = false;

const updateParallax = () => {
    const scrolled = window.scrollY;
    const heroH = window.innerHeight;

    if (scrolled < heroH) {
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
            heroContent.style.opacity = 1 - (scrolled / (heroH * 0.7));
        }
        if (scrollIndicator) {
            scrollIndicator.style.opacity = 1 - (scrolled / 300);
        }
    }

    parallaxTicking = false;
};

window.addEventListener('scroll', () => {
    if (!parallaxTicking) {
        requestAnimationFrame(updateParallax);
        parallaxTicking = true;
    }
});

// ---- Gold Particles ----
const heroParticles = document.getElementById('heroParticles');
if (heroParticles) {
    const createParticle = () => {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const x = Math.random() * 100;
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 8 + 6;
        const delay = Math.random() * 5;

        particle.style.left = x + '%';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';

        heroParticles.appendChild(particle);

        // Remove after animation
        setTimeout(() => {
            particle.remove();
        }, (duration + delay) * 1000);
    };

    // Create initial particles
    for (let i = 0; i < 20; i++) {
        createParticle();
    }

    // Keep creating new particles
    setInterval(() => {
        if (heroParticles.children.length < 25) {
            createParticle();
        }
    }, 2000);
}

// ---- Testimonial Carousel ----
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevTestimonial');
const nextBtn = document.getElementById('nextTestimonial');

let currentTestimonial = 0;
let testimonialInterval;

const showTestimonial = (index) => {
    testimonialCards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    if (testimonialCards[index]) testimonialCards[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');

    currentTestimonial = index;
};

const nextSlide = () => {
    const next = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(next);
};

const prevSlide = () => {
    const prev = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(prev);
};

if (nextBtn) nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoplay();
});

if (prevBtn) prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoplay();
});

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        showTestimonial(i);
        resetAutoplay();
    });
});

const startAutoplay = () => {
    testimonialInterval = setInterval(nextSlide, 5000);
};

const resetAutoplay = () => {
    clearInterval(testimonialInterval);
    startAutoplay();
};

if (testimonialCards.length > 0) {
    startAutoplay();
}

// ---- Newsletter Form ----
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('.newsletter-input');
        if (input && input.value) {
            input.value = '';
            input.placeholder = 'Thank you for subscribing!';
            setTimeout(() => {
                input.placeholder = 'Your email address';
            }, 3000);
        }
    });
}

// ---- Smooth Anchor Scrolling ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const navHeight = nav ? nav.offsetHeight : 0;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ---- Button Shine Effect ----
document.querySelectorAll('.btn-gold').forEach(btn => {
    btn.addEventListener('mouseenter', function () {
        const shine = this.querySelector('::after');
    });
});

// ---- Performance: Lazy load images below the fold ----
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ---- FAQ Accordion ----
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Close all others
            faqItems.forEach(other => other.classList.remove('open'));

            // Toggle clicked
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    }
});

// ---- Contact Form ----
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById('submitBtn');
        if (submitBtn) {
            submitBtn.textContent = 'MESSAGE SENT ✓';
            submitBtn.style.background = 'rgba(201, 168, 76, 0.3)';
            submitBtn.style.color = 'var(--gold)';
            submitBtn.style.border = '1px solid var(--gold)';
            setTimeout(() => {
                submitBtn.textContent = 'SEND MESSAGE';
                submitBtn.style.background = '';
                submitBtn.style.color = '';
                submitBtn.style.border = '';
                contactForm.reset();
            }, 3000);
        }
    });
}