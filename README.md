# My Website

A Windows 98–style personal desktop experience. The site looks and behaves like a 1998 PC: grass/hills wallpaper, taskbar with Start menu and clock, and four desktop folders (Blogs, Photos, Documents, Download) that open in movable, closeable Explorer-style windows. “Files” inside each folder are driven by a content manifest and can open images, videos, or docs in viewers or new tabs.

## Features

- **Desktop shell**: Bliss-style wallpaper, taskbar, Start button, live clock
- **Four folders**: Blogs, Photos, Documents, Download — double-click desktop icons or use Start to open
- **Explorer windows**: Win98-style title bar and client area; movable (drag title bar), closeable (X), multiple windows with click-to-focus
- **File list**: Loaded from `content.json`; double-click opens images in a viewer, videos in a player, docs in a new tab
- **Content**: Edit `content.json` and/or add files under `assets/` to change what appears in each folder

## Files

- `index.html` — Desktop, taskbar, Start menu, desktop icons, window container
- `style.css` — Win98 look (taskbar, Start menu, window chrome, cursor, wallpaper)
- `script.js` — Window manager (open/close/drag/focus), Start menu, desktop double-click, file open
- `content.json` — Manifest of “files” per folder (name, type, url)
- `assets/` — Optional folder for local files (e.g. images, txt) referenced in `content.json`

## Content

- **Add/remove files**: Edit `content.json`. Each folder (Photos, Blogs, Documents, Download) has an array of entries: `{ "name": "File.ext", "type": "image"|"video"|"doc", "url": "https://..." or "./assets/..." }`.
- **Local files**: Put files in `assets/` and set `url` to `"./assets/filename.ext"`. You can remove files later by deleting them from `assets/` and removing their entries from `content.json`.
- **External URLs**: Use full URLs (e.g. from jeremydasher.com) in `url`; double-click will open in a viewer (image/video) or new tab (doc).

## Setup

1. Open `index.html` in a browser, or run a local server (e.g. `python -m http.server 8000` in the project folder) and visit `http://localhost:8000`.
2. Double-click a desktop folder to open it; use the taskbar or Start menu as well.
3. Double-click a file in an Explorer window to open it.

## License

© 2024 Jeremy Dasher. All rights reserved.
