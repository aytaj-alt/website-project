/* ==================== HAMBURGER MENU ==================== */
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  /* ==================== ACTIVE NAV LINK ==================== */
  updateActiveNavLink();
  window.addEventListener('load', updateActiveNavLink);

  function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === currentPage || 
          (currentPage === '' && link.getAttribute('href') === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  /* ==================== SMOOTH SCROLL FOR ANCHOR LINKS ==================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  /* ==================== CONTACT FORM HANDLING ==================== */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Simple form validation
    if (!name || !email || !subject || !message) {
      showFormMessage('Please fill in all fields', 'error');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFormMessage('Please enter a valid email address', 'error');
      return;
    }

    // Here you would typically send the form data to a server
    // For now, we'll just show a success message
    console.log('Form submitted:', { name, email, subject, message });

    // Simulate sending
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
      contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
  }

  function showFormMessage(message, type) {
    const formNote = document.getElementById('formNote');
    if (formNote) {
      formNote.textContent = message;
      formNote.className = `form-note form-note--${type}`;
      formNote.style.display = 'block';

      if (type === 'success') {
        setTimeout(() => {
          formNote.style.display = 'none';
        }, 4000);
      }
    }
  }

  /* ==================== INTERSECTION OBSERVER FOR ANIMATIONS ==================== */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe cards for animation
  document.querySelectorAll('.featured-card, .skill-card, .project-card, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  /* ==================== SCROLL-TO-TOP BUTTON ==================== */
  createScrollToTopButton();

  function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-to-top';
    button.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 999;
      font-size: 1.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    `;

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        button.style.opacity = '1';
        button.style.visibility = 'visible';
      } else {
        button.style.opacity = '0';
        button.style.visibility = 'hidden';
      }
    });

    button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-5px)';
      button.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3)';
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)';
      button.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    });
  }

  /* ==================== PARALLAX EFFECT ==================== */
  createParallaxEffect();

  function createParallaxEffect() {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const hero = document.querySelector('.hero');
      if (hero) {
        hero.style.backgroundPosition = `0 ${scrollY * 0.5}px`;
      }
    });
  }

  /* ==================== PRELOADER ==================== */
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });

  /* ==================== KEYBOARD SHORTCUTS ==================== */
  document.addEventListener('keydown', (e) => {
    // Press 'H' to go to home
    if (e.key.toLowerCase() === 'h' && e.altKey) {
      window.location.href = 'index.html';
    }
    // Press 'C' to go to contact
    if (e.key.toLowerCase() === 'c' && e.altKey) {
      window.location.href = 'contact.html';
    }
  });
});

/* ==================== PERFORMANCE OPTIMIZATION ==================== */
// Lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}
