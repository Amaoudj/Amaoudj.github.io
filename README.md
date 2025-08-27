# README — Edit Your Site With Only HTML Files (Single-Window Version)

This guide shows you exactly how to **add or modify content** using only the two HTML files you already have:

- `index.html` (homepage)
- `Papers/<SomePaper>/index.html` (a publication detail page)

You **do not** need any templates or YAML—just open the files in a text editor.
Search for the big comment banners in the HTML (e.g., `PUBLICATIONS`, `NEWS`, `EXPERIENCE`) and follow the patterns below.

--------------------------------------------------------------------------------

## 0) Quick Map (what to edit where)

You want to…                         | Edit in…                | Look for…
-------------------------------------|-------------------------|------------------------------
Change your name/title/headline/CV   | `index.html`            | `PROFILE HEADER`
Add/remove sidebar links             | `index.html`            | `SIDEBAR / NAVIGATION`
Add a news item                      | `index.html`            | `NEWS SECTION`
Add education entry                  | `index.html`            | `EDUCATION`
Add experience entry                 | `index.html`            | `EXPERIENCE`
Add a publication card               | `index.html`            | `PUBLICATIONS`
Adjust “Load more” behavior          | `index.html`            | `publication-list` (data-init/step)
Add skills/awards/contacts           | `index.html`            | `SKILLS` / `AWARDS` / `CONTACTS`
Add gallery/video/BibTeX on a paper  | `Papers/.../index.html` | `GALLERY` / `VIDEO` / `FULL CITATION`

--------------------------------------------------------------------------------

## 1) Profile Header (name, title, social, headline, CV)

File: `index.html` → section **PROFILE HEADER**

HTML:

```html
<!-- Change your name/title -->
<h2>John Doe <span style="font-weight:400;">| Research Scientist</span></h2>

<!-- Social icons: duplicate a line and change URL + icon class -->
<div class="social-icons">
  <a href="https://github.com/username" target="_blank"><i class="fab fa-github"></i></a>
  <a href="https://www.linkedin.com/in/username" target="_blank"><i class="fab fa-linkedin"></i></a>
</div>

<!-- Update your headline -->
<p class="subtext">I work on multi-robot systems and deep RL.</p>

<!-- Update CV link -->
<a href="CV_John_Doe.pdf" class="btn-cv" target="_blank">Curriculum Vitae [PDF]</a>
```

Common Font Awesome icon classes:
- `fab fa-github`, `fab fa-linkedin`, `fab fa-twitter`, `fab fa-youtube`, `fas fa-globe`, `fas fa-envelope`

--------------------------------------------------------------------------------

## 2) Sidebar Navigation (add/remove menu links)

File: `index.html` → section **SIDEBAR / NAVIGATION**

HTML:

```html
<nav>
  <a href="#news">News</a>
  <a href="#experience">Experience</a>
  <a href="#publications">Publications</a>
  <a href="#skills">Skills</a>
  <a href="#awards">Awards</a>
  <a href="#contacts">Contacts</a>

  <!-- Add a new section link like this: -->
  <a href="#teaching">Teaching</a>
</nav>
```

If you add a new link (e.g., `#teaching`), also add a matching section in `<main>`:

HTML:

```html
<section id="teaching">
  <h3 class="section-title">Teaching</h3>
  <!-- your content here -->
</section>
```

--------------------------------------------------------------------------------

## 3) News: add an item

File: `index.html` → section **NEWS SECTION**

HTML:

```html
<ul class="news-list">
  <!-- Duplicate one <li> per new item -->
  <li>
    August 10, 2025: Our paper accepted to <em>IROS 2025</em>
    — <a href="https://example.com" target="_blank" title="Announcement"><i class="fas fa-link"></i></a>
  </li>
</ul>
```

--------------------------------------------------------------------------------

## 4) Education: add an entry

File: `index.html` → section **EDUCATION**

HTML:

```html
<!-- Duplicate this whole <details> block for each degree -->
<details>
  <summary>
    <strong>Ph.D. in Robotics</strong>, University of Somewhere
    <span class="subtext"><em>2019 – 2023</em></span>
  </summary>
  <ul>
    <li>Thesis: Learning-based Multi-Robot Coordination</li>
    <li>Advisor: Prof. A. Name</li>
  </ul>
</details>
```

--------------------------------------------------------------------------------

## 5) Experience: add an entry

File: `index.html` → section **EXPERIENCE**

HTML:

```html
<!-- Duplicate this whole <details> block per experience -->
<details>
  <summary>
    <strong>Postdoctoral Researcher</strong>, Institute X
    <span class="subtext"><em>2024 – Present</em></span>
  </summary>
  <ul>
    <li>Led RL-based pathfinding for 50+ robots</li>
    <li>Co-advised 2 MSc students</li>
  </ul>
</details>
```

--------------------------------------------------------------------------------

