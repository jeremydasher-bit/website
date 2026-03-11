# Content workflow

How to add, remove, and update the "files" that appear in each desktop folder (Photos, Blogs, Documents, Download). You are responsible for compressing assets before upload; this doc describes where they go and how they are referenced.

## Editing the file list: content.json

- Open `content.json` in the repo root.
- Each folder is a top-level key: `Photos`, `Blogs`, `Documents`, `Download`.
- Each key's value is an array of file entries. One entry:

  ```json
  { "name": "Display name.ext", "type": "image"|"video"|"doc", "url": "https://..." or "./assets/..." }
  ```

- **name**: Shown in the Explorer window. Use a clear, safe filename (no path slashes).
- **type**: `image` → opens in the in-page image viewer; `video` → in-page video player; `doc` → opens in a new browser tab (or download, depending on URL).
- **url**: Either a full URL (e.g. `https://example.com/photo.jpg`) or a path relative to the site root, e.g. `"./assets/photo.jpg"`.

To add a file: append an object to the right array. To remove: delete the object and optionally remove the file from `assets/` if it was local. Save and refresh the site.

## Where files live: assets/

- Put **local** files (images, videos, text files, PDFs, etc.) in the `assets/` folder (or a subfolder like `assets/images/`).
- In `content.json`, reference them with a path relative to the site root, e.g.:
  - `"./assets/welcome.txt"`
  - `"./assets/images/sunset.jpg"`
  - `"./assets/downloads/portfolio.pdf"`

## Compressed assets for upload

- **Rule**: Files that you intend to upload (e.g. images, videos) should be **compressed** before being added to the repo or deployed. You handle compression; this repo does not run compression automatically.
- **Where to put compressed files**: Use `assets/` (or a subfolder such as `assets/images/`, `assets/videos/`). Reference those paths in `content.json` as above.
- **Workflow**: Compress the file (e.g. resize/optimize images, re-encode video), place the result in `assets/`, add or update the entry in `content.json`, then commit and deploy. Remove or replace older, uncompressed versions to avoid bloat.

## External URLs

- You can point `url` at an external URL (e.g. `https://jeremydasher.com/...`). The site will load that URL when the user double-clicks the file (image/video in viewer, doc in new tab). No file is stored in `assets/` in that case.
- Do not put private or authenticated URLs in `content.json`; it is public. See SECURITY.md.

## Checklist for adding a new file

1. (If local) Compress the file and place it in `assets/` (or an `assets/` subfolder).
2. Add or update the entry in `content.json` with `name`, `type`, and `url` (e.g. `"./assets/filename.ext"`).
3. Reload the site (or run a local server and refresh) to confirm it appears in the right folder and opens correctly.
