/* ============================================
   KINTSUKUROI — Portfolio JS
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
      localStorage.setItem('theme', currentTheme);  // Save to localStorage
      setThemeIcon(currentTheme);
    });
  }  });
  }

  // ---- HEADER SCROLL BEHAVIOUR ----
  const header = document.getElementById('header');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > 60) header.classList.add('header--scrolled');
    else header.classList.remove('header--scrolled');
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

  // ---- ALL 63 PHOTOS ----
  const BASE = 'https://raw.githubusercontent.com/kintsukuroi814/portfolio/main/';
  const photos = [
    // I — Identity
    { src: BASE + 'Kint Sugi.jpg', title: 'Kint Sugi' },
    { src: BASE + 'Know thyself.jpg', title: 'Know Thyself' },
    { src: BASE + 'Inner world.jpeg', title: 'Inner World' },
    { src: BASE + 'Epiphany.jpg', title: 'Epiphany' },
    { src: BASE + 'Wisdom.jpg', title: 'Wisdom' },
    // II — Light
    { src: BASE + 'Illuminate.jpg', title: 'Illuminate' },
    { src: BASE + 'Follow the sun.JPG', title: 'Follow the Sun' },
    { src: BASE + 'Time for lights.jpg', title: 'Time for Lights' },
    { src: BASE + 'Glimpse.jpg', title: 'Glimpse' },
      { src: BASE + 'Beauty.jpg', title: 'Beauty' },   // III — Connection
    { src: BASE + 'Embrace.jpg', title: 'Embrace' },
    { src: BASE + 'Just us.jpg', title: 'Just Us' },
    { src: BASE + 'Hello stranger.jpg', title: 'Hello Stranger' },
    { src: BASE + 'Nuria Godvera.jpeg', title: 'Nuria Godvera' },
    { src: BASE + 'Michelle.jpg', title: 'Michelle' },
      { src: BASE + 'Valentina.jpg', title: 'Valentina' },   // IV — Solitude
    { src: BASE + 'Solitude.jpeg', title: 'Solitude' },
    { src: BASE + 'silent.jpg', title: 'Silent' },
    { src: BASE + 'Dark corners.jpg', title: 'Dark Corners' },
    { src: BASE + 'In between.jpg', title: 'In Between' },
    // V — Body & Existence
    { src: BASE + 'Dead skin.jpg', title: 'Dead Skin' },
    { src: BASE + 'Hold on to yourself.jpeg', title: 'Hold On to Yourself' },
    { src: BASE + 'Burnout.jpeg', title: 'Burnout' },
    { src: BASE + 'Out of the comfort zone.jpg', title: 'Out of the Comfort Zone' },
    // VI — Sound & Rhythm
    { src: BASE + 'Drummer.JPG', title: 'Drummer' },
    { src: BASE + 'Sleeping piano.jpg', title: 'Sleeping Piano' },
    { src: BASE + 'Strings of sanity.jpg', title: 'Strings of Sanity' },
    { src: BASE + 'Rocket Man.jpeg', title: 'Rocket Man' },
    // VII — City & Street
    { src: BASE + 'Street.JPG', title: 'Street' },
    { src: BASE + 'Maribor - Lent in winter.jpg', title: 'Maribor — Lent in Winter' },
    { src: BASE + 'On the go.JPG', title: 'On the Go' },
    { src: BASE + 'Slow grind.jpg', title: 'Slow Grind' },
      { src: BASE + 'Notausgang.jpeg', title: 'Notausgang' },   // VIII — Nature & Space
    { src: BASE + 'Portal.jpg', title: 'Portal' },
    { src: BASE + 'Frozen in time.jpg', title: 'Frozen in Time' },
    { src: BASE + 'Center of gravity.jpg', title: 'Center of Gravity' },
    { src: BASE + 'Going up.jpg', title: 'Going Up' },
    { src: BASE + 'Compass.jpg', title: 'Compass' },
      { src: BASE + 'Lindau.jpg', title: 'Lindau' },   // IX — Objects & Machines
    { src: BASE + 'Mustang.jpg', title: 'Mustang' },
    { src: BASE + 'NSB.jpg', title: 'NSB' },
    { src: BASE + 'Mesh.jpg', title: 'Mesh' },
    { src: BASE + 'Desceptor.jpg', title: 'Desceptor' },
    // X — Power & Freedom
    { src: BASE + 'Power of freedom.jpg', title: 'Power of Freedom' },
    { src: BASE + 'Strive.jpg', title: 'Strive' },
    { src: BASE + 'Carpe diem.jpg', title: 'Carpe Diem' },
    { src: BASE + 'Lucky shot.jpg', title: 'Lucky Shot' },
    { src: BASE + 'Phoenix.JPG', title: 'Phoenix' },
140
     { src: BASE + 'Missing piece.jpg', title: 'Missing Piece' },
    { src: BASE + 'Let go.jpg', title: 'Let Go' },
    { src: BASE + 'Bureaucracy.jpg', title: 'Bureaucracy' },
    { src: BASE + 'Medo.jpg', title: 'Medo' },
    { src: BASE + 'Final line of a chapter.jpg', title: 'Final Line of a Chapter' },
      { src: BASE + 'Genocide memorial - Berlin.jpeg', title: 'Genocide Memorial — Berlin' },   { src: BASE + 'Neue Wache.jpeg', title: 'Neue Wache' },   { src: BASE + 'Topographie des Terrors.jpeg', title: 'Topographie des Terrors' },   // XII — Time
    { src: BASE + 'Set your life on fire. Seek those who fan your flames.jpg', title: 'Set Your Life on Fire' },
    { src: BASE + 'The time is now.jpg', title: 'The Time Is Now' },
    { src: BASE + 'Timing is everything.jpg', title: 'Timing Is Everything' },
    { src: BASE + "When the rich wage war it's the poor who die.jpg", title: 'When the Rich Wage War\u2026' },
    { src: BASE + 'Festina Lente.JPG', title: 'Festina Lente' },
    { src: BASE + 'Your Path.jpeg', title: 'Your Path },;
    { src: BASE + 'Memento Mori.jpg', title: 'Memento Mor }i'
      ]}

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


  // ---- STORY OVERLAY TOUCH TOGGLE ----
  document.querySelectorAll('.photo-item--story').forEach(function (item) {
    item.addEventListener('click', function (e) {
      if (!window.matchMedia('(hover: none)').matches) return;
      if (e.target.closest('.photo-wrap img')) return;
      e.preventDefault();
      var isActive = item.classList.toggle('is-active');
      if (isActive) {
        document.querySelectorAll('.photo-item--story.is-active').forEach(function (other) {
          if (other !== item) other.classList.remove('is-active');
        });
      }
    });
  });
})();
