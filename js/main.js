/* =========================================================
   BEAM & BLOSSOM
   MAIN JAVASCRIPT
   ========================================================= */

/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

const hamburgerBtn = document.getElementById('hamburgerBtn');
const navMenu = document.getElementById('navMenu');

if (hamburgerBtn && navMenu) {

  hamburgerBtn.addEventListener('click', () => {

    navMenu.classList.toggle('active');

    document.body.classList.toggle('menu-open');

  });

}

/* =========================================================
   CLOSE MOBILE MENU WHEN LINK CLICKED
   ========================================================= */

const navLinks = document.querySelectorAll('.nav a');

navLinks.forEach(link => {

  link.addEventListener('click', () => {

    navMenu.classList.remove('active');
    document.body.classList.remove('menu-open');

  });

});

/* =========================================================
   QUOTE PANEL FUNCTIONALITY
   ========================================================= */

const quotePanel = document.getElementById('quotePanel');
const overlay = document.getElementById('overlay');
const openQuoteButtons = document.querySelectorAll('.open-quote');
const closePanelBtn = document.getElementById('closePanel');

const serviceSelect = document.getElementById('service');
const messageField = document.getElementById('message');

function openQuotePanel(serviceName = '', customText = '') {

  if (!quotePanel || !overlay) return;

  quotePanel.classList.add('active');
  overlay.classList.add('active');

  quotePanel.setAttribute('aria-hidden', 'false');

  document.body.style.overflow = 'hidden';

  /*
    PREFILL SERVICE FIELD
  */

  if (serviceSelect && serviceName) {

    serviceSelect.value = serviceName;

  }

  /*
    PREFILL MESSAGE FIELD
  */

  if (messageField && customText) {

    messageField.value =
      `Interested in: ${serviceName}\n\nCustomisation Details:\n${customText}`;

  }

}

function closeQuotePanel() {

  if (!quotePanel || !overlay) return;

  quotePanel.classList.remove('active');
  overlay.classList.remove('active');

  quotePanel.setAttribute('aria-hidden', 'true');

  document.body.style.overflow = '';

}

/* =========================================================
   OPEN QUOTE PANEL BUTTONS
   ========================================================= */

openQuoteButtons.forEach(button => {

  button.addEventListener('click', () => {

    /*
      GET PRODUCT SERVICE TYPE
    */

    const serviceName =
      button.getAttribute('data-service') || '';

    /*
      FIND NEAREST PRODUCT CARD INPUT
    */

    const productCard =
      button.closest('.product-card');

    let customText = '';

    if (productCard) {

      const input =
        productCard.querySelector('.product-input');

      if (input) {

        customText = input.value.trim();

      }

    }

    openQuotePanel(serviceName, customText);

  });

});

/* =========================================================
   CLOSE PANEL EVENTS
   ========================================================= */

if (closePanelBtn) {

  closePanelBtn.addEventListener('click', closeQuotePanel);

}

if (overlay) {

  overlay.addEventListener('click', closeQuotePanel);

}

/* =========================================================
   ESC KEY CLOSES PANEL
   ========================================================= */

document.addEventListener('keydown', (event) => {

  if (event.key === 'Escape') {

    closeQuotePanel();

    navMenu.classList.remove('active');

  }

});

/* =========================================================
   SMOOTH HEADER BACKGROUND ON SCROLL
   ========================================================= */

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {

  if (!header) return;

  if (window.scrollY > 30) {

    header.style.background =
      'rgba(255,255,255,0.75)';

    header.style.backdropFilter =
      'blur(20px)';

    header.style.boxShadow =
      '0 8px 30px rgba(0,0,0,0.08)';

  } else {

    header.style.background =
      'rgba(255,255,255,0.15)';

    header.style.boxShadow = 'none';

  }

});

/* =========================================================
   PRODUCT CARD HOVER INTERACTIONS
   ========================================================= */

const productCards =
  document.querySelectorAll('.product-card');

productCards.forEach(card => {

  card.addEventListener('mouseenter', () => {

    card.style.transform =
      'translateY(-8px)';

  });

  card.addEventListener('mouseleave', () => {

    card.style.transform =
      'translateY(0px)';

  });

});

