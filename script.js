/**
 * ============================================================================
 * PORTFOLIO SCRIPT: Zill-e-Huma Minhas
 * Features:
 *  1. Interactive Python terminal with syntax-highlighted typing effect
 *  2. Count-up statistics on scroll reveal
 *  3. Scroll reveal animations via IntersectionObserver
 *  4. Project 6-featured default with smooth "Show all 14" expansion & filtering
 *  5. Certificate 6-featured default with smooth "View all 14" expansion & filtering
 *  6. Fullscreen accessible Lightbox modal (keyboard & touch swipe support)
 *  7. Sticky navbar & responsive mobile drawer
 *  8. Email clipboard copy with toast feedback
 *  9. Contact form mailto generator & status handler
 * 10. Back to top smooth scroll
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Accessibility: Check for reduced motion preference
  // --------------------------------------------------------------------------
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --------------------------------------------------------------------------
  // 2. Dynamic Copyright Year
  // --------------------------------------------------------------------------
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 3. Sticky Navigation & Mobile Drawer
  // --------------------------------------------------------------------------
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Handle header background on scroll
  const handleScrollHeader = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScrollHeader, { passive: true });
  handleScrollHeader();

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile menu when clicking nav links
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          navToggle.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // Active section link highlighting
  const sections = document.querySelectorAll('section[id]');
  const highlightActiveNav = () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', highlightActiveNav, { passive: true });

  // --------------------------------------------------------------------------
  // 4. Interactive Python Terminal Card (Typewriter Effect)
  // --------------------------------------------------------------------------
  const typewriterCode = document.getElementById('typewriter-code');
  const lineNumbersEl = document.getElementById('terminal-line-numbers');
  const replayBtn = document.getElementById('terminal-replay');

  // The Python code structure to type out
  const codeLines = [
    { html: '<span class="tok-keyword">class</span> <span class="tok-class">Developer</span>:' },
    { html: '    <span class="tok-comment">"""Profile of Zill-e-Huma Minhas"""</span>' },
    { html: '    <span class="tok-def">def</span> <span class="tok-class">__init__</span>(<span class="tok-self">self</span>):' },
    { html: '        <span class="tok-self">self</span>.name = <span class="tok-str">"Zill-e-Huma Minhas"</span>' },
    { html: '        <span class="tok-self">self</span>.degree = <span class="tok-str">"BS Information Technology"</span>' },
    { html: '        <span class="tok-self">self</span>.cgpa = <span class="tok-num">3.77</span>' },
    { html: '        <span class="tok-self">self</span>.stack = [' },
    { html: '            <span class="tok-str">"Python"</span>, <span class="tok-str">"OpenCV"</span>, <span class="tok-str">"Java"</span>, <span class="tok-str">"C#"</span>,' },
    { html: '            <span class="tok-str">"HTML/CSS/JS"</span>, <span class="tok-str">"PHP"</span>, <span class="tok-str">"SQL"</span>, <span class="tok-str">"n8n"</span>' },
    { html: '        ]' },
    { html: '        <span class="tok-self">self</span>.status = <span class="tok-teal">"Ready for impact"</span>' },
    { html: '' },
    { html: '    <span class="tok-def">def</span> <span class="tok-class">solve</span>(<span class="tok-self">self</span>, challenge):' },
    { html: '        <span class="tok-keyword">return</span> <span class="tok-str">"Purposeful technology."</span>' },
    { html: '' },
    { html: 'huma = <span class="tok-class">Developer</span>()' },
    { html: '<span class="tok-keyword">print</span>(huma.solve(<span class="tok-str">"world"</span>))' }
  ];

  let typingTimer = null;

  const runTerminalTyping = () => {
    if (!typewriterCode || !lineNumbersEl) return;

    if (typingTimer) {
      clearTimeout(typingTimer);
    }

    typewriterCode.innerHTML = '';
    lineNumbersEl.innerHTML = '';

    if (prefersReducedMotion) {
      codeLines.forEach((line, index) => {
        const lineNum = document.createElement('div');
        lineNum.textContent = index + 1;
        lineNumbersEl.appendChild(lineNum);
      });
      typewriterCode.innerHTML = codeLines.map((l) => l.html).join('\n');
      return;
    }

    let lineIndex = 0;

    const renderNextLine = () => {
      if (lineIndex < codeLines.length) {
        const numDiv = document.createElement('div');
        numDiv.textContent = lineIndex + 1;
        lineNumbersEl.appendChild(numDiv);

        const lineContent = codeLines[lineIndex].html;
        if (lineIndex === 0) {
          typewriterCode.innerHTML = lineContent;
        } else {
          typewriterCode.innerHTML += '\n' + lineContent;
        }

        lineIndex++;
        const delay = lineContent === '' ? 45 : Math.floor(Math.random() * 35) + 55;
        typingTimer = setTimeout(renderNextLine, delay);
      }
    };

    renderNextLine();
  };

  runTerminalTyping();

  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      runTerminalTyping();
    });
  }

  // --------------------------------------------------------------------------
  // 5. Animated Count-up Statistics
  // --------------------------------------------------------------------------
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsCounted = false;

  const animateStats = () => {
    if (statsCounted) return;
    statsCounted = true;

    statNumbers.forEach((el) => {
      const target = parseFloat(el.getAttribute('data-target'));
      const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      const duration = 1500; // ms
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentVal = target * easeProgress;

        el.textContent = currentVal.toFixed(decimals);

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          el.textContent = target.toFixed(decimals);
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  const statsStrip = document.querySelector('.stats-strip');
  if (statsStrip) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    statsObserver.observe(statsStrip);
  }

  // --------------------------------------------------------------------------
  // 6. Scroll Reveal Animation for Sections & Cards
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  // --------------------------------------------------------------------------
  // 7. Projects: 6 Featured Default + Expand "Show all 14" + Category Filters
  // --------------------------------------------------------------------------
  const projectCards = Array.from(document.querySelectorAll('.project-card'));
  const projectFilterBtns = document.querySelectorAll('.projects-section .filter-btn');
  const projectsToggleBtn = document.getElementById('projects-toggle-btn');
  const projectsToggleWrapper = document.querySelector('.projects-toggle-wrapper');

  let isProjectsExpanded = false;
  let currentProjectFilter = 'all';

  const updateProjectsVisibility = () => {
    projectCards.forEach((card, index) => {
      const cardCategory = card.getAttribute('data-category') || '';
      const matchesFilter =
        currentProjectFilter === 'all' || cardCategory.includes(currentProjectFilter);

      if (currentProjectFilter === 'all') {
        // In "All" mode: show first 6 if collapsed, show all 14 if expanded
        if (index < 6 || isProjectsExpanded) {
          card.classList.remove('is-collapsed');
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.classList.add('is-collapsed');
          card.style.display = 'none';
        }
      } else {
        // When filtered by specific category: filter across all 14 projects
        if (matchesFilter) {
          card.classList.remove('is-collapsed');
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.classList.add('is-collapsed');
          card.style.display = 'none';
        }
      }
    });

    // Update toggle button text and visibility
    if (projectsToggleWrapper && projectsToggleBtn) {
      if (currentProjectFilter === 'all') {
        projectsToggleWrapper.style.display = 'flex';
        const toggleText = projectsToggleBtn.querySelector('.toggle-text');
        if (toggleText) {
          toggleText.textContent = isProjectsExpanded ? 'Show less' : 'Show all 14 projects';
        }
        projectsToggleBtn.setAttribute('aria-expanded', isProjectsExpanded ? 'true' : 'false');
        if (isProjectsExpanded) {
          projectsToggleBtn.classList.add('toggle-expanded');
        } else {
          projectsToggleBtn.classList.remove('toggle-expanded');
        }
      } else {
        // Hide toggle when a specific category filter is active
        projectsToggleWrapper.style.display = 'none';
      }
    }
  };

  // Toggle button click listener
  if (projectsToggleBtn) {
    projectsToggleBtn.addEventListener('click', () => {
      isProjectsExpanded = !isProjectsExpanded;
      updateProjectsVisibility();

      if (!isProjectsExpanded) {
        // Smooth scroll back to projects section if user collapses from bottom
        const projectsSec = document.getElementById('projects');
        if (projectsSec) {
          projectsSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  }

  // Category filter click listeners
  projectFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      currentProjectFilter = btn.getAttribute('data-filter') || 'all';
      updateProjectsVisibility();
    });
  });

  // Initial projects render
  updateProjectsVisibility();

  // --------------------------------------------------------------------------
  // 8. Certificates: 6 Default + Expand "View all 14" + Category Filters
  // --------------------------------------------------------------------------
  const certCards = Array.from(document.querySelectorAll('.cert-card'));
  const certFilterBtns = document.querySelectorAll('.certificates-section .filter-btn');
  const certsToggleBtn = document.getElementById('certs-toggle-btn');
  const certsToggleWrapper = document.querySelector('.certs-toggle-wrapper');

  let isCertsExpanded = false;
  let currentCertFilter = 'all';

  const updateCertsVisibility = () => {
    certCards.forEach((card, index) => {
      const cardCategory = card.getAttribute('data-category') || '';
      const matchesFilter =
        currentCertFilter === 'all' || cardCategory.includes(currentCertFilter);

      if (currentCertFilter === 'all') {
        // In "All" mode: show first 6 if collapsed, show all 14 if expanded
        if (index < 6 || isCertsExpanded) {
          card.classList.remove('is-collapsed');
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.classList.add('is-collapsed');
          card.style.display = 'none';
        }
      } else {
        // When filtered: filter across all 14 certificates
        if (matchesFilter) {
          card.classList.remove('is-collapsed');
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.classList.add('is-collapsed');
          card.style.display = 'none';
        }
      }
    });

    // Update toggle button text and visibility
    if (certsToggleWrapper && certsToggleBtn) {
      if (currentCertFilter === 'all') {
        certsToggleWrapper.style.display = 'flex';
        const toggleText = certsToggleBtn.querySelector('.toggle-text');
        if (toggleText) {
          toggleText.textContent = isCertsExpanded ? 'Show less' : 'View all 14';
        }
        certsToggleBtn.setAttribute('aria-expanded', isCertsExpanded ? 'true' : 'false');
        if (isCertsExpanded) {
          certsToggleBtn.classList.add('toggle-expanded');
        } else {
          certsToggleBtn.classList.remove('toggle-expanded');
        }
      } else {
        certsToggleWrapper.style.display = 'none';
      }
    }
  };

  // Toggle button click listener
  if (certsToggleBtn) {
    certsToggleBtn.addEventListener('click', () => {
      isCertsExpanded = !isCertsExpanded;
      updateCertsVisibility();

      if (!isCertsExpanded) {
        const certsSec = document.getElementById('certificates');
        if (certsSec) {
          certsSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  }

  // Certificate filter click listeners
  certFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      certFilterBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      currentCertFilter = btn.getAttribute('data-filter') || 'all';
      updateCertsVisibility();
    });
  });

  // Initial certificates render
  updateCertsVisibility();

  // --------------------------------------------------------------------------
  // 9. Fullscreen Certificate Lightbox Modal
  // --------------------------------------------------------------------------
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCategory = document.getElementById('lightbox-category');
  const lightboxCounter = document.getElementById('lightbox-counter');

  // Collect full certificate dataset from DOM
  const certificateData = [];
  certCards.forEach((card, index) => {
    const fgImg = card.querySelector('.cert-fg-img');
    const titleEl = card.querySelector('.cert-title');
    const categoryEl = card.querySelector('.cert-category-tag');
    const frame = card.querySelector('.cert-media-frame');

    const item = {
      index: index,
      src: fgImg ? fgImg.getAttribute('src') : '',
      alt: fgImg ? fgImg.getAttribute('alt') : '',
      title: titleEl ? titleEl.textContent.trim() : 'Certificate',
      category: categoryEl ? categoryEl.textContent.trim() : 'Verified'
    };

    certificateData.push(item);

    if (frame) {
      frame.addEventListener('click', () => openLightbox(index));
      frame.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(index);
        }
      });
    }
  });

  let currentCertIndex = 0;
  let lastActiveElement = null;

  const openLightbox = (index) => {
    currentCertIndex = (index + certificateData.length) % certificateData.length;
    lastActiveElement = document.activeElement;

    updateLightboxView();

    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      if (lightboxClose) lightboxClose.focus();
    }, 50);
  };

  const closeLightbox = () => {
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (lastActiveElement) {
      lastActiveElement.focus();
    }
  };

  const updateLightboxView = () => {
    const cert = certificateData[currentCertIndex];
    if (!cert) return;

    lightboxImg.src = cert.src;
    lightboxImg.alt = cert.alt;
    lightboxTitle.textContent = cert.title;
    lightboxCategory.textContent = cert.category;
    lightboxCounter.textContent = `${currentCertIndex + 1} / ${certificateData.length}`;

    // Preload neighbors
    const nextIdx = (currentCertIndex + 1) % certificateData.length;
    const prevIdx = (currentCertIndex - 1 + certificateData.length) % certificateData.length;
    new Image().src = certificateData[nextIdx].src;
    new Image().src = certificateData[prevIdx].src;
  };

  const showNextCert = () => {
    currentCertIndex = (currentCertIndex + 1) % certificateData.length;
    updateLightboxView();
  };

  const showPrevCert = () => {
    currentCertIndex = (currentCertIndex - 1 + certificateData.length) % certificateData.length;
    updateLightboxView();
  };

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNextCert);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevCert);

  // Keyboard navigation for Lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      showNextCert();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      showPrevCert();
    }
  });

  // Touch Swipe navigation on mobile for Lightbox
  let touchStartX = 0;
  let touchEndX = 0;

  lightboxModal.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  lightboxModal.addEventListener(
    'touchend',
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipeGesture();
    },
    { passive: true }
  );

  const handleSwipeGesture = () => {
    const threshold = 40;
    if (touchEndX < touchStartX - threshold) {
      showNextCert();
    } else if (touchEndX > touchStartX + threshold) {
      showPrevCert();
    }
  };

  // --------------------------------------------------------------------------
  // 10. Copy Email to Clipboard & Toast Notification
  // --------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const toastNotification = document.getElementById('toast-notification');
  const toastMsg = document.getElementById('toast-msg');
  let toastTimer = null;

  const showToast = (message) => {
    if (!toastNotification) return;
    if (toastMsg) toastMsg.textContent = message;

    toastNotification.classList.add('show');
    toastNotification.setAttribute('aria-hidden', 'false');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotification.classList.remove('show');
      toastNotification.setAttribute('aria-hidden', 'true');
    }, 2500);
  };

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = 'humaminhas14314@gmail.com';
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          const textArea = document.createElement('textarea');
          textArea.value = email;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }

        const copyTextEl = copyEmailBtn.querySelector('.copy-text');
        if (copyTextEl) copyTextEl.textContent = 'Copied!';
        showToast('Email address copied to clipboard!');

        setTimeout(() => {
          if (copyTextEl) copyTextEl.textContent = 'Copy';
        }, 2000);
      } catch (err) {
        showToast('humaminhas14314@gmail.com');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 11. Contact Form Handler (Mailto format generator)
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !subject || !message) {
        if (formStatus) {
          formStatus.textContent = 'Please fill out all required fields.';
          formStatus.className = 'form-status error';
        }
        return;
      }

      const mailtoBody = encodeURIComponent(
        `Hello Zill-e-Huma,\n\nMy name is ${name} (${email}).\n\n${message}`
      );
      const mailtoUrl = `mailto:humaminhas14314@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${mailtoBody}`;

      if (formStatus) {
        formStatus.textContent = 'Opening your email client... Thank you!';
        formStatus.className = 'form-status success';
      }

      window.location.href = mailtoUrl;

      setTimeout(() => {
        contactForm.reset();
        if (formStatus) {
          formStatus.textContent = 'Message ready in your email client. Looking forward to connecting!';
        }
      }, 1200);
    });
  }

  // --------------------------------------------------------------------------
  // 12. Back to Top Smooth Scroll
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
