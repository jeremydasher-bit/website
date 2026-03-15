# lawyer-up (Immiguard)

React app for the Immiguard pitch: landing, customer portal, staff portal, login, case list and profiles.

## Run locally

```bash
npm install
npm start
```

## Deploy to live site (immiguard folder)

The live site serves the **built** app from the repo's `immiguard/` folder, not this source. After changing `src/App.tsx` you must rebuild and copy or the live app won't update:

```bash
npm install
npm run build
```

Then from the **repo root** (My Website):

```powershell
.\deploy-immiguard.ps1
git add immiguard/
git commit -m "Deploy Immiguard: <describe changes>"
git push origin main
```

If you skip the build step, the live site will keep serving the old bundle (no hamburger nav, case profiles, login→staff, etc.).
