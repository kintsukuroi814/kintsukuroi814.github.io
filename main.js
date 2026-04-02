/* ============================================
   KINTSUKUROI — Portfolio JS
   ============================================ */

(function () {
  'use strict';

  // ---- THEME TOGGLE ----
  const html = document.documentElement;
  const toggleBtn = document.querySelector('[data-theme-toggle]');

  // Initialise from system preference
  let currentTheme = 'dark'; // always start dark for photography
  html.setAttribute('data-theme', currentTheme);

  function setThemeIcon(theme) {
    if (!toggleBtn) return;
    if (theme === 'dark') {
      toggleBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
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
      setThemeIcon(currentTheme);
    });
  }

  // ---- HEADER SCROLL BEHAVIOUR ----
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > 60) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    if (current > lastScroll && current > 200) {
      header.classList.add('header--hidden');
    } else {
      header.classList.remove('header--hidden');
    }
    lastScroll = Math.max(0, current);
  }, { passive: true });

  // ---- MOBILE NAV ----
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      mobileNav.setAttribute('aria-hidden', !isOpen);
    });

    // Close on link click
    mobileNav.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
        mobileNav.setAttribute('aria-hidden', true);
      });
    });
  }

  // ---- HERO FADE IN ----
  const fadeItems = document.querySelectorAll('.fade-in');
  fadeItems.forEach((el, i) => {
    el.setAttribute('data-animate', '');
    setTimeout(() => {
      el.classList.add('visible');
    }, 200 + i * 150);
  });

  // ---- LIGHTBOX ----
  const photos = [
    { src: 'https://raw.githubusercontent.com/kintsukuroi814/portfolio/main/Kint%20Sugi.jpg', title: 'Kint Sugi' },
    { src: 'https://raw.githubusercontent.com/kintsukuroi814/portfolio/main/Illuminate.jpg', title: 'Illuminate' },
    { src: 'https://raw.githubusercontent.com/kintsukuroi814/portfolio/main/Dark%20corners.jpg', title: 'Dark Corners' },
    { src: 'https://raw.githubusercontent.com/kintsukuroi814/portfolio/main/Portal.jpg', title: 'Portal' },
    { src: 'https://raw.githubusercontent.com/kintsukuroi814/portfolio/main/Follow%20the%20sun.JPG', title: 'Follow the Sun' },
    { src: 'https://raw.githubusercontent.com/kintsukuroi814/portfolio/main/silent.jpg', title: 'Silent' },
    { src: 'https://raw.githubusercontent.com/kintsukuroi814/portfolio/main/Know%20thyself.jpg', title: 'Know Thyself' },
    { src: 'https://raw.githubusercontent.com/kintsukuroi814/portfolio/main/Sleeping%20piano.jpg', title: 'Sleeping Piano' },
    { src: 'https://raw.githubusercontent.com/kintsukuroi814/portfolio/main/Carpe%20diem.jpg', title: 'Carpe Diem' },
    { src: 'https://raw.githubusercontent.com/kintsukuroi814/portfolio/main/Center%20of%20gravity.jpg', title: 'Center of Gravity' },
    { src: 'https://raw.githubusercontent.com/kintsukuroi814/portfolio/main/Dead%20skin.jpg', title: 'Dead Skin' },
    { src: 'https://raw.githubusercontent.com/kintsukuroi814/portfolio/main/Desceptor.jpg', title: 'Desceptor' },
    { src: 'https://raw.githubusercontent.com/kintsukuroi814/portfolio/main/Going%20up.jpg', title: 'Going Up' },
    { src: 'https://raw.githubusercontent.com/kintsukuroi814/portfolio/main/Let%20go.jpg', title: 'Let Go' },
    { src: 'https://raw.githubusercontent.com/kintsukuroi814/portfolio/main/Maribor%20-%20Lent%20in%20winter.jpg', title: 'Maribor — Lent in Winter' },
    { src: 'https://raw.githubusercontent.com/kintsukuroi814/portfolio/main/Missing%20piece.jpg', title: 'Missing Piece' },
    { src: 'https://raw.githubusercontent.com/kintsukuroi814/portfolio/main/On%20the%20go.JPG', title: 'On the Go' },
    { src: 'https://raw.githubusercontent.com/kintsukuroi814/portfolio/main/Slow%20grind.jpg', title: 'Slow Grind' },
    { src: 'https://raw.githubusercontent.com/kintsukuroi814/portfolio/main/Street.JPG', title: 'Street' },
    { src: 'https://raw.githubusercontent.com/kintsukuroi814/portfolio/main/Strive.jpg', title: 'Strive' },
    { src: 'https://raw.githubusercontent.com/kintsukuroi814/portfolio/main/The%20time%20is%20now.jpg', title: 'The Time Is Now' },
    { src: 'https://raw.githubusercontent.com/kintsukuroi814/portfolio/main/Time%20for%20lights.jpg', title: 'Time for Lights' },
    { src: 'https://raw.githubusercontent.com/kintsukuroi814/portfolio/main/Timing%20is%20everything.jpg', title: 'Timing Is Everything' },
    { src: "https://raw.githubusercontent.com/kintsukuroi814/portfolio/main/When%20the%20rich%20wage%20war%20it's%20the%20poor%20who%20die.jpg", title: 'When the Rich Wage War…' },
  ];

  const lightbox      = document.getElementById('lightbox');
  const lbImg         = document.getElementById('lightbox-img');
  const lbTitle       = document.getElementById('lightbox-title');
  const lbCounter     = document.getElementById('lightbox-counter');
  const lbClose       = document.getElementById('lightbox-close');
  const lbPrev        = document.getElementById('lightbox-prev');
  const lbNext        = document.getElementById('lightbox-next');
  const lbBackdrop    = document.getElementById('lightbox-backdrop');

  let currentIndex = 0;
  let isOpen = false;

  function openLightbox(index) {
    currentIndex = ((index % photos.length) + photos.length) % photos.length;
    const photo = photos[currentIndex];
    lbImg.src = photo.src;
    lbImg.alt = photo.title;
    lbTitle.textContent = photo.title;
    lbCounter.textContent = `${currentIndex + 1} / ${photos.length}`;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', false);
    document.body.style.overflow = 'hidden';
    isOpen = true;
    lbClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', true);
    document.body.style.overflow = '';
    isOpen = false;
  }

  function navigate(dir) {
    currentIndex = ((currentIndex + dir + photos.length) % photos.length);
    const photo = photos[currentIndex];
    // Fade transition
    lbImg.style.opacity = '0';
    lbImg.style.transition = 'opacity 0.2s ease';
    setTimeout(() => {
      lbImg.src = photo.src;
      lbImg.alt = photo.title;
      lbTitle.textContent = photo.title;
      lbCounter.textContent = `${currentIndex + 1} / ${photos.length}`;
      lbImg.style.opacity = '1';
    }, 180);
  }

  // Open from grid
  document.querySelectorAll('.photo-item').forEach(item => {
    const idx = parseInt(item.dataset.index, 10);
    item.addEventListener('click', () => openLightbox(idx));
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(idx); }
    });
  });

  if (lbClose)   lbClose.addEventListener('click', closeLightbox);
  if (lbBackdrop) lbBackdrop.addEventListener('click', closeLightbox);
  if (lbPrev)    lbPrev.addEventListener('click', () => navigate(-1));
  if (lbNext)    lbNext.addEventListener('click', () => navigate(1));

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!isOpen) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  // Touch swipe for lightbox
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  lightbox.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1);
  }, { passive: true });

})();
