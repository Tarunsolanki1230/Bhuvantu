// ========================================
// GALLERY DATA
// ========================================
const projectGalleries = {
    'sugan-shree': {
        title: 'Sugan Shree Greens',
        images: [
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
            'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80',
            'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80',
            'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80',
            'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80',
            'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80'
        ]
    },
    'kalpraksh': {
        title: 'Kalpraksh',
        images: [
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
            'https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=1200&q=80',
            'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
            'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80',
            'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&q=80',
            'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80',
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
            'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=1200&q=80'
        ]
    },
    'gurukripa': {
        title: 'Gurukripa Residence',
        images: [
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80',
            'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80',
            'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80',
            'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1200&q=80',
            'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&q=80',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
            'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&q=80',
            'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=1200&q=80'
        ]
    }
};

let currentGallery = [];
let currentImageIndex = 0;

// ========================================
// NAVIGATION
// ========================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll effect for navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu on link click
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth scroll for all navigation links
[...navLinks, ...mobileLinks].forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// SCROLL ANIMATIONS
// ========================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// ========================================
// HERO PARALLAX EFFECT
// ========================================
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// ========================================
// GALLERY MODAL FUNCTIONS
// ========================================
function openGallery(projectId) {
    const modal = document.getElementById('galleryModal');
    const galleryTitle = document.getElementById('galleryTitle');
    const galleryGrid = document.getElementById('galleryGrid');
    
    const project = projectGalleries[projectId];
    if (!project) return;
    
    currentGallery = project.images;
    galleryTitle.textContent = project.title;
    
    // Clear and populate gallery
    galleryGrid.innerHTML = '';
    project.images.forEach((image, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.style.animationDelay = `${index * 0.05}s`;
        item.innerHTML = `<img src="${image}" alt="${project.title} ${index + 1}" loading="lazy">`;
        item.addEventListener('click', () => openLightbox(index));
        galleryGrid.appendChild(item);
    });
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeGallery() {
    const modal = document.getElementById('galleryModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ========================================
// LIGHTBOX FUNCTIONS
// ========================================
function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCounter = document.getElementById('lightboxCounter');
    
    lightboxImage.src = currentGallery[currentImageIndex];
    lightboxCounter.textContent = `${currentImageIndex + 1} / ${currentGallery.length}`;
    
    lightbox.classList.add('active');
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % currentGallery.length;
    updateLightboxImage();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + currentGallery.length) % currentGallery.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCounter = document.getElementById('lightboxCounter');
    
    lightboxImage.style.opacity = '0';
    
    setTimeout(() => {
        lightboxImage.src = currentGallery[currentImageIndex];
        lightboxCounter.textContent = `${currentImageIndex + 1} / ${currentGallery.length}`;
        lightboxImage.style.opacity = '1';
    }, 200);
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') closeLightbox();
});

// Touch swipe for lightbox (mobile)
let touchStartX = 0;
let touchEndX = 0;

document.getElementById('lightbox').addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.getElementById('lightbox').addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) nextImage();
    if (touchEndX > touchStartX + 50) prevImage();
}

// ========================================
// CONTACT FORM
// ========================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.querySelector('span').textContent;
    
    submitButton.querySelector('span').textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        submitButton.querySelector('span').textContent = 'Message Sent!';
        
        // Reset form after 2 seconds
        setTimeout(() => {
            contactForm.reset();
            submitButton.querySelector('span').textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    }, 1500);
    
    console.log('Form submitted:', formData);
});

// ========================================
// INPUT FOCUS GLOW ANIMATION
// ========================================
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', (e) => {
        e.target.parentElement.style.transition = 'all 0.3s ease';
    });
    
    input.addEventListener('blur', (e) => {
        if (!e.target.value) {
            e.target.parentElement.style.transition = 'all 0.3s ease';
        }
    });
});

// ========================================
// BUTTON RIPPLE EFFECT
// ========================================
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// PRELOAD HERO VIDEO
// ========================================
window.addEventListener('load', () => {
    const video = document.querySelector('.hero-video');
    if (video) {
        video.play().catch(err => {
            console.log('Video autoplay prevented:', err);
        });
    }

    // Splash screen auto-hide
    const splash = document.getElementById('splash');
    if (splash) {
        // Allow quick dismiss on tap/click
        splash.addEventListener('click', () => {
            splash.classList.add('hidden');
            setTimeout(() => splash.remove(), 700);
        });

        // Auto hide after a short delay
        setTimeout(() => {
            splash.classList.add('hidden');
            setTimeout(() => {
                try { splash.remove(); } catch (e) {}
            }, 700);
        }, 1400);
    }
});


// ========================================
// PROJECT CARD HOVER EFFECTS
// ========================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ========================================
// LAZY LOADING IMAGES
// ========================================
const images = document.querySelectorAll('img[loading="lazy"]');

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScroll = debounce(() => {
    // Additional scroll logic can go here
}, 10);

window.addEventListener('scroll', optimizedScroll);

// ========================================
// CONSOLE MESSAGE
// ========================================
console.log('%c🏢 Bhuvantu Infra', 'font-size: 24px; font-weight: bold; color: #ff6a00;');
console.log('%cWhere Vision Meets Architecture', 'font-size: 14px; color: #888;');
console.log('%cWebsite crafted with premium design and attention to detail.', 'font-size: 12px; color: #666;');
