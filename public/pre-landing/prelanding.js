/* Framework-independent enhancement of the copied Skyriders scene. */
(function () {
  "use strict";
  const mounted = new WeakMap();
  const introductions = [
    {
      eyebrow: "Direct & operational", lead: "Critical reach.", headline: "Advanced inspection.",
      summary: "Certified rope access execution. Diagnosing inaccessible structures, delivering the solution."
    },
    {
      eyebrow: "High-level industrial", lead: "Where others", headline: "can’t reach.",
      summary: "Aerial data. Boots-on-rope precision. Uncompromising asset integrity from visual survey to physical repair."
    },
    {
      eyebrow: "Problem-to-solution", lead: "Engineered", headline: "access.",
      summary: "Confined space inspection. Heavy-duty height solutions. Zero scaffolding, zero blind spots, minimal operational downtime."
    }
  ];

  function init(scope = document) {
    const scene = scope.matches?.(".prelanding") ? scope : scope.querySelector(".prelanding");
    if (!scene) return () => {};
    if (mounted.has(scene)) return mounted.get(scene);
    const cleanup = [];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const listen = (target, name, callback, options) => {
      target.addEventListener(name, callback, options);
      cleanup.push(() => target.removeEventListener(name, callback, options));
    };
    const observe = (target, callback) => {
      if (!window.IntersectionObserver) return;
      const observer = new IntersectionObserver(([entry]) => callback(entry.isIntersecting));
      observer.observe(target);
      cleanup.push(() => observer.disconnect());
    };

    // Three keyed message states: hold 6500ms, fade out 500ms, arrive 700ms.
    const intro = scene.querySelector(".intro");
    const initialMessage = intro.firstElementChild.cloneNode(true);
    let index = 0, inView = true, hovering = false;
    let hold, swap, settle;
    const clearTimers = () => { clearTimeout(hold); clearTimeout(swap); clearTimeout(settle); };
    const renderMessage = () => {
      const message = initialMessage.cloneNode(true);
      const content = introductions[index];
      message.className = "intro-message intro-message--entering";
      for (const [key, selector] of Object.entries({
        eyebrow: ".intro-eyebrow", lead: ".intro-lead", headline: ".intro-headline", summary: ".intro-summary"
      })) message.querySelector(selector).textContent = content[key];
      intro.replaceChildren(message);
    };
    const schedule = () => {
      clearTimers();
      intro.firstElementChild.className = "intro-message intro-message--shown";
      if (document.hidden || !inView || hovering || reduce.matches) return;
      hold = setTimeout(() => {
        intro.firstElementChild.className = "intro-message intro-message--leaving";
        swap = setTimeout(() => {
          index = (index + 1) % introductions.length;
          renderMessage();
          settle = setTimeout(schedule, 700);
        }, 500);
      }, 6500);
    };
    observe(intro, visible => { inView = visible; schedule(); });
    listen(intro, "mouseenter", () => { hovering = true; schedule(); });
    listen(intro, "mouseleave", () => { hovering = false; schedule(); });
    listen(document, "visibilitychange", schedule);
    listen(reduce, "change", schedule);
    cleanup.push(() => { clearTimers(); intro.replaceChildren(initialMessage.cloneNode(true)); });
    schedule();

    // Pause the seamless ticker and subject idles while hidden/offscreen.
    const strip = scene.querySelector(".industries");
    let stripInView = true, sceneInView = true;
    const syncVisibility = () => {
      strip.dataset.paused = String(!stripInView || document.hidden);
      scene.dataset.paused = String(!sceneInView || document.hidden);
    };
    observe(strip, visible => { stripInView = visible; syncVisibility(); });
    observe(scene, visible => { sceneInView = visible; syncVisibility(); });
    listen(document, "visibilitychange", syncVisibility);
    syncVisibility();
    cleanup.push(() => { delete strip.dataset.paused; delete scene.dataset.paused; });

    // Independent translate/rotate compose with the original CSS animations.
    scene.querySelectorAll(".destination").forEach(link => {
      const image = link.querySelector(".destination-subject");
      const drone = link.classList.contains("destination--skyi");
      let x = 0, y = 0, roll = 0, targetX = 0, targetY = 0, targetRoll = 0, frame = 0;
      const inactive = () => reduce.matches || document.hidden || scene.dataset.paused === "true";
      const draw = () => {
        frame = 0;
        if (inactive()) return;
        x += (targetX - x) * .065;
        y += (targetY - y) * .065;
        roll += (targetRoll - roll) * .065;
        image.style.translate = `${x.toFixed(3)}px ${y.toFixed(3)}px`;
        image.style.rotate = `${roll.toFixed(3)}deg`;
        if (Math.abs(x - targetX) + Math.abs(y - targetY) + Math.abs(roll - targetRoll) > .025)
          frame = requestAnimationFrame(draw);
      };
      const start = () => { if (!frame && !inactive()) frame = requestAnimationFrame(draw); };
      const leave = () => { targetX = targetY = targetRoll = 0; start(); };
      listen(link, "pointermove", event => {
        if (inactive() || !fine.matches || event.pointerType !== "mouse") return;
        const rect = link.getBoundingClientRect();
        const horizontal = Math.max(-.5, Math.min(.5, (event.clientX - rect.left) / rect.width - .5));
        const vertical = Math.max(-.5, Math.min(.5, (event.clientY - rect.top) / rect.height - .5));
        targetX = horizontal * (drone ? 24 : 8);
        targetY = vertical * (drone ? 18 : 10);
        targetRoll = horizontal * (drone ? 1.8 : .65);
        start();
      });
      listen(link, "pointerleave", leave);
      listen(link, "focus", () => {
        if (!link.matches(":focus-visible")) return;
        targetY = drone ? -5 : 3;
        targetRoll = drone ? .5 : .15;
        start();
      });
      listen(link, "blur", leave);
      const sync = () => {
        if (!inactive()) return;
        cancelAnimationFrame(frame);
        frame = 0;
        targetX = targetY = targetRoll = x = y = roll = 0;
        image.style.translate = "0px 0px";
        image.style.rotate = "0deg";
      };
      const observer = new MutationObserver(sync);
      observer.observe(scene, { attributes: true, attributeFilter: ["data-paused"] });
      listen(reduce, "change", sync);
      listen(document, "visibilitychange", sync);
      cleanup.push(() => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        image.style.translate = image.style.rotate = "";
      });
    });

    // Native links remain valid; only /home/ gets the original departure cover.
    const overlay = scope.querySelector(".brand-entry-overlay");
    if (overlay && typeof scene.animate === "function") {
      let animations = [], pending = false, fallback;
      const clear = () => {
        animations.forEach(animation => animation.cancel());
        animations = [];
        overlay.dataset.phase = "idle";
        pending = false;
        clearTimeout(fallback);
      };
      listen(scene, "click", async event => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const link = event.target.closest?.("a[data-brand-choice]");
        if (!link || link.target || link.hasAttribute("download") || reduce.matches) return;
        const brand = link.dataset.brandChoice;
        if (brand !== "skyriders" && brand !== "skyi") return;
        const destination = new URL(link.href);
        if (destination.pathname.replace(/\/$/, "") !== "/home") return;
        event.preventDefault();
        if (pending) return;
        pending = true;
        overlay.dataset.theme = brand;
        overlay.dataset.phase = "departing";
        const compact = matchMedia("(max-width: 800px)").matches;
        const options = { duration: compact ? 280 : 410, easing: "cubic-bezier(.3,0,.2,1)", fill: "forwards" };
        const departure = scene.animate([
          { opacity: 1, transform: "scale(1)" },
          { opacity: .32, transform: `scale(${compact ? 1.015 : 1.045})` }
        ], options);
        const cover = overlay.animate(brand === "skyriders" ? [
          { clipPath: "inset(0% 100% 0% 0%)", transform: "translateX(0px)" },
          { clipPath: "inset(0% 0% 0% 0%)", transform: "translateX(0px)" }
        ] : [
          { opacity: 0, transform: `perspective(1200px) translateX(${compact ? 18 : 90}px) rotateY(-14deg) scale(.94)` },
          { opacity: 1, transform: "perspective(1200px) translateX(0px) rotateY(0deg) scale(1)" }
        ], { ...options, fill: "both" });
        animations = [departure, cover];
        try { await cover.finished; } catch { clear(); return; }
        fallback = setTimeout(clear, 1800);
        if (destination.origin !== location.origin) destination.searchParams.set("_entry", brand);
        location.assign(destination.toString());
      });
      listen(window, "pageshow", event => { if (event.persisted) clear(); });
      listen(reduce, "change", () => { if (reduce.matches) clear(); });
      cleanup.push(clear);
    }

    const destroy = () => {
      cleanup.reverse().forEach(callback => callback());
      mounted.delete(scene);
    };
    mounted.set(scene, destroy);
    return destroy;
  }

  // SPA consumers can mount after rendering and return the cleanup from useEffect.
  window.SkyridersPrelanding = { init };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => init(), { once: true });
  else init();
})();
