document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loading-screen');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const exploreBtn = document.getElementById('explore-btn');
    const contactBtn = document.getElementById('contact-btn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const contactForm = document.querySelector('.contact-form');
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.style.opacity = '0';
            loader.style.pointerEvents = 'none';
            loader.style.transition = 'opacity 0.6s ease';
            setTimeout(function() {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 700);
        }, 700);
    });

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('open');
        });
    }

    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (navMenu) {
                navMenu.classList.remove('open');
            }
        });
    });

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    if (cursor && cursorFollower) {
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.transform = 'translate(' + mouseX + 'px, ' + mouseY + 'px)';
        });

        function animateCursor() {
            followerX += (mouseX - followerX) * 0.12;
            followerY += (mouseY - followerY) * 0.12;
            cursorFollower.style.transform = 'translate(' + followerX + 'px, ' + followerY + 'px)';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
    }

    const hoverElements = document.querySelectorAll('.btn, .nav-link, .service-card, .portfolio-item, .view-btn, .social-link');
    hoverElements.forEach(function(element) {
        element.addEventListener('mouseenter', function() {
            if (cursorFollower) {
                cursorFollower.style.transform += ' scale(1.4)';
            }
        });
        element.addEventListener('mouseleave', function() {
            if (cursorFollower) {
                cursorFollower.style.transform = cursorFollower.style.transform.replace(' scale(1.4)', '');
            }
        });
    });

    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            const portfolioSection = document.getElementById('portfolio');
            if (portfolioSection) {
                portfolioSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    const observerOptions = {
        threshold: 0.15
    };
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(function(section) {
        sectionObserver.observe(section);
    });

    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(function(element) {
        const targetValue = parseInt(element.getAttribute('data-target'));
        let currentValue = 0;
        const stepValue = Math.max(1, Math.floor(targetValue / 100));

        function incrementCounter() {
            currentValue += stepValue;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                element.textContent = targetValue;
            } else {
                element.textContent = currentValue;
                requestAnimationFrame(incrementCounter);
            }
        }
        incrementCounter();
    });

    filterBtns.forEach(function(button) {
        button.addEventListener('click', function() {
            filterBtns.forEach(function(btn) {
                btn.classList.remove('active');
            });
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');
            portfolioItems.forEach(function(item) {
                const itemCategory = item.getAttribute('data-category');
                const shouldShow = filterValue === 'all' || itemCategory === filterValue;
                item.style.display = shouldShow ? 'block' : 'none';
            });
        });
    });

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const messageField = document.getElementById('message');

            const name = nameField ? nameField.value.trim() : '';
            const email = emailField ? emailField.value.trim() : '';
            const message = messageField ? messageField.value.trim() : '';

            if (!name || !email || !message) {
                showToast('Please fill in all fields', 'error');
                return;
            }

            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(email)) {
                showToast('Please enter a valid email address', 'error');
                return;
            }

            showToast('Message sent successfully!', 'success');
            contactForm.reset();
        });
    }

    function showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = 'toast ' + type;
        toast.textContent = message;
        toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(20px);padding:12px 16px;border-radius:10px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:#e8ecf1;opacity:0;transition:all 0.25s ease;backdrop-filter:blur(10px);z-index:3000;pointer-events:none;';

        if (type === 'success') {
            toast.style.borderColor = '#1dd1a1';
            toast.style.color = '#1dd1a1';
        } else if (type === 'error') {
            toast.style.borderColor = '#ff6b6b';
            toast.style.color = '#ff6b6b';
        }

        document.body.appendChild(toast);

        setTimeout(function() {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(0)';
        }, 10);

        setTimeout(function() {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(20px)';
            setTimeout(function() {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 2600);
    }
});