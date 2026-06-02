/**
 * github-stats.js
 *
 * Fixes the github-calendar library's broken stat calculation.
 *
 * Root cause: github-calendar-parser looks for `data-count` on each
 * ContributionCalendar-day cell, but GitHub's current HTML only carries
 * `data-level` (0–4). The exact contribution count is only in the
 * adjacent <tool-tip> custom element's text content.
 *
 * This module is loaded before the GitHub Calendar library and exposes
 * `window.patchGitHubStats`, which is called inside the GitHubCalendar()
 * .then() callback after the library has injected the calendar HTML and
 * generated (incorrect) .contrib-column elements.
 */

(function () {
  'use strict';

  /* ── 1. Parse contribution data from the rendered DOM ── */
  function buildDayMap() {
    var map = {};

    // Seed from td cells: gives us date + binary active/inactive (data-level > 0)
    var tds = document.querySelectorAll('td.ContributionCalendar-day[data-date]');
    tds.forEach(function (td) {
      var date  = td.getAttribute('data-date');
      var level = parseInt(td.getAttribute('data-level') || '0', 10);
      if (date) map[td.id] = { date: date, count: level > 0 ? null : 0 };
    });

    // Enhance with exact counts from <tool-tip> siblings.
    // GitHub HTML places these as siblings inside <tr>; the browser's table
    // parser foster-parents them before the <table> but they stay in the DOM
    // and keep their `for` attribute pointing to the td's id.
    var tips = document.querySelectorAll('tool-tip[for]');
    tips.forEach(function (tip) {
      var id   = tip.getAttribute('for');
      var cell = map[id];
      if (!cell) return;
      var text  = (tip.textContent || tip.innerText || '').trim();
      var match = text.match(/(\d+)\s+contribution/i);
      cell.count = match ? parseInt(match[1], 10) : 0;
    });

    return map;
  }

  /* ── 2. Compute total, longest streak, current streak ── */
  function computeStats(map) {
    // Build a date-sorted array; ignore future dates
    var today = new Date().toISOString().slice(0, 10);
    var days  = [];
    for (var key in map) {
      if (Object.prototype.hasOwnProperty.call(map, key)) {
        var d = map[key];
        if (d.date <= today) days.push(d);
      }
    }
    days.sort(function (a, b) { return a.date < b.date ? -1 : 1; });

    if (!days.length) return null;

    // Total contributions (use exact count when available, skip nulls)
    var total = 0;
    days.forEach(function (d) { if (d.count && d.count > 0) total += d.count; });

    // Helper: is this day active?
    function active(d) { return d.count === null ? false : d.count > 0; }

    // Longest streak
    var longestLen = 0, longestStart = '', longestEnd = '';
    var streak = 0, sStart = '';
    days.forEach(function (d) {
      if (active(d)) {
        if (streak === 0) sStart = d.date;
        streak++;
        if (streak > longestLen) {
          longestLen = streak; longestStart = sStart; longestEnd = d.date;
        }
      } else {
        streak = 0; sStart = '';
      }
    });

    // Current streak — scan backwards; let today slide if not yet committed
    var currLen = 0, currStart = '', currEnd = '';
    var hitActive = false;
    for (var i = days.length - 1; i >= 0; i--) {
      var d = days[i];
      if (active(d)) {
        if (!hitActive) { currEnd = d.date; hitActive = true; }
        currLen++; currStart = d.date;
      } else {
        if (!hitActive && d.date === today) continue; // today: no commit yet
        break;
      }
    }

    return {
      total      : total,
      longestLen : longestLen, longestStart : longestStart, longestEnd : longestEnd,
      currLen    : currLen,    currStart    : currStart,    currEnd    : currEnd
    };
  }

  /* ── 3. Format a date-range string ── */
  function fmtRange(a, b) {
    if (!a) return '';
    var mn = ['Jan','Feb','Mar','Apr','May','Jun',
              'Jul','Aug','Sep','Oct','Nov','Dec'];
    var da = new Date(a + 'T00:00:00');
    var db = new Date(b + 'T00:00:00');
    var s  = mn[da.getMonth()] + ' ' + da.getDate();
    var e  = mn[db.getMonth()] + ' ' + db.getDate();
    return a === b ? s : s + '–' + e;
  }

  /* ── 4. Patch the library-generated .contrib-column elements ── */
  function patchColumns(stats) {
    var cols = document.querySelectorAll(
      '.github-calendar-wrap .calendar .contrib-column'
    );
    if (cols.length < 3) return;

    // Column 0 — Total contributions
    var n0 = cols[0].querySelector('.contrib-number');
    if (n0) n0.textContent = stats.total;

    // Column 1 — Longest streak
    var n1 = cols[1].querySelector('.contrib-number');
    var m1 = cols[1].querySelectorAll('.text-muted');
    if (n1) n1.textContent = stats.longestLen +
      (stats.longestLen === 1 ? ' day' : ' days');
    if (m1[1]) m1[1].textContent = fmtRange(stats.longestStart, stats.longestEnd);

    // Column 2 — Current streak
    var n2 = cols[2].querySelector('.contrib-number');
    var m2 = cols[2].querySelectorAll('.text-muted');
    if (n2) n2.textContent = stats.currLen +
      (stats.currLen === 1 ? ' day' : ' days');
    if (m2[1]) m2[1].textContent = fmtRange(stats.currStart, stats.currEnd);
  }

  /* ── Public entry point ── */
  window.patchGitHubStats = function () {
    var map   = buildDayMap();
    var stats = computeStats(map);
    if (!stats) return;
    patchColumns(stats);
  };
})();
