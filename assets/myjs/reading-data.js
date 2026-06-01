/* ============================================================
   READING DATA — this is the ONLY file you edit to manage the
   Reading page. No build step: just edit and refresh.
   ============================================================ */

/* ─────────────────────────────────────────────────────────────
   1) AMAZON AFFILIATE TAG
   👉 PASTE YOUR AMAZON ASSOCIATES TAG BELOW (between the quotes).
      Example: "thealiflab-20"
   Leave it as "YOUR_AFFILIATE_TAG" and no tag will be added yet
   (links still work, just without your affiliate attribution).
   ───────────────────────────────────────────────────────────── */
const AMAZON_AFFILIATE_TAG = "YOUR_AFFILIATE_TAG";

/* ─────────────────────────────────────────────────────────────
   2) BOOKS
   Add one object per book. Fields:
     title       (required)  — book title
     author      (required)  — author name(s)
     coverImage  (required)  — path to a cover image, e.g.
                               "../assets/images/reading/atomic-habits.jpg"
                               (drop your cover files in that folder)
     ratings     (required)  — your scores out of 5:
                               { content, information, writing, overall }
     amazonUrl   (required)  — plain Amazon product URL; the affiliate
                               tag above is appended automatically.
     notes       (optional)  — a short line of your thoughts.
   ───────────────────────────────────────────────────────────── */
const READING_BOOKS = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    coverImage: "../assets/images/reading/atomic-habits.jpg",
    ratings: { content: 4, information: 5, writing: 4, overall: 4.5 },
    amazonUrl: "https://www.amazon.com/dp/0735211299",
    notes: "Practical, actionable framework for building tiny habits that compound."
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    coverImage: "../assets/images/reading/deep-work.jpg",
    ratings: { content: 5, information: 4, writing: 5, overall: 4.7 },
    amazonUrl: "https://www.amazon.com/dp/1455586692",
    notes: "A strong case for focus as a superpower in a distracted world."
  },
  {
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    coverImage: "../assets/images/reading/pragmatic-programmer.jpg",
    ratings: { content: 5, information: 5, writing: 4, overall: 5 },
    amazonUrl: "https://www.amazon.com/dp/0135957052"
  }
];
