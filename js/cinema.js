/* ============================================================
   ICONICWEAR — CINEMA.JS
   Drives the pinned scroll sequence on the homepage: environment
   parallax, wordmark motion, and the model garment crossfade.
   Reads progress from .cinema-wrap's scroll position and writes
   CSS custom properties onto each .cinema-layer every frame via
   requestAnimationFrame. Disabled (falls back to a static frame)
   when the visitor has requested reduced motion.
   ============================================================ */

function initCinema() {
  const wrap = document.getElementById("cinema-wrap");
  if (!wrap) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return; // CSS media query already shows the static end-frame

  const bg = wrap.querySelector(".cinema-bg");
  const word = wrap.querySelector(".cinema-word");
  const artifact = wrap.querySelector(".cinema-artifact");
  const modelLayer = wrap.querySelector(".cinema-model");
  const productLayer = wrap.querySelector(".cinema-product");
  const states = Array.from(wrap.querySelectorAll(".garment-state"));
  const cue = wrap.querySelector(".cinema-scroll-cue");

  let ticking = false;

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  // remap t from [inLo,inHi] to [0,1], clamped
  function seg(t, inLo, inHi) { return clamp((t - inLo) / (inHi - inLo), 0, 1); }
  function ease(t) { return t * t * (3 - 2 * t); } // smoothstep

  function render() {
    ticking = false;
    const rect = wrap.getBoundingClientRect();
    const total = wrap.offsetHeight - window.innerHeight;
    if (total <= 0) return;
    const raw = clamp(-rect.top / total, 0, 1);
    const p = raw; // overall progress through the whole pinned sequence

    // Phase A 0–0.30: environment establishes, wordmark holds then fades
    // Phase B 0.22–0.68: model rises in, garments cross-fade through states
    // Phase C 0.60–0.85: product beat surfaces
    // Phase D 0.80–1.0: release — everything fades for the handoff to normal flow

    const aOut = ease(seg(p, 0.14, 0.32));
    const bIn = ease(seg(p, 0.18, 0.4));
    const cIn = ease(seg(p, 0.76, 0.88));
    const cOut = ease(seg(p, 0.94, 1));
    const releaseOut = ease(seg(p, 0.6, 0.8));

    // Background: slow parallax drift + gentle scale-in, dims toward the end
    if (bg) {
      bg.style.setProperty("--ty", String(lerp(0, -70, p)));
      bg.style.setProperty("--scale", String(lerp(1.04, 1.16, p)));
      bg.style.setProperty("--op", String(1 - releaseOut * 0.85));
    }

    // Wordmark: holds, then moves up and fades as the model arrives
    if (word) {
      word.style.setProperty("--ty", String(lerp(0, -120, aOut) + lerp(0, -40, bIn)));
      word.style.setProperty("--scale", String(lerp(1, 1.08, aOut)));
      word.style.setProperty("--op", String((1 - aOut) < 0.06 ? 0 : (1 - aOut)));
    }
    if (cue) {
      cue.style.opacity = String(1 - ease(seg(p, 0, 0.08)));
    }

    // Foreground vignette artifact: eases in as environment establishes
    if (artifact) {
      artifact.style.setProperty("--op", String(lerp(0.4, 1, seg(p, 0, 0.25))));
    }

    // Model: rises from below, settles, then drifts up slightly and fades on release
    if (modelLayer) {
      const riseY = lerp(90, 0, bIn);
      const releaseY = lerp(0, -60, releaseOut);
      modelLayer.style.setProperty("--ty", String(riseY + releaseY));
      modelLayer.style.setProperty("--scale", String(lerp(0.92, 1, bIn)));
      modelLayer.style.setProperty("--op", String(Math.max(bIn - releaseOut, 0)));
    }

    // Garment states cross-fade in sequence across phase B
    if (states.length) {
      const segments = states.length; // e.g. 3 states -> 2 transition windows plus hold
      states.forEach((el, i) => {
        // state 0 is always the base photo (opacity handled by base visibility),
        // states[1..] fade in progressively as bIn advances
        if (i === 0) return;
        const startAt = lerp(0.15, 0.75, (i - 1) / Math.max(segments - 1, 1));
        const endAt = startAt + 0.28;
        const localP = seg(bIn, startAt, endAt);
        el.style.opacity = String(ease(localP));
      });
    }

    // Product beat: brief foreground surfacing near the end of the sequence
    if (productLayer) {
      const inP = cIn;
      const outP = cOut;
      const vis = Math.max(inP - outP, 0);
      productLayer.style.setProperty("--ty", String(lerp(50, 0, inP)));
      productLayer.style.setProperty("--scale", String(lerp(0.94, 1, inP)));
      productLayer.style.setProperty("--op", String(vis));
    }
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(render);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  render();
}

document.addEventListener("DOMContentLoaded", initCinema);
