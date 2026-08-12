/* ==========================================================================
   DK DESIGNS STUDIO - 3D Parallax & Interactive Master Module (Cybernetic & Holographic Edition)
   Features:
   - GPU Accelerated Lerped Custom Cursor & Follower
   - Holographic Levitation & 3D Tilt Card Engine with Animated Specular Light Glare
   - Cybernetic Constellation & 3D Geometry Hero Canvas Engine with Mouse Energy Well
   - Physics Inertia Mouse Parallax Depth Engine (60/120 FPS RAF)
   - Hardware Accelerated ScaleX Scroll Progress Bar
   - Filter & Modal System with Fluid Card Transitions
   - Dark / Light Mode Switcher with localStorage persistence
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initThemeToggle();
  initCustomCursor();
  init3DTiltCards();
  init3DGlobalParallax();
  initHero3DCanvas();
  initNavbar();
  initSmoothScrolling();
  initPortfolio();
  initCaseStudyModal();
  initSkills();
  initCounters();
  initTestimonials();
  initContactForm();
  initBackToTop();
  init3DScrollReveal();
});

/* --------------------------------------------------------------------------
   00. TOP SCROLL PROGRESS BAR ENGINE
   -------------------------------------------------------------------------- */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  let ticking = false;

  function updateProgress() {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${Math.min(Math.max(progress, 0), 100)}%`;
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });

  updateProgress();
}

/* --------------------------------------------------------------------------
   0. DARK / LIGHT THEME TOGGLE ENGINE (Interactive Pill Switch)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const toggleBtns = document.querySelectorAll('.theme-toggle-switch');
  if (!toggleBtns.length) return;

  const savedTheme = localStorage.getItem('dk-theme') || 'dark';
  const isLight = savedTheme === 'light';

  applyTheme(isLight);

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isNowLight = document.body.classList.toggle('light-mode');
      localStorage.setItem('dk-theme', isNowLight ? 'light' : 'dark');
      applyTheme(isNowLight);
    });
  });

  function applyTheme(isLightMode) {
    if (isLightMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }

    toggleBtns.forEach(btn => {
      btn.setAttribute('aria-checked', isLightMode ? 'true' : 'false');
      const thumbIcon = btn.querySelector('.thumb-icon');
      if (thumbIcon) {
        thumbIcon.className = isLightMode ? 'thumb-icon ri-sun-fill' : 'thumb-icon ri-moon-fill';
      }
    });
  }
}

/* --------------------------------------------------------------------------
   1. CUSTOM 3D CURSOR REMOVED
   -------------------------------------------------------------------------- */
function initCustomCursor() { }

/* --------------------------------------------------------------------------
   2. HOLOGRAPHIC LEVITATION & TILT CARD ENGINE (FIXED HOVER JITTER BUG)
   -------------------------------------------------------------------------- */
function init3DTiltCards() {
  // Disabled JS rotate tilt animation to prevent hover jitter/glitch
}

/* --------------------------------------------------------------------------
   3. GLOBAL MOUSE PERSPECTIVE 3D PARALLAX INERTIA ENGINE
   -------------------------------------------------------------------------- */
function init3DGlobalParallax() {
  const parallaxEls = document.querySelectorAll('[data-parallax-depth]');
  if (!parallaxEls.length) return;

  let targetDx = 0, targetDy = 0;
  let currentDx = 0, currentDy = 0;

  window.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    targetDx = (e.clientX - cx) / cx;
    targetDy = (e.clientY - cy) / cy;
  }, { passive: true });

  function renderParallax() {
    currentDx += (targetDx - currentDx) * 0.07;
    currentDy += (targetDy - currentDy) * 0.07;

    parallaxEls.forEach(el => {
      const depth = parseFloat(el.getAttribute('data-parallax-depth')) || 0.05;
      const moveX = currentDx * depth * 80;
      const moveY = currentDy * depth * 80;
      const rotateZ = currentDx * depth * 5;

      el.style.transform = `translate3d(${moveX.toFixed(2)}px, ${moveY.toFixed(2)}px, 0px) rotate(${rotateZ.toFixed(2)}deg)`;
    });

    requestAnimationFrame(renderParallax);
  }
  requestAnimationFrame(renderParallax);
}

/* --------------------------------------------------------------------------
   4. MULTI-DISCIPLINARY CREATIVE 3D HERO CANVAS ENGINE
   -------------------------------------------------------------------------- */
function initHero3DCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  let time = 0;
  let mouse = { x: null, y: null, targetX: null, targetY: null };
  let stardust = [];
  let prisms = [];
  let sparks = [];

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);
    initScene();
  }

  window.addEventListener('resize', resize, { passive: true });

  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.targetX = null;
    mouse.targetY = null;
  });

  window.addEventListener('click', (e) => {
    for (let i = 0; i < 20; i++) {
      const angle = (Math.PI * 2 * i) / 20 + (Math.random() - 0.5);
      const speed = Math.random() * 5 + 2.5;
      sparks.push({
        x: e.clientX,
        y: e.clientY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 3 + 1.5,
        alpha: 1,
        color: i % 2 === 0 ? '#D946EF' : '#06B6D4'
      });
    }
  });

  function initScene() {
    stardust = [];
    const count = Math.min(80, Math.floor((width * height) / 16000));
    const colors = ['#D946EF', '#7C3AED', '#06B6D4', '#38BDF8'];

    for (let i = 0; i < count; i++) {
      stardust.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2.5 + 1.2,
        color: colors[i % colors.length],
        alpha: Math.random() * 0.5 + 0.3
      });
    }

    prisms = [];
    const prismCount = 8;
    for (let i = 0; i < prismCount; i++) {
      prisms.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 35 + 25,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        rot: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.012,
        sides: i % 2 === 0 ? 4 : 6,
        color: colors[i % colors.length]
      });
    }
  }

  function drawPrisms() {
    const isLight = document.body.classList.contains('light-mode');
    ctx.save();

    prisms.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vRot;

      if (p.x < -40 || p.x > width + 40) p.vx *= -1;
      if (p.y < -40 || p.y > height + 40) p.vy *= -1;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 220) {
          const force = (1 - dist / 220) * 2;
          p.x -= (dx / dist) * force;
          p.y -= (dy / dist) * force;
        }
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);

      ctx.strokeStyle = isLight ? 'rgba(124, 58, 237, 0.25)' : p.color;
      ctx.globalAlpha = isLight ? 0.3 : 0.45;
      ctx.lineWidth = 1.2;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = isLight ? 4 : 12;

      ctx.beginPath();
      const step = (Math.PI * 2) / p.sides;
      for (let i = 0; i < p.sides; i++) {
        const px = Math.cos(step * i) * p.size;
        const py = Math.sin(step * i) * p.size;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      for (let i = 0; i < p.sides; i++) {
        const px = Math.cos(step * i + Math.PI / p.sides) * (p.size * 0.5);
        const py = Math.sin(step * i + Math.PI / p.sides) * (p.size * 0.5);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();

      ctx.restore();
    });

    ctx.restore();
  }

  function drawStardustMesh() {
    const isLight = document.body.classList.contains('light-mode');
    ctx.save();

    for (let i = 0; i < stardust.length; i++) {
      const p = stardust[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      if (mouse.x !== null && mouse.y !== null) {
        const mdx = mouse.x - p.x;
        const mdy = mouse.y - p.y;
        const mdist = Math.hypot(mdx, mdy);
        if (mdist < 200) {
          const force = (1 - mdist / 200) * 2;
          p.x += (mdx / mdist) * force;
          p.y += (mdy / mdist) * force;

          ctx.strokeStyle = isLight ? 'rgba(124, 58, 237, 0.3)' : 'rgba(6, 182, 212, 0.4)';
          ctx.lineWidth = 1;
          ctx.globalAlpha = (1 - mdist / 200) * 0.6;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      ctx.fillStyle = isLight ? '#7C3AED' : p.color;
      ctx.globalAlpha = isLight ? 0.45 : p.alpha;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = isLight ? 5 : 12;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < stardust.length; j++) {
        const p2 = stardust[j];
        const dx = p2.x - p.x;
        const dy = p2.y - p.y;
        const dist = Math.hypot(dx, dy);
        const maxDist = 130;

        if (dist < maxDist) {
          const linkAlpha = (1 - dist / maxDist) * (isLight ? 0.18 : 0.3);
          ctx.strokeStyle = isLight ? 'rgba(124, 58, 237, 0.2)' : 'rgba(217, 70, 239, 0.25)';
          ctx.lineWidth = 0.8;
          ctx.globalAlpha = linkAlpha;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    ctx.restore();
  }

  function drawClickSparks() {
    ctx.save();
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.x += s.vx;
      s.y += s.vy;
      s.vx *= 0.95;
      s.vy *= 0.95;
      s.alpha -= 0.025;

      if (s.alpha <= 0) {
        sparks.splice(i, 1);
        continue;
      }

      ctx.fillStyle = s.color;
      ctx.globalAlpha = s.alpha;
      ctx.shadowColor = s.color;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function animate() {
    time += 0.015;

    if (mouse.targetX !== null && mouse.targetY !== null) {
      if (mouse.x === null) {
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
      } else {
        mouse.x += (mouse.targetX - mouse.x) * 0.14;
        mouse.y += (mouse.targetY - mouse.y) * 0.14;
      }
    }

    ctx.clearRect(0, 0, width, height);

    drawPrisms();
    drawStardustMesh();
    drawClickSparks();

    requestAnimationFrame(animate);
  }

  resize();
  animate();
}

/* --------------------------------------------------------------------------
   6. NAVBAR STICKY & MOBILE DRAWER
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const backdrop = document.getElementById('nav-backdrop');
  const sections = document.querySelectorAll('section[id]');

  let ticking = false;

  function onScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let scrollY = window.pageYOffset;
    const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 60);

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 150;
      const sectionId = current.getAttribute('id');
      const navLinksForId = document.querySelectorAll(`.nav-link[href*="${sectionId}"]`);
      if (navLinksForId.length) {
        if (isAtBottom && sectionId === 'contact') {
          navLinksForId.forEach(l => l.classList.add('active'));
        } else if (!isAtBottom && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinksForId.forEach(l => l.classList.add('active'));
        } else {
          navLinksForId.forEach(l => l.classList.remove('active'));
        }
      }
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  function closeDrawer() {
    if (navLinks) navLinks.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    if (mobileBtn && mobileBtn.querySelector('i')) {
      mobileBtn.querySelector('i').className = 'ri-menu-line';
    }
  }

  function openDrawer() {
    if (navLinks) navLinks.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    if (mobileBtn && mobileBtn.querySelector('i')) {
      mobileBtn.querySelector('i').className = 'ri-close-line';
    }
  }

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navLinks.classList.contains('active')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    if (backdrop) {
      backdrop.addEventListener('click', closeDrawer);
    }

    const allDrawerLinks = document.querySelectorAll('.nav-links a');
    allDrawerLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !mobileBtn.contains(e.target)) {
        closeDrawer();
      }
    });
  }
}

/* --------------------------------------------------------------------------
   6.5. GLOBAL SMOOTH SCROLLING FOR HASH LINKS
   -------------------------------------------------------------------------- */
function initSmoothScrolling() {
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const targetId = anchor.getAttribute('href');
    if (!targetId || targetId === '#') {
      e.preventDefault();
      return;
    }

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      const navbar = document.querySelector('.navbar');
      const navHeight = navbar ? navbar.offsetHeight : 80;
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
}

/* --------------------------------------------------------------------------
   7. PORTFOLIO FILTERING WITH FLUID CARD TRANSITIONS
   -------------------------------------------------------------------------- */
function initPortfolio() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  function updatePortfolioDisplay(filterValue) {
    projectCards.forEach(card => {
      const rawCategories = card.getAttribute('data-category') || '';
      const categories = rawCategories.split(' ');
      const isMatch = filterValue === 'all' || categories.includes(filterValue);

      if (isMatch) {
        card.style.display = 'block';
        card.style.visibility = 'visible';
        requestAnimationFrame(() => {
          card.classList.add('active');
          card.style.opacity = '1';
          card.style.transform = 'perspective(1000px) scale(1) translateY(0)';
          card.style.pointerEvents = 'auto';
        });
      } else {
        card.classList.remove('active');
        card.style.opacity = '0';
        card.style.transform = 'perspective(1000px) scale(0.92) translateY(20px)';
        card.style.pointerEvents = 'none';
        setTimeout(() => {
          if (!card.classList.contains('active')) {
            card.style.display = 'none';
          }
        }, 350);
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');
      updatePortfolioDisplay(filterValue);
    });
  });

  updatePortfolioDisplay('all');
}

/* --------------------------------------------------------------------------
   8. CASE STUDY MODAL SYSTEM
   -------------------------------------------------------------------------- */
const caseStudyData = {
  'aetheria': {
    title: 'Aetheria Luxury Perfume',
    category: 'Branding & Packaging',
    client: 'Aetheria Parfums Paris',
    year: '2026',
    deliverables: 'Brand Identity, Bottle Design, 3D Visuals, Packaging System',
    img: './assets/images/branding.png',
    overview: 'Aetheria is a Paris-based haute couture fragrance house. We crafted a flagship visual identity, bespoke 3D glass bottle packaging, and digital branding collateral engineered to command market prestige and elite brand equity.',
    problem: 'Standing out in the crowded European luxury perfume market required departing from legacy floral tropes and establishing a sleek, minimalist dark aesthetic that appeals to modern luxury collectors.',
    solution: 'We engineered a dark minimalist visual architecture paired with obsidian glass gradients, metallic magenta foil stamping, bespoke typography, and high-impact 3D render collateral for retail stores and global e-commerce.',
    metrics: ['+340% E-Commerce Sales Growth', '2.8M Global Social Impressions', 'Winner - European Luxury Design Award 2026', 'Featured in Vogue & Wallpaper* Magazine'],
    quote: '"DK Designs Studio transformed our fragrance line into an internationally recognized luxury icon. Their mastery of typography and dark aesthetics is unmatched."'
  },
  'neobank': {
    title: 'FinTech NeoBank Mobile App',
    category: 'UI/UX Design',
    client: 'NeoBank Technologies',
    year: '2026',
    deliverables: 'Mobile App Design, Interactive Prototype, Design System',
    img: './assets/images/uiux.png',
    overview: 'NeoBank is a next-generation crypto & fiat banking platform. We designed an intuitive end-to-end mobile application interface, micro-interactive design system, and multi-currency dashboard.',
    problem: 'Traditional banking interfaces are notoriously cluttered, slow, and confusing. Users struggled with multi-currency transfers, portfolio tracking, and real-time yield analytics.',
    solution: 'We architected a futuristic dark-mode UI with glowing glassmorphic cards, real-time neon charts, one-tap instant transfers, and customizable dashboard widgets that streamline complex financial transactions.',
    metrics: ['4.9★ App Store & Play Store Rating', '1.2M+ Active Monthly Users', '94% User Retention Rate', '2.5x Increase in Daily Transactions'],
    quote: '"The UI/UX design delivered by DK Studio set a new benchmark in digital banking apps. Our conversion rates doubled within 30 days of launch."'
  },
  'cybernetic': {
    title: 'Cybernetic Horizons Exhibition',
    category: 'Poster & 3D Design',
    client: 'Metropolis Digital Museum',
    year: '2025',
    deliverables: '3D Art Direction, Exhibition Poster System, Motion Assets',
    img: './assets/images/posters.png',
    overview: 'An international 3D digital art exhibition hosted at Metropolis Museum. We produced key art visuals, 3D artwork, print poster systems, and animated digital billboard motion graphics.',
    problem: 'Metropolis Museum needed an eye-catching, viral poster campaign to drive ticket pre-sales among Gen-Z tech enthusiasts and digital art collectors.',
    solution: 'We developed abstract fluid geometric 3D artwork suspended in glass space, utilizing intense purple and neon magenta color palettes paired with bold futuristic typography.',
    metrics: ['Sold-Out Pre-Sale Tickets in 48 Hours', '50,000+ Exhibition Visitors', 'Featured on Awwwards & Behance Gallery', '100k+ Digital Shares'],
    quote: '"The poster artwork became a viral masterpiece across Instagram and Behance, filling every seat at our digital exhibition."'
  },
  'apex': {
    title: 'Apex Performance Gear',
    category: 'Social Media Campaign',
    client: 'Apex Global Athletic',
    year: '2025',
    deliverables: 'Social Media Strategy, Ad Creatives, Motion Graphics Kit',
    img: './assets/images/social.png',
    overview: 'Apex is an elite athletic apparel brand. We created a high-converting social media marketing kit, performance video ad creatives, and dynamic ad banners for Instagram, YouTube, & TikTok.',
    problem: 'Apex needed to cut through saturated digital advertising channels with visual layouts that immediately grabbed viewer attention within the first 3 seconds of scrolling.',
    solution: 'We built a high-energy visual system featuring bold typography overlays, high-contrast athlete imagery, animated neon motion frames, and strategic call-to-action placement.',
    metrics: ['+410% Return on Ad Spend (ROAS)', '8.5M Targeted Audience Reach', '45% Increase in Ad Click-Through-Rate', '$1.8M Campaign Revenue'],
    quote: '"DK Designs Studio designed our highest converting ad campaign in company history. They understand visual psychology perfectly."'
  },
  'nexus': {
    title: 'Nexus AI Systems',
    category: 'Logo & Brand Identity',
    client: 'Nexus Intelligence Corp',
    year: '2026',
    deliverables: 'Geometric Logo, Monogram Mark, Brand Guidelines',
    img: './assets/images/logos.png',
    overview: 'Nexus AI is an enterprise neural network platform. We designed their corporate logo, geometric brand mark, color hierarchy, brand guidelines, and executive presentation pitch decks.',
    problem: 'An emerging AI enterprise needed an iconic, futuristic brand mark that conveyed artificial intelligence, technical precision, and enterprise scale to Silicon Valley venture capitalists.',
    solution: 'We created an overlapping geometric monogram emblem depicting interconnected neural nodes glowing with electric purple and magenta gradient energy.',
    metrics: ['$15M Series A Funding Raised', '100% Brand Recognition Rating', 'Adopted Across 50+ Global Enterprise Clients', 'Winner - Brand Identity Award'],
    quote: '"Our new logo instantly gave us enterprise credibility with Silicon Valley investors during our funding round."'
  },
  'solaris': {
    title: 'Solaris Roasters Packaging',
    category: 'Packaging Design',
    client: 'Solaris Artisanal Coffee',
    year: '2025',
    deliverables: 'Custom Coffee Pouch Design, Metallic Labels, Box Unboxing',
    img: './assets/images/packaging.png',
    overview: 'Solaris is an artisanal coffee roastery. We designed matte pouch packaging, metallic foil roast labels, and custom unboxing collateral for their specialty single-origin collection.',
    problem: 'Specialty coffee shelves are crowded; Solaris needed packaging that created a tactile luxury unboxing experience to justify premium pricing.',
    solution: 'We designed matte dark soft-touch pouches featuring metallic magenta constellation artwork, coffee flavor profile rings, and custom roasted bean origin cards.',
    metrics: ['+260% Retail Placement', '10,000+ Monthly Coffee Subscriptions', 'Gold Winner - International Packaging Expo', '98% Positive Customer Feedback'],
    quote: '"Customers buy our coffee for the taste, but they fall in love with the packaging first! Masterpiece design."'
  },
  'lumina': {
    title: 'Lumina Smart Home Dashboard',
    category: 'UI/UX & Web App',
    client: 'Lumina IoT Corp',
    year: '2026',
    deliverables: 'Web App Interface, IoT Control Panel, Mobile Design System',
    img: './assets/images/uiux.png',
    overview: 'Lumina is an IoT smart home ecosystem. We built a futuristic real-time web dashboard and mobile interface for controlling smart lights, HVAC, security cameras, and energy analytics.',
    problem: 'Smart home apps are often fragmented, forcing users to switch between multiple disconnected screens to control basic home parameters.',
    solution: 'We engineered a unified glassmorphic dashboard with dynamic ambient lighting controls, interactive floorplan widgets, and single-swipe automation macros.',
    metrics: ['+190% Daily Active Engagement', '350k+ Connected Smart Homes', 'Winner - Webby Best IoT Design 2026', '99.2% User Satisfaction'],
    quote: '"Lumina dashboard feels futuristic, smooth, and lightning fast. Our users love the intuitive gesture controls."'
  },
  'kintsugi': {
    title: 'Kintsugi Teahouse Branding',
    category: 'Brand Identity & Logo',
    client: 'Kintsugi Hospitality Group',
    year: '2025',
    deliverables: 'Brand Architecture, Logo Mark, Menu Design, Tea Canister Packaging',
    img: './assets/images/branding.png',
    overview: 'Kintsugi is an artisan matcha & zen teahouse chain inspired by traditional Japanese gold-repair craft. We created an organic minimal visual identity and packaging suite.',
    problem: 'Translating traditional Japanese zen aesthetics into a contemporary global luxury brand required delicate balance between heritage and modernity.',
    solution: 'We crafted a refined minimalist monogram logo featuring metallic gold foil line art, paired with textured handmade paper menus and bespoke brass canister packaging.',
    metrics: ['Opened 8 Flagship Locations', '+280% Brand Loyalty Signups', 'Featured in Architectural Digest', '100k Instagram Followers'],
    quote: '"The brand identity captures the soul of Japanese tea ritual perfectly. DK Studio delivered poetry in design."'
  },
  'chrono': {
    title: 'Chrono Synthwave Festival',
    category: 'Poster & Event Visuals',
    client: 'Chrono Entertainment',
    year: '2025',
    deliverables: 'Event Poster Series, 3D Motion Posters, Stage Projection Visuals',
    img: './assets/images/posters.png',
    overview: 'A retro-futuristic synthwave music festival. We developed neon 3D poster art, animated venue screens, apparel merch graphics, and social media promos.',
    problem: 'The festival needed key art that captured 80s nostalgia while feeling hyper-modern, metallic, and high-tech.',
    solution: 'We crafted 3D chrome grid landscapes, glowing neon grids, custom typography, and animated motion posters that reacted to music beats.',
    metrics: ['25,000 Tickets Sold Out', '3.5M Impressions on TikTok', 'Featured on Awwwards Poster Showcase', '$850k Merch Revenue'],
    quote: '"The poster art defined the whole identity of our festival. Incredible energy and artistic vision."'
  },
  'zenith': {
    title: 'Zenith Audio Headphones',
    category: 'Luxury Packaging',
    client: 'Zenith Sound Labs',
    year: '2026',
    deliverables: 'Unboxing Packaging, Premium Hard Case, Product Photography Guidelines',
    img: './assets/images/packaging.png',
    overview: 'Zenith creates audiophile wireless headphones. We engineered a luxury rigid unboxing sleeve with magnetic clasp, metallic accents, and eco-friendly molded pulp interior.',
    problem: 'High-end audio buyers expect an exceptional unboxing experience comparable to luxury watchmakers.',
    solution: 'We designed a matte black textured box featuring embossed electric purple foil branding and soft magnetic opening mechanisms.',
    metrics: ['+310% Pre-Orders', 'Gold Winner - Packaging Design Awards', '100% Recyclable Materials', '5.0 Rating from Tech Reviewers'],
    quote: '"Unboxing Zenith headphones feels like opening a piece of fine jewelry. Exceptional craftsmanship."'
  },
  'ecovibe': {
    title: 'EcoVibe Sustainability Campaign',
    category: 'Social Media Campaign',
    client: 'EcoVibe Global NGO',
    year: '2025',
    deliverables: 'Social Media Kit, Infographic Posters, Motion Graphics Ads',
    img: './assets/images/social.png',
    overview: 'EcoVibe is a global environmental action initiative. We created a vibrant social media campaign, interactive story graphics, and motion infographics.',
    problem: 'Environmental campaigns often look dreary or overly academic, failing to inspire viral sharing among younger audiences.',
    solution: 'We developed bright, high-contrast visual infographics with bold neon typography, micro-animated data visualizations, and actionable call-to-action cards.',
    metrics: ['12M+ Global Social Reach', '500k Campaign Signatures', 'Featured by UN Youth Environment', '+450% Engagement Rate'],
    quote: '"DK Designs Studio made climate action visual, urgent, and viral. Our highest reach campaign ever."'
  },
  'cipher': {
    title: 'Cipher Crypto Exchange',
    category: 'Logo & Monogram',
    client: 'Cipher Protocol Inc',
    year: '2026',
    deliverables: 'Crypto Logo Emblem, Dynamic Vector Monogram, UI Iconography',
    img: './assets/images/logos.png',
    overview: 'Cipher is a decentralized crypto exchange. We designed a cryptographic geometric logo, brand mark, dark-mode color scheme, and app icon system.',
    problem: 'Cryptocurrency logos often look derivative or overly complex. Cipher needed a clean mark that scales cleanly down to 16px favicon sizes.',
    solution: 'We designed an impossible-geometry cube monogram symbolizing blockchain security, glowing with electric cyan and neon magenta gradients.',
    metrics: ['$20M Platform Volume in Month 1', 'Featured on CoinMarketCap & TechCrunch', '100% Favorite Favicon Rating', 'Winner - Crypto Design Award'],
    quote: '"Our logo is recognized instantly across web3. DK Studio delivered pure design perfection."'
  }
};

function initCaseStudyModal() {
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalClose = document.getElementById('modal-close');

  if (!modalBackdrop || !modalClose) return;

  function openModal(id) {
    const data = caseStudyData[id];
    if (!data) return;

    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const modalClient = document.getElementById('modal-client');
    const modalYear = document.getElementById('modal-year');
    const modalDeliverables = document.getElementById('modal-deliverables');
    const modalImg = document.getElementById('modal-img');
    const modalOverview = document.getElementById('modal-overview');
    const modalProblem = document.getElementById('modal-problem');
    const modalSolution = document.getElementById('modal-solution');
    const modalQuote = document.getElementById('modal-quote');
    const metricsList = document.getElementById('modal-metrics');

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalCategory) modalCategory.textContent = data.category;
    if (modalClient) modalClient.textContent = data.client;
    if (modalYear) modalYear.textContent = data.year;
    if (modalDeliverables) modalDeliverables.textContent = data.deliverables;
    if (modalImg) modalImg.src = data.img;
    if (modalOverview) modalOverview.textContent = data.overview;
    if (modalProblem) modalProblem.textContent = data.problem;
    if (modalSolution) modalSolution.textContent = data.solution;
    if (modalQuote) modalQuote.textContent = data.quote;

    if (metricsList && data.metrics) {
      metricsList.innerHTML = data.metrics.map(m => `
        <li style="display:flex; align-items:center; gap:10px; margin-bottom:10px; color:#D946EF; font-weight:700; font-size:0.95rem;">
          <i class="ri-checkbox-circle-fill" style="font-size:1.15rem;"></i> ${m}
        </li>
      `).join('');
    }

    const modalContent = modalBackdrop.querySelector('.modal-content');
    if (modalContent) modalContent.scrollTop = 0;

    modalBackdrop.classList.add('active');
    document.body.classList.add('modal-open');
  }

  function closeModal() {
    modalBackdrop.classList.remove('active');
    document.body.classList.remove('modal-open');
  }

  const portfolioGrid = document.querySelector('.portfolio-grid');
  if (portfolioGrid) {
    portfolioGrid.addEventListener('click', (e) => {
      const card = e.target.closest('.project-card');
      if (!card) return;

      const id = card.getAttribute('data-id');
      if (id && caseStudyData[id]) {
        openModal(id);
      }
    });
  }

  const modalCta = document.getElementById('modal-cta');
  if (modalCta) {
    modalCta.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          const navbar = document.querySelector('.navbar');
          const navHeight = navbar ? navbar.offsetHeight : 80;
          const elementPosition = contactSection.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navHeight;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 150);
    });
  }

  modalClose.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal();
  });

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) closeModal();
  });
}

/* --------------------------------------------------------------------------
   9. SKILLS CIRCULAR SVG PROGRESS ANIMATION
   -------------------------------------------------------------------------- */
function initSkills() {
  const skillRings = document.querySelectorAll('.skill-progress-ring');
  if (!skillRings.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const ring = entry.target;
        const percent = parseInt(ring.getAttribute('data-percent'));
        const circumference = 376;
        const offset = circumference - (percent / 100) * circumference;
        ring.style.strokeDashoffset = offset;
        observer.unobserve(ring);
      }
    });
  }, { threshold: 0.4 });

  skillRings.forEach(ring => observer.observe(ring));
}

/* --------------------------------------------------------------------------
   10. ANIMATED COUNTERS
   -------------------------------------------------------------------------- */
function initCounters() {
  const statNumbers = document.querySelectorAll('[data-target]');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '';
        const startTime = performance.now();
        const duration = 1800;

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const currentCount = Math.floor(easeProgress * target);

          el.textContent = currentCount + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = target + suffix;
          }
        }
        requestAnimationFrame(updateCounter);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1 });

  statNumbers.forEach(num => observer.observe(num));
}

/* --------------------------------------------------------------------------
   11. CONTACT FORM INTERACTION & WHATSAPP
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusMsg = document.getElementById('form-status');
  const serviceSelect = document.getElementById('service');
  const otherServiceGroup = document.getElementById('other-service-group');
  const otherServiceInput = document.getElementById('other-service');

  if (!form) return;

  if (serviceSelect && otherServiceGroup && otherServiceInput) {
    serviceSelect.addEventListener('change', () => {
      if (serviceSelect.value === 'others') {
        otherServiceGroup.style.display = 'block';
        otherServiceInput.required = true;
        otherServiceInput.focus();
      } else {
        otherServiceGroup.style.display = 'none';
        otherServiceInput.required = false;
        otherServiceInput.value = '';
      }
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    const nameVal = document.getElementById('name')?.value.trim() || '';
    const emailVal = document.getElementById('email')?.value.trim() || '';

    let serviceVal = serviceSelect ? serviceSelect.options[serviceSelect.selectedIndex]?.text || serviceSelect.value : '';
    if (serviceSelect && serviceSelect.value === 'others') {
      const customVal = otherServiceInput?.value.trim();
      serviceVal = customVal ? `Others (${customVal})` : 'Custom Service';
    }

    const messageVal = document.getElementById('message')?.value.trim() || '';

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="ri-loader-4-line ri-spin"></i> Preparing Message...`;

    const formattedMessage = `Hello Dinesh Kumar.R 👋
I’m interested in connecting with you regarding a potential opportunity.
I’d love to discuss the details and explore how we can work together:

📌 Name: ${nameVal}
✉️ Email: ${emailVal}
🛠️ Service Required: ${serviceVal}
💬 Project Brief: ${messageVal}`;

    const waUrl = `https://api.whatsapp.com/send?phone=917708533260&text=${encodeURIComponent(formattedMessage)}`;
    const mailtoUrl = `mailto:hello@dkdesigns.studio?subject=${encodeURIComponent('Project Inquiry - ' + serviceVal + ' (' + nameVal + ')')}&body=${encodeURIComponent(formattedMessage)}`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<i class="ri-check-double-line"></i> Inquiry Prepared!`;
      submitBtn.style.background = 'linear-gradient(135deg, #10B981, #059669)';

      if (statusMsg) {
        statusMsg.style.display = 'block';
        statusMsg.innerHTML = `
          <div style="padding:20px; border-radius:18px; background:rgba(16,185,129,0.12); border:1px solid #10B981; color:var(--text-main); margin-top:20px;">
            <div style="font-size:1.05rem; font-weight:700; color:#10B981; margin-bottom:8px; display:flex; align-items:center; gap:8px;">
              <i class="ri-checkbox-circle-fill" style="font-size:1.3rem;"></i> Message Ready to Send!
            </div>
            <p style="font-size:0.92rem; color:var(--text-muted); margin-bottom:16px;">
              Your project inquiry details have been saved. Choose your preferred channel below to send your message directly to Dinesh:
            </p>
            <div style="display:flex; flex-wrap:wrap; gap:12px;">
              <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="padding:10px 18px; font-size:0.88rem; background:linear-gradient(135deg, #25D366, #128C7E); border-color:#25D366; text-decoration:none;">
                <i class="ri-whatsapp-line"></i> Send via WhatsApp
              </a>
              <a href="${mailtoUrl}" class="btn-secondary" style="padding:10px 18px; font-size:0.88rem; text-decoration:none;">
                <i class="ri-mail-line"></i> Send via Email
              </a>
            </div>
          </div>
        `;
      }

      form.reset();
      if (otherServiceGroup) {
        otherServiceGroup.style.display = 'none';
        if (otherServiceInput) otherServiceInput.required = false;
      }

      // Automatically open WhatsApp direct link in new tab for seamless conversion
      window.open(waUrl, '_blank');

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
      }, 6000);
    }, 800);
  });
}

/* --------------------------------------------------------------------------
   12. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backBtn = document.getElementById('back-to-top');
  if (!backBtn) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 500) {
          backBtn.classList.add('visible');
        } else {
          backBtn.classList.remove('visible');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------------
   13. 3D SCROLL PERSPECTIVE REVEAL ENGINE
   -------------------------------------------------------------------------- */
function init3DScrollReveal() {
  const revealElements = document.querySelectorAll('.glass-card, .service-card, .project-card, .timeline-item, .skill-card, .testimonial-card, .stat-card, .about-text, .section-tag');

  revealElements.forEach(el => {
    el.classList.add('reveal-3d');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   14. CLIENT ENDORSEMENTS HORIZONTAL TRACK CAROUSEL SLIDER
   -------------------------------------------------------------------------- */
function initTestimonials() {
  const track = document.getElementById('testimonials-track');
  const cards = document.querySelectorAll('.endorsement-card');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  const dots = document.querySelectorAll('#testimonial-dots .dot');

  if (!track || !cards.length) return;

  let currentIndex = 0;
  const totalCards = cards.length;

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    cards.forEach((card, index) => {
      card.classList.toggle('active', index === currentIndex);
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalCards;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    updateCarousel();
  }

  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      currentIndex = parseInt(e.currentTarget.getAttribute('data-index')) || 0;
      updateCarousel();
    });
  });

  // Touch and Mouse Drag Swipe Support
  const wrapper = document.getElementById('testimonials-wrapper');
  if (wrapper) {
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    wrapper.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });

    wrapper.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
    }, { passive: true });

    wrapper.addEventListener('touchend', () => {
      if (!isDragging) return;
      const diffX = startX - currentX;
      if (Math.abs(diffX) > 40 && currentX !== 0) {
        if (diffX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      isDragging = false;
      startX = 0;
      currentX = 0;
    });

    wrapper.addEventListener('mousedown', (e) => {
      startX = e.clientX;
      isDragging = true;
    });

    wrapper.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      currentX = e.clientX;
    });

    wrapper.addEventListener('mouseup', () => {
      if (!isDragging) return;
      const diffX = startX - currentX;
      if (Math.abs(diffX) > 50 && currentX !== 0) {
        if (diffX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      isDragging = false;
      startX = 0;
      currentX = 0;
    });

    wrapper.addEventListener('mouseleave', () => {
      isDragging = false;
    });
  }

  updateCarousel();
}
