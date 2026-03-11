# SEO

Current state of the site for search and social, and what to add so search engines and link previews work well.

## Current state

- **Single page**: One entry point, `index.html`. No separate HTML pages per folder or file.
- **No meta description**: Search results will fall back to whatever the engine extracts from the page.
- **No Open Graph / Twitter Card tags**: Links to the site will not show a custom title, description, or image on social or in messaging apps.
- **No canonical URL**: Search engines do not have an explicit preferred URL (matters once you have a live domain and possibly multiple ways to reach the page).
- **No structured data**: No JSON-LD for Person or WebSite, so rich results are not requested.

## What to add (in `<head>` of index.html)

| Item | Purpose |
|------|--------|
| `<meta name="description" content="...">` | Short summary (e.g. 1–2 sentences) for search snippets. Keep under ~160 characters. |
| `<meta property="og:title" content="...">` | Title for link previews (e.g. "Jeremy Dasher — Photography"). |
| `<meta property="og:description" content="...">` | Description for link previews. Can match or mirror the meta description. |
| `<meta property="og:image" content="https://jeremydasher.com/...">` | Absolute URL to a single “summary” image (e.g. logo or a representative photo). Use a compressed image in `assets/` and reference it with the full site URL once live. |
| `<meta property="og:url" content="https://jeremydasher.com/">` | Canonical URL of the page for social. |
| `<link rel="canonical" href="https://jeremydasher.com/">` | Tells search engines the preferred URL for this content. |
| Optional: Twitter Card meta tags | `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` for Twitter/some other apps. Can mirror OG values. |
| Optional: JSON-LD | A `<script type="application/ld+json">` block with Person and/or WebSite schema. Helps search engines understand the site and, in some cases, show rich results. |

All URLs and image paths in these tags should be **host-aware**: use `https://jeremydasher.com/...` (or your final domain) once the site is live, not `localhost` or a GitHub Pages subpath unless that is the permanent URL.

## Recommended summary image

- Pick one image (e.g. a portrait or a signature photo) to represent the site.
- Compress it, put it in `assets/` (e.g. `assets/og-image.jpg`), and reference it in `og:image` and `twitter:image` with the full URL (e.g. `https://jeremydasher.com/assets/og-image.jpg`). Common size: 1200×630 for social.

## Next steps (implementation)

See **SEO_IMPLEMENTATION.md** for concrete edits: exact meta tags, example JSON-LD, and where to place them in `index.html`. After the site is on its final domain, update all placeholder URLs in those tags to the live base URL.
