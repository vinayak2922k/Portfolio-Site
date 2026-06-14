document.addEventListener('DOMContentLoaded', () => {

    // 0. Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Animate outline with slight delay for smooth trailing effect
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Add hover effect to links and buttons
        const hoverElements = document.querySelectorAll('a, button, .cert-card, .exp-card, .project-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    }

    // 1. Mobile Navbar Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // 2. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('hidden', 'hidden-skill', 'hidden-cert', 'hidden-stat', 'hidden-achieve', 'hidden-contact-l', 'hidden-contact-r');
                entry.target.classList.add('show');
                
                // Trigger Skill Bars if it's a skill category
                if (entry.target.classList.contains('skill-cat-card')) {
                    animateSkills(entry.target);
                }

                // Trigger Stats counter if it's stats section
                if (entry.target.classList.contains('stat-item')) {
                    animateStats(entry.target);
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to observe
    const elementsToObserve = document.querySelectorAll(
        '.about-left, .about-summary, .mv-card, ' +
        '.exp-card, ' +
        '.edu-card, ' +
        '.project-card, ' +
        '.skill-cat-card, ' +
        '.cert-card, ' +
        '.stat-item, .achieve-card, ' +
        '.contact-left, .contact-right'
    );

    elementsToObserve.forEach(el => observer.observe(el));

    // 3. Skill Progress Animation
    function animateSkills(catCard) {
        const skillItems = catCard.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                const percentSpan = item.querySelector('.skill-percent');
                const targetPercent = parseInt(percentSpan.getAttribute('data-target'));
                const progressBar = item.querySelector('.progress-bar');
                
                progressBar.style.width = targetPercent + '%';

                let current = 0;
                const increment = targetPercent / 50; // smooth counting
                const counter = setInterval(() => {
                    current += increment;
                    if (current >= targetPercent) {
                        current = targetPercent;
                        clearInterval(counter);
                    }
                    percentSpan.innerText = Math.floor(current) + '%';
                }, 20); // 50 * 20 = 1000ms (1 second)
            }, index * 200); // stagger
        });
    }

    // 4. Stats Counter Animation
    function animateStats(statItem) {
        const numSpan = statItem.querySelector('.stat-num');
        const targetVal = parseInt(numSpan.getAttribute('data-val'));
        
        let current = 0;
        let increment = targetVal / 40;
        if (targetVal < 10) increment = 1; // for small numbers like 1, 2, 3, 7

        const counter = setInterval(() => {
            current += increment;
            if (current >= targetVal) {
                current = targetVal;
                clearInterval(counter);
            }
            numSpan.innerText = Math.floor(current);
        }, 30);
    }

    // 5. Certification Card 3D Tilt Effect
    if (window.innerWidth > 768) {
        const certCards = document.querySelectorAll('.cert-card');
        
        certCards.forEach(card => {
            // Initial random tilt effect as requested (-2 to +2 deg)
            const randomRot = (Math.random() * 4) - 2;
            card.style.transform = `translateY(0) rotate(${randomRot}deg)`;

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // max rotation 4deg
                const rotateX = ((y - centerY) / centerY) * -4; 
                const rotateY = ((x - centerX) / centerX) * 4;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                // Snap back flat
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
            });
        });
    }

    // 6. Smooth Scrolling for Anchor Links (already handled mostly by CSS but good for offset)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetEl = document.querySelector(targetId);
            if(targetEl) {
                const offsetTop = targetEl.offsetTop - 80; // nav height offset
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});
