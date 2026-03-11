# Security

Good practices for this static site and for the data it uses. The site has no server-side code; all security considerations are about what you put in the repo and how the site is served.

## No secrets in the repository

- Do **not** commit API keys, passwords, tokens, or private URLs. Everything in the repo is public once pushed (e.g. to GitHub).
- `content.json` is loaded by the browser and is visible to anyone who visits the site. Do **not** put:
  - Links to private or authenticated resources
  - Keys or credentials
  - Internal or staging URLs you do not want exposed

## HTTPS only

- Serve the site over **HTTPS** only. When you host (e.g. GitHub Pages, Netlify, Vercel), enable HTTPS and, if possible, redirect HTTP to HTTPS. This protects traffic and avoids mixed-content issues.

## Static site: no server-side execution

- There is no backend. The server only serves files. That reduces attack surface: no server-side code to exploit, no database, no server-side form handling.
- If you add forms later (e.g. contact), do **not** put sensitive handling in client-side JavaScript. Use a third-party form service or a small serverless function and document it; do not store secrets in the front-end.

## External links and content

- Links in `content.json` (and in HTML) are opened in the same tab or a new tab. Only link to trusted URLs. If you embed or link to user-generated content, ensure it is from a trusted source to avoid phishing or malicious redirects.

## Host and deployment

- Use a host you trust. Restrict who can push to the repo and who can change deployment settings. For host-specific steps (custom domain, headers), see HOSTING_SECURITY.md if you add it.
