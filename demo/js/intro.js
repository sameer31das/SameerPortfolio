/* ==========================================================================
   INTRO — terminal boot sequence, shown once per browser session.
   Skip with the button, a click anywhere, Enter, Space or Esc.
   Force it again with ?intro in the URL; disable it with ?nointro.
   ========================================================================== */

window.SD = window.SD || {};

SD.intro = (function () {
  'use strict';

  /* Resolves when the hero should start its entrance (mid-way through the exit). */
  function run(lines, enabled) {
    var root = document.documentElement;
    var el = document.getElementById('intro');

    return new Promise(function (resolve) {
      if (!el) return resolve();

      if (!enabled || !window.gsap || root.classList.contains('no-intro')) {
        el.remove();
        root.classList.remove('is-intro');
        root.classList.add('no-intro');
        return resolve();
      }

      try {
        sessionStorage.setItem('sd-intro-seen', '1');
      } catch (e) {}

      var terminal = el.querySelector('.intro__terminal');
      var body = document.getElementById('intro-body');
      var bar = document.getElementById('intro-progress');
      var skipBtn = document.getElementById('intro-skip');
      var caret = document.createElement('span');
      caret.className = 'intro__caret';
      var timers = [];
      var step = 0;
      var finished = false;

      function later(fn, ms) {
        timers.push(setTimeout(fn, ms));
      }

      function progress(p) {
        gsap.to(bar, { scaleX: p, duration: 0.35, ease: 'power2.out' });
      }

      function addLine(cls) {
        var line = document.createElement('div');
        line.className = 'intro__line' + (cls ? ' ' + cls : '');
        body.appendChild(line);
        return line;
      }

      function typeCommand(text, done) {
        var line = addLine();
        line.innerHTML = '<span class="intro__prompt">➜</span> <span class="intro__path">~</span> ';
        var typed = document.createElement('span');
        line.appendChild(typed);
        line.appendChild(caret);
        var i = 0;
        (function next() {
          if (finished) return;
          i += 1;
          typed.textContent = text.slice(0, i);
          if (i < text.length) later(next, 24 + Math.random() * 28);
          else later(done, 220);
        })();
      }

      function printOutput(item, done) {
        var line = addLine('intro__out' + (item.tone === 'ok' ? ' intro__out--ok' : ''));
        line.textContent = item.out;
        later(done, 160);
      }

      function playNext() {
        if (finished) return;
        if (step >= lines.length) {
          later(finish, 420);
          return;
        }
        var item = lines[step];
        step += 1;
        progress(step / lines.length);
        if (item.cmd) typeCommand(item.cmd, playNext);
        else printOutput(item, playNext);
      }

      function onKey(e) {
        if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') {
          e.preventDefault();
          finish();
        }
      }

      function finish() {
        if (finished) return;
        finished = true;
        timers.forEach(clearTimeout);
        document.removeEventListener('keydown', onKey);
        el.removeEventListener('click', finish);
        progress(1);

        gsap
          .timeline({
            onComplete: function () {
              el.remove();
            },
          })
          .to(terminal, { scale: 0.96, opacity: 0, duration: 0.45, ease: 'power2.in' }, 0)
          .to(skipBtn, { opacity: 0, duration: 0.3 }, 0)
          .to(el, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.95, ease: 'expo.inOut' }, 0.28)
          .add(function () {
            root.classList.remove('is-intro');
            resolve();
          }, 0.62);
      }

      document.addEventListener('keydown', onKey);
      el.addEventListener('click', finish);
      gsap.set(el, { clipPath: 'inset(0% 0% 0% 0%)' });
      gsap.fromTo(terminal, { y: 18, opacity: 0, scale: 0.98 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'expo.out' });
      later(playNext, 380);
    });
  }

  return { run: run };
})();
