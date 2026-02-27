document.addEventListener('DOMContentLoaded', () => {
    // Current year for footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Scroll Observer for Fade-In Animations
    const fadeElements = document.querySelectorAll('.auto-fade');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Fallback: make all sections visible after 800ms regardless
    setTimeout(() => {
        fadeElements.forEach(el => el.classList.add('visible'));
    }, 800);

    // Navbar Scrolled State
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for navbar height
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ─── Reel Modal ───────────────────────────────────────────
    const modal = document.getElementById('reelModal');
    const iframe = document.getElementById('reelIframe');
    const closeBtn = document.getElementById('reelClose');
    const overlay = document.getElementById('reelOverlay');

    function openReel(videoId) {
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeReel() {
        modal.classList.remove('open');
        iframe.src = '';
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.portfolio-item[data-video-id]').forEach(item => {
        item.addEventListener('click', () => openReel(item.dataset.videoId));
    });

    closeBtn.addEventListener('click', closeReel);
    overlay.addEventListener('click', closeReel);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeReel(); });
});
