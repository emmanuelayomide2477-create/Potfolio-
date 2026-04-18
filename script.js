class TypingEffect {
  constructor(elementId) {
    this.element = document.getElementById(elementId);
    if (!this.element) return;
    
    this.text = this.element.textContent;
    this.element.textContent = '';
    this.index = 0;
    this.type();
  }
  
  type() {
    if (this.index < this.text.length) {
      this.element.textContent += this.text.charAt(this.index);
      this.index++;
      setTimeout(() => this.type(), 100);
    }
  }
}

function animateProgress() {
  const bars = document.querySelectorAll('.progress-fill');
  bars.forEach((bar, index) => {
    const width = bar.getAttribute('data-width');
    if (width) {
      setTimeout(() => {
        bar.style.width = width;
      }, 300 + (index * 100));
    }
  });
}

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  const checkReveal = () => {
    reveals.forEach(el => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;
      const revealPoint = 150;
      
      if (elementTop < windowHeight - revealPoint) {
        el.classList.add('active');
      }
    });
  };
  
  window.addEventListener('scroll', checkReveal);
  window.addEventListener('load', checkReveal);
  checkReveal();
}

function initProgressObserver() {
  const skillsSection = document.querySelector('.skills-stage');
  if (!skillsSection) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateProgress();
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });
  
  observer.observe(skillsSection);
}

document.addEventListener('DOMContentLoaded', () => {
  new TypingEffect('typing');
  initScrollReveal();
  initProgressObserver();
  
  setTimeout(() => {
    const bars = document.querySelectorAll('.progress-fill');
    const anyAnimated = Array.from(bars).some(bar => bar.style.width !== '');
    if (!anyAnimated) {
      animateProgress();
    }
  }, 1000);
});

window.addEventListener("load", function () {
  setTimeout(function () {
    const loader = document.getElementById("loader");
    if (loader) {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
      }, 500);
    }
  }, 2000);
});










