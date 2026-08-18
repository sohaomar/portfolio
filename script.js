// Page interactions for hero, navigation, counters, and form behavior
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const scrollTopBtn = document.getElementById('scrollTop');
const progressBar = document.getElementById('progressBar');
const loader = document.getElementById('loader');
const contactForm = document.getElementById('contactForm');
const formNotice = document.getElementById('formNotice');
const revealElements = document.querySelectorAll('[data-reveal]');

// Toggle mobile navigation menu
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

// Close mobile menu when a link is selected
navMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
  });
});

// Update scroll progress bar and show scroll-to-top button
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = pageHeight > 0 ? (scrollPosition / pageHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;

  if (scrollPosition > 450) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }

  revealOnScroll();
});

// Smooth scroll to top action
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Animate stats counters once when visible
const counters = [
  { id: 'projectsCount', target: 2, suffix: '+' },
  { id: 'trainingCount', target: 4, suffix: '+' },
  { id: 'supportCount', target: 10, suffix: '+' },
  { id: 'learningCount', target: 100, suffix: '%' }
];
let countsAnimated = false;

function animateCounters() {
  counters.forEach(({ id, target, suffix }) => {
    const element = document.getElementById(id);
    let current = 0;
    const duration = 1200;
    const increment = target / (duration / 25);

    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = `${target}${suffix}`;
        clearInterval(interval);
      } else {
        element.textContent = `${Math.floor(current)}${suffix}`;
      }
    }, 25);
  });
}

// Visibility helpers for reveal and counter animations
function revealOnScroll() {
  const revealMargin = 80;
  revealElements.forEach((item) => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight - revealMargin) {
      item.classList.add('visible');
    }
  });

  const statsSection = document.querySelector('.stats-section');
  if (!countsAnimated && statsSection) {
    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - revealMargin) {
      animateCounters();
      countsAnimated = true;
    }
  }
}

// Form validation and success feedback
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get('name').trim();
  const email = formData.get('email').trim();
  const subject = formData.get('subject').trim();
  const message = formData.get('message').trim();

  if (!name || !email || !subject || !message) {
    setNotice('Please complete all fields before sending.', false);
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setNotice('Enter a valid email address.', false);
    return;
  }

  contactForm.reset();
  setNotice('Thank you! Your message was sent successfully.', true);
});

function setNotice(message, success) {
  formNotice.textContent = message;
  formNotice.style.color = success ? 'var(--secondary)' : '#ff6b6b';
}

const typingText = document.getElementById('typingText');
const typingPhrases = [
  'Aspiring Embedded Systems Engineer',
  'Cybersecurity Enthusiast',
  'Networking Learner'
];
let typingIndex = 0;
let charIndex = 0;
let typingDirection = 1;

function startTypingAnimation() {
  const currentPhrase = typingPhrases[typingIndex];
  typingText.textContent = currentPhrase.slice(0, charIndex);

  if (typingDirection === 1 && charIndex < currentPhrase.length) {
    charIndex += 1;
    setTimeout(startTypingAnimation, 90);
  } else if (typingDirection === 1) {
    typingDirection = -1;
    setTimeout(startTypingAnimation, 1600);
  } else if (typingDirection === -1 && charIndex > 0) {
    charIndex -= 1;
    setTimeout(startTypingAnimation, 40);
  } else {
    typingDirection = 1;
    typingIndex = (typingIndex + 1) % typingPhrases.length;
    setTimeout(startTypingAnimation, 400);
  }
}

// Hide loader and reveal content after page load
window.addEventListener('load', () => {
  loader.classList.add('hidden');
  revealOnScroll();
  startTypingAnimation();
});

// Ensure reveal state is initialized when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  revealOnScroll();
});
