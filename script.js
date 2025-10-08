// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initLoadingScreen();
    initBackgroundCanvas();
    initNavigation();
    initTypingEffect();
    initScrollAnimations();
    initTiltEffect();
    initContactForm();
    initMobileMenu();
});

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
}

// Background Canvas with Liquid Animation
function initBackgroundCanvas() {
    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle system
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = `rgba(0, 188, 212, ${Math.random() * 0.3 + 0.1})`;
            this.oscillation = Math.random() * Math.PI * 2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.oscillation += 0.02;
            
            // Oscillate size
            this.size = Math.sin(this.oscillation) * 1.5 + 2;
            
            // Reset if out of bounds
            if (this.x < -50 || this.x > canvas.width + 50 || 
                this.y < -50 || this.y > canvas.height + 50) {
                this.reset();
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            
            // Add glow effect
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;
        }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw gradient background
        const gradient = ctx.createRadialGradient(
            canvas.width / 2, canvas.height / 2, 0,
            canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
        );
        gradient.addColorStop(0, 'rgba(10, 15, 26, 0.1)');
        gradient.addColorStop(1, 'rgba(10, 15, 26, 0.8)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Reset shadow
        ctx.shadowBlur = 0;
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navLinksContainer = document.querySelector('.nav-links');
                navLinksContainer.classList.remove('active');
            }
        });
    });
    
    // Add scroll effect to navigation
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.glass-nav');
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(10, 15, 26, 0.95)';
            nav.style.backdropFilter = 'blur(20px)';
        } else {
            nav.style.background = 'rgba(10, 15, 26, 0.8)';
            nav.style.backdropFilter = 'blur(15px)';
        }
    });
}

// Mobile Menu
function initMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenu.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
    });
}

// Typing Effect
function initTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    const text = "Built by B-TECH";
    let index = 0;
    
    function type() {
        if (index < text.length) {
            typingText.textContent = text.substring(0, index + 1);
            index++;
            setTimeout(type, 100);
        }
    }
    
    // Start typing after loading
    setTimeout(type, 500);
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    const elementsToAnimate = document.querySelectorAll('.section, .project-card, .service-card');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// Tilt Effect for About Card
function initTiltEffect() {
    const tiltCard = document.getElementById('tilt-card');
    
    if (tiltCard && window.innerWidth > 768) {
        tiltCard.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        tiltCard.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    }
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const messagePopup = document.getElementById('message-popup');
    const popupClose = document.getElementById('popup-close');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                timestamp: new Date().toISOString()
            };
            
            // Save to localStorage
            saveToLocalStorage(formData);
            
            // Show success message
            showMessagePopup();
            
            // Reset form
            this.reset();
        });
    }
    
    if (popupClose) {
        popupClose.addEventListener('click', function() {
            messagePopup.classList.remove('active');
        });
    }
}

// Save to Local Storage
function saveToLocalStorage(formData) {
    let messages = JSON.parse(localStorage.getItem('btechMessages')) || [];
    messages.push(formData);
    localStorage.setItem('btechMessages', JSON.stringify(messages));
}

// Show Message Popup
function showMessagePopup() {
    const messagePopup = document.getElementById('message-popup');
    messagePopup.classList.add('active');
    
    // Auto close after 5 seconds
    setTimeout(() => {
        messagePopup.classList.remove('active');
    }, 5000);
}

// Explore Projects Button
document.addEventListener('DOMContentLoaded', function() {
    const exploreBtn = document.querySelector('.explore-btn');
    
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            const projectsSection = document.getElementById('projects');
            const offsetTop = projectsSection.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        });
    }
});

// Add ripple effect to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.glass-btn, .project-btn, .submit-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.marginLeft = '-50px';
            ripple.style.marginTop = '-50px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
// Add to existing script.js

// Performance monitoring
window.addEventListener('load', function() {
    // Log performance metrics
    if ('performance' in window) {
        const perfData = window.performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
        
        // Send to analytics (placeholder)
        if (loadTime < 3000) {
            console.log('Excellent load performance');
        }
    }
});

// Lazy loading for images (if added later)
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Error tracking
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // Send to error tracking service
});

// Update page title dynamically based on section
function updatePageTitle() {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                const titles = {
                    'home': 'B-TECH | Building Tomorrow\'s Technology Today',
                    'about': 'About B-TECH | Benjamin Sekyere - Ghana Software Developer',
                    'projects': 'B-TECH Projects | Software Development Portfolio',
                    'services': 'B-TECH Services | Web Development & AI Solutions',
                    'contact': 'Contact B-TECH | Get in Touch'
                };
                
                if (titles[sectionId]) {
                    document.title = titles[sectionId];
                    // Update URL without reloading
                    history.replaceState(null, '', `#${sectionId}`);
                }
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => observer.observe(section));
}

// Initialize SEO features
document.addEventListener('DOMContentLoaded', function() {
    // Existing initializations...
    updatePageTitle();
    initLazyLoading();
    
    // Add structured data for breadcrumbs
    addBreadcrumbStructuredData();
});

