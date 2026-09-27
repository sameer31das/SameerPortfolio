/* ==========================================================================
   PARTICLES — the connected-node network behind the hero.
   Nodes drift, link up when close, and reach toward the pointer.
   Pauses when off-screen or the tab is hidden; static when motion is reduced.
   ========================================================================== */

window.SD = window.SD || {};

SD.particles = (function () {
  'use strict';

  var LINK_DIST = 132;
  var POINTER_DIST = 190;
  var MAX_NODES = 95;

  function init(canvas, opts) {
    var o = Object.assign({ still: false }, opts);
    var ctx = canvas.getContext('2d');
    var area = canvas.parentElement;
    var nodes = [];
    var w = 0;
    var h = 0;
    var raf = null;
    var onScreen = true;
    var pointer = { x: 0, y: 0, active: false };
    var colors = readColors();

    function readColors() {
      var cs = getComputedStyle(document.documentElement);
      return {
        base: cs.getPropertyValue('--particle').trim() || '148, 178, 255',
        accent: cs.getPropertyValue('--particle-accent').trim() || '34, 211, 238',
      };
    }

    function makeNode() {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        r: Math.random() * 1.5 + 0.7,
        hot: Math.random() < 0.16,
      };
    }

    function resize() {
      var rect = area.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      var target = Math.min(MAX_NODES, Math.floor((w * h) / 14500));
      while (nodes.length < target) nodes.push(makeNode());
      nodes.length = target;
      nodes.forEach(function (n) {
        n.x = Math.min(n.x, w);
        n.y = Math.min(n.y, h);
      });
      if (o.still) draw();
    }

    function update() {
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        if (pointer.active) {
          var dx = n.x - pointer.x;
          var dy = n.y - pointer.y;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110 && d > 0.1) {
            var push = (1 - d / 110) * 1.1;
            n.x += (dx / d) * push;
            n.y += (dy / d) * push;
          }
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;

      for (var i = 0; i < nodes.length; i++) {
        var a = nodes[i];
        for (var j = i + 1; j < nodes.length; j++) {
          var b = nodes[j];
          var dx = a.x - b.x;
          var dy = a.y - b.y;
          var d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST * LINK_DIST) {
            var alpha = (1 - Math.sqrt(d2) / LINK_DIST) * 0.28;
            ctx.strokeStyle = 'rgba(' + colors.base + ',' + alpha.toFixed(3) + ')';
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      if (pointer.active) {
        for (var k = 0; k < nodes.length; k++) {
          var n = nodes[k];
          var px = n.x - pointer.x;
          var py = n.y - pointer.y;
          var pd = Math.sqrt(px * px + py * py);
          if (pd < POINTER_DIST) {
            ctx.strokeStyle = 'rgba(' + colors.accent + ',' + ((1 - pd / POINTER_DIST) * 0.55).toFixed(3) + ')';
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
        }
      }

      for (var m = 0; m < nodes.length; m++) {
        var p = nodes[m];
        ctx.fillStyle = p.hot ? 'rgba(' + colors.accent + ',0.9)' : 'rgba(' + colors.base + ',0.55)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.hot ? p.r + 0.6 : p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function loop() {
      update();
      draw();
      raf = requestAnimationFrame(loop);
    }

    function start() {
      if (o.still || raf !== null || !onScreen || document.hidden) return;
      raf = requestAnimationFrame(loop);
    }

    function stop() {
      if (raf !== null) cancelAnimationFrame(raf);
      raf = null;
    }

    var resizeQueued = false;
    new ResizeObserver(function () {
      if (resizeQueued) return;
      resizeQueued = true;
      requestAnimationFrame(function () {
        resizeQueued = false;
        resize();
      });
    }).observe(area);

    new IntersectionObserver(function (entries) {
      onScreen = entries[0].isIntersecting;
      onScreen ? start() : stop();
    }).observe(canvas);

    document.addEventListener('visibilitychange', function () {
      document.hidden ? stop() : start();
    });

    if (!o.still) {
      area.addEventListener('pointermove', function (e) {
        var r = canvas.getBoundingClientRect();
        pointer.x = e.clientX - r.left;
        pointer.y = e.clientY - r.top;
        pointer.active = true;
      });
      area.addEventListener('pointerleave', function () {
        pointer.active = false;
      });
    }

    document.addEventListener('sd:themechange', function () {
      colors = readColors();
      if (o.still) draw();
    });

    resize();
    start();
  }

  return { init: init };
})();
