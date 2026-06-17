/* ============================================================
   SCRIPT.JS — Jesús Mendoza Portfolio
   ============================================================ */

'use strict';

/* ─── NAVBAR scroll effect ─── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ─── Mobile nav toggle ─── */
const navToggle = document.getElementById('nav-toggle');
const navMenu   = document.getElementById('nav-menu');
const navLinks  = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  const isOpen = navMenu.classList.contains('open');
  navToggle.setAttribute('aria-expanded', isOpen);

  // Animate hamburger → X
  const spans = navToggle.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

/* ─── Active nav link on scroll ─── */
const sections = document.querySelectorAll('section[id]');

function setActiveLink() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const sectionTop    = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId     = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
    if (!link) return;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();

/* ─── Typewriter effect ─── */
const phrases = [
  'Técnico Superior en ASIR',
  'Desarrollador Full Stack',
  'Apasionado de la IA',
  'Administrador de Sistemas',
];

let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;
const typeEl    = document.getElementById('typewriter');

function typeWriter() {
  const currentPhrase = phrases[phraseIndex];
  const speed = isDeleting ? 50 : 90;

  if (!isDeleting) {
    typeEl.textContent = currentPhrase.slice(0, ++charIndex);
    if (charIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(typeWriter, 2200);
      return;
    }
  } else {
    typeEl.textContent = currentPhrase.slice(0, --charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(typeWriter, speed);
}

typeWriter();

/* ─── Intersection Observer: animate on scroll ─── */
const animateElements = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('in-view');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
);

animateElements.forEach(el => observer.observe(el));

/* ─── Skill bars animation ─── */
const skillBars = document.querySelectorAll('.skill-fill');

const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = width + '%';
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

skillBars.forEach(bar => barObserver.observe(bar));

/* ─── Smooth scroll for anchor links ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ─── Contact form ─── */
const form     = document.getElementById('contact-form');
const feedback = document.getElementById('form-feedback');
const btnSend  = document.getElementById('btn-submit');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = document.getElementById('form-name').value.trim();
  const email   = document.getElementById('form-email').value.trim();
  const message = document.getElementById('form-message').value.trim();

  // Basic validation
  if (!name || !email || !message) {
    showFeedback('Por favor, rellena los campos obligatorios.', 'error');
    return;
  }
  if (!isValidEmail(email)) {
    showFeedback('Introduce un email válido.', 'error');
    return;
  }

  // Simulate send
  btnSend.disabled = true;
  btnSend.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';

  setTimeout(() => {
    btnSend.disabled = false;
    btnSend.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Enviar mensaje';
    form.reset();
    showFeedback('¡Mensaje enviado con éxito! Te responderé pronto 🚀', 'success');
  }, 1800);
});

function showFeedback(msg, type) {
  feedback.textContent = msg;
  feedback.className   = `form-feedback ${type}`;
  setTimeout(() => { feedback.textContent = ''; feedback.className = 'form-feedback'; }, 5000);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ─── Subtle parallax on hero orbs ─── */
const orbs = document.querySelectorAll('.orb');

window.addEventListener('mousemove', (e) => {
  const { clientX: x, clientY: y } = e;
  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;
  const dx = (x - cx) / cx;
  const dy = (y - cy) / cy;

  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 12;
    orb.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
  });
});

/* ─── Timeline stagger animation ─── */
const timelineItems = document.querySelectorAll('.timeline-item');

const tlObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }, i * 120);
        tlObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

timelineItems.forEach(item => {
  item.style.opacity   = '0';
  item.style.transform = 'translateX(-20px)';
  item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  tlObserver.observe(item);
});

/* ─── Card 3D tilt effect ─── */
function addTilt(selector, strength = 8) {
  document.querySelectorAll(selector).forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect  = card.getBoundingClientRect();
      const x     = e.clientX - rect.left;
      const y     = e.clientY - rect.top;
      const cx    = rect.width  / 2;
      const cy    = rect.height / 2;
      const rotX  = ((y - cy) / cy) * -strength;
      const rotY  = ((x - cx) / cx) *  strength;
      card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-5px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });
  });
}

addTilt('.skill-card',   6);
addTilt('.project-card', 5);
