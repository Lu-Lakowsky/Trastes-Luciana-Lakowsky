/**
* Template Name: Append
* Template URL: https://bootstrapmade.com/append-bootstrap-website-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });


  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);



  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  // =========================
// INSTRUMENTOS SECTION
// Plays/pauses an audio file when a circular button is clicked.
// Only one sound plays at a time; clicking the active button pauses it.
// =========================


document.addEventListener('DOMContentLoaded', function () {
  var buttons = document.querySelectorAll('.instrumentos__play');
  var audioMap = new Map(); // button -> Audio instance
  var currentlyPlaying = null;

  function resetButton(btn) {
    btn.classList.remove('is-playing');
  }

  buttons.forEach(function (button) {
    var src = button.getAttribute('data-audio');
    var audio = new Audio(src);
    audioMap.set(button, audio);

    audio.addEventListener('ended', function () {
      resetButton(button);
      currentlyPlaying = null;
    });

    button.addEventListener('click', function () {
      // If this button's audio is already playing, pause it.
      if (button.classList.contains('is-playing')) {
        audio.pause();
        audio.currentTime = 0;
        resetButton(button);
        currentlyPlaying = null;
        return;
      }

      // Stop whatever else is playing first.
      if (currentlyPlaying && currentlyPlaying !== button) {
        var otherAudio = audioMap.get(currentlyPlaying);
        otherAudio.pause();
        otherAudio.currentTime = 0;
        resetButton(currentlyPlaying);
      }

      audio.currentTime = 0;
      audio.play().catch(function (err) {
        console.warn('No se pudo reproducir el audio:', err);
      });

      button.classList.add('is-playing');
      currentlyPlaying = button;
    });
  });
});

// =========================
// INSTRUMENTOS — calibración de imagen de fondo por columna
// Mide el offsetLeft real de cada columna y lo pasa como
// variable CSS al ::before, para que la imagen se vea correcta
// con cualquier proporción de columnas en el grid.
// =========================
function calibrarInstrumentos() {
  var section = document.querySelector('.instrumentos');
  var list = document.querySelector('.instrumentos__list');
  var items = document.querySelectorAll('.instrumentos__item');
  if (!section || !list || !items.length) return;

  var sectionWidth  = section.offsetWidth;
  var sectionHeight = section.offsetHeight;

  items.forEach(function (item) {
    // offsetLeft relativo a la sección (no al viewport)
    var offsetLeft = item.offsetLeft - section.offsetLeft;

    // background-size: el ancho exacto de la sección en px,
    // así la imagen se escala igual que con cover pero controlado.
    item.style.setProperty('--instr-bg-size', sectionWidth + 'px ' + sectionHeight + 'px');

    // background-position-x: desplazamos la imagen hacia la izquierda
    // tantos píxeles como el offsetLeft de esta columna.
    item.style.setProperty('--instr-bg-x', '-' + offsetLeft + 'px');
  });
}

window.addEventListener('load', calibrarInstrumentos);
window.addEventListener('resize', function () {
  clearTimeout(window._instrTimeout);
  window._instrTimeout = setTimeout(calibrarInstrumentos, 120);
});

// =========================
// PROCESO SECTION
// Carousel controlled by arrow buttons and dot navigation.
// =========================

document.addEventListener('DOMContentLoaded', function () {
  var slidesContainer = document.getElementById('procesoSlides');
  if (!slidesContainer) return;

  var slides = slidesContainer.querySelectorAll('.proceso__slide');
  var dots = document.querySelectorAll('.proceso__dot');
  var prevBtn = document.querySelector('.proceso__arrow--prev');
  var nextBtn = document.querySelector('.proceso__arrow--next');

  var total = slides.length;
  var currentIndex = 0;

  function goToSlide(index) {
    // Loop around in both directions.
    currentIndex = (index + total) % total;

    var offsetPercent = (currentIndex * 100) / total;
    slidesContainer.style.transform = 'translateX(-' + offsetPercent + '%)';

    dots.forEach(function (dot, i) {
      var isActive = i === currentIndex;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  prevBtn.addEventListener('click', function () {
    goToSlide(currentIndex - 1);
  });

  nextBtn.addEventListener('click', function () {
    goToSlide(currentIndex + 1);
  });

  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      var index = parseInt(dot.getAttribute('data-index'), 10);
      goToSlide(index);
    });
  });

  // Optional: basic swipe support for touch devices.
  var startX = 0;
  var isSwiping = false;

  slidesContainer.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
    isSwiping = true;
  }, { passive: true });

  slidesContainer.addEventListener('touchend', function (e) {
    if (!isSwiping) return;
    var endX = e.changedTouches[0].clientX;
    var diff = startX - endX;

    if (Math.abs(diff) > 40) {
      diff > 0 ? goToSlide(currentIndex + 1) : goToSlide(currentIndex - 1);
    }
    isSwiping = false;
  });

  // Initialize.
  goToSlide(0);
});

// =========================
// FADE UP AL SCROLLEAR
// Observa todos los elementos con .fade-up y les agrega
// .is-visible cuando entran en el viewport.
// =========================
document.addEventListener('DOMContentLoaded', function () {
  var fadeElements = document.querySelectorAll('.fade-up');
  if (!fadeElements.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Una vez visible, dejamos de observarlo
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,   // se dispara cuando el 15% del elemento es visible
    rootMargin: '0px 0px -40px 0px' // se dispara un poco antes del borde inferior
  });

  fadeElements.forEach(function (el) {
    observer.observe(el);
  });
});


// =========================
// SECCIÓN GALERÍA
// =========================
(function(){
  const slidesData = [
    { img: "assets/img/galeria-1.jpg", name: "Aiko Tanaka", instrument: "Violoncello", theatre: "Teatro Colón" },
    { img: "assets/img/galeria-2.jpg", name: "Marco Duarte", instrument: "Contrabajo", theatre: "Teatro San Martín" },
    { img: "assets/img/galeria-3.jpg", name: "Sofía Reyes", instrument: "Viola", theatre: "Teatro El Círculo" },
    { img: "assets/img/galeria-4.jpg", name: "Diego Alarcón", instrument: "Violín", theatre: "Teatro Opera" },
    { img: "assets/img/galeria-5.jpg", name: "Julia Marín", instrument: "Violín", theatre: "Teatro Coliseo" },
    { img: "assets/img/galeria-6.jpg", name: "Nicolás Vega", instrument: "Violoncello", theatre: "Teatro Independencia" },
    { img: "assets/img/galeria-7.jpg", name: "Suki Hatchi", instrument: "Violoncello", theatre: " Teatro Ópera de Tokio" }
  ];

  const track = document.getElementById('galeriaTrack');
  const dotsWrap = document.getElementById('galeriaDots');
  const capName = document.getElementById('galeriaCapName');
  const capInstrument = document.getElementById('galeriaCapInstrument');
  const capTheatre = document.getElementById('galeriaCapTheatre');
  const leftArrow = document.querySelector('.galeria-arrow-left');
  const rightArrow = document.querySelector('.galeria-arrow-right');

  let current = 0;

  slidesData.forEach((s, i) => {
    const slide = document.createElement('div');
    slide.className = 'galeria-slide';
    slide.innerHTML = `<img src="${s.img}" alt="${s.name}">`;
    slide.addEventListener('click', () => goTo(i));
    track.appendChild(slide);

    const dot = document.createElement('div');
    dot.className = 'galeria-dot';
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  const slideEls = document.querySelectorAll('.galeria-slide');
  const dotEls = document.querySelectorAll('.galeria-dot');

  function update(){
    slideEls.forEach((el, i) => el.classList.toggle('active', i === current));
    dotEls.forEach((el, i) => el.classList.toggle('active', i === current));

    const data = slidesData[current];
    capName.style.animation = 'none';
    capInstrument.style.animation = 'none';
    capTheatre.style.animation = 'none';
    void capName.offsetWidth;

    capName.textContent = data.name;
    capInstrument.textContent = data.instrument;
    capTheatre.textContent = data.theatre;

    capName.style.animation = '';
    capInstrument.style.animation = '';
    capTheatre.style.animation = '';

    const wrapperWidth = track.parentElement.offsetWidth;
    const activeEl = slideEls[current];
    const activeCenter = activeEl.offsetLeft + activeEl.offsetWidth / 2;
    const offset = wrapperWidth / 2 - activeCenter;
    track.style.transform = `translateX(${offset}px)`;
  }

  function goTo(i){
    current = (i + slidesData.length) % slidesData.length;
    update();
  }

  leftArrow.addEventListener('click', () => goTo(current - 1));
  rightArrow.addEventListener('click', () => goTo(current + 1));

  window.addEventListener('resize', update);
  window.addEventListener('load', update);
  setTimeout(update, 50);
})();


// =========================
// Página Curso - ACORDEÓN — Programa del curso
// =========================
document.addEventListener('DOMContentLoaded', function () {
  var items = document.querySelectorAll('.curso-acordeon__item');
  if (!items.length) return;

  items.forEach(function (item) {
    var header = item.querySelector('.curso-acordeon__header');
    var body   = item.querySelector('.curso-acordeon__body');

    header.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');

      // Cerrar todos los items abiertos
      items.forEach(function (other) {
        other.classList.remove('is-open');
        other.querySelector('.curso-acordeon__header').setAttribute('aria-expanded', 'false');
        other.querySelector('.curso-acordeon__body').style.display = 'none';
      });

      // Si estaba cerrado, abrirlo
      if (!isOpen) {
        item.classList.add('is-open');
        header.setAttribute('aria-expanded', 'true');
        body.style.display = 'block';
      }
    });

    // Estado inicial: todos cerrados
    body.style.display = 'none';
  });
});

})();