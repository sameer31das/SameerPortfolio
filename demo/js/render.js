/* ==========================================================================
   RENDER — turns window.PORTFOLIO (data.js) into HTML.
   One function per section; later phases add theirs here.
   ========================================================================== */

window.SD = window.SD || {};

SD.render = (function () {
  'use strict';

  var $ = function (sel, ctx) {
    return (ctx || document).querySelector(sel);
  };

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function span(cls, text) {
    return '<span class="' + cls + '">' + esc(text) + '</span>';
  }

  /* Wraps each word so it can slide up from behind a mask. */
  function splitWords(text, lastClass) {
    var words = text.trim().split(/\s+/);
    return words
      .map(function (w, i) {
        var extra = i === words.length - 1 && lastClass ? ' ' + lastClass : '';
        return '<span class="word"><span class="word__inner' + extra + '">' + esc(w) + '</span></span>';
      })
      .join(' ');
  }

  /* One syntax-highlighted line per field of the hero code object. */
  function codeLines(code) {
    var lines = [];
    lines.push(span('s-com', '// ' + code.comment));
    lines.push(
      span('s-kw', 'const ') + esc(code.variable) + span('s-punc', ': ') + span('s-type', code.type) + span('s-punc', ' = {')
    );
    code.fields.forEach(function (field) {
      var key = field[0];
      var val = field[1];
      var valHtml = Array.isArray(val)
        ? span('s-punc', '[') +
          val
            .map(function (v) {
              return span('s-str', "'" + v + "'");
            })
            .join(span('s-punc', ', ')) +
          span('s-punc', ']')
        : span('s-str', "'" + val + "'");
      lines.push('  ' + span('s-prop', key) + span('s-punc', ': ') + valHtml + span('s-punc', ','));
    });
    lines.push(span('s-punc', '};'));
    lines.push('');
    lines.push(span('s-kw', 'export default ') + esc(code.variable) + span('s-punc', ';'));

    return lines
      .map(function (html, i) {
        return '<span class="ln"><span class="ln__no">' + (i + 1) + '</span><span class="ln__code">' + html + '</span></span>';
      })
      .join('');
  }

  function hero(D) {
    var p = D.profile;

    $('#nav-initials').textContent = p.initials;
    $('#hero-status').textContent = p.status;
    $('#hero-name').innerHTML = splitWords(p.name, 'text-grad');
    $('#hero-typed').textContent = p.roles[0];
    $('#hero-roles-sr').textContent = p.roles.join(', ');
    $('#hero-tagline').textContent = p.tagline;

    ['#hero-resume', '#nav-resume'].forEach(function (sel) {
      var a = $(sel);
      a.href = p.resume;
      a.setAttribute('download', p.resumeFileName);
    });
    $('#hero-contact').href = 'mailto:' + p.email;

    $('#hero-stats').innerHTML = D.stats
      .map(function (s) {
        return (
          '<li class="stat">' +
          '<span class="stat__value"><span data-count="' + s.value + '">' + s.value + '</span>' +
          (s.suffix ? '<span class="stat__suffix">' + esc(s.suffix) + '</span>' : '') +
          '</span>' +
          '<span class="stat__label">' + esc(s.label) + '</span>' +
          '</li>'
        );
      })
      .join('');

    $('#hero-code').innerHTML = codeLines(D.hero.code);

    $('#hero-stage').insertAdjacentHTML(
      'beforeend',
      D.hero.badges
        .map(function (b) {
          return (
            '<span class="badge"><span class="badge__inner">' +
            '<span class="badge__icon" style="--c:' + esc(b.color) + '">' + esc(b.short) + '</span>' +
            esc(b.label) +
            '</span></span>'
          );
        })
        .join('')
    );
  }

  /* ---------- Shared bits for Phase 2 sections ---------- */

  var ICONS = {
    spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />',
    plug: '<path d="M9 7V3M15 7V3M6 7h12v4a6 6 0 0 1-12 0V7ZM12 17v4" />',
    spec: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" /><path d="M14 3v5h5M9 14l2 2 4-4" />',
    git: '<circle cx="6" cy="6" r="2.5" /><circle cx="6" cy="18" r="2.5" /><circle cx="18" cy="8" r="2.5" /><path d="M6 8.5v7M18 10.5c0 4-6 3-10.3 6" />',
    check: '<circle cx="12" cy="12" r="9" /><path d="m8 12.5 2.8 2.8L16.5 9.5" />',
    arrow: '<path d="M7 17 17 7M8 7h9v9" />',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2.5" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />',
    download: '<path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19.5h14" />',
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" />',
    user: '<circle cx="12" cy="8" r="4" /><path d="M4 21c1.2-4 4.3-6 8-6s6.8 2 8 6" />',
  };

  function icon(name) {
    return (
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      ICONS[name] +
      '</svg>'
    );
  }

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function chips(items, cls) {
    return (
      '<ul class="chips' + (cls ? ' ' + cls : '') + '" role="list">' +
      items
        .map(function (s) {
          return '<li class="chip">' + esc(s) + '</li>';
        })
        .join('') +
      '</ul>'
    );
  }

  /* Masked words like splitWords, with the `highlight` phrase in gradient. */
  function splitTitle(title, highlight) {
    var words = title.trim().split(/\s+/);
    var hi = highlight ? highlight.trim().split(/\s+/) : [];
    var from = -1;
    for (var i = 0; hi.length && i <= words.length - hi.length; i++) {
      if (words.slice(i, i + hi.length).join(' ') === hi.join(' ')) from = i;
    }
    return words
      .map(function (w, i) {
        var grad = from >= 0 && i >= from && i < from + hi.length ? ' text-grad' : '';
        return '<span class="word"><span class="word__inner' + grad + '">' + esc(w) + '</span></span>';
      })
      .join(' ');
  }

  /* Numbered eyebrow + title (+ lead) for every section with data-section-head. */
  function sectionHeads(D) {
    var sections = document.querySelectorAll('main section[data-nav]');
    Array.prototype.forEach.call(sections, function (section, i) {
      var head = section.querySelector('[data-section-head]');
      if (!head) return;
      var key = head.getAttribute('data-section-head');
      var s = D.sections[key];
      var id = key + '-title';
      section.setAttribute('aria-labelledby', id);
      head.classList.add('section-head');
      head.innerHTML =
        '<p class="eyebrow"><span class="eyebrow__num">' + pad(i + 1) + '</span>' +
        '<span class="eyebrow__text" aria-hidden="true">' + esc(s.eyebrow) + '</span>' +
        '<span class="sr-only">' + esc(s.eyebrow) + '</span></p>' +
        '<h2 class="section-title" id="' + id + '">' + splitTitle(s.title, s.highlight) + '</h2>' +
        (s.lead ? '<p class="section-lead">' + esc(s.lead) + '</p>' : '');
    });
  }

  function about(D) {
    var p = D.profile;
    var frame = p.photo
      ? '<img class="portrait__img" src="' + esc(p.photo) + '" alt="Portrait of ' + esc(p.name) + '" loading="lazy" />'
      : '<div class="portrait__mono" role="img" aria-label="' + esc(p.name) + '">' +
        '<span class="portrait__initials">' + esc(p.initials) + '</span>' +
        '<span class="portrait__note">photo coming soon</span></div>';

    $('#about-portrait').innerHTML =
      '<div class="portrait__frame">' + frame + '</div>' +
      '<span class="float-tag float-tag--a"><span class="pill__dot" aria-hidden="true"></span>' + esc(p.location) + '</span>' +
      '<span class="float-tag float-tag--b"><span><b>12+</b> years shipping</span></span>';

    $('#about-summary').innerHTML = D.summary
      .split(/\s+/)
      .map(function (w) {
        return '<span class="sw">' + esc(w) + '</span>';
      })
      .join(' ');

    $('#about-facts').innerHTML = D.about.facts
      .map(function (f) {
        return '<div class="fact"><dt>' + esc(f.label) + '</dt><dd>' + esc(f.value) + '</dd></div>';
      })
      .join('');
  }

  function year(s) {
    var m = String(s).match(/\d{4}/);
    return m ? m[0] : s;
  }

  function journey(D) {
    var items = D.experience;
    var last = items.length - 1;

    $('#timeline').innerHTML =
      '<div class="timeline__rail" aria-hidden="true"><span class="timeline__fill"></span></div>' +
      '<ol class="tl-list" role="list">' +
      items
        .map(function (x, i) {
          return (
            '<li class="tl-item' + (x.milestone ? ' tl-item--milestone' : '') + '">' +
            '<span class="tl-item__node" aria-hidden="true"></span>' +
            '<div class="tl-item__year" aria-hidden="true">' +
            '<span class="tl-item__start">' + esc(year(x.start)) + '</span>' +
            '<span class="tl-item__end">→ ' + esc(x.end === 'Present' ? 'now' : year(x.end) === year(x.start) ? x.end : year(x.end)) + '</span></div>' +
            '<article class="tl-card spotlight">' +
            '<div class="tl-card__head"><span class="tag">' + esc(x.version) + '</span>' +
            (i === last ? '<span class="tag tag--head">HEAD → main</span>' : '') +
            '<span class="tl-card__date">' + esc(x.start) + ' – ' + esc(x.end) + '</span></div>' +
            '<h3 class="tl-card__role">' + esc(x.role) + '</h3>' +
            '<p class="tl-card__company">' + esc(x.company) + '</p>' +
            '<ul class="tl-card__list" role="list">' +
            x.bullets
              .map(function (b) {
                return '<li>' + esc(b) + '</li>';
              })
              .join('') +
            '</ul></article></li>'
          );
        })
        .join('') +
      '</ol>';
  }

  function skills(D) {
    var c = D.competencies;
    var half = Math.ceil(c.length / 2);

    $('#skills-marquee').innerHTML =
      [c.slice(0, half), c.slice(half)]
        .map(function (row, r) {
          var items = row
            .map(function (s) {
              return '<span class="marquee__item">' + esc(s) + '</span>';
            })
            .join('');
          // Content is doubled so the loop is seamless
          return (
            '<div class="marquee' + (r ? ' marquee--reverse' : '') + '" aria-hidden="true">' +
            '<div class="marquee__track">' + items + items + '</div></div>'
          );
        })
        .join('') +
      '<ul class="sr-only">' +
      c
        .map(function (s) {
          return '<li>' + esc(s) + '</li>';
        })
        .join('') +
      '</ul>';

    $('#skills-grid').innerHTML = D.skills
      .map(function (g, i) {
        return (
          '<li class="skill-card spotlight' + (i === 0 ? ' skill-card--primary' : '') + '" data-reveal>' +
          '<div class="skill-card__head"><span>skills.' + esc(g.group.toLowerCase()) + '[]</span>' +
          '<span>' + pad(g.items.length) + '</span></div>' +
          '<h3 class="skill-card__title">' + esc(g.group) + '</h3>' +
          chips(g.items) +
          '</li>'
        );
      })
      .join('');
  }

  function ai(D) {
    var flow =
      '<article class="ai-flow" data-reveal>' +
      '<p class="ai-flow__label"><span class="window-dots" aria-hidden="true"><span></span><span></span><span></span></span>~/workflow — how I ship with AI</p>' +
      '<ol class="flow" role="list">' +
      D.aiPipeline
        .map(function (s, i) {
          return (
            '<li class="flow__step" style="--i:' + i + '">' +
            '<span class="flow__dot" aria-hidden="true">' + (i + 1) + '</span>' +
            '<span class="flow__text"><span class="flow__name">' + esc(s.name) + '</span>' +
            '<span class="flow__hint">' + esc(s.hint) + '</span></span></li>'
          );
        })
        .join('') +
      '</ol></article>';

    var cards = D.aiPractices
      .map(function (x, i) {
        return (
          '<article class="ai-card spotlight" data-reveal>' +
          '<span class="ai-card__num" aria-hidden="true">' + pad(i + 1) + '</span>' +
          '<span class="ai-card__icon">' + icon(x.icon) + '</span>' +
          '<h3 class="ai-card__title">' + esc(x.title) + '</h3>' +
          '<p class="ai-card__text">' + esc(x.text) + '</p>' +
          '</article>'
        );
      })
      .join('');

    $('#ai-track').innerHTML = flow + cards;
  }

  function projects(D) {
    var labels = D.projectDomains;
    var counts = {};
    D.projects.forEach(function (p) {
      counts[p.domain] = (counts[p.domain] || 0) + 1;
    });

    var filters = [{ key: 'all', label: 'All', n: D.projects.length }].concat(
      Object.keys(labels)
        .filter(function (k) {
          return counts[k];
        })
        .map(function (k) {
          return { key: k, label: labels[k], n: counts[k] };
        })
    );

    $('#project-filters').innerHTML = filters
      .map(function (f, i) {
        return (
          '<button class="filter' + (i ? '' : ' is-active') + '" type="button" data-filter="' + esc(f.key) + '" aria-pressed="' + (i ? 'false' : 'true') + '">' +
          esc(f.label) + '<span class="filter__n">' + f.n + '</span></button>'
        );
      })
      .join('');

    $('#projects-grid').innerHTML = D.projects
      .map(function (p, i) {
        var meta = '<div><dt>Role</dt><dd>' + esc(p.role) + '</dd></div>';
        if (p.teamSize) meta += '<div><dt>Team</dt><dd>' + p.teamSize + ' people</dd></div>';
        return (
          '<li class="project" data-domain="' + esc(p.domain) + '" data-reveal>' +
          '<article class="project__card spotlight">' +
          '<div class="project__top"><span class="project__num">' + pad(i + 1) + '</span>' +
          '<span class="project__domain">' + esc(labels[p.domain] || p.domain) + '</span></div>' +
          '<p class="project__client">' + esc(p.client) + '</p>' +
          '<h3 class="project__name">' + esc(p.name) + '</h3>' +
          '<p class="project__desc">' + esc(p.description) + '</p>' +
          '<dl class="project__meta">' + meta + '</dl>' +
          chips(p.stack, 'chips--sm') +
          '</article></li>'
        );
      })
      .join('');
  }

  function credentials(D) {
    $('#certs').innerHTML = D.certifications
      .map(function (c) {
        return (
          '<li class="cert">' +
          '<span class="cert__seal" aria-hidden="true"></span>' +
          '<span class="cert__code">' + esc(c.code) + '</span>' +
          '<span class="cert__name">' + esc(c.name) + '</span>' +
          '<span class="cert__issuer">' + esc(c.issuer) + '</span>' +
          '</li>'
        );
      })
      .join('');

    $('#edu').innerHTML = D.education
      .map(function (e) {
        return (
          '<li class="edu__item"><span class="edu__year">' + esc(e.year) + '</span>' +
          '<span><span class="edu__degree">' + esc(e.degree) + '</span>' +
          '<span class="edu__school">' + esc(e.school) + '</span></span></li>'
        );
      })
      .join('');

    $('#wins').innerHTML = D.accomplishments
      .map(function (a) {
        return '<li class="wins__item">' + icon('check') + '<span>' + esc(a) + '</span></li>';
      })
      .join('');
  }

  function contact(D) {
    var p = D.profile;

    $('#contact-mail').innerHTML =
      '<a class="mail-link" href="mailto:' + esc(p.email) + '"><span class="mail-link__text">' + esc(p.email) + '</span>' + icon('arrow') + '</a>' +
      '<button class="btn btn--ghost btn--sm copy-btn" id="copy-email" type="button" data-email="' + esc(p.email) + '">' +
      icon('copy') + '<span class="copy-btn__label">Copy email</span></button>';

    $('#contact-links').innerHTML =
      '<li><a class="btn btn--ghost magnetic" href="' + esc(p.linkedin) + '" target="_blank" rel="noopener noreferrer">' +
      icon('user') + 'LinkedIn</a></li>' +
      '<li><a class="btn btn--primary magnetic" href="' + esc(p.resume) + '" download="' + esc(p.resumeFileName) + '">' +
      icon('download') + 'Download CV</a></li>' +
      '<li><span class="contact__loc">' + icon('pin') + esc(p.location) + '</span></li>';

    $('#footer-name').textContent = p.name;
    $('#footer-year').textContent = new Date().getFullYear();
  }

  return {
    esc: esc,
    splitWords: splitWords,
    hero: hero,
    sectionHeads: sectionHeads,
    about: about,
    journey: journey,
    skills: skills,
    ai: ai,
    projects: projects,
    credentials: credentials,
    contact: contact,
  };
})();
