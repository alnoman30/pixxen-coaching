// ============================================
// MOBILE MENU & NAVBAR
// ============================================
// Desktop dropdown: + / − icon toggle
document.addEventListener("DOMContentLoaded", function () {
  const desktopDropdown = document.querySelector(".desktop-dropdown");
  const dropdownIcon = document.querySelector(".desktop-dropdown-icon");

  if (desktopDropdown && dropdownIcon) {
    desktopDropdown.addEventListener("mouseenter", function () {
      dropdownIcon.textContent = "−";
    });
    desktopDropdown.addEventListener("mouseleave", function () {
      dropdownIcon.textContent = "+";
    });
  }
});

// ── Mobile 2-panel menu ──
document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("mobile-overlay");
  const wrapper = document.getElementById("mobile-menu-wrapper");
  const mmMain = document.getElementById("mm-main");
  const mmServices = document.getElementById("mm-services");
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const closeBtn = document.getElementById("mm-close");
  const servicesTrig = document.getElementById("mm-services-trigger");
  const backBtn = document.getElementById("mm-back");
  const servicesClose = document.getElementById("mm-services-close");

  function openMenu() {
    wrapper.classList.add("active");
    overlay.classList.add("active");
    wrapper.classList.remove("services-open");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    wrapper.classList.remove("active", "services-open");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  function openServices() {
    wrapper.classList.add("services-open");
  }

  function closeServices() {
    wrapper.classList.remove("services-open");
  }

  // Open via hamburger
  toggleBtn && toggleBtn.addEventListener("click", openMenu);

  // Close buttons
  closeBtn && closeBtn.addEventListener("click", closeMenu);
  servicesClose && servicesClose.addEventListener("click", closeMenu);

  // Overlay click → close
  overlay && overlay.addEventListener("click", closeMenu);

  // SERVICES → slide to panel 2
  servicesTrig && servicesTrig.addEventListener("click", openServices);

  // BACK → slide back to panel 1
  backBtn && backBtn.addEventListener("click", closeServices);

  // Close nav links (non-services) also close menu
  document.querySelectorAll(".mm-nav-link:not(button)").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Service cards close menu
  document.querySelectorAll(".mm-service-card").forEach((card) => {
    card.addEventListener("click", closeMenu);
  });

  // Resize: close on desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 1024) closeMenu();
  });
});

//full width and height menu -

(function () {
  const overlay = document.getElementById("pixxen-menu");
  const topPanel = document.getElementById("menu-top");
  const botPanel = document.getElementById("menu-bottom");
  const closeBtn = document.getElementById("menu-close");
  const openBtn = document.getElementById("desktop-sidebar");
  const cols = document.querySelectorAll(".nav-col");
  const logoWrap = document.getElementById("bottom-logo");

  const DESKTOP_MIN = 1024;
  function isDesktop() {
    return window.innerWidth >= DESKTOP_MIN;
  }

  // ─── Pre-set initial states ───────────────────────────────────
  gsap.set(topPanel, { y: "-100%" });
  gsap.set(botPanel, { y: "100%" });
  gsap.set(cols, { y: 40, opacity: 0 });
  gsap.set(logoWrap, { y: 30, opacity: 0 });

  let isOpen = false;
  let isAnimating = false;

  // ─── OPEN ─
  function openMenu() {
    if (!isDesktop() || isOpen || isAnimating) return;
    isAnimating = true;

    document.body.classList.add("menu-open");
    overlay.classList.add("is-open");

    const tl = gsap.timeline({
      onComplete: () => {
        isOpen = true;
        isAnimating = false;
      },
    });

    tl.to(topPanel, { y: "0%", duration: 0.75, ease: "power4.out" }, 0);
    tl.to(botPanel, { y: "0%", duration: 0.75, ease: "power4.out" }, 0);
    tl.to(
      cols,
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" },
      0.45,
    );
    tl.to(
      logoWrap,
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
      0.5,
    );
  }

  // ─── CLOSE ───
  function closeMenu() {
    if (!isOpen || isAnimating) return;
    isAnimating = true;

    const tl = gsap.timeline({
      onComplete: () => {
        isOpen = false;
        isAnimating = false;
        overlay.classList.remove("is-open");
        document.body.classList.remove("menu-open");
        gsap.set(cols, { y: 40, opacity: 0 });
        gsap.set(logoWrap, { y: 30, opacity: 0 });
      },
    });

    tl.to(
      [...cols].reverse(),
      { y: -20, opacity: 0, duration: 0.3, stagger: 0.04, ease: "power2.in" },
      0,
    );
    tl.to(
      logoWrap,
      { y: 20, opacity: 0, duration: 0.25, ease: "power2.in" },
      0,
    );
    tl.to(topPanel, { y: "-100%", duration: 0.65, ease: "power4.in" }, 0.2);
    tl.to(botPanel, { y: "100%", duration: 0.65, ease: "power4.in" }, 0.2);
  }

  // Resize: viewport
  window.addEventListener("resize", () => {
    if (!isDesktop() && isOpen) {
      gsap.killTweensOf([topPanel, botPanel, cols, logoWrap]);
      gsap.set(topPanel, { y: "-100%" });
      gsap.set(botPanel, { y: "100%" });
      gsap.set(cols, { y: 40, opacity: 0 });
      gsap.set(logoWrap, { y: 30, opacity: 0 });
      overlay.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      isOpen = false;
      isAnimating = false;
    }
  });

  // ─── Events
  openBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Prevent background scroll when menu open
  const style = document.createElement("style");
  style.textContent = `body.menu-open { overflow: hidden; }`;
  document.head.appendChild(style);
})();

