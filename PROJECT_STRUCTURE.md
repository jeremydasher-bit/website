# Project structure

This document describes the repository layout and the role of each file and folder. Use it to add or change content without breaking the site.

## Repository root (My Website/)

| Path | Purpose |
|------|--------|
| `index.html` | Single entry point. Renders the Windows 98 desktop: wallpaper, taskbar (Start, clock), four desktop folder icons, and a container where Explorer windows are created. All UI is driven by this file plus CSS and JS. |
| `style.css` | All styling: desktop background, taskbar, Start menu, Explorer window chrome (title bar, client area, borders), file list table, modals (image/video viewer), cursor. No build step; edit and refresh. |
| `script.js` | Behavior: clock, Start menu open/close, desktop icon double-click → open folder window, window manager (drag title bar, close, click-to-focus/z-order), load `content.json`, render file list per folder, double-click file → open image/video in modal or doc in new tab. |
| `content.json` | Content manifest. Top-level keys: `Photos`, `Blogs`, `Documents`, `Download`. Each value is an array of `{ "name", "type", "url" }`. The script loads this at runtime; editing it (and refreshing) updates what appears in each folder. **Do not put secrets or private URLs here**—it is served as-is. |
| `assets/` | Local files referenced by `content.json` (e.g. images, `.txt`). Use `url: "./assets/filename.ext"` in the manifest. Compressed assets for production should go here (or a documented subfolder); see CONTENT_WORKFLOW.md. |
| `README.md` | Project overview, features, how to run locally, and content-editing summary. |
| `GITHUB_SETUP.md` | How to create the GitHub repo and enable GitHub Pages. |
| `setup-github.ps1` | PowerShell script to init git, add files, and create initial commit; reminds you to add remote and push. |
| `.gitignore` | Excludes OS/editor artifacts, logs, and (if added later) `node_modules/`, etc. |

## Documentation (this set)

| Path | Purpose |
|------|--------|
| `PROJECT_STRUCTURE.md` | This file. |
| `CONTENT_WORKFLOW.md` | How to add/remove "files," use `assets/`, and the rule that uploaded files are compressed. |
| `SECURITY.md` | Static-site security and safe use of `content.json`. |
| `SEO.md` | Current SEO state and what to add (meta tags, canonical, Open Graph, JSON-LD). |
| `DEPLOYMENT_CHECKLIST.md` | Pre-launch steps: local test, then deploy. |
| `DOCS_INDEX.md` | Index of all docs and links to README and GITHUB_SETUP. |

Optional: `HOSTING_SECURITY.md` for host-specific settings (HTTPS, custom domain, headers). Optional: a `docs/` subfolder for longer guides, with `DOCS_INDEX.md` at root pointing into it.

## Where to put new things

- **New pages**: Currently the site is a single page. If you add more HTML pages (e.g. `about.html`), place them in the repo root and link from `index.html` or the Start menu. Keep URLs relative (e.g. `about.html`) or host-aware for canonical/OG.
- **Images / media**: Place under `assets/` (or a subfolder like `assets/images/`). Reference in `content.json` with `"./assets/..."` or `"./assets/images/..."`. Use compressed assets for what you upload; see CONTENT_WORKFLOW.md.
- **Config**: All config is in `content.json` and in the HTML/CSS/JS files. If you introduce a build step or env vars later, document them here and in DEPLOYMENT_CHECKLIST.md.
