// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Custom cursor
const cursor = {
    dot: document.querySelector('.cursor-dot'),
    outline: document.querySelector('.cursor-outline'),
    links: document.querySelectorAll('a, button'),
    
    init() {
        // Move cursor
        document.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            this.dot.style.left = `${posX}px`;
            this.dot.style.top = `${posY}px`;
            
            this.outline.style.left = `${posX}px`;
            this.outline.style.top = `${posY}px`;
        });

        // Add hover effect
        this.links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                this.outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                this.outline.style.border = '2px solid var(--accent-dark)';
            });
            
            link.addEventListener('mouseleave', () => {
                this.outline.style.transform = 'translate(-50%, -50%) scale(1)';
                this.outline.style.border = '2px solid var(--accent)';
            });
        });
    }
};

cursor.init();

// Typing animation
const typed = new Typed('.typed-text', {
    strings: [
        'Data Scientist ',
        'Cloud Engineer',
        'Software Engineer',
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const navHeight = document.querySelector('nav').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        
        window.scrollTo({
            top: targetPosition - navHeight,
            behavior: 'smooth'
        });
    });
});

// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.classList.toggle('active');
});

// Animate skill bars when in view
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    });
};

// Intersection Observer for skill bars
const skillsSection = document.querySelector('.skills');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillsObserver.observe(skillsSection);

// Form validation and submission
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    
    // Reset form
    contactForm.reset();
    
    // Show success message (you can customize this)
    alert('Message sent successfully!');
});

// Navbar scroll effect
const nav = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        nav.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
        nav.classList.remove('scroll-up');
        nav.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
        nav.classList.remove('scroll-down');
        nav.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Project card hover effect
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'none';
    });
});

// Animated name effect
const nameAnimation = {
    wrapper: document.querySelector('.name-wrapper'),
    maxRotate: 15, // Maximum rotation in degrees
    maxMove: 10,   // Maximum movement in pixels
    
    init() {
        if (!this.wrapper) return;
        
        document.addEventListener('mousemove', (e) => {
            const rect = this.wrapper.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Calculate distance from cursor to center
            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;
            
            // Calculate rotation based on cursor position
            const rotateX = (distanceY / window.innerHeight) * this.maxRotate;
            const rotateY = -(distanceX / window.innerWidth) * this.maxRotate;
            
            // Calculate movement (opposite to cursor)
            const moveX = -(distanceX / window.innerWidth) * this.maxMove;
            const moveY = -(distanceY / window.innerHeight) * this.maxMove;
            
            // Apply transform with smooth transition
            this.wrapper.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translate(${moveX}px, ${moveY}px)
            `;
        });
        
        // Reset transform when cursor leaves window
        document.addEventListener('mouseleave', () => {
            this.wrapper.style.transform = 'none';
        });
    }
};

nameAnimation.init();
