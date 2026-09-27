/* ==========================================================================
   ANIMATIONS — GSAP timelines for each section.
   Later phases add their ScrollTrigger scenes here.
   ========================================================================== */

window.SD = window.SD || {};

SD.animations = (function () {
  'use strict';

  var $ = function (sel) {
    return document.querySelector(sel);
  };
  var $$ = function (sel) {
    return Array.prototype.slice.call(document.querySelectorAll(sel));
  };

  function markCodeCompiled() {
    var status = $('#code-status');
    status.textContent = '✓ 0 problems';
    status.classList.add('is-ok');
  }

  /* Types the hero code window line by line, keeping the syntax colours:
     each line's width grows in character-sized steps, with a caret following. */
  function typeCode() {
    var lines = $$('#hero-code .ln');
    var caret = document.createElement('span');
    caret.className = 'code-caret';
    var tl = gsap.timeline();

    lines.forEach(function (ln, i) {
      var code = ln.querySelector('.ln__code');
      var chars = code.textContent.length;

      tl.add(function () {
        lines.forEach(function (l) {
          l.classList.remove('is-current');
        });
        ln.classList.add('is-current');
        ln.style.opacity = 1;
        ln.appendChild(caret);
      });

      if (chars) {
        tl.to(code, {
          width: function () {
            return code.scrollWidth;
          },
          duration: chars * 0.016,
          ease: 'steps(' + chars + ')',
        });
      }
      tl.set(code, { width: 'auto' });
      tl.to({}, { duration: i < 2 ? 0.28 : 0.07 });
    });

    tl.add(markCodeCompiled);
    return tl;
  }

  /* Full entrance: nav, name, role, tagline, CTAs, stats, then the 3D code window. */
  function heroEntrance(D) {
    gsap.set('#hero-code .ln', { opacity: 0 });
    gsap.set('#hero-code .ln__code', { width: 0 });

    var tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.1 } });

    tl.fromTo('.hero__canvas', { opacity: 0 }, { opacity: 1, duration: 2.2, ease: 'power2.out' }, 0)
      .fromTo(
        '#nav',
        { opacity: 0, yPercent: -100 },
        { opacity: 1, yPercent: 0, duration: 1, clearProps: 'transform' },
        0.15
      )
      .fromTo('[data-hero="pill"]', { opacity: 0, y: 18 }, { opacity: 1, y: 0 }, 0.05)
      .set('[data-hero="title"]', { opacity: 1 }, 0)
      .fromTo('[data-hero-part="hello"]', { opacity: 0, x: -16 }, { opacity: 1, x: 0 }, 0.12)
      .fromTo(
        '#hero-name .word__inner',
        { yPercent: 118, rotate: 5 },
        { yPercent: 0, rotate: 0, duration: 1.3, stagger: 0.09 },
        0.18
      )
      .fromTo('[data-hero="role"]', { opacity: 0, y: 14 }, { opacity: 1, y: 0 }, 0.55)
      .add(function () {
        SD.effects.typewriter($('#hero-typed'), D.profile.roles, { delay: 150 });
      }, 0.6)
      .fromTo('[data-hero="tagline"]', { opacity: 0, y: 18 }, { opacity: 1, y: 0 }, 0.7)
      .fromTo('[data-hero="cta"]', { opacity: 0, y: 18 }, { opacity: 1, y: 0 }, 0.82)
      .fromTo('[data-hero="stats"]', { opacity: 0, y: 18 }, { opacity: 1, y: 0 }, 0.95)
      .add(function () {
        SD.effects.countUp($('#hero-stats'));
      }, 0.95)
      .fromTo(
        '[data-hero="visual"]',
        { opacity: 0, y: 50, rotationX: 16, scale: 0.94, transformPerspective: 1200 },
        { opacity: 1, y: 0, rotationX: 0, scale: 1, duration: 1.7, clearProps: 'transform' },
        0.35
      )
      .fromTo(
        '.badge',
        { opacity: 0, '--s': 0.5 },
        { opacity: 1, '--s': 1, duration: 0.9, stagger: 0.09, ease: 'back.out(2.2)' },
        1.05
      )
      .add(typeCode(), 0.95)
      .fromTo('#scroll-cue', { opacity: 0, y: -10 }, { opacity: 1, y: 0 }, 1.6);

    return tl;
  }

  /* No GSAP or reduced motion: everything is already visible; just settle state. */
  function heroStatic(D, reduce) {
    markCodeCompiled();
    if (!reduce) {
      SD.effects.typewriter($('#hero-typed'), D.profile.roles);
      SD.effects.countUp($('#hero-stats'));
    }
  }

  /* ==========================================================================
     SCROLL SCENES (ScrollTrigger)
     ========================================================================== */

  function heroExit() {
    gsap.to('.hero__inner', {
      yPercent: -10,
      opacity: 0.25,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });
  }

  /* Eyebrow decodes, title words slide up from their masks, lead fades in. */
  function sectionHeads() {
    $$('.section-head').forEach(function (head) {
      var lead = head.querySelector('.section-lead');
      var tl = gsap.timeline({ scrollTrigger: { trigger: head, start: 'top 82%', once: true } });
      tl.from(head.querySelector('.eyebrow'), { opacity: 0, x: -24, duration: 0.8, ease: 'expo.out' })
        .add(function () {
          SD.effects.scramble(head.querySelector('.eyebrow__text'));
        }, 0)
        .from(
          head.querySelectorAll('.word__inner'),
          { yPercent: 118, rotate: 4, duration: 1.15, ease: 'expo.out', stagger: 0.06 },
          0.05
        );
      if (lead) tl.from(lead, { opacity: 0, y: 20, duration: 1, ease: 'expo.out' }, 0.35);
    });
  }

  /* Generic fade-up for anything marked data-reveal, batched so rows stagger. */
  function reveals() {
    gsap.set('[data-reveal]', { opacity: 0, y: 48 });
    ScrollTrigger.batch('[data-reveal]', {
      start: 'top 90%',
      once: true,
      onEnter: function (els) {
        gsap.to(els, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.1, overwrite: 'auto' });
      },
    });
  }

  function about() {
    // Summary lights up word by word as you scroll through it
    gsap.fromTo(
      '#about-summary .sw',
      { opacity: 0.14 },
      {
        opacity: 1,
        ease: 'none',
        stagger: 0.1,
        scrollTrigger: { trigger: '#about-summary', start: 'top 80%', end: 'bottom 55%', scrub: 0.6 },
      }
    );
    gsap.fromTo(
      '.portrait__frame > *',
      { scale: 1.15 },
      { scale: 1, ease: 'none', scrollTrigger: { trigger: '.portrait', start: 'top bottom', end: 'bottom top', scrub: true } }
    );
    gsap.from('.float-tag', {
      opacity: 0,
      scale: 0.6,
      duration: 0.9,
      stagger: 0.15,
      ease: 'back.out(2)',
      scrollTrigger: { trigger: '.portrait', start: 'top 70%', once: true },
    });
  }

  /* The rail fills as you scroll; each node lights up when the fill reaches it. */
  function journey() {
    var wide = window.matchMedia('(min-width: 861px)').matches;

    gsap.fromTo(
      '.timeline__fill',
      { scaleY: 0 },
      { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '#timeline', start: 'top 62%', end: 'bottom 62%', scrub: true } }
    );

    $$('.tl-item').forEach(function (item, i) {
      ScrollTrigger.create({
        trigger: item,
        start: 'top 62%',
        onEnter: function () {
          item.classList.add('is-active');
        },
        onLeaveBack: function () {
          item.classList.remove('is-active');
        },
      });
      var fromX = wide ? (i % 2 ? 70 : -70) : -40;
      var st = { trigger: item, start: 'top 85%', once: true };
      gsap.from(item.querySelector('.tl-card'), { opacity: 0, x: fromX, duration: 1.2, ease: 'expo.out', scrollTrigger: st });
      gsap.from(item.querySelector('.tl-item__year'), { opacity: 0, y: 40, duration: 1.2, ease: 'expo.out', scrollTrigger: st });
    });
  }

  function skills() {
    // Marquee rows lean into the scroll direction, then settle
    var skewTo = gsap.quickTo('.marquees', 'skewX', { duration: 0.5, ease: 'power3.out' });
    var settle;
    ScrollTrigger.create({
      trigger: '.marquees',
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: function (self) {
        skewTo(gsap.utils.clamp(-7, 7, self.getVelocity() / -320));
        clearTimeout(settle);
        settle = setTimeout(function () {
          skewTo(0);
        }, 140);
      },
    });

    $$('.skill-card').forEach(function (card) {
      gsap.from(card.querySelectorAll('.chip'), {
        opacity: 0,
        y: 14,
        scale: 0.85,
        duration: 0.6,
        ease: 'back.out(2)',
        stagger: 0.035,
        delay: 0.25,
        scrollTrigger: { trigger: card, start: 'top 88%', once: true },
      });
    });
  }

  /* Desktop: pin the AI section and scroll its cards horizontally.
     Smaller screens keep the plain stacked grid. */
  function aiPin() {
    var mm = gsap.matchMedia();
    mm.add('(min-width: 1081px) and (min-height: 660px)', function () {
      var section = $('#ai');
      var track = $('#ai-track');
      var bar = $('#ai-progress');
      section.classList.add('is-pinned');

      var distance = function () {
        return Math.max(0, track.scrollWidth - document.documentElement.clientWidth);
      };

      var move = gsap.to(track, {
        x: function () {
          return -distance();
        },
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: function () {
            return '+=' + distance();
          },
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: function (self) {
            bar.style.transform = 'scaleX(' + self.progress + ')';
          },
        },
      });

      $$('.ai-card').forEach(function (card) {
        gsap.fromTo(
          card,
          { scale: 0.9, rotationY: -12, transformPerspective: 1000 },
          {
            scale: 1,
            rotationY: 0,
            ease: 'none',
            scrollTrigger: { trigger: card, containerAnimation: move, start: 'left 95%', end: 'left 55%', scrub: true },
          }
        );
      });

      return function () {
        section.classList.remove('is-pinned');
        bar.style.transform = '';
      };
    });
  }

  function credentials() {
    gsap.from('.cert', {
      opacity: 0,
      y: 50,
      rotationX: -35,
      transformPerspective: 900,
      transformOrigin: '50% 0%',
      duration: 1.2,
      stagger: 0.12,
      ease: 'expo.out',
      scrollTrigger: { trigger: '#certs', start: 'top 85%', once: true },
    });
    $$('.panel').forEach(function (panel) {
      gsap.from(panel.querySelectorAll('li'), {
        opacity: 0,
        x: -20,
        duration: 0.8,
        stagger: 0.07,
        ease: 'expo.out',
        scrollTrigger: { trigger: panel, start: 'top 82%', once: true },
      });
    });
  }

  function contact() {
    gsap.fromTo(
      '.contact__bg span',
      { yPercent: 30 },
      {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'bottom bottom', scrub: true },
      }
    );
  }

  function scrollScenes() {
    gsap.registerPlugin(ScrollTrigger);
    heroExit();
    sectionHeads();
    reveals();
    about();
    journey();
    skills();
    aiPin();
    credentials();
    contact();

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        ScrollTrigger.refresh();
      });
    }
  }

  return { heroEntrance: heroEntrance, heroStatic: heroStatic, scrollScenes: scrollScenes };
})();
