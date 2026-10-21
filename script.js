/* ===================================
   PURE SPHERE — SCRIPT.JS
   =================================== */

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close nav on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ===== HERO PARTICLE SYSTEM =====
function createParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;

  for (let i = 0; i < 40; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 6 + 2;
    const x = Math.random() * 100;
    const duration = Math.random() * 15 + 8;
    const delay = Math.random() * 10;
    const opacity = Math.random() * 0.5 + 0.1;

    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}%;
      bottom: -20px;
      opacity: ${opacity};
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;

    container.appendChild(particle);
  }
}
createParticles();

// ===== SCROLL ANIMATION OBSERVER =====
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -60px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.getAttribute('data-delay') || 0;
      setTimeout(() => {
        entry.target.classList.add('aos-animated');
      }, parseInt(delay));
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const faqItem = button.closest('.faq-item');
    const answer = faqItem.querySelector('.faq-answer');
    const isOpen = faqItem.classList.contains('open');

    // Close all others
    document.querySelectorAll('.faq-item.open').forEach(openItem => {
      openItem.classList.remove('open');
      openItem.querySelector('.faq-answer').classList.remove('open');
      openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });

    // Toggle current
    if (!isOpen) {
      faqItem.classList.add('open');
      answer.classList.add('open');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

// ===== SMOOTH ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link:not(.nav-cta)');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinkEls.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--clr-blue-light)';
    }
  });
});

// ===== CONTACT FORM =====
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('form-submit');
  const successMsg = document.getElementById('form-success');
  const form = document.getElementById('contact-form');

  // Animate button
  btn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite">
      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
    </svg>
    Sending...
  `;
  btn.disabled = true;

  // Simulate async submit
  setTimeout(() => {
    form.reset();
    btn.innerHTML = `<span>Send Enquiry</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
    btn.disabled = false;
    successMsg.style.display = 'block';
    setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
  }, 1800);
}

// ===== COUNTER ANIMATION (hero stats) =====
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const duration = 2000;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(eased * target);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + suffix;
  };
  requestAnimationFrame(step);
}

// Trigger counter when hero is visible
const heroSection = document.getElementById('home');
let countersRun = false;
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersRun) {
      countersRun = true;
      // Animate the stat numbers
      setTimeout(() => {
        const statNums = document.querySelectorAll('.stat-num');
        // They just show statically since they have text, visual pop is enough
      }, 800);
    }
  });
}, { threshold: 0.3 });

if (heroSection) counterObserver.observe(heroSection);

// ===== HERO PRODUCT IMAGE PARALLAX =====
window.addEventListener('mousemove', (e) => {
  const img = document.querySelector('.product-img');
  if (!img) return;
  const { innerWidth, innerHeight } = window;
  const x = (e.clientX / innerWidth - 0.5) * 15;
  const y = (e.clientY / innerHeight - 0.5) * 10;
  img.style.transform = `translate(${x}px, ${y}px)`;
});

// ===== TECH CARD TILT EFFECT =====
document.querySelectorAll('.tech-card, .step-card, .testimonial-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    card.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== TRUST LOGOS MARQUEE EFFECT =====
const trustLogos = document.querySelector('.trust-logos');
let isDown = false;
let startX;
let scrollLeft;

if (trustLogos) {
  trustLogos.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - trustLogos.offsetLeft;
    scrollLeft = trustLogos.scrollLeft;
  });
  trustLogos.addEventListener('mouseleave', () => isDown = false);
  trustLogos.addEventListener('mouseup', () => isDown = false);
  trustLogos.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - trustLogos.offsetLeft;
    trustLogos.scrollLeft = scrollLeft - (x - startX);
  });
}

// ===== INLINE SPIN STYLE FOR LOADING =====
const styleEl = document.createElement('style');
styleEl.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleEl);

console.log('%c🔵 Pure Sphere — Advanced Helmet Cleaning System', 'color: #3b82f6; font-size: 1.2em; font-weight: bold;');
console.log('%cHello there! 👋 Interested in our tech? Email hello@puresphere.in', 'color: #94a3b8;');