## 6) Publications: add a card on the homepage

File: `index.html` → section **PUBLICATIONS**

1) Duplicate a full `.publication-item`:

HTML:

```html
<div class="publication-item">
  <div class="publication-header">
    <div class="title">
      <strong>42.</strong>
      <span class="pub-label">Journal</span>
      <!-- Link to an internal details page or just plain text -->
      <a href="Papers/Okumura2022Priority/index.html" class="publication-title">
        Priority Inheritance with Backtracking for Iterative Multi-agent Path Finding
      </a>
    </div>

    <div class="pub-icons">
      <!-- DOI/publisher -->
      <a href="https://www.sciencedirect.com/science/article/pii/S0004370222000923" target="_blank" title="DOI">
        <i class="fas fa-link"></i>
      </a>
      <!-- Optional: Code repo -->
      <a href="https://github.com/Kei18/pibt2" target="_blank" title="Code">
        <i class="fab fa-github"></i>
      </a>
      <!-- Optional: Video (YouTube page or embed URL) -->
      <a href="https://www.youtube.com/watch?v=8Yrwd0t0NEw" target="_blank" title="Video">
        <i class="fab fa-youtube"></i>
      </a>
      <!-- Copy BibTeX button (script at bottom handles it) -->
      <a href="#" class="copy-citation" data-citation="@article{...}" title="BibTeX">
        <i class="fas fa-quote-right"></i>
      </a>
    </div>
  </div>

  <div class="publication-content">
    <!-- Optional thumbnail -->
    <img
      src="Papers/Okumura2022Priority/teaser.jpg"
      alt="Thumbnail"
      class="pub-thumb"
      loading="lazy"
      decoding="async"
      width="320" height="180"
      onerror="this.closest('.publication-content')?.classList.remove('has-thumb'); this.remove();">

    <div class="publication-detail">
      <p class="authors">K. Okumura, M. Machida, X. Défago & Y. Tamura</p>
      <p class="venue">Artificial Intelligence (AIJ), 2022</p>
      <!-- Optional notes (HTML allowed) -->
      <!-- <p class="notes"><strong>Spotlight:</strong> Best paper finalist.</p> -->
    </div>
  </div>
</div>
```

2) If you add many items and want to tweak reveal behavior, change the list container:

HTML:

```html
<div class="publication-list" id="publicationList" data-init="12" data-step="12">
```

- `data-init` = number of items shown initially  
- `data-step` = how many more to show per “Load more” click

**Do not** change the IDs `publicationList`, `pub-load-more`, `pub-show-less`, or `pub-count`—the JavaScript relies on them.

--------------------------------------------------------------------------------

## 7) Skills / Awards / Contacts

**Skills** — `index.html` → **SKILLS**

HTML:

```html
<ul class="skills-list">
  <li>
    <strong>Python</strong>
    <span class="subtext"> — Expert</span>
    <span class="subtext"> · Programming</span>
    <div class="subtext">NumPy, PyTorch, OpenCV</div>
  </li>
  <!-- Add more <li> as needed -->
</ul>
```

**Awards** — `index.html` → **AWARDS**

HTML:

```html
<ul class="awards-list">
  <li class="award-item">
    <div class="award-line">
      <span class="award-text">
        <strong>Best Paper Award</strong>, ICRA
        <span class="subtext"> · 2025</span>
      </span>
      <a class="award-link" href="https://example.com" target="_blank" title="Award link">
        <i class="fas fa-link"></i>
      </a>
    </div>
    <div class="subtext">For contributions to multi-robot pathfinding.</div>
  </li>
</ul>
```

**Contacts** — `index.html` → **CONTACTS**

HTML:

```html
<div class="contact-list">
  <p><i class="fas fa-envelope"></i> john.doe@example.com</p>
  <p><i class="fas fa-map-marker-alt"></i> City, Country</p>
  <p><i class="fas fa-globe"></i> <a href="https://johndoe.dev" target="_blank">johndoe.dev</a></p>
</div>
```

--------------------------------------------------------------------------------

## 8) Create/Update a Publication Detail Page

File: `Papers/<YourPaper>/index.html` (copy an existing one and edit)

A) Header (title, authors, where/when, icon links)

HTML:

```html
<div class="paper-header">
  <h1>Priority Inheritance with Backtracking…</h1>
  <p><strong>Authors:</strong> K. Okumura, M. Machida, X. Défago & Y. Tamura</p>
  <p>
    <strong>Published:</strong> 2022 &nbsp;|&nbsp;
    <strong>Journal:</strong> Artificial Intelligence (AIJ), 103752
    <span class="inline-icons">
      <!-- Link to PDF / DOI / Code / Project page -->
      <a href="https://arxiv.org/pdf/xxxx.xxxxx.pdf" target="_blank" title="PDF"><i class="fas fa-file-pdf"></i></a>
      <a href="https://doi.org/10.xxxx/xxxxxx" target="_blank" title="DOI"><i class="fas fa-link"></i></a>
      <a href="https://github.com/Kei18/pibt2" target="_blank" title="Code"><i class="fab fa-github"></i></a>
    </span>
  </p>
</div>
```

