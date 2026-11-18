/* ==========================================================================
   Birthday page — behaviour. Content comes from content.js (CONTENT).
   ========================================================================== */
(() => {
  const C = CONTENT; // defined in content.js
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const get = (path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), C);
  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isVideo = (src) => /\.(mp4|webm|mov)$/i.test(src);
  const PALETTE = ['#FF5C8D', '#FFCF5C', '#86D7B8', '#B9A2FF', '#FFA584', '#FF93B5'];

  document.title = C.pageTitle || document.title;

  /* ---------- plain text slots ---------- */
  $$('[data-c]').forEach((n) => { const v = get(n.dataset.c); if (v != null) n.textContent = v; });

  /* ---------- wobbly title letters ---------- */
  $$('[data-wobble]').forEach((n) => {
    const txt = get(n.dataset.wobble) || '';
    n.innerHTML = [...txt].map((ch, i) => `<span style="--i:${i}">${ch === ' ' ? '&nbsp;' : esc(ch)}</span>`).join('');
  });

  /* ---------- lightbox ---------- */
  const lb = $('#lightbox');
  function openLightbox(src, caption) {
    const media = isVideo(src)
      ? `<video src="${esc(src)}" controls autoplay playsinline></video>`
      : `<img src="${esc(src)}" alt="">`;
    $('.lb-inner', lb).innerHTML = `${media}<p>${esc(caption || '')}</p>`;
    lb.hidden = false;
  }
  function closeLightbox() { lb.hidden = true; $('.lb-inner', lb).innerHTML = ''; }
  lb.addEventListener('click', (e) => { if (e.target === lb || e.target.closest('[data-close]')) closeLightbox(); });

  function polaroid({ src, caption, type }) {
    const fig = el('figure', 'polaroid');
    const vid = type === 'video' || isVideo(src);
    fig.innerHTML = `<span class="tape"></span>${vid
      ? `<video src="${esc(src)}" muted loop autoplay playsinline preload="metadata"></video><span class="play-badge">▶ video</span>`
      : `<img src="${esc(src)}" alt="${esc(caption || '')}">`}${caption ? `<figcaption>${esc(caption)}</figcaption>` : ''}`;
    fig.addEventListener('click', () => openLightbox(src, caption));
    const img = $('img', fig);
    if (img) img.addEventListener('load', () => { if (img.naturalWidth > img.naturalHeight * 1.15) fig.classList.add('wide'); });
    return fig;
  }

  /* ---------- HERO ---------- */
  const stack = $('#hero-stack');
  (C.hero.photos || []).forEach((p) => stack.appendChild(polaroid(p)));
  stack.appendChild(el('div', 'sticker', "it's<br>your<br>day!"));

  const balloons = $('.balloons');
  [[4, 12, '#FF93B5'], [36, 84, '#FFCF5C'], [46, 6, '#B9A2FF'], [88, 8, '#86D7B8'], [93, 58, '#FFA584'], [58, 88, '#FFC4D7']].forEach(([x, y, c], i) => {
    const b = el('span', 'balloon');
    b.style.cssText = `left:${x}%;top:${y}%;--c:${c};--d:${6 + i}s;--delay:-${i * 1.3}s;transform:scale(${0.7 + (i % 3) * 0.2})`;
    balloons.appendChild(b);
  });

  const rising = $('.rising-hearts');
  function riseHeart() {
    const h = el('span', 'rise', pick(['♥', '♡', '❤', '♥']));
    h.style.cssText = `left:${rand(0, 100)}%;font-size:${rand(12, 30)}px;--dx:${rand(-80, 80)}px;--rot:${rand(-90, 90)}deg;animation-duration:${rand(8, 14)}s;color:${pick(['#FFC4D7', '#FF93B5', '#FFDCCD', '#ECE4FF'])}`;
    rising.appendChild(h);
    setTimeout(() => h.remove(), 15000);
  }
  if (!reduced) { for (let i = 0; i < 6; i++) setTimeout(riseHeart, i * 500); setInterval(riseHeart, 900); }

  /* ---------- No.1 ABOUT ---------- */
  $('#about-photo').src = C.about.photo;
  $('#file-no').textContent = String(Math.floor(Math.random() * 900) + 100);
  $('#about-fields').innerHTML = (C.about.fields || []).map((f) => `<dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd>`).join('');
  $('#about-titles').innerHTML = (C.about.titles || []).map((t) => `<li>${esc(t.emoji)} ${esc(t.label)}</li>`).join('');
  const since = new Date((C.togetherSince || '') + 'T00:00:00');
  const days = isNaN(since) ? 0 : Math.max(0, Math.floor((Date.now() - since) / 864e5));
  function countUp(node, to) {
    if (reduced) { node.textContent = to.toLocaleString(); return; }
    const t0 = performance.now(), dur = 1800;
    const step = (t) => { const p = Math.min(1, (t - t0) / dur); node.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))).toLocaleString(); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }

  /* ---------- No.2 SCRAPBOOK ---------- */
  const grid = $('#scrapbook-grid');
  (C.scrapbook.items || []).forEach((p) => grid.appendChild(polaroid(p)));
  const fav = $('#favourite');
  if (C.scrapbook.favourite) {
    $('img', fav).src = C.scrapbook.favourite.src;
    $('figcaption', fav).textContent = C.scrapbook.favourite.caption || '';
    fav.addEventListener('click', () => openLightbox(C.scrapbook.favourite.src, C.scrapbook.favourite.caption));
  } else fav.remove();
  /* ---------- photo reels ---------- */
  const REEL_SPEED = 55; // pixels per second — lower = slower
  const thumbOf = (src) => src.replace(/^photos\//, 'photos/thumbs/');
  (C.reels || []).forEach((reel, ri) => {
    const photos = reel.photos || [];
    if (!photos.length) return;
    const wrap = el('div', 'reel');
    wrap.innerHTML = `<p class="film-label">${esc(reel.label || '')}</p>`;
    const strip = el('div', `filmstrip film-${reel.style === 'pink' ? 'pink' : 'dark'}${reel.direction === 'right' ? ' reverse' : ''}`);
    strip.style.setProperty('--tilt', `${ri % 2 ? 1.2 : -1.5}deg`);
    const track = el('div', 'film-track');
    const loads = [];
    [...photos, ...photos].forEach((src) => { // doubled for a seamless loop
      const i = el('img'); i.alt = ''; i.decoding = 'async';
      loads.push(new Promise((res) => { i.onload = res; i.onerror = () => { if (i.src.includes('/thumbs/')) i.src = src; else res(); }; }));
      i.src = thumbOf(src);
      i.addEventListener('click', () => openLightbox(src, ''));
      track.appendChild(i);
    });
    strip.appendChild(track);
    wrap.appendChild(strip);
    $('#reels').appendChild(wrap);
    // constant speed no matter how many photos: start once widths are known
    Promise.all(loads).then(() => {
      track.style.animationDuration = `${Math.max(20, track.scrollWidth / 2 / REEL_SPEED)}s`;
      track.classList.add('ready');
    });
  });

  /* ---------- No.3 CAKE ---------- */
  const side = $('#cake-side');
  if (C.cake.sidePhoto) {
    $('img', side).src = C.cake.sidePhoto.src;
    $('figcaption', side).textContent = C.cake.sidePhoto.caption || '';
    side.addEventListener('click', () => openLightbox(C.cake.sidePhoto.src, C.cake.sidePhoto.caption));
  } else side.remove();

  const sprinkles = $('.sprinkles');
  for (let i = 0; i < 26; i++) {
    const s = el('span');
    s.style.cssText = `left:${rand(4, 95)}%;top:${rand(42, 86)}%;background:${pick(PALETTE)};transform:rotate(${rand(0, 180)}deg)`;
    sprinkles.appendChild(s);
  }
  const candlesEl = $('#candles'), countEl = $('#candle-count'), wish = $('#wish'), cakeEl = $('#cake-el');
  const nCandles = Math.min(12, Math.max(1, C.cake.candles || 5));
  function renderCount() {
    const left = $$('.candle:not(.out)', candlesEl).length;
    countEl.textContent = left ? `${left} ${C.cake.leftText}` : '🎉';
    return left;
  }
  function lightCandles() {
    candlesEl.innerHTML = '';
    for (let i = 0; i < nCandles; i++) {
      const c = el('button', 'candle');
      c.setAttribute('aria-label', 'Blow out candle');
      c.style.setProperty('--c', PALETTE[i % PALETTE.length]);
      c.style.height = `${[70, 82, 64, 78, 72][i % 5]}px`;
      c.appendChild(el('span', 'flame'));
      c.addEventListener('click', (e) => {
        e.stopPropagation();
        if (c.classList.contains('out')) return;
        c.classList.add('out');
        const sm = el('span', 'smoke'); sm.style.setProperty('--sx', `${rand(-14, 14)}px`); c.appendChild(sm);
        setTimeout(() => sm.remove(), 1500);
        if (renderCount() === 0) {
          cakeEl.classList.remove('bounce'); void cakeEl.offsetWidth; cakeEl.classList.add('bounce');
          setTimeout(() => { wish.hidden = false; confetti(160); }, 450);
        }
      });
      candlesEl.appendChild(c);
    }
    wish.hidden = true;
    renderCount();
  }
  lightCandles();
  $('#relight').addEventListener('click', (e) => { e.stopPropagation(); lightCandles(); });

  /* ---------- No.4 STICKY NOTES ---------- */
  const board = $('#notes-board');
  const tilts = [-4, 3, -2, 5, -5, 2, -3, 4];
  (C.notes.items || []).forEach((n, i) => {
    const s = el('div', `sticky n-${n.color || 'yellow'}`);
    s.textContent = n.text;
    s.style.setProperty('--r', `${tilts[i % tilts.length]}deg`);
    s.tabIndex = 0;
    s.addEventListener('click', (e) => { e.stopPropagation(); const on = !s.classList.contains('zoom'); $$('.sticky.zoom').forEach((x) => x.classList.remove('zoom')); s.classList.toggle('zoom', on); });
    board.appendChild(s);
  });
  document.addEventListener('click', () => $$('.sticky.zoom').forEach((x) => x.classList.remove('zoom')));

  /* ---------- No.5 LETTER ---------- */
  const L = C.letter;
  $('.peek-greeting').textContent = L.greeting;
  $('.peek-text').textContent = (L.paragraphs || []).find((p) => typeof p === 'string') || '';
  $('.l-greeting').textContent = L.greeting;
  let photoNo = 0;
  const letterPhoto = (p) => {
    const tilt = [-3, 2.5, -1.5, 3.5][photoNo++ % 4];
    return `<figure class="l-photo" style="--t:${tilt}deg" data-src="${esc(p.photo)}" data-cap="${esc(p.caption || '')}">
      <span class="tape"></span><img src="${esc(p.photo)}" alt="${esc(p.caption || '')}">
      ${p.caption ? `<figcaption>${esc(p.caption)}</figcaption>` : ''}</figure>`;
  };
  $('.l-body').innerHTML =
    (L.paragraphs || []).map((p) => {
      if (typeof p === 'string') return `<p>${esc(p)}</p>`;
      if (p && p.photos) return `<div class="l-photo-row">${p.photos.map(letterPhoto).join('<span class="l-arrow" aria-hidden="true">→</span>')}</div>`;
      if (p && p.photo) return letterPhoto(p);
      return '';
    }).join('') +
    (L.list && L.list.length ? `<p>${esc(L.listIntro || '')}</p><ul>${L.list.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : '');
  $('.l-signoff').textContent = L.signoff;
  $('.l-name').textContent = L.signName || ('— ' + C.fromName);
  $('.l-ps').textContent = L.ps || '';
  // tap a photo inside the letter to see it big
  $('.l-body').addEventListener('click', (e) => {
    const f = e.target.closest('.l-photo');
    if (f) { e.stopPropagation(); openLightbox(f.dataset.src, f.dataset.cap); }
  });

  const env = $('#envelope'), peek = $('#letter-peek'), modal = $('#letter-modal'), paper = $('.letter-paper');
  function openEnvelope() {
    if (env.classList.contains('open')) return;
    env.classList.add('open');
    env.setAttribute('aria-label', 'Letter opened');
    peek.tabIndex = 0;
    setTimeout(() => burstHearts(env.getBoundingClientRect(), 14), 600);
  }
  function openLetter() {
    const from = peek.getBoundingClientRect();
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    const to = paper.getBoundingClientRect();
    if (!reduced && paper.animate) {
      // "enlarge" the little letter into the full one (FLIP)
      const dx = from.left + from.width / 2 - (to.left + to.width / 2);
      const dy = from.top + from.height / 2 - (to.top + to.height / 2);
      const s = from.width / to.width;
      paper.animate([
        { transform: `translate(${dx}px, ${dy}px) scale(${s}) rotate(-2deg)`, opacity: .6 },
        { transform: 'translate(0,0) scale(1.02) rotate(.5deg)', opacity: 1, offset: .75 },
        { transform: 'none', opacity: 1 },
      ], { duration: 750, easing: 'cubic-bezier(.2,.8,.2,1)' });
      modal.animate([{ backgroundColor: 'rgba(74,43,69,0)' }, { backgroundColor: 'rgba(74,43,69,.45)' }], { duration: 500 });
    }
    $('.close-x', paper).focus({ preventScroll: true });
  }
  function closeLetter() {
    if (modal.hidden) return;
    const done = () => { modal.hidden = true; document.body.style.overflow = ''; peek.focus({ preventScroll: true }); };
    if (reduced || !paper.animate) return done();
    paper.animate([{ transform: 'none', opacity: 1 }, { transform: 'translateY(40px) scale(.85) rotate(-3deg)', opacity: 0 }], { duration: 300, easing: 'ease-in' }).onfinish = done;
  }
  env.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!env.classList.contains('open')) openEnvelope();
    else if (e.target.closest('#letter-peek')) openLetter();
  });
  env.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); env.classList.contains('open') ? openLetter() : openEnvelope(); } });
  modal.addEventListener('click', (e) => { e.stopPropagation(); if (e.target === modal || e.target.closest('[data-close]')) closeLetter(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeLetter(); closeLightbox(); } });

  /* ---------- watercolor hearts background (No.5) ---------- */
  const HEART_D = 'M50 88 C 22 66, 3 48, 4 27 C 5 11, 18 2, 31 3 C 41 4, 47 10, 50 18 C 53 10, 60 3, 70 3 C 84 3, 96 13, 96 29 C 96 50, 76 67, 50 88 Z';
  $('svg defs').insertAdjacentHTML('beforeend', `<clipPath id="heart-clip"><path d="${HEART_D}"/></clipPath>`);
  const wc = $('#wc-hearts'), letterSec = $('#letter');
  let wcHearts = [], wcTimers = [], lastW = 0;

  function heartSVG() {
    const g = pick(['wc-g1', 'wc-g2', 'wc-g3']);
    // a darker pigment pool + a pale "water bloom" inside each heart, clipped to its shape
    const bx = rand(20, 75), by = rand(20, 60);
    return `<svg viewBox="0 0 100 92"><g filter="url(#wc-edge)">
      <path d="${HEART_D}" fill="url(#${g})"/>
      <g clip-path="url(#heart-clip)">
        <ellipse cx="${bx}" cy="${by}" rx="${rand(12, 26)}" ry="${rand(10, 20)}" fill="#E06B90" opacity="${rand(.12, .28).toFixed(2)}"/>
        <ellipse cx="${rand(25, 70)}" cy="${rand(20, 55)}" rx="${rand(8, 16)}" ry="${rand(6, 12)}" fill="#fff" opacity="${rand(.15, .35).toFixed(2)}"/>
      </g>
      <path d="${HEART_D}" fill="none" stroke="#E27396" stroke-width="2.6" opacity="${rand(.25, .45).toFixed(2)}"/>
    </g></svg>`;
  }
  function buildWatercolor() {
    const w = letterSec.offsetWidth, h = letterSec.offsetHeight;
    wc.innerHTML = '';
    wcHearts = [];
    const cell = w < 600 ? 105 : 165;
    const cols = Math.ceil(w / cell), rows = Math.ceil(h / cell);
    let n = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (Math.random() < 0.12) continue; // a few gaps, like hand-painted
        const size = rand(cell * 0.32, cell * 0.58);
        const x = c * cell + (r % 2 ? cell / 2 : 0) + rand(-cell * 0.22, cell * 0.22) - size / 2 + cell / 2;
        const y = r * cell + rand(-cell * 0.2, cell * 0.2) + cell / 2 - size / 2;
        if (x < -size || x > w) continue;
        const d = el('div', 'wch', heartSVG());
        d.style.cssText = `left:${x}px;top:${y}px;--s:${size}px;--r:${rand(-22, 22)}deg;--o:${rand(.6, .92).toFixed(2)};--bd:${(rand(0, 1) * 2.6 + r * 0.12).toFixed(2)}s;--fd:${rand(6, 11).toFixed(1)}s;--fdl:-${rand(0, 10).toFixed(1)}s;--fx:${rand(-10, 10).toFixed(1)}px`;
        wc.appendChild(d);
        wcHearts.push(d);
        n++;
      }
    }
    lastW = w;
  }
  function startWatercolorLife() {
    wcTimers.forEach(clearInterval);
    if (reduced) return;
    // random heartbeats
    wcTimers.push(setInterval(() => {
      const h = pick(wcHearts); if (!h || h.classList.contains('repaint')) return;
      h.classList.add('beat'); setTimeout(() => h.classList.remove('beat'), 1000);
    }, 700));
    // hearts quietly fade and re-paint themselves in a new nearby spot
    wcTimers.push(setInterval(() => {
      const h = pick(wcHearts); if (!h || h.classList.contains('repaint')) return;
      h.classList.remove('beat'); h.classList.add('repaint');
      setTimeout(() => {
        h.style.left = `${parseFloat(h.style.left) + rand(-30, 30)}px`;
        h.style.top = `${parseFloat(h.style.top) + rand(-30, 30)}px`;
        h.style.setProperty('--r', `${rand(-22, 22)}deg`);
      }, 2400);
      setTimeout(() => h.classList.remove('repaint'), 5000);
    }, 1600));
  }
  buildWatercolor();
  let wcStarted = false;
  new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && !wcStarted) {
        wcStarted = true;
        wc.classList.add('in');
        setTimeout(() => { wc.classList.add('settled'); startWatercolorLife(); }, 5200);
      }
    });
  }, { threshold: 0.15 }).observe(letterSec);
  let rT;
  addEventListener('resize', () => {
    clearTimeout(rT);
    rT = setTimeout(() => { if (Math.abs(letterSec.offsetWidth - lastW) > 60) { buildWatercolor(); } }, 250);
  });

  /* ---------- reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      if (e.target.classList.contains('dossier')) countUp($('#days-num'), days);
      io.unobserve(e.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  $$('.reveal').forEach((n) => io.observe(n));

  /* ---------- confetti + heart bursts ---------- */
  function confetti(count = 120) {
    if (reduced) return;
    const box = $('#confetti');
    for (let i = 0; i < count; i++) {
      const p = el('span', 'cf');
      p.style.cssText = `left:${rand(0, 100)}vw;background:${pick(PALETTE)};--dx:${rand(-160, 160)}px;--rot:${rand(-720, 720)}deg;animation-duration:${rand(2.4, 4.6)}s;animation-delay:${rand(0, .6)}s;${Math.random() < .3 ? 'border-radius:50%;width:9px;height:9px;' : ''}`;
      box.appendChild(p);
      setTimeout(() => p.remove(), 5400);
    }
  }
  function burstHearts(rect, n = 8, x, y) {
    if (reduced) return;
    const cx = x ?? rect.left + rect.width / 2, cy = y ?? rect.top + rect.height / 2;
    for (let i = 0; i < n; i++) {
      const h = el('span', 'click-heart', pick(['♥', '♡', '❤']));
      const a = (Math.PI * 2 * i) / n + rand(-.3, .3), dist = rand(40, 110);
      h.style.cssText = `left:${cx}px;top:${cy}px;--dx:${Math.cos(a) * dist}px;--dy:${Math.sin(a) * dist - 30}px;font-size:${rand(12, 26)}px;color:${pick(['#FF5C8D', '#FF93B5', '#FFC4D7'])}`;
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 950);
    }
  }
  document.addEventListener('click', (e) => burstHearts(null, 6, e.clientX, e.clientY));
  /* ---------- phone block + lock screen ---------- */
  const unlocked = (function gates() {
    const PB = C.phoneBlock || {}, LK = C.lock || {};
    const ua = navigator.userAgent || '';
    const shortSide = Math.min(screen.width, screen.height);
    const isPhone = /iPhone|iPod|Windows Phone|Android.+Mobile|Mobi/i.test(ua) ||
      (matchMedia('(pointer: coarse)').matches && shortSide < 600);

    if (PB.enabled && isPhone) {
      $('#phone-emoji').textContent = PB.emoji || '💻';
      $('#phone-title').textContent = PB.title || '';
      $('#phone-text').textContent = PB.text || '';
      $('#phone-gate').hidden = false;
      document.body.classList.add('loading');
      return new Promise(() => {}); // never opens on a phone
    }
    if (!LK.enabled) return Promise.resolve();

    const KEY = 'bday-unlocked-' + (LK.answerDate || '');
    try { if (LK.rememberDevice && localStorage.getItem(KEY) === '1') return Promise.resolve(); } catch (e) {}

    const gate = $('#lock-gate'), form = $('#lock-form'), input = $('#lock-input'), msgEl = $('#lock-msg');
    $('#lock-title').textContent = LK.title || '';
    $('#lock-question').textContent = LK.question || '';
    input.placeholder = LK.placeholder || '';
    $('#lock-btn').textContent = LK.button || 'unlock';
    gate.hidden = false;
    setTimeout(() => input.focus(), 300);

    const [ay, am, ad] = String(LK.answerDate || '').split('-').map(Number);
    const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    function matches(raw) {
      let s = raw.toLowerCase().trim();
      MONTHS.forEach((m, i) => { s = s.replace(new RegExp(m + '[a-z]*', 'g'), ` ${i + 1} `); });
      let nums = s.match(/\d+/g) || [];
      if (nums.length === 1 && /^\d{6,8}$/.test(nums[0])) { // 14092023 / 140923
        const d = nums[0]; nums = [d.slice(0, 2), d.slice(2, 4), d.slice(4)];
      }
      nums = nums.map(Number);
      if (nums.length >= 3 && nums[0] > 31) nums = [nums[2], nums[1], nums[0]]; // 2023-09-14
      if (nums.length >= 2 && nums[0] <= 12 && nums[1] > 12) nums = [nums[1], nums[0], ...nums.slice(2)]; // sep 14 / 09/14
      const [d, m, y] = nums;
      const yearOk = y === undefined || y === ay || y === ay % 100;
      return d === ad && m === am && yearOk;
    }

    return new Promise((resolve) => {
      let tries = 0;
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (matches(input.value)) {
          $('#padlock').classList.add('open');
          msgEl.classList.remove('hint');
          msgEl.textContent = 'yayyy ♡';
          try { if (LK.rememberDevice) localStorage.setItem(KEY, '1'); } catch (err) {}
          burstHearts(form.getBoundingClientRect(), 16);
          setTimeout(() => { gate.classList.add('done'); resolve(); setTimeout(() => gate.remove(), 800); }, 700);
          return;
        }
        tries++;
        const card = form; card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake');
        const wrong = LK.wrongMessages || ['try again'];
        if (LK.hint && tries >= (LK.hintAfter || 2)) {
          msgEl.classList.add('hint');
          msgEl.textContent = `${wrong[(tries - 1) % wrong.length]} · ${LK.hint}`;
        } else {
          msgEl.classList.remove('hint');
          msgEl.textContent = wrong[(tries - 1) % wrong.length];
        }
        input.select();
      });
    });
  })();

  /* ---------- first-load screen: wait for every photo + the fonts ---------- */
  (function loader() {
    const box = $('#loader');
    if (!box) { confetti(90); return; }
    const bar = $('#loader-bar'), pct = $('#loader-pct'), fill = $('#loader-fill'), msg = $('#loader-msg');
    const MIN_TIME = 1600;   // ms — so the loader never just flashes
    const MAX_TIME = 25000;  // ms — never get stuck if a photo is missing
    const t0 = performance.now();

    const tasks = [...document.images].map((img) => img.complete ? Promise.resolve()
      : new Promise((res) => { img.addEventListener('load', res, { once: true }); img.addEventListener('error', () => { if (!img.src.includes('/thumbs/')) res(); }, { once: true }); }));
    $$('video').forEach((v) => tasks.push(new Promise((res) => { if (v.readyState >= 2) res(); v.addEventListener('loadeddata', res, { once: true }); v.addEventListener('error', res, { once: true }); setTimeout(res, 8000); })));
    if (document.fonts && document.fonts.ready) tasks.push(document.fonts.ready);

    let done = 0, shown = 0, finished = false;
    const total = tasks.length || 1;
    tasks.forEach((p) => p.then(() => { done++; }));

    const lines = ['wrapping your present…', 'blowing up balloons…', 'developing our photos…', 'lighting the candles…', 'sealing the letter with a kiss…', 'almost there, birthday star…'];
    let li = 0;
    const msgTimer = setInterval(() => {
      li = (li + 1) % lines.length;
      msg.style.opacity = 0;
      setTimeout(() => { msg.textContent = lines[li]; msg.style.opacity = 1; }, 300);
    }, 1400);

    function paint(p) {
      const v = Math.round(p * 100);
      bar.style.width = v + '%';
      pct.textContent = v;
      box.setAttribute('aria-valuenow', v);
      fill.style.transform = `translateY(${92 - p * 100}px)`; // 92 = empty, -8 = brim-full
    }
    function finish() {
      if (finished) return;
      finished = true;
      clearInterval(msgTimer);
      paint(1);
      msg.textContent = 'ready ♡';
      unlocked.then(() => setTimeout(() => {
        box.classList.add('done');
        document.body.classList.remove('loading');
        window.scrollTo(0, 0);
        setTimeout(() => confetti(110), 250);
        setTimeout(() => box.remove(), 900);
      }, 450));
    }
    // ease the shown progress toward the real progress (feels smoother than jumping)
    (function tick() {
      if (finished) return;
      const elapsed = performance.now() - t0;
      const real = done / total;
      const timeCap = Math.min(1, elapsed / MIN_TIME); // don't race to 100% before MIN_TIME
      shown += (Math.min(real, timeCap) - shown) * 0.12;
      paint(Math.min(shown, 0.99));
      if ((done >= total && elapsed >= MIN_TIME && shown > 0.97) || elapsed > MAX_TIME) return finish();
      requestAnimationFrame(tick);
    })();
  })();

  /* ---------- optional music ---------- */
  if (C.music) {
    const btn = $('#music-btn'), audio = $('#music');
    audio.src = C.music; btn.hidden = false;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (audio.paused) { audio.play(); btn.classList.add('playing'); btn.textContent = '❚❚'; }
      else { audio.pause(); btn.classList.remove('playing'); btn.textContent = '♪'; }
    });
  }
})();