/* =========================================================
   INTERSECTION OBSERVER
   FADE-IN ON SCROLL
   ========================================================= */

const fadeElements = document.querySelectorAll(
  '.product-card, .faq-item, .intro-content, .intro-image, .trust-item'
);

const observerOptions = {

  threshold: 0.15

};

const fadeObserver = new IntersectionObserver(
  (entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add('fade-in');

      }

    });

  },
  observerOptions
);

fadeElements.forEach(element => {

  element.classList.add('fade-hidden');

  fadeObserver.observe(element);

});

/* =========================================================
   ADD FADE-IN CSS CLASSES DYNAMICALLY
   ========================================================= */

const animationStyle = document.createElement('style');

animationStyle.innerHTML = `

.fade-hidden {

  opacity: 0;
  transform: translateY(30px);

  transition:
    opacity 0.8s ease,
    transform 0.8s ease;

}

.fade-in {

  opacity: 1;
  transform: translateY(0);

}

`;

document.head.appendChild(animationStyle);

/* =========================================================
   FORM VALIDATION ENHANCEMENTS
   ========================================================= */

const quoteForm =
  document.querySelector('.quote-form');

if (quoteForm) {

  quoteForm.addEventListener('submit', (event) => {

    const name =
      document.getElementById('name');

    const email =
      document.getElementById('email');

    /*
      SIMPLE VALIDATION
    */

    if (!name.value.trim()) {

      alert('Please enter your name.');

      event.preventDefault();

      return;

    }

    if (!email.value.trim()) {

      alert('Please enter your email address.');

      event.preventDefault();

      return;

    }

    /*
      EMAIL FORMAT VALIDATION
    */

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value)) {

      alert('Please enter a valid email address.');

      event.preventDefault();

      return;

    }

  });

}

/* =========================================================
   AUTO CLOSE MOBILE NAV IF WINDOW RESIZED
   ========================================================= */

window.addEventListener('resize', () => {

  if (window.innerWidth > 992) {

    navMenu.classList.remove('active');

    document.body.classList.remove('menu-open');

  }

});

/* =========================================================
   CURRENT YEAR AUTO UPDATE
   ========================================================= */

const footerYear =
  document.querySelector('.footer-bottom p');

if (footerYear) {

  const currentYear =
    new Date().getFullYear();

  footerYear.innerHTML =
    `© ${currentYear} Beam & Blossom. All Rights Reserved.`;

}

/* =========================================================
   ACCESSIBILITY:
   TRAP FOCUS INSIDE QUOTE PANEL
   ========================================================= */

const focusableSelectors = `
  a[href],
  button,
  textarea,
  input,
  select
`;

document.addEventListener('keydown', (event) => {

  if (
    event.key !== 'Tab' ||
    !quotePanel.classList.contains('active')
  ) {
    return;
  }

  const focusableElements =
    quotePanel.querySelectorAll(focusableSelectors);

  const firstElement =
    focusableElements[0];

  const lastElement =
    focusableElements[focusableElements.length - 1];

  /*
    SHIFT + TAB
  */

  if (
    event.shiftKey &&
    document.activeElement === firstElement
  ) {

    lastElement.focus();

    event.preventDefault();

  }

  /*
    TAB
  */

  else if (
    !event.shiftKey &&
    document.activeElement === lastElement
  ) {

    firstElement.focus();

    event.preventDefault();

  }

});

/* =========================================================
   CONSOLE BRAND MESSAGE
   ========================================================= */

console.log(`
=========================================
 Beam & Blossom Website Initialised
 Premium Static Website Experience Loaded
=========================================
`);
/* =========================================================
   ACTIVE LINKS 
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav a");
  const currentPath = window.location.pathname.split("/").pop();

  navLinks.forEach(link => {
    const href = link.getAttribute("href");

    // Ignore external links
    if (href.startsWith("http")) return;

    if (
      (currentPath === "" && href === "index.html") ||
      href === currentPath
    ) {
      link.classList.add("active");
    }
  });
});

/* =========================================================
   END
   ========================================================= */