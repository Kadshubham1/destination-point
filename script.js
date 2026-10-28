/* ============================================================
   DESTINATION POINT - JAVASCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Current Year in Footer
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Mobile Menu Toggle
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navLinks = document.getElementById('nav-links');
  const navOverlay = document.getElementById('nav-overlay');

  function openMenu() {
    hamburgerBtn.classList.add('is-active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    navLinks.classList.add('is-open');
    navOverlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburgerBtn.classList.remove('is-active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('is-open');
    navOverlay.classList.remove('is-visible');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn && navLinks && navOverlay) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('is-open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navOverlay.addEventListener('click', closeMenu);

    // Close menu when clicking any nav link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 860) {
          closeMenu();
        }
      });
    });
  }

  // 3. Active Nav Link on Scroll via IntersectionObserver
  const sections = document.querySelectorAll('main > section[id]');
  const navLinkItems = document.querySelectorAll('.nav-links .nav-link');

  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinkItems.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(sec => sectionObserver.observe(sec));
  }

  // 4. Contact Form Validation & Realistic Submission Handling
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('field-name');
  const emailInput = document.getElementById('field-email');
  const serviceSelect = document.getElementById('field-service');
  const messageInput = document.getElementById('field-message');
  const successBox = document.getElementById('form-success');
  const submitBtn = document.getElementById('form-submit-btn');

  const errorName = document.getElementById('error-name');
  const errorEmail = document.getElementById('error-email');
  const errorService = document.getElementById('error-service');
  const errorMessage = document.getElementById('error-message');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function clearErrors() {
    if (errorName) errorName.textContent = '';
    if (errorEmail) errorEmail.textContent = '';
    if (errorService) errorService.textContent = '';
    if (errorMessage) errorMessage.textContent = '';
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();

      let isValid = true;

      // Full Name
      const nameVal = nameInput ? nameInput.value.trim() : '';
      if (!nameVal) {
        if (errorName) errorName.textContent = 'Please enter your full name.';
        isValid = false;
      } else if (nameVal.length < 2) {
        if (errorName) errorName.textContent = 'Name must be at least 2 characters.';
        isValid = false;
      }

      // Email Address
      const emailVal = emailInput ? emailInput.value.trim() : '';
      if (!emailVal) {
        if (errorEmail) errorEmail.textContent = 'Please enter your email address.';
        isValid = false;
      } else if (!validateEmail(emailVal)) {
        if (errorEmail) errorEmail.textContent = 'Please enter a valid email address.';
        isValid = false;
      }

      // Service of Interest
      const serviceVal = serviceSelect ? serviceSelect.value : '';
      if (!serviceVal) {
        if (errorService) errorService.textContent = 'Please choose a service of interest.';
        isValid = false;
      }

      // Message
      const messageVal = messageInput ? messageInput.value.trim() : '';
      if (!messageVal) {
        if (errorMessage) errorMessage.textContent = 'Please provide details in your message.';
        isValid = false;
      } else if (messageVal.length < 10) {
        if (errorMessage) errorMessage.textContent = 'Message should be at least 10 characters long.';
        isValid = false;
      }

      if (!isValid) {
        return;
      }

      // Show processing state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processing...';
      }

      // Note: Form backend integration is pending as specified in guidelines
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `Send Message <svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
        }

        if (successBox) {
          successBox.hidden = false;
          successBox.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
            <div>
              <strong>Inquiry Recorded:</strong> Thank you, ${nameVal}! As direct server delivery is currently being configured, please feel free to also reach out to <a href="mailto:info@destinationpoint.org" style="text-decoration: underline; color: #fff;">info@destinationpoint.org</a>.
            </div>
          `;
        }

        contactForm.reset();
      }, 700);
    });
  }
});
