/* ==========================================================================
   MAIN — boots the page: render content, theme, navigation, animations.
   ========================================================================== */

(function () {
  'use strict';

  var D = window.PORTFOLIO;
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canAnimate = !!window.gsap && !reduce && !root.classList.contains('no-anim');

  var $ = function (sel, ctx) {
    return (ctx || document).querySelector(sel);
  };
  var $$ = function (sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  };

  clearTimeout(window.__sdFailsafe);
  if (!canAnimate) root.classList.add('no-anim');

  /* ---------- Theme (with circular reveal where View Transitions exist) ---------- */

  function initTheme() {
    var btn = $('#theme-toggle');
    var meta = $('meta[name="theme-color"]');

    function sync() {
      var dark = root.getAttribute('data-theme') !== 'light';
      btn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
      meta.setAttribute('content', dark ? '#050a16' : '#f4f7fc');
    }

    function apply(next) {
      root.setAttribute('data-theme', next);
      try {
        localStorage.setItem('sd-theme', next);
      } catch (e) {}
      sync();
      document.dispatchEvent(new CustomEvent('sd:themechange', { detail: next }));
    }

    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      if (!document.startViewTransition || reduce) {
        apply(next);
        return;
      }

      var r = btn.getBoundingClientRect();
      var x = r.left + r.width / 2;
      var y = r.top + r.height / 2;
      var radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

      root.classList.add('theme-switching');
      var transition = document.startViewTransition(function () {
        apply(next);
      });
      transition.ready.then(function () {
        root.animate(
          {
            clipPath: [
              'circle(0px at ' + x + 'px ' + y + 'px)',
              'circle(' + radius + 'px at ' + x + 'px ' + y + 'px)',
            ],
          },
          { duration: 750, easing: 'cubic-bezier(0.7, 0, 0.3, 1)', pseudoElement: '::view-transition-new(root)' }
        );
      });
      transition.finished.then(function () {
        root.classList.remove('theme-switching');
      });
    });

    sync();
  }

  /* ---------- Navigation: links built from sections, scroll state, mobile menu ---------- */

  function initNav() {
    var nav = $('#nav');
    var links = $('#nav-links');
    var burger = $('#nav-burger');
    var bar = $('#scroll-progress');
    var sections = $$('main section[data-nav]');

    links.innerHTML = sections
      .map(function (s, i) {
        var num = String(i + 1).padStart(2, '0');
        return (
          '<a class="nav__link" href="#' + s.id + '"><span class="nav__num">' + num + '.</span>' +
          SD.render.esc(s.getAttribute('data-nav')) +
          '</a>'
        );
      })
      .join('');
    nav.classList.toggle('nav--empty', sections.length === 0);

    function setOpen(open) {
      nav.classList.toggle('nav--open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    burger.addEventListener('click', function () {
      setOpen(!nav.classList.contains('nav--open'));
    });
    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });

    var lastY = window.scrollY;
    var queued = false;

    function onScroll() {
      queued = false;
      var y = window.scrollY;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, y / max) : 0) + ')';
      nav.classList.toggle('nav--scrolled', y > 20);
      var goingDown = y > lastY + 2;
      var goingUp = y < lastY - 2;
      if (goingDown && y > 420 && !nav.classList.contains('nav--open') && !nav.contains(document.activeElement)) {
        nav.classList.add('nav--hidden');
      } else if (goingUp || y <= 420) {
        nav.classList.remove('nav--hidden');
      }
      lastY = y;
    }

    window.addEventListener(
      'scroll',
      function () {
        if (!queued) {
          queued = true;
          requestAnimationFrame(onScroll);
        }
      },
      { passive: true }
    );
    onScroll();

    if (sections.length) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            $$('.nav__link', links).forEach(function (a) {
              a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
            });
          });
        },
        { rootMargin: '-45% 0px -50% 0px' }
      );
      sections.forEach(function (s) {
        io.observe(s);
      });
    }
  }

  /* ---------- Scroll cue points at the next section, once one exists ---------- */

  function initScrollCue() {
    var cue = $('#scroll-cue');
    var next = $('.hero').nextElementSibling;
    if (next && next.id) {
      cue.href = '#' + next.id;
      cue.hidden = false;
    }
  }

  /* ---------- Projects: domain filter ---------- */

  function initProjectFilters() {
    var group = $('#project-filters');
    var cards = $$('.project');
    var status = $('#projects-status');
    var busy = false;

    group.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter');
      if (!btn || busy || btn.classList.contains('is-active')) return;
      var key = btn.getAttribute('data-filter');

      $$('.filter', group).forEach(function (b) {
        var on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', String(on));
      });

      var match = function (c) {
        return key === 'all' || c.getAttribute('data-domain') === key;
      };
      var shown = cards.filter(match);
      status.textContent = 'Showing ' + shown.length + ' of ' + cards.length + ' projects';

      function swap() {
        cards.forEach(function (c) {
          c.hidden = !match(c);
        });
      }

      if (!canAnimate) {
        swap();
        return;
      }

      busy = true;
      gsap.to(
        cards.filter(function (c) {
          return !c.hidden;
        }),
        {
          opacity: 0,
          y: 20,
          scale: 0.96,
          duration: 0.25,
          stagger: 0.03,
          ease: 'power2.in',
          overwrite: true,
          onComplete: function () {
            swap();
            gsap.fromTo(
              shown,
              { opacity: 0, y: 36, scale: 0.96 },
              { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.07, ease: 'expo.out', overwrite: true }
            );
            if (window.ScrollTrigger) ScrollTrigger.refresh();
            busy = false;
          },
        }
      );
    });
  }

  /* ---------- Contact: copy email ---------- */

  function initCopyEmail() {
    var btn = $('#copy-email');
    var label = $('.copy-btn__label', btn);
    var timer;

    btn.addEventListener('click', function () {
      var email = btn.getAttribute('data-email');
      var done = function (ok) {
        label.textContent = ok ? 'Copied ✓' : email;
        btn.classList.toggle('is-copied', ok);
        clearTimeout(timer);
        timer = setTimeout(function () {
          label.textContent = 'Copy email';
          btn.classList.remove('is-copied');
        }, 2200);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(
          function () {
            done(true);
          },
          function () {
            done(false);
          }
        );
      } else {
        done(false);
      }
    });
  }

  /* ---------- Boot ---------- */

  SD.render.hero(D);
  SD.render.sectionHeads(D);
  SD.render.about(D);
  SD.render.journey(D);
  SD.render.skills(D);
  SD.render.ai(D);
  SD.render.projects(D);
  SD.render.credentials(D);
  SD.render.contact(D);

  initTheme();
  initNav();
  initScrollCue();
  initProjectFilters();
  initCopyEmail();
  SD.particles.init($('#hero-canvas'), { still: reduce });
  SD.effects.spotlight();

  if (canAnimate) {
    if (root.classList.contains('is-intro')) {
      if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }
    if (window.ScrollTrigger) SD.animations.scrollScenes();
    $('#hero-typed').textContent = '';
    SD.intro.run(D.intro, true).then(function () {
      SD.animations.heroEntrance(D);
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    });
    $$('.magnetic').forEach(function (el) {
      SD.effects.magnetic(el, 0.3);
    });
    SD.effects.tilt($('.hero'), $('#hero-stage'), { x: 6, y: 9 });
    SD.effects.cursor();
  } else {
    SD.intro.run(D.intro, false);
    SD.animations.heroStatic(D, reduce);
  }
})();