// Breadcrumb structured data
function addBreadcrumbStructuredData() {
    const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://b-tech-ghana.com/"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Portfolio",
                "item": "https://b-tech-ghana.com/#projects"
            }
        ]
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(breadcrumbData);
    document.head.appendChild(script);
}

// WhatsApp Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const messagePopup = document.getElementById('message-popup');
    const popupClose = document.getElementById('popup-close');
    
    // WhatsApp phone number (replace with actual number)
    const whatsappNumber = "233241360585"; // Ghana format without +
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                subject: document.getElementById('subject').value.trim(),
                message: document.getElementById('message').value.trim()
            };
            
            // Validate form
            if (validateForm(formData)) {
                // Send to WhatsApp
                sendToWhatsApp(formData);
                
                // Show success message
                showMessagePopup();
                
                // Reset form
                this.reset();
            }
        });
    }
    
    if (popupClose) {
        popupClose.addEventListener('click', function() {
            messagePopup.classList.remove('active');
        });
    }
}

// Form validation
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name) {
        errors.push("Name is required");
        highlightError('name');
    }
    
    if (!formData.email) {
        errors.push("Email is required");
        highlightError('email');
    } else if (!isValidEmail(formData.email)) {
        errors.push("Please enter a valid email address");
        highlightError('email');
    }
    
    if (!formData.subject) {
        errors.push("Subject is required");
        highlightError('subject');
    }
    
    if (!formData.message) {
        errors.push("Message is required");
        highlightError('message');
    }
    
    if (errors.length > 0) {
        showErrorPopup(errors);
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Error highlighting
function highlightError(fieldId) {
    const field = document.getElementById(fieldId);
    field.style.borderColor = '#ff4444';
    field.style.boxShadow = '0 0 10px rgba(255, 68, 68, 0.3)';
    
    // Remove error styling after 3 seconds
    setTimeout(() => {
        field.style.borderColor = '';
        field.style.boxShadow = '';
    }, 3000);
}

// Error popup
function showErrorPopup(errors) {
    const popup = document.getElementById('message-popup');
    const popupContent = popup.querySelector('.popup-content');
    
    popupContent.innerHTML = `
        <h3 style="color: #ff4444;">Please Fix Errors</h3>
        <ul style="text-align: left; color: rgba(255, 255, 255, 0.8); margin-bottom: 2rem;">
            ${errors.map(error => `<li>${error}</li>`).join('')}
        </ul>
        <button id="popup-close" class="popup-btn">OK</button>
    `;
    
    // Re-attach event listener to new close button
    const newCloseBtn = popupContent.querySelector('#popup-close');
    newCloseBtn.addEventListener('click', () => {
        popup.classList.remove('active');
    });
    
    popup.classList.add('active');
}

// Send message to WhatsApp
function sendToWhatsApp(formData) {
    // Format the message
    const message = formatWhatsAppMessage(formData);
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
}

// Format WhatsApp message
function formatWhatsAppMessage(formData) {
    const timestamp = new Date().toLocaleString();
    
    return `Hello B-TECH! 👋

I'm interested in your services and would like to discuss a project.

*Name:* ${formData.name}
*Email:* ${formData.email}
*Subject:* ${formData.subject}

*Message:*
${formData.message}

This message was sent from your portfolio website on ${timestamp}.`;
}

// Direct WhatsApp link handler
function initDirectWhatsApp() {
    const whatsappLink = document.getElementById('whatsapp-direct');
    if (whatsappLink) {
        whatsappLink.addEventListener('click', function(e) {
            e.preventDefault();
            const defaultMessage = "Hello B-TECH! I visited your portfolio and would like to get in touch.";
            const encodedMessage = encodeURIComponent(defaultMessage);
            window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
        });
    }
}

// Enhanced popup for WhatsApp success
function showMessagePopup() {
    const messagePopup = document.getElementById('message-popup');
    const popupContent = messagePopup.querySelector('.popup-content');
    
    popupContent.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">📱</div>
            <h3 style="color: var(--primary);">Opening WhatsApp!</h3>
            <p style="color: rgba(255, 255, 255, 0.8); margin-bottom: 2rem;">
                Your message has been prepared and WhatsApp is opening.<br>
                Please click send to complete your message.
            </p>
            <button id="popup-close" class="popup-btn">OK</button>
        </div>
    `;
    
    // Re-attach event listener
    const newCloseBtn = popupContent.querySelector('#popup-close');
    newCloseBtn.addEventListener('click', () => {
        messagePopup.classList.remove('active');
    });
    
    messagePopup.classList.add('active');
    
    // Auto close after 8 seconds
    setTimeout(() => {
        if (messagePopup.classList.contains('active')) {
            messagePopup.classList.remove('active');
        }
    }, 8000);
}

// Update initialization function
document.addEventListener('DOMContentLoaded', function() {
    // Existing initializations...
    initContactForm();
    initDirectWhatsApp();
    // ... other initializations
});