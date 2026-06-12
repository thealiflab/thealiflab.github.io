(function () {
  var statNums = document.querySelectorAll('.hero-stat-num');
  var animated = false;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function countUp(el, target, duration) {
    var startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      el.textContent = Math.floor(easeOutCubic(progress) * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }

  function runCountUp() {
    if (animated) return;
    animated = true;
    statNums.forEach(function (el) {
      var target = parseInt(el.getAttribute('data-target'), 10);
      countUp(el, target, 1800);
    });
  }

  if ('IntersectionObserver' in window) {
    var hero = document.getElementById('mh-home');
    var observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        runCountUp();
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    if (hero) observer.observe(hero);
  } else {
    runCountUp();
  }
})();

/* Competitive Programming (BeeCrowd) stat count-up.
   Self-contained: supports decimals (data-decimals), an optional
   prefix (data-prefix, e.g. "#"), and thousands separators. */
(function () {
  var nums = document.querySelectorAll('.cp-stat-num');
  if (!nums.length) return;
  var animated = false;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function format(value, decimals) {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }

  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-target'));
    var decimals = parseInt(el.getAttribute('data-decimals'), 10) || 0;
    var prefix = el.getAttribute('data-prefix') || '';
    var duration = 1800;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      el.textContent = prefix + format(easeOutCubic(progress) * target, decimals);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = prefix + format(target, decimals);
      }
    }
    requestAnimationFrame(step);
  }

  function run() {
    if (animated) return;
    animated = true;
    nums.forEach(countUp);
  }

  if ('IntersectionObserver' in window) {
    var section = document.getElementById('mh-competitive');
    var observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        run();
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    if (section) observer.observe(section);
    else run();
  } else {
    run();
  }
})();
