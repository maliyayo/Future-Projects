/* Infinity Athletic Group: interactions & motion */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const isDesktop = () => window.innerWidth > 960;
  const hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';

  document.body.classList.add('is-loading');
  $$('.menu__links a').forEach((a, i) => a.style.setProperty('--i', i));
  const yearEl = $('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Preloader ---------------- */
  const loader = $('.loader');
  const countEl = $('.loader__count span');
  let pct = 0, loaded = false;
  const finishLoad = () => { loaded = true; };
  window.addEventListener('load', finishLoad);
  setTimeout(finishLoad, 3200); // never block the visitor
  const tick = () => {
    const target = loaded ? 100 : 86;
    pct += (target - pct) * (loaded ? 0.18 : 0.04) + 0.3;
    if (pct > target) pct = target;
    if (countEl) countEl.textContent = Math.round(pct);
    if (pct >= 99.5) return revealSite();
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  function revealSite() {
    if (countEl) countEl.textContent = '100';
    document.body.classList.remove('is-loading');
    if (!hasGSAP || reduce) {
      loader && loader.classList.add('is-done');
      window.dispatchEvent(new Event('iag:ready'));
      return;
    }
    const tl = gsap.timeline({ onComplete: () => loader.classList.add('is-done') });
    tl.to(loader, { clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'expo.inOut' })
      .from('.hero__title .word', { yPercent: 115, rotate: 4, duration: 1.1, ease: 'expo.out', stagger: 0.05 }, '-=0.45')
      .from('.eyebrow', { y: 20, opacity: 0, duration: .7, ease: 'power3.out' }, '<0.1')
      .from('.hero__sub, .hero__ctas, .hero__trust', { y: 30, opacity: 0, duration: .9, ease: 'power3.out', stagger: .08 }, '<0.3')
      .from('.hero__frame', { clipPath: 'inset(100% 0 0 0 round 34px)', duration: 1.3, ease: 'expo.inOut' }, '<-0.5')
      .from('.hero__video', { scale: 1.5, duration: 1.8, ease: 'expo.out' }, '<0.2')
      .from('.hero__orbit, .hero__tag', { scale: 0, opacity: 0, duration: .8, ease: 'back.out(1.8)', stagger: .1 }, '<0.6')
      .add(() => window.dispatchEvent(new Event('iag:ready')), '<-0.6');
    loader.style.clipPath = 'inset(0 0 0 0)';
  }

  /* ---------------- Smooth scroll ---------------- */
  let lenis = null;
  if (!reduce && typeof window.Lenis !== 'undefined') {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 1 });
    if (hasGSAP) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }
  // Anchor links (offset for fixed nav)
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      closeMenu();
      if (lenis) lenis.scrollTo(target, { offset: -84, duration: 1.4 });
      else window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 84, behavior: reduce ? 'auto' : 'smooth' });
    });
  });

  /* ---------------- Nav, menu, progress, dock ---------------- */
  const nav = $('[data-nav]');
  const burger = $('.nav__burger');
  const menu = $('#menu');
  function closeMenu() {
    document.body.classList.remove('menu-open');
    burger && burger.setAttribute('aria-expanded', 'false');
    menu && menu.setAttribute('aria-hidden', 'true');
    lenis && lenis.start();
  }
  burger && burger.addEventListener('click', () => {
    const open = !document.body.classList.contains('menu-open');
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-hidden', String(!open));
    if (lenis) open ? lenis.stop() : lenis.start();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  const bar = $('.progress span');
  const dock = $('.dock');
  const contact = $('#contact');
  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    nav.classList.toggle('is-scrolled', y > 40);
    if (!document.body.classList.contains('menu-open')) nav.classList.toggle('is-hidden', y > lastY && y > 500);
    lastY = y;
    if (dock && contact) {
      const cTop = contact.getBoundingClientRect().top;
      dock.classList.toggle('is-on', y > window.innerHeight * 0.8 && cTop > window.innerHeight * 0.6);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Active nav link
  const links = $$('.nav__links a');
  const sections = links.map((l) => $(l.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          links.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === '#' + en.target.id));
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => io.observe(s));
  }

  /* ---------------- Lazy videos ---------------- */
  const lazyVideos = $$('video[data-lazy-video]');
  const loadVideo = (v) => {
    $$('source[data-src]', v).forEach((s) => { s.src = s.dataset.src; s.removeAttribute('data-src'); });
    v.load();
    const p = v.play(); if (p && p.catch) p.catch(() => {});
  };
  if ('IntersectionObserver' in window) {
    const vio = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        const v = en.target;
        if (en.isIntersecting) {
          if ($('source[data-src]', v)) loadVideo(v); else { const p = v.play(); if (p && p.catch) p.catch(() => {}); }
        } else if (!v.paused) v.pause();
      });
    }, { rootMargin: '300px 0px' });
    lazyVideos.forEach((v) => vio.observe(v));
    const heroVid = $('.hero__video');
    heroVid && vio.observe(heroVid);
  } else lazyVideos.forEach(loadVideo);

  /* ---------------- Custom cursor ---------------- */
  if (finePointer && !reduce) {
    document.body.classList.add('has-cursor');
    const cur = $('.cursor'), dot = $('.cursor__dot'), ring = $('.cursor__ring'), label = $('.cursor__label');
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    window.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px, ${my}px)`; }, { passive: true });
    const loop = () => { rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16; ring.style.transform = `translate(${rx}px, ${ry}px)`; requestAnimationFrame(loop); };
    loop();
    window.addEventListener('mousedown', () => cur.classList.add('is-down'));
    window.addEventListener('mouseup', () => cur.classList.remove('is-down'));
    document.addEventListener('mouseover', (e) => {
      const lab = e.target.closest('[data-cursor]');
      const link = e.target.closest('a, button, label, input, select, textarea');
      if (lab && !link) { cur.classList.add('is-label'); cur.classList.remove('is-link'); label.textContent = lab.dataset.cursor; }
      else { cur.classList.remove('is-label'); cur.classList.toggle('is-link', !!link); }
    });
    document.addEventListener('mouseleave', () => { cur.style.opacity = 0; });
    document.addEventListener('mouseenter', () => { cur.style.opacity = 1; });

    // Magnetic elements
    $$('[data-magnetic]').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });

    // 3D tilt
    $$('[data-tilt]').forEach((el) => {
      const target = el.classList.contains('hero__media') ? $('.hero__frame', el) : el;
      target.style.transition = 'transform .6s cubic-bezier(.2,.8,.2,1)';
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        target.style.transform = `perspective(1000px) rotateY(${(px - 0.5) * 10}deg) rotateX(${(0.5 - py) * 8}deg) scale(1.015)`;
        target.style.setProperty('--mx', `${px * 100}%`);
        target.style.setProperty('--my', `${py * 100}%`);
      });
      el.addEventListener('mouseleave', () => { target.style.transform = ''; });
    });
  }

  /* ---------------- Scrub text (word by word) ---------------- */
  $$('.scrub-text').forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map((w) => `<span class="w">${w}</span>`).join(' ');
  });

  /* ---------------- Drill visualisations go live in view ---------------- */
  if ('IntersectionObserver' in window) {
    const dio = new IntersectionObserver((entries) => entries.forEach((en) => en.target.classList.toggle('is-live', en.isIntersecting)), { threshold: 0.4 });
    $$('.drill').forEach((d) => dio.observe(d));
  } else $$('.drill').forEach((d) => d.classList.add('is-live'));
  // Moving dot along each running path
  $$('.viz').forEach((svg) => {
    const path = svg.querySelector('.viz__run');
    const dot = svg.querySelector('.viz__dot');
    if (!path || !dot || reduce) return;
    const len = path.getTotalLength();
    let t0 = null;
    const step = (t) => {
      if (svg.closest('.drill').classList.contains('is-live')) {
        if (t0 === null) t0 = t;
        const p = ((t - t0) % 2800) / 2800;
        const e = Math.min(p / 0.7, 1);
        const eased = 1 - Math.pow(1 - e, 3);
        const pt = path.getPointAtLength(eased * len);
        dot.setAttribute('cx', pt.x); dot.setAttribute('cy', pt.y);
      } else t0 = null;
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });

  /* ---------------- Counters ---------------- */
  const counters = $$('[data-count]');
  const runCount = (el) => {
    const end = +el.dataset.count, suf = el.dataset.suffix || '';
    if (reduce) { el.textContent = end + suf; return; }
    const dur = 1600, t0 = performance.now();
    const f = (t) => { const p = Math.min((t - t0) / dur, 1); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 4))) + suf; if (p < 1) requestAnimationFrame(f); };
    requestAnimationFrame(f);
  };
  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { runCount(en.target); cio.unobserve(en.target); } }), { threshold: 0.6 });
    counters.forEach((c) => cio.observe(c));
  } else counters.forEach(runCount);

  /* ---------------- Lead form (2-step) ---------------- */
  const form = $('#lead-form');
  if (form) {
    const steps = $$('.form__step', form);
    const dots = $$('.form__steps span', form);
    const show = (i) => {
      steps.forEach((s, k) => s.classList.toggle('is-active', k === i));
      dots.forEach((d, k) => d.classList.toggle('is-on', k <= i));
      const first = steps[i].querySelector('input:not([type=radio]), select, textarea');
      first && first.focus({ preventScroll: true });
    };
    $('[data-next]', form).addEventListener('click', () => show(1));
    $('[data-back]', form).addEventListener('click', () => show(0));
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = $('#f-name'), email = $('#f-email');
      let ok = true;
      [name, email].forEach((f) => f.classList.remove('is-invalid'));
      if (!name.value.trim()) { name.classList.add('is-invalid'); ok = false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { email.classList.add('is-invalid'); ok = false; }
      if (!ok) return;
      const d = new FormData(form);
      const body = [
        `Name: ${d.get('name')}`, `Email: ${d.get('email')}`, `Phone: ${d.get('phone') || '-'}`,
        `I am a: ${d.get('level')}`, `Sport: ${d.get('sport') || '-'}`, `School / team: ${d.get('team') || '-'}`,
        `Priority: ${d.get('need')}`, '', `${d.get('message') || ''}`
      ].join('\n');
      window.location.href = `mailto:shaheed@iathleticg.com?subject=${encodeURIComponent('Free Career Blueprint Call: ' + d.get('name'))}&body=${encodeURIComponent(body)}`;
      steps.forEach((s) => s.classList.remove('is-active'));
      $('.form__steps', form).hidden = true;
      $('.form__done', form).hidden = false;
    });
  }

  /* ---------------- GSAP scroll choreography ---------------- */
  if (!hasGSAP || reduce) return;
  gsap.registerPlugin(ScrollTrigger);
  root.classList.add('motion');

  // Section headings: lines rise in
  $$('.display, .h3, .mega__row, .lede, .kicker').forEach((el) => {
    if (el.closest('.hero') || el.closest('.draft__intro')) return;
    gsap.from(el, { y: 60, opacity: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
  });
  // Grouped cards stagger in
  [['.athletes', '.athlete'], ['.stats', '.stat'], ['.value', '.value__item'], ['.offer', '.offer__col'], ['.regimen', '.regimen__group'], ['.team', '.member'], ['.checks', 'li'], ['.deals', 'li'], ['.about__cols', 'p']].forEach(([wrap, item]) => {
    $$(wrap).forEach((w) => {
      gsap.from($$(item, w), { y: 70, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.08, scrollTrigger: { trigger: w, start: 'top 85%' } });
    });
  });

  // Hero parallax on scroll
  gsap.to('.hero__copy', { yPercent: -12, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero__media', { yPercent: 10, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  // Ticker skews with scroll velocity
  const ticker = $('.ticker__track');
  ScrollTrigger.create({ onUpdate: (self) => { const v = gsap.utils.clamp(-14, 14, self.getVelocity() / 250); gsap.to(ticker, { skewX: -v, duration: .4, overwrite: true }); } });

  // Scrub text
  $$('.scrub-text').forEach((el) => {
    gsap.to($$('.w', el), { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true } });
  });

  // Image parallax
  $$('.ph img, .founder__media img, .card__img').forEach((img) => {
    gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
  gsap.from('.founder__mono', { scale: 0, rotate: -90, duration: 1.2, ease: 'back.out(1.6)', scrollTrigger: { trigger: '.founder', start: 'top 70%' } });

  // Big marketing words slide opposite directions
  $$('.mega__row').forEach((row, i) => {
    gsap.fromTo(row, { xPercent: i % 2 ? 10 : -6 }, { xPercent: i % 2 ? -6 : 4, ease: 'none', scrollTrigger: { trigger: '.mega', start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  const mm = gsap.matchMedia();
  mm.add('(min-width: 961px)', () => {
    // Stacking cards scale back as the next arrives
    const cards = $$('.stack .card');
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return;
      gsap.to(card, { scale: 0.94 - (cards.length - i) * 0.01, ease: 'none', scrollTrigger: { trigger: cards[i + 1], start: 'top 75%', end: 'top 140px', scrub: true } });
    });

    // Pre-draft horizontal scroll
    const track = $('.draft__track');
    const viewport = $('.draft__viewport');
    const pin = $('.draft__pin');
    const dist = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
    gsap.to(track, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: { trigger: '.draft', start: 'top top', end: () => '+=' + dist(), pin: pin, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 }
    });
    $('.draft__hint').lastChild.textContent = ' Keep scrolling through the six tests';
  });

  // Expanding reel
  gsap.timeline({ scrollTrigger: { trigger: '.reel', start: 'top top', end: 'bottom bottom', scrub: 1 } })
    .fromTo('.reel__mask', { clipPath: 'inset(22% 26% 22% 26% round 40px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'power2.inOut' })
    .from('.reel__line', { y: 80, opacity: 0, stagger: 0.15, ease: 'power3.out' }, 0.25)
    .from('.reel__eyebrow', { opacity: 0 }, 0.2);

  // Contact pitch
  gsap.from('.form', { y: 80, opacity: 0, rotate: 2, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.contact', start: 'top 70%' } });

  // Footer word rises
  gsap.from('.footer__word', { yPercent: 40, opacity: 0, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: '.footer', start: 'top 85%' } });

  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
