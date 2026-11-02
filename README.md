# Abderraouf Maoudj — Academic portfolio

Public website: https://amaoudj.github.io/

This is a static GitHub Pages website. No build step or server-side dependencies are required.

## Content and design

- `index.html`: profile, current video projects, research directions, teaching, appointments, and searchable publication list.
- `CSS/academic.css`: responsive homepage design.
- `CSS/project_style.css`: research project overview pages, with shared publication-page styles.
- `JS/portfolio.js`: publication filtering, BibTeX copying, figure viewing, and video playback coordination.
- `Projects/<slug>/index.html`: detailed research project and ongoing-work overviews.
- `Papers/<number>/index.html`: existing publication detail pages, styled by `CSS/page_style.css`.
- `videos/current-projects/`: six locally hosted demonstrations, loaded only when played.
- `images/current-projects/`: genuine preview images and video stills.
- `images/projects/`: original CAD and inspection figures from the project presentation.
- `images/publications/`: lightweight publication preview images.
- `publications.json` and `publications.bib`: normalized public bibliography and downloadable BibTeX.

Project descriptions explain the demonstration context and the wider research programme. Original LinkedIn posts or detailed project overviews are linked beside each demonstration. Videos open with project credits; original source files are backed up outside this repository.

## CV

- `CV_Abderraouf_2026.pdf`: current public academic CV.
- `cv/CV_Abderraouf_2026.html`: editable, print-ready source.
- `cv/publications.json`: CV bibliography, including manuscripts under review.

To regenerate the PDF after editing the HTML, print it from Chromium with A4 paper, background graphics enabled, and consistent margins. Check every page before replacing the public PDF.

## Publication updates

Publication records were checked against the public Google Scholar profile and publisher metadata on **2 November 2026**. Duplicate records are consolidated. Accepted articles and manuscripts under review are explicitly labeled. Citation metrics are a dated snapshot linked to Google Scholar.

When changing publications, update the homepage record, any corresponding detail page, the public JSON/BibTeX downloads, and the CV where applicable. Preserve author order, final DOI links, and publication status.

Keep research narratives focused on methods, contributions and evidence. Put authorship, venue and publication-status details in the bibliography. Use uniform plain text for all publication author names, without highlighting the profile owner.

## Preview and publish

From the repository root:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Open http://127.0.0.1:8765/ and check desktop and mobile widths, project video playback, publication search and filters, citations, and the downloadable CV. Push the reviewed source to the repository's `main` branch for GitHub Pages publication.

The `.work/` directory is ignored and contains local research, scripts, screenshots, and verification output. Original CV and website backups are kept outside this repository.
