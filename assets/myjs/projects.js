(function () {
  var INITIAL_SHOW = 6;

  var filterBtns   = document.querySelectorAll('.proj-filter-btn');
  var cards        = document.querySelectorAll('.proj-card');
  var backdrop     = document.getElementById('projModalBackdrop');
  var modalClose   = document.getElementById('projModalClose');
  var modalImg     = document.getElementById('projModalImg');
  var modalTitle   = document.getElementById('projModalTitle');
  var modalBadge   = document.getElementById('projModalBadge');
  var modalDesc    = document.getElementById('projModalDesc');
  var modalTags    = document.getElementById('projModalTags');
  var modalActions = document.getElementById('projModalActions');
  var showMoreBtn  = document.getElementById('projShowMore');

  var currentFilter = '*';
  var isExpanded    = false;

  // ── Visibility ──────────────────────────────────────────────────────────────
  function updateVisibility() {
    // Cards that pass the current category filter
    var visibleCards = Array.prototype.filter.call(cards, function (card) {
      var cls = (card.getAttribute('data-filter-class') || '').split(' ');
      return currentFilter === '*' || cls.indexOf(currentFilter) !== -1;
    });

    Array.prototype.forEach.call(cards, function (card) {
      var cls = (card.getAttribute('data-filter-class') || '').split(' ');
      var passesFilter = currentFilter === '*' || cls.indexOf(currentFilter) !== -1;
      card.classList.toggle('proj-hidden', !passesFilter);
      card.classList.remove('proj-hidden-more');
    });

    if (!isExpanded) {
      visibleCards.slice(INITIAL_SHOW).forEach(function (card) {
        card.classList.add('proj-hidden-more');
      });
    }

    // Show / hide button
    var hasMore = visibleCards.length > INITIAL_SHOW;
    showMoreBtn.style.display = hasMore ? 'inline-flex' : 'none';
    if (hasMore) {
      var remaining = visibleCards.length - INITIAL_SHOW;
      showMoreBtn.innerHTML = isExpanded
        ? 'Show Less <i class="fa-solid fa-chevron-up"></i>'
        : 'Show More (' + remaining + ') <i class="fa-solid fa-chevron-down"></i>';
    }
  }

  // ── Category filtering ──────────────────────────────────────────────────────
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      currentFilter = this.getAttribute('data-filter');
      isExpanded = false;
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      updateVisibility();
    });
  });

  // ── Show More / Less ────────────────────────────────────────────────────────
  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', function () {
      isExpanded = !isExpanded;
      updateVisibility();
    });
  }

  // ── Modal helpers ───────────────────────────────────────────────────────────
  function openModal(card) {
    var title       = card.getAttribute('data-title') || '';
    var category    = card.getAttribute('data-category') || '';
    var desc        = card.getAttribute('data-desc') || '';
    var tagsStr     = card.getAttribute('data-tags') || '';
    var img         = card.getAttribute('data-img') || '';
    var github      = card.getAttribute('data-github') || '';
    var githubLabel = card.getAttribute('data-github-label') || 'View on GitHub';
    var live        = card.getAttribute('data-live') || '';

    modalImg.src = img;
    modalImg.alt = title;
    modalTitle.textContent = title;
    modalBadge.textContent = category;
    modalDesc.textContent = desc;

    // Tags
    modalTags.innerHTML = '';
    tagsStr.split(',').forEach(function (tag) {
      var span = document.createElement('span');
      span.className = 'proj-modal-tag';
      span.textContent = tag.trim();
      modalTags.appendChild(span);
    });

    // Action buttons
    modalActions.innerHTML = '';
    if (github) {
      var ghBtn = document.createElement('a');
      ghBtn.href = github;
      ghBtn.target = '_blank';
      ghBtn.rel = 'noopener noreferrer';
      ghBtn.className = 'proj-modal-btn proj-modal-btn-primary';
      var ghIcon = githubLabel.indexOf('GitHub') !== -1 ? 'fa-brands fa-github' : 'fa-solid fa-arrow-up-right-from-square';
      ghBtn.innerHTML = '<i class="' + ghIcon + '"></i> ' + githubLabel;
      modalActions.appendChild(ghBtn);
    }
    if (live && live !== github) {
      var liveBtn = document.createElement('a');
      liveBtn.href = live;
      liveBtn.target = '_blank';
      liveBtn.rel = 'noopener noreferrer';
      liveBtn.className = 'proj-modal-btn proj-modal-btn-secondary';
      liveBtn.innerHTML = '<i class="fa-solid fa-arrow-up-right-from-square"></i> Visit Live';
      modalActions.appendChild(liveBtn);
    }

    // Scroll modal back to top
    var scrollEl = backdrop.querySelector('.proj-modal-scroll');
    if (scrollEl) scrollEl.scrollTop = 0;

    backdrop.setAttribute('aria-hidden', 'false');
    backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    backdrop.classList.remove('is-open');
    backdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // ── Event wiring ─────────────────────────────────────────────────────────────
  cards.forEach(function (card) {
    card.addEventListener('click', function () { openModal(this); });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);

  backdrop.addEventListener('click', function (e) {
    if (e.target === backdrop) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && backdrop.classList.contains('is-open')) closeModal();
  });

  // ── Init ─────────────────────────────────────────────────────────────────────
  updateVisibility();
})();