B) Abstract (optional)

HTML:

```html
<section id="abstract">
  <h2 class="section-title">Abstract</h2>
  <p>We study iterative multi-agent path finding under…</p>
  <p>Our method improves success rates by…</p>
</section>
```

C) Gallery (optional figures)

HTML:

```html
<section id="gallery">
  <h2 class="section-title">Gallery</h2>
  <div class="gallery-grid">
    <figure class="gallery-item">
      <a href="images/fig1.png" target="_blank" class="gallery-link">
        <img src="images/fig1.png" alt="Overview diagram" class="gallery-img" loading="lazy">
      </a>
      <figcaption class="gallery-caption">System overview.</figcaption>
    </figure>
  </div>
</section>
```

D) Video (YouTube embed) — **Use the EMBED URL** format: `https://www.youtube.com/embed/VIDEO_ID`

HTML:

```html
<section id="video">
  <h2 class="section-title">Demo Video</h2>
  <div class="video-container">
    <iframe
      src="https://www.youtube.com/embed/8Yrwd0t0NEw"
      style="position:relative;aspect-ratio:16/9;width:100%;border:0;"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen>
    </iframe>
  </div>
</section>
```

E) Full Citation (BibTeX)

HTML:

```html
<section id="citation">
  <h2 class="section-title">Citation</h2>
  <pre id="bibtex-block">@article{Okumura2022Priority, title={...}, ... }</pre>
</section>
```

The page’s script will **auto-pretty-print** one-line BibTeX and supports “copy” if you add a button with `id="copy-citation"` (optional).

--------------------------------------------------------------------------------

## 9) “Copy BibTeX” & Toast Messages

Homepage publication card: add a **BibTeX copy** icon

HTML:

```html
<a href="#" class="copy-citation" data-citation="@article{...}" title="BibTeX">
  <i class="fas fa-quote-right"></i>
</a>
```

A toast element must exist (already at the bottom of your pages):

HTML:

```html
<div id="toast">Copied!</div>
```

The included JavaScript shows the toast automatically for a short time after copying.

--------------------------------------------------------------------------------

## 10) Images, Icons, and Styling

- **Thumbnails**: Use `width="320" height="180"` for consistent aspect ratio. They’re lazy-loaded.
- **Font Awesome**: Common classes — `fas fa-link`, `fab fa-github`, `fab fa-youtube`, `fas fa-file-pdf`.
- **Custom styles**: Most styles live in `CSS/homepage_style.css`. Add more rules there if needed.

--------------------------------------------------------------------------------

## 11) Safety: What **not** to change

- IDs used by scripts: `publicationList`, `pub-load-more`, `pub-show-less`, `pub-count`, `toast`, `bibtex-block`.
- The general class names used by CSS/JS (e.g., `publication-item`, `pub-icons`, `gallery-grid`).

--------------------------------------------------------------------------------

## 12) Quick Checklist for Adding a New Publication

1. **Create the detail page**: copy an existing `Papers/<PaperName>/index.html` and update:
   - Title, authors, published info
   - Icon links (PDF/DOI/Code/Project)
   - Abstract paragraphs
   - Gallery images (optional)
   - Video embed URL (optional)
   - BibTeX in `<pre id="bibtex-block">…</pre>`

2. **Add a card on the homepage** (`index.html`):
   - Duplicate a `.publication-item`
   - Update number, label, title, links (internal `Papers/.../index.html` + external DOI/code/video)
   - Set authors, venue, thumbnail (optional)
   - Put the BibTeX in `data-citation` (for copy)

3. **Test “Load more”**:
   - If your list got long, adjust `data-init`/`data-step` on `#publicationList`.

--------------------------------------------------------------------------------

## 13) Optional: Create a Brand-New Section

Add to sidebar:

HTML:

```html
<a href="#service">Service</a>
```

Add to main:

HTML:

```html
<section id="service">
  <h3 class="section-title">Service</h3>
  <ul>
    <li>Reviewer: ICRA 2025</li>
    <li>Organizer: Robotics Seminar Series</li>
  </ul>
</section>
```

--------------------------------------------------------------------------------

## 14) Troubleshooting

- **Icons not showing?** Ensure the Font Awesome `<link>` in `<head>` is present and you used the right class (e.g., `fab fa-github`).
- **Images not loading?** Check the file path and file name (case-sensitive on some hosts).
- **“Load more” not working?** Make sure IDs (`publicationList`, `pub-load-more`, `pub-show-less`, `pub-count`) are unchanged.
- **YouTube not embedding?** Use the `/embed/` URL format, not a regular watch URL.