//smooth scroll

// Initialize Lenis
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  gestureDirection: "vertical",
  smoothWheel: true,
  wheelMultiplier: 1.3,
  infinite: false,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);



// Pixxen Painting js start
// ============================================
// NAVBAR SCROLL BACKGROUND EFFECT
// ============================================
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("coaching-main-nav");

  // Function to update navbar background based on scroll position
  function updateNavbar() {
    if (window.scrollY > 20) {
      navbar.classList.remove("bg-transparent");
      navbar.classList.add("bg-[#11263F]");
    } else {
      navbar.classList.remove("bg-[#11263F]");
      navbar.classList.add("bg-transparent");
    }
  }

  // Run immediately on page load to catch reloads further down the page
  updateNavbar();

  // Run on scroll
  window.addEventListener("scroll", updateNavbar);
});

// 
 document.addEventListener('DOMContentLoaded', () => {
    const headings = document.querySelectorAll('.coaching-heading-reveal');

    // split each heading into masked words
    headings.forEach((el) => {
      const text = el.textContent.trim().replace(/\s+/g, ' ');
      const words = text.split(' ');

      el.setAttribute('aria-label', text);
      el.textContent = '';

      words.forEach((w, i) => {
        const mask = document.createElement('span');
        mask.className = 'word-mask';
        mask.setAttribute('aria-hidden', 'true');

        const word = document.createElement('span');
        word.className = 'word';
        word.style.setProperty('--i', i);
        word.textContent = w;

        mask.appendChild(word);
        el.appendChild(mask);

        if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
      });
    });

    // reveal once when scrolled into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    headings.forEach((h) => observer.observe(h));
  });

  // 
   document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.coaching-card-reveal');
    if (!cards.length) return;

    // arm the cards (so they stay visible if JS fails)
    cards.forEach((card) => card.classList.add('is-ready'));
    void document.body.offsetHeight; // force reflow so the first transition plays

    const STAGGER = 120; // ms between cards revealed together

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          // reveal in DOM order (left to right, top to bottom)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left)
          .forEach((entry, i) => {
            const card = entry.target;
            card.style.setProperty('--delay', `${i * STAGGER}ms`);
            card.classList.add('is-revealed');

            card.addEventListener(
              'transitionend',
              (e) => {
                if (e.propertyName === 'transform') card.classList.add('is-done');
              },
              { once: false }
            );

            observer.unobserve(card);
          });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );

    cards.forEach((card) => observer.observe(card));
  });



  // 
  document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    const wrapper = document.querySelector('.coaching-stack-wrapper');
    const cards = gsap.utils.toArray('.coaching-card-stack');
    if (!wrapper || cards.length < 2) return;

    // ---- tweak these ----
    const BASE_TOP = 96;     // px from viewport top where the first card sticks
    const PEEK = 18;         // extra px per card so covered cards peek out above
    const SCALE_STEP = 0.04; // how much a card shrinks per card stacked over it
    const DIM_STEP = 0.05;   // overlay opacity added per card stacked over it
    const DIM_MAX = 0.15;    // overlay opacity cap
    // ---------------------

    const mm = gsap.matchMedia();

    mm.add(
      '(min-width: 1280px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)',
      () => {
        wrapper.classList.add('is-stacking');

        const stuckTop = (i) => BASE_TOP + i * PEEK;
        cards.forEach((card, i) => (card.style.top = `${stuckTop(i)}px`));

        const update = () => {
          const depth = cards.map(() => 0);

          // progress of each card j sliding over the cards before it
          for (let j = 1; j < cards.length; j++) {
            const stuck = stuckTop(j);
            const startY = stuck + cards[j - 1].offsetHeight;
            const top = cards[j].getBoundingClientRect().top;
            const p = gsap.utils.clamp(0, 1, (startY - top) / (startY - stuck));
            for (let i = 0; i < j; i++) depth[i] += p;
          }

          cards.forEach((card, i) => {
            gsap.to(card, {
              scale: 1 - depth[i] * SCALE_STEP,
              '--dim': Math.min(depth[i] * DIM_STEP, DIM_MAX),
              duration: 0.3,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          });
        };

        ScrollTrigger.create({
          trigger: wrapper,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: update,
          onToggle: update,
          onRefresh: update,
        });

        // cleanup when the screen no longer matches (resize / rotate)
        return () => {
          wrapper.classList.remove('is-stacking');
          cards.forEach((card) => {
            card.style.top = '';
            gsap.set(card, { clearProps: 'transform,--dim' });
          });
        };
      }
    );

    // images change card heights, so re-measure once everything has loaded
    window.addEventListener('load', () => ScrollTrigger.refresh());
  });