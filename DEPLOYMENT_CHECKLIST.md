# Deployment checklist

Use this before pushing to production or uploading to your host (e.g. GitHub Pages, Netlify). Ensures the site works locally and that content and assets are in good shape.

## 1. Run locally

- From the project folder (e.g. `My Website`), start a local HTTP server:
  - `python -m http.server 8000`, or
  - `npx http-server . -p 8000`
- Open **http://localhost:8000** in a browser.

## 2. Test all four folders

- Double-click each desktop icon: **Photos**, **Blogs**, **Documents**, **Download**.
- Confirm an Explorer window opens for each and that the file list matches `content.json` (no "This folder is empty" unless that folder is intentionally empty).

## 3. Test file types

- **Images**: Double-click an image in Photos (or any folder). The image viewer modal should open and show the image; close with the X.
- **Videos**: If you have a `type: "video"` entry, double-click it and confirm the video player opens and plays.
- **Docs**: Double-click a doc (e.g. Welcome.txt, or a link to jeremydasher.com). A new tab should open with the URL from `content.json`.

## 4. Confirm content.json and assets load

- If you open the site via `file://`, some browsers block `fetch("content.json")` and local assets. Use the local server (step 1) so that:
  - Folders show the correct file list (from `content.json`).
  - Local assets (e.g. `./assets/welcome.txt`) open when double-clicked.

## 5. Compress and finalize assets

- Per CONTENT_WORKFLOW.md: any images/videos you are uploading should be compressed. Place final assets in `assets/` and ensure `content.json` points to them (e.g. `"./assets/filename.jpg"`).

## 6. Deploy

- **GitHub Pages**: Push to the `main` branch; in repo Settings → Pages, set source to `main` (and folder to `/ (root)` if applicable). The site will be at `https://<username>.github.io/<repo>/` or your custom domain if configured.
- **Other host**: Upload the repo contents (or connect the repo to the host) so that `index.html` is the document root and `content.json` and `assets/` are served from the same origin.

### Immiguard live bundle (Projects → Immiguard)

The live site serves Immiguard from the **`immiguard/`** folder. After changing `lawyer-up-main/src/App.tsx` you must rebuild and copy into `immiguard/` or the live app won’t update:

1. From repo root: `cd lawyer-up-main` then `npm run build` (or `yarn build`).
2. Copy build output into `immiguard/`:
   - `lawyer-up-main/build/index.html` → `immiguard/index.html`
   - `lawyer-up-main/build/asset-manifest.json` → `immiguard/asset-manifest.json`
   - `lawyer-up-main/build/static/*` → `immiguard/static/`
3. Commit and push: `git add immiguard/` then `git commit -m "Deploy Immiguard: <short description>"` then `git push origin main`.

Or run the script: `.\deploy-immiguard.ps1` (after running `npm run build` in `lawyer-up-main`).

## 7. After deploy

- Open the live URL and repeat steps 2–3 on the production site.
- If you added SEO meta tags (see SEO_IMPLEMENTATION.md), confirm canonical and og:image URLs use the live domain and that the summary image loads.
