# SEO implementation

Concrete edits to add to `index.html` for better search and link previews. Replace placeholder URLs with your live domain (e.g. `https://jeremydasher.com`) once the site is deployed.

## 1. Place inside `<head>`

Add the following **after** the existing `<meta charset>` and `<meta name="viewport">` and **before** `<link rel="stylesheet">` (or at least before `</head>`).

### Meta description

```html
<meta name="description" content="Jeremy Dasher — Photography and visual art. A Windows 98–style portfolio and desktop experience.">
```

Adjust the text to match your voice; keep it under ~160 characters.

### Open Graph

```html
<meta property="og:title" content="Jeremy Dasher — Photography & Visual Art">
<meta property="og:description" content="Jeremy Dasher — Photography and visual art. A Windows 98–style portfolio and desktop experience.">
<meta property="og:image" content="https://jeremydasher.com/assets/og-image.jpg">
<meta property="og:url" content="https://jeremydasher.com/">
<meta property="og:type" content="website">
```

- Replace `https://jeremydasher.com` with your real domain if different.
- Ensure `assets/og-image.jpg` exists (a compressed summary image; see SEO.md). If you use another path, update `og:image` accordingly.

### Canonical URL

```html
<link rel="canonical" href="https://jeremydasher.com/">
```

Use the same base URL as above.

### Twitter Card (optional)

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Jeremy Dasher — Photography & Visual Art">
<meta name="twitter:description" content="Jeremy Dasher — Photography and visual art. A Windows 98–style portfolio and desktop experience.">
<meta name="twitter:image" content="https://jeremydasher.com/assets/og-image.jpg">
```

### JSON-LD (optional)

Add before `</head>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Jeremy Dasher",
  "url": "https://jeremydasher.com/",
  "description": "Photography and visual art. A Windows 98–style portfolio and desktop experience."
}
</script>
```

You can extend this with `image`, `sameAs` (social links), etc. Keep URLs absolute and host-aware.

## 2. Before going live

- Create and compress the summary image (e.g. `assets/og-image.jpg`).
- Replace every `https://jeremydasher.com` in the new tags with your actual production URL.
- Validate: use Google Rich Results Test and a social debugger (e.g. Facebook Sharing Debugger, Twitter Card Validator) with the live URL.
