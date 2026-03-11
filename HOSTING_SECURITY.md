# Hosting security

Short guide for securing the site on your chosen host. Adjust for the platform you use (e.g. GitHub Pages, Netlify, Vercel, Cloudflare Pages).

## GitHub Pages

- **HTTPS**: GitHub Pages serves over HTTPS by default. Enforce it by using only `https://` URLs in canonical and Open Graph tags (see SEO_IMPLEMENTATION.md).
- **Custom domain**: In repo Settings → Pages, set your custom domain (e.g. `jeremydasher.com`). GitHub will prompt you to add DNS records (typically an A/CNAME record). Enabling "Enforce HTTPS" in Pages settings redirects HTTP to HTTPS.
- **Access**: The repo and Pages are public by default. Restrict who can push to the repo (and change Pages settings) via repo collaborators or organization permissions. Do not commit secrets; see SECURITY.md.

## Other static hosts (Netlify, Vercel, Cloudflare Pages)

- **HTTPS**: All of these provide HTTPS by default. Use their dashboard to ensure HTTPS is on and, if available, "Force HTTPS" or similar.
- **Custom domain**: Add the domain in the host's dashboard and follow their DNS instructions. Once DNS propagates, the host will issue/renew certificates.
- **Security headers**: If the host allows custom headers (e.g. Netlify `_headers`, Cloudflare Transform Rules), consider adding:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY` or `SAMEORIGIN` (depending on whether you embed the site elsewhere)
  - `Referrer-Policy: strict-origin-when-cross-origin`
  These are optional but improve defense-in-depth for a static site.

## General

- Keep the host account and any deploy tokens secure (strong password, 2FA if available).
- After switching from Squarespace, confirm DNS points to the new host and that the old Squarespace site is fully retired so there is no duplicate content or mixed hosting.
