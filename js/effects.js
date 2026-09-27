/* ==========================================================================
   EFFECTS — small reusable interactions (typewriter, counters, magnetic
   buttons, 3D tilt). Each one is safe to call without GSAP unless noted.
   ========================================================================== */

window.SD = window.SD || {};

SD.effects = (function () {
  'use strict';

  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* Types, holds, deletes, then moves to the next word. Returns a stop(). */
  function typewriter(el, words, opts) {
    var o = Object.assign({ type: 60, erase: 30, hold: 1800, gap: 380, delay: 0 }, opts);
    var host = el.closest('[data-typing-host]') || el.parentElement;
    var wi = 0;
    var ci = 0;
    var erasing = false;
    var timer;

    function tick() {
      var word = words[wi];
      host.classList.add('is-typing');

      if (!erasing) {
        ci += 1;
        el.textContent = word.slice(0, ci);
        if (ci === word.length) {
          erasing = true;
          host.classList.remove('is-typing');
          timer = setTimeout(tick, o.hold);
          return;
        }
        timer = setTimeout(tick, o.type + Math.random() * 45);
        return;
      }

      ci -= 1;
      el.textContent = word.slice(0, ci);
      if (ci === 0) {
        erasing = false;
        wi = (wi + 1) % words.length;
        timer = setTimeout(tick, o.gap);
        return;
      }
      timer = setTimeout(tick, o.erase);
    }

    el.textContent = '';
    timer = setTimeout(tick, o.delay);
    return function stop() {
      clearTimeout(timer);
    };
  }

  /* Counts every [data-count] inside `scope` from 0 to its value. */
  function countUp(scope, opts) {
    var o = Object.assign({ duration: 1800, stagger: 120 }, opts);
    var easeOut = function (t) {
      return 1 - Math.pow(1 - t, 4);
    };

    Array.prototype.forEach.call(scope.querySelectorAll('[data-count]'), function (el, i) {
      var target = parseFloat(el.getAttribute('data-count'));
      var start = null;
      var delay = i * o.stagger;
      el.textContent = '0';

      function frame(now) {
        if (start === null) start = now + delay;
        var t = Math.min(1, Math.max(0, (now - start) / o.duration));
        el.textContent = Math.round(easeOut(t) * target);
        if (t < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    });
  }

  /* Element drifts toward the pointer and springs back. Needs GSAP. */
  function magnetic(el, strength) {
    if (!finePointer || !window.gsap) return;
    var s = strength || 0.3;
    var xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
    var yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });

    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * s);
      yTo((e.clientY - (r.top + r.height / 2)) * s);
    });
    el.addEventListener('pointerleave', function () {
      xTo(0);
      yTo(0);
    });
  }

  /* Tilts `target` in 3D as the pointer moves over `area`. Needs GSAP. */
  function tilt(area, target, opts) {
    if (!finePointer || !window.gsap) return;
    var o = Object.assign({ x: 7, y: 10 }, opts);
    var rx = gsap.quickTo(target, 'rotationX', { duration: 1, ease: 'power3.out' });
    var ry = gsap.quickTo(target, 'rotationY', { duration: 1, ease: 'power3.out' });

    area.addEventListener('pointermove', function (e) {
      var r = area.getBoundingClientRect();
      var nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      var ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      ry(nx * o.y);
      rx(-ny * o.x);
    });
    area.addEventListener('pointerleave', function () {
      rx(0);
      ry(0);
    });
  }

  /* Decodes text from random glyphs, left to right. */
  var GLYPHS = '!<>-_\\/[]{}=+*^?#01';

  function scramble(el, opts) {
    if (!el) return;
    var o = Object.assign({ duration: 750 }, opts);
    var text = el.getAttribute('data-text') || el.textContent;
    el.setAttribute('data-text', text);
    var start = null;

    function frame(now) {
      if (start === null) start = now;
      var t = Math.min(1, (now - start) / o.duration);
      var shown = Math.floor(t * text.length);
      var out = '';
      for (var i = 0; i < text.length; i++) {
        out += i < shown || text[i] === ' ' ? text[i] : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* Any .spotlight element gets --mx/--my at the pointer, for a radial glow. */
  function spotlight() {
    if (!finePointer) return;
    document.addEventListener(
      'pointermove',
      function (e) {
        var el = e.target.closest && e.target.closest('.spotlight');
        if (!el) return;
        var r = el.getBoundingClientRect();
        el.style.setProperty('--mx', e.clientX - r.left + 'px');
        el.style.setProperty('--my', e.clientY - r.top + 'px');
      },
      { passive: true }
    );
  }

  /* A soft ring that trails the mouse and grows over links and buttons. Needs GSAP. */
  function cursor() {
    if (!finePointer || !window.gsap) return;
    var ring = document.createElement('div');
    ring.className = 'cursor-ring';
    ring.setAttribute('aria-hidden', 'true');
    document.body.appendChild(ring);

    var xTo = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
    var yTo = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });
    var placed = false;

    window.addEventListener(
      'pointermove',
      function (e) {
        if (e.pointerType !== 'mouse') return;
        if (!placed) {
          gsap.set(ring, { x: e.clientX, y: e.clientY });
          placed = true;
        }
        xTo(e.clientX);
        yTo(e.clientY);
        ring.classList.add('is-visible');
      },
      { passive: true }
    );
    document.addEventListener('pointerover', function (e) {
      ring.classList.toggle('is-hover', !!e.target.closest('a, button'));
    });
    document.documentElement.addEventListener('pointerleave', function () {
      ring.classList.remove('is-visible');
    });
    window.addEventListener('pointerdown', function () {
      ring.classList.add('is-down');
    });
    window.addEventListener('pointerup', function () {
      ring.classList.remove('is-down');
    });
  }

  return {
    typewriter: typewriter,
    countUp: countUp,
    magnetic: magnetic,
    tilt: tilt,
    scramble: scramble,
    spotlight: spotlight,
    cursor: cursor,
    finePointer: finePointer,
  };
})();
