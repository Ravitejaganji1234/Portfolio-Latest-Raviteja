/* ============================================
   RAVI TEJA GANJI — PORTFOLIO JS
   Particles, Animations, Interactions
   ============================================ */

// ========= PRELOADER =========
const preloader = document.getElementById('preloader');
const progress = document.getElementById('preloader-progress');
const preloaderText = document.getElementById('preloader-text');

const loadSteps = [
  { pct: 20, text: 'Loading assets...' },
  { pct: 45, text: 'Building infrastructure...' },
  { pct: 70, text: 'Deploying containers...' },
  { pct: 90, text: 'Applying GitOps manifests...' },
  { pct: 100, text: 'Ready to deploy ✓' },
];

let stepIndex = 0;
const runPreloader = () => {
  if (stepIndex < loadSteps.length) {
    const step = loadSteps[stepIndex];
    progress.style.width = step.pct + '%';
    preloaderText.textContent = step.text;
    stepIndex++;
    setTimeout(runPreloader, 320);
  } else {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
      initReveal();
      initCounters();
      initTerminal();
    }, 400);
  }
};

document.body.style.overflow = 'hidden';
setTimeout(runPreloader, 200);

// ========= PARTICLE CANVAS =========
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
let mouseX = 0, mouseY = 0;

const resize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

resize();
window.addEventListener('resize', resize);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.hue = Math.random() > 0.7 ? 160 : 195; // cyan or green
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Mouse attraction
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist < 120) {
      this.x += dx * 0.003;
      this.y += dy * 0.003;
    }

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue}, 100%, 60%, ${this.opacity})`;
    ctx.fill();
  }
}

// Create particles
for (let i = 0; i < 120; i++) {
  particles.push(new Particle());
}

// Connect nearby particles
function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 100) {
        const alpha = (1 - dist/100) * 0.15;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0, 195, 255, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  connectParticles();
  requestAnimationFrame(animateParticles);
}

animateParticles();

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// ========= CUSTOM CURSOR =========
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

let fx = 0, fy = 0;
let cx = 0, cy = 0;

document.addEventListener('mousemove', (e) => {
  cx = e.clientX;
  cy = e.clientY;
  cursor.style.left = cx + 'px';
  cursor.style.top = cy + 'px';
});

function animateCursor() {
  fx += (cx - fx) * 0.12;
  fy += (cy - fy) * 0.12;
  follower.style.left = fx + 'px';
  follower.style.top = fy + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effect
document.querySelectorAll('a, button, .skill-category, .project-card, .cert-badge, .contact-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2)';
    cursor.style.background = 'rgba(0, 195, 255, 0.3)';
    follower.style.width = '50px';
    follower.style.height = '50px';
    follower.style.borderColor = 'rgba(0, 255, 157, 0.5)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.background = 'var(--accent)';
    follower.style.width = '36px';
    follower.style.height = '36px';
    follower.style.borderColor = 'rgba(0, 195, 255, 0.4)';
  });
});

// ========= NAV =========
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Burger menu
const burger = document.getElementById('nav-burger');
const mobileMenu = document.getElementById('mobile-menu');
let menuOpen = false;

burger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  const spans = burger.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '1';
    spans[2].style.transform = '';
  }
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    const spans = burger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '1';
    spans[2].style.transform = '';
  });
});

// ========= TYPED EFFECT =========
const roles = [
  'Cloud & DevOps Engineer',
  'Azure Infrastructure Architect',
  'Kubernetes Orchestration Expert',
  'CI/CD Pipeline Builder',
  'GitOps Practitioner',
];

let roleIndex = 0, charIndex = 0, deleting = false;
const typedEl = document.getElementById('typed-role');

function typeRole() {
  const current = roles[roleIndex];
  if (!deleting) {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeRole, 2000);
      return;
    }
  } else {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeRole, deleting ? 50 : 80);
}

setTimeout(typeRole, 1500);

// ========= SCROLL REVEAL =========
function initReveal() {
  const elements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const siblings = entry.target.parentElement.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
        let delay = 0;
        siblings.forEach((sib, idx) => { if (sib === entry.target) delay = idx; });
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => observer.observe(el));
}

// ========= COUNTER ANIMATION =========
function initCounters() {
  const stats = document.querySelectorAll('.stat-num');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target);
        let current = 0;
        const increment = target / 60;
        const update = () => {
          current += increment;
          if (current < target) {
            entry.target.textContent = Math.floor(current);
            requestAnimationFrame(update);
          } else {
            entry.target.textContent = target;
          }
        };
        requestAnimationFrame(update);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  stats.forEach(s => observer.observe(s));
}

// ========= SKILL BARS =========
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.dataset.width;
      setTimeout(() => {
        entry.target.style.width = width + '%';
      }, 200);
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
skillFills.forEach(f => skillObserver.observe(f));

// ========= TERMINAL ANIMATION =========
function initTerminal() {
  const lines = document.querySelectorAll('.terminal-line');
  lines.forEach(line => {
    const delay = parseInt(line.querySelector('[data-delay]')?.dataset.delay || line.dataset?.delay || 0);
    line.style.animationDelay = delay + 'ms';
  });
}

// ========= SMOOTH SCROLL =========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ========= FORM SUBMIT =========
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-submit');
  const text = document.getElementById('submit-text');
  
  btn.disabled = true;
  text.textContent = 'Sending...';
  btn.style.opacity = '0.7';

  setTimeout(() => {
    text.textContent = '✓ Message Sent!';
    btn.style.background = 'var(--accent2)';
    btn.style.opacity = '1';
    e.target.reset();
    setTimeout(() => {
      text.textContent = 'Send Message';
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  }, 1500);
}

// ========= PARALLAX ON HERO =========
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const hero = document.querySelector('.hero-content');
  const heroVisual = document.querySelector('.hero-visual');
  if (hero && scrollY < window.innerHeight) {
    hero.style.transform = `translateY(${scrollY * 0.1}px)`;
    if (heroVisual) heroVisual.style.transform = `translateY(${scrollY * 0.05}px)`;
  }
});

// ========= GLITCH EFFECT ON NAV LOGO =========
const navLogo = document.querySelector('.nav-logo');
if (navLogo) {
  navLogo.addEventListener('mouseenter', () => {
    navLogo.style.animation = 'glitch 0.3s ease';
    setTimeout(() => navLogo.style.animation = '', 300);
  });
}

// Add glitch keyframes
const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
@keyframes glitch {
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 1px); filter: hue-rotate(90deg); }
  40% { transform: translate(2px, -1px); filter: hue-rotate(-90deg); }
  60% { transform: translate(-1px, 2px); }
  80% { transform: translate(1px, -2px); filter: hue-rotate(180deg); }
  100% { transform: translate(0); filter: none; }
}
`;
document.head.appendChild(glitchStyle);

// ========= ACTIVE NAV HIGHLIGHT =========
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.style.color = '');
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.style.color = 'var(--accent)';
    }
  });
}, { threshold: 0.3, rootMargin: '-80px 0px -60% 0px' });

sections.forEach(s => navObserver.observe(s));
