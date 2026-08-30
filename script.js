/* Holzstrukteur — minimales Verhalten: Mobilmenü und Jahreszahl im Footer. */
(function () {
  'use strict';

  /* ── Mobilmenü ──────────────────────────────────────────────────────────
     Die Navigation ist bis 48rem einklappbar. Damit sie ohne JavaScript
     erreichbar bleibt, wird sie erst hier initial geschlossen.            */

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('hauptnavigation');
  var mobile = window.matchMedia('(max-width: 47.999rem)');

  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      nav.hidden = !open;
    };

    var sync = function () {
      setOpen(!mobile.matches);
    };

    sync();
    mobile.addEventListener('change', sync);

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    /* Nach dem Sprung zu einem Anker schließt sich das Menü wieder. */
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a') && mobile.matches) setOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && mobile.matches &&
          toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* ── Keyvisual ──────────────────────────────────────────────────────────
     Wer reduzierte Bewegung eingestellt hat, sieht das Blattwerk als
     Standbild. autoplay im Markup greift sonst, bevor JS geladen ist.    */

  var keyvisual = document.querySelector('.keyvisual__media');
  var ruhig = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (keyvisual) {
    var bewegung = function () {
      if (ruhig.matches) {
        keyvisual.pause();
        keyvisual.currentTime = 0;
      } else {
        keyvisual.play().catch(function () { /* Autoplay abgelehnt — Poster bleibt. */ });
      }
    };

    bewegung();
    ruhig.addEventListener('change', bewegung);
  }

  /* ── Jahreszahl im Footer ───────────────────────────────────────────── */

  var jahr = document.getElementById('jahr');
  if (jahr) jahr.textContent = String(new Date().getFullYear());
})();
