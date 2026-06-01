/* ============================================================
   READING PAGE RENDERER
   Reads AMAZON_AFFILIATE_TAG + READING_BOOKS from reading-data.js
   and builds the responsive card grid. Edit data in reading-data.js,
   not here.
   ============================================================ */
(function () {
  "use strict";

  var grid = document.getElementById("reading-list");
  if (!grid) return;

  var empty = document.getElementById("reading-empty");
  var TAG_PLACEHOLDER = "YOUR_AFFILIATE_TAG";
  var REL = "nofollow sponsored noopener";
  var FALLBACK_COVER =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='300'%3E%3Crect width='100%25' height='100%25' fill='%23e9eef5'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='18' text-anchor='middle' dominant-baseline='middle' fill='%23a7b4c4'%3ENo cover%3C/text%3E%3C/svg%3E";

  var books = (typeof READING_BOOKS !== "undefined") ? READING_BOOKS : [];
  var tag = (typeof AMAZON_AFFILIATE_TAG !== "undefined") ? AMAZON_AFFILIATE_TAG : "";

  // Escape text before injecting into HTML.
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // Append the affiliate tag to a plain Amazon URL (if a real tag is set).
  function affiliateUrl(url) {
    if (!url) return "#";
    if (!tag || tag === TAG_PLACEHOLDER) return url;     // no tag configured yet
    if (/[?&]tag=/.test(url)) return url;                // already tagged
    return url + (url.indexOf("?") === -1 ? "?" : "&") + "tag=" + encodeURIComponent(tag);
  }

  // Format a rating value (e.g. 4 or 4.5) as "X/5".
  function score(v) {
    var n = Number(v);
    if (isNaN(n)) return "–/5";
    return (Math.round(n * 10) / 10) + "/5";
  }

  function ratingRow(label, value, isOverall) {
    return (
      '<div class="reading-rating-row' + (isOverall ? " reading-rating-overall" : "") + '">' +
        '<span class="reading-rating-label">' + label + "</span>" +
        '<span class="reading-rating-val">' + score(value) + "</span>" +
      "</div>"
    );
  }

  function cardHtml(b) {
    var r = b.ratings || {};
    var url = esc(affiliateUrl(b.amazonUrl));
    var cover = esc(b.coverImage || "");
    var title = esc(b.title || "Untitled");
    var notes = b.notes
      ? '<p class="reading-notes">' + esc(b.notes) + "</p>"
      : "";

    return (
      '<article class="reading-card">' +
        '<a class="reading-cover-link" href="' + url + '" target="_blank" rel="' + REL + '" aria-label="' + title + ' on Amazon">' +
          '<div class="reading-cover-wrap">' +
            '<img class="reading-cover" src="' + cover + '" alt="' + title + ' cover" loading="lazy">' +
          "</div>" +
        "</a>" +
        '<div class="reading-card-body">' +
          '<h3 class="reading-title">' + title + "</h3>" +
          '<p class="reading-author">by ' + esc(b.author || "Unknown") + "</p>" +
          '<div class="reading-ratings">' +
            ratingRow("Content", r.content) +
            ratingRow("Information", r.information) +
            ratingRow("Writing", r.writing) +
            ratingRow("Overall", r.overall, true) +
          "</div>" +
          notes +
          '<a class="reading-amazon-btn" href="' + url + '" target="_blank" rel="' + REL + '">' +
            '<i class="fa-brands fa-amazon"></i> View on Amazon' +
          "</a>" +
        "</div>" +
      "</article>"
    );
  }

  if (!books.length) {
    if (empty) empty.hidden = false;
    return;
  }

  grid.innerHTML = books.map(cardHtml).join("");

  // Swap in a placeholder for any cover that fails to load.
  function applyFallback(img) {
    if (img.getAttribute("data-fallback")) return;
    img.setAttribute("data-fallback", "1");
    img.src = FALLBACK_COVER;
  }
  Array.prototype.forEach.call(grid.querySelectorAll(".reading-cover"), function (img) {
    img.addEventListener("error", function () { applyFallback(img); });
    if (img.complete && img.naturalWidth === 0) applyFallback(img); // already failed
  });
})();
