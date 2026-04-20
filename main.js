/* ============================================
   KINTSUKUROI — Portfolio JS
   ============================================ */

(function () {
  'use strict';

  // ---- THEME TOGGLE ----
  const html = document.documentElement;
  const toggleBtn = document.querySelector('[data-theme-toggle]');

  let currentTheme = 'dark';
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
    if (current > 60) header.classList.add('header--scrolled');
    else header.classList.remove('header--scrolled');
    if (current > lastScroll && current > 200) header.classList.add('header--hidden');
    else header.classList.remove('header--hidden');
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
    setTimeout(() => el.classList.add('visible'), 200 + i * 150);
  });

  // ---- ALL 54 PHOTOS ----
  const BASE = 'https://raw.githubusercontent.com/kintsukuroi814/portfolio/main/';
  const photos = [
    // I — Identity
    { src: BASE + 'Kint%20Sugi.jpg', title: 'Kint Sugi' },
    { src: BASE + 'Know%20thyself.jpg', title: 'Know Thyself' },
    { src: BASE + 'Inner%20world.jpeg', title: 'Inner World' },
    { src: BASE + 'Epiphany.jpg', title: 'Epiphany' },
    { src: BASE + 'Wisdom.jpg', title: 'Wisdom' },
    // II — Light
    { src: BASE + 'Illuminate.jpg', title: 'Illuminate' },
    { src: BASE + 'Follow%20the%20sun.JPG', title: 'Follow the Sun' },
    { src: BASE + 'Time%20for%20lights.jpg', title: 'Time for Lights' },
    { src: BASE + 'Glimpse.jpg', title: 'Glimpse' },
    // III — Connection
    { src: BASE + 'Embrace.jpg', title: 'Embrace' },
    { src: BASE + 'Just%20us.jpg', title: 'Just Us' },
    { src: BASE + 'Hello%20stranger.jpg', title: 'Hello Stranger' },
    { src: BASE + 'Nuria%20Godvera.jpeg', title: 'Nuria Godvera' },
    { src: BASE + 'Michelle.jpg', title: 'Michelle' },
    // IV — Solitude
    { src: BASE + 'Solitude.jpeg', title: 'Solitude' },
    { src: BASE + 'silent.jpg', title: 'Silent' },
    { src: BASE + 'Dark%20corners.jpg', title: 'Dark Corners' },
    { src: BASE + 'In%20between.jpg', title: 'In Between' },
    // V — Body & Existence
    { src: BASE + 'Dead%20skin.jpg', title: 'Dead Skin' },
    { src: BASE + 'Hold%20on%20to%20yourself.jpeg', title: 'Hold On to Yourself' },
    { src: BASE + 'Burnout.jpeg', title: 'Burnout' },
    { src: BASE + 'Out%20of%20the%20comfort%20zone.jpg', title: 'Out of the Comfort Zone' },
    // VI — Sound & Rhythm
    { src: BASE + 'Drummer.JPG', title: 'Drummer' },
    { src: BASE + 'Sleeping%20piano.jpg', title: 'Sleeping Piano' },
    { src: BASE + 'Strings%20of%20sanity.jpg', title: 'Strings of Sanity' },
    { src: BASE + 'Rocket%20Man.jpeg', title: 'Rocket Man' },
    // VII — City & Street
    { src: BASE + 'Street.JPG', title: 'Street' },
    { src: BASE + 'Maribor%20-%20Lent%20in%20winter.jpg', title: 'Maribor — Lent in Winter' },
    { src: BASE + 'On%20the%20go.JPG', title: 'On the Go' },
    { src: BASE + 'Slow%20grind.jpg', title: 'Slow Grind' },
    // VIII — Nature & Space
    { src: BASE + 'Portal.jpg', title: 'Portal' },
    { src: BASE + 'Frozen%20in%20time.jpg', title: 'Frozen in Time' },
    { src: BASE + 'Center%20of%20gravity.jpg', title: 'Center of Gravity' },
    { src: BASE + 'Going%20up.jpg', title: 'Going Up' },
    { src: BASE + 'Compass.jpg', title: 'Compass' },
    // IX — Objects & Machines
    { src: BASE + 'Mustang.jpg', title: 'Mustang' },
    { src: BASE + 'NSB.jpg', title: 'NSB' },
    { src: BASE + 'Mesh.jpg', title: 'Mesh' },
    { src: BASE + 'Desceptor.jpg', title: 'Desceptor' },
    // X — Power & Freedom
    { src: BASE + 'Power%20of%20freedom.jpg', title: 'Power of Freedom' },
    { src: BASE + 'Strive.jpg', title: 'Strive' },
    { src: BASE + 'Carpe%20diem.jpg', title: 'Carpe Diem' },
    { src: BASE + 'Lucky%20shot.jpg', title: 'Lucky Shot' },
    { src: BASE + 'Phoenix.JPG', title: 'Phoenix' },
    // XI — Loss & Letting Go
    { src: BASE + 'Missing%20piece.jpg', title: 'Missing Piece' },
    { src: BASE + 'Let%20go.jpg', title: 'Let Go' },
    { src: BASE + 'Bureaucracy.jpg', title: 'Bureaucracy' },
    { src: BASE + 'Medo.jpg', title: 'Medo' },
    { src: BASE + 'Final%20line%20of%20a%20chapter.jpg', title: 'Final Line of a Chapter' },
    // XII — Time
    { src: BASE + 'Set%20your%20life%20on%20fire.%20Seek%20those%20who%20fan%20your%20flames.jpg', title: 'Set Your Life on Fire' },
    { src: BASE + 'The%20time%20is%20now.jpg', title: 'The Time Is Now' },
    { src: BASE + 'Timing%20is%20everything.jpg', title: 'Timing Is Everything' },
    { src: BASE + "When%20the%20rich%20wage%20war%20it's%20the%20poor%20who%20die.jpg", title: 'When the Rich Wage War\u2026' },
    { src: BASE + 'Festina%20Lente.JPG', title: 'Festina Lente' },
  ];

  // ---- LIGHTBOX ----
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbTitle = document.getElementById('lightbox-title');
  const lbCounter = document.getElementById('lightbox-counter');
  const lbClose = document.getElementById('lightbox-close');
  const lbPrev = document.getElementById('lightbox-prev');
  const lbNext = document.getElementById('lightbox-next');
  const lbBackdrop = document.getElementById('lightbox-backdrop');

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
    lbImg.style.opacity = '0';
    lbImg.style.transition = 'opacity 0.18s ease';
    setTimeout(() => {
      lbImg.src = photo.src;
      lbImg.alt = photo.title;
      lbTitle.textContent = photo.title;
      lbCounter.textContent = `${currentIndex + 1} / ${photos.length}`;
      lbImg.style.opacity = '1';
    }, 180);
  }

  document.querySelectorAll('.photo-item').forEach(item => {
    const idx = parseInt(item.dataset.index, 10);
    item.addEventListener('click', () => openLightbox(idx));
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(idx);
      }
    });
  });

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbBackdrop) lbBackdrop.addEventListener('click', closeLightbox);
  if (lbPrev) lbPrev.addEventListener('click', () => navigate(-1));
  if (lbNext) lbNext.addEventListener('click', () => navigate(1));

  document.addEventListener('keydown', e => {
    if (!isOpen) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  // Touch swipe
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  lightbox.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1);
  }, { passive: true });

})();
