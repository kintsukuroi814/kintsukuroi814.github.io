/* ============================================
   KINTSUKUROI - Portfolio JS
   ============================================ */

(function () {
    'use strict';

    // ---- THEME TOGGLE (with localStorage) ----
    const html = document.documentElement;
    const toggleBtn = document.querySelector('[data-theme-toggle]');

    // Load saved theme from localStorage or default to 'dark'
    let currentTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', currentTheme);

    function setThemeIcon(theme) {
        if (!toggleBtn) return;
        if (theme === 'dark') {
            toggleBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
            toggleBtn.setAttribute('aria-label', 'Switch to light mode');
        } else {
            toggleBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
            toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
        }
    }

    setThemeIcon(currentTheme);

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', currentTheme);
            localStorage.setItem('theme', currentTheme);
            setThemeIcon(currentTheme);
        });
    }

    // ---- HEADER SCROLL BEHAVIOUR ----
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) header.classList.add('header--scrolled');
        else header.classList.remove('header--scrolled');
    }, { passive: true });

    // ---- MOBILE NAV ----
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            const isOpen = hamburger.classList.toggle('open');
            mobileNav.classList.toggle('open', isOpen);
        });
    }

    // ---- LIGHTBOX (Virtual Gallery) ----
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    const lbTitle = document.getElementById('lightbox-title');
    const lbCounter = document.getElementById('lightbox-counter');
    let currentIndex = 0;

    // Use querySelectorAll to find all gallery items
    const photoItems = document.querySelectorAll('.photo-item:not(.photo-item--story)');
    const totalPhotos = photoItems.length;

    function openLightbox(index) {
        currentIndex = index;
        updateLightbox();
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    }

    function updateLightbox() {
        const item = photoItems[currentIndex];
        const img = item.querySelector('img');
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lbTitle.textContent = img.alt;
        lbCounter.textContent = `${currentIndex + 1} / ${totalPhotos}`;
    }

    function navigate(dir) {
        currentIndex = (currentIndex + dir + totalPhotos) % totalPhotos;
        lbImg.style.opacity = '0';
        setTimeout(() => {
            updateLightbox();
            lbImg.style.opacity = '1';
        }, 150);
    }

    photoItems.forEach((item, idx) => {
        item.addEventListener('click', () => openLightbox(idx));
    });

    document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
    document.getElementById('lightbox-prev')?.addEventListener('click', (e) => { e.stopPropagation(); navigate(-1); });
    document.getElementById('lightbox-next')?.addEventListener('click', (e) => { e.stopPropagation(); navigate(1); });
    document.getElementById('lightbox-backdrop')?.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
    });

    // ---- STORY MODAL (Readable) ----
    const storyBtn = document.querySelector('[href="javascript:void(0);"]');
    const storyModal = document.getElementById('story-modal');
    if (storyBtn && storyModal) {
        storyBtn.addEventListener('click', () => {
            storyModal.classList.add('is-open');
            document.body.style.overflow = 'hidden';
        });
    }

    // ---- KINTSUKUROI ANIMATIONS ----
    // Subtle parallax and reveal
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.photo-item, .section-title, .chapter-label').forEach(el => {
        observer.observe(el);
    });

})();
