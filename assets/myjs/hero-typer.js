(function () {
  // Cycling role typer for the h5 subtitle
  var roles = [
    'IT Professional',
    'Application Developer',
    'Solopreneur',
    'Systems & Infrastructure Specialist',
    'Cloud & Identity Engineer',
    'System Administrator',
    'AI Product Builder',
    'Machine Learning Engineer'
  ];
  var roleEl = document.getElementById('role-typing');
  var rIdx = 0;
  var cIdx = 0;
  var isDeleting = false;

  function typeRole() {
    var current = roles[rIdx];
    if (!isDeleting) {
      roleEl.textContent = current.slice(0, ++cIdx);
      if (cIdx === current.length) {
        isDeleting = true;
        setTimeout(typeRole, 1500);
        return;
      }
      setTimeout(typeRole, 65);
    } else {
      roleEl.textContent = current.slice(0, --cIdx);
      if (cIdx === 0) {
        isDeleting = false;
        rIdx = (rIdx + 1) % roles.length;
        setTimeout(typeRole, 300);
        return;
      }
      setTimeout(typeRole, 35);
    }
  }

  typeRole();
})();
