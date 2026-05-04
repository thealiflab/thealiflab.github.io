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
