/* =========================================
   ÈLANÈ — Premium Interactions
   ========================================= */

// ---- Preloader ----
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1200);
    }
});

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
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
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