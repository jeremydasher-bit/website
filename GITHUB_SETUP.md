# GitHub Setup Instructions

## Quick Setup

### Option 1: Using GitHub CLI (Recommended)

If you have GitHub CLI installed:

```powershell
cd "My Website"
gh repo create My-Website --public --source=. --remote=origin --push
```

### Option 2: Manual Setup

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Name it "My-Website" (or your preferred name)
   - Choose public or private
   - **Don't** initialize with README, .gitignore, or license (we already have these)

2. **Run the setup script:**
   ```powershell
   cd "My Website"
   .\setup-github.ps1
   ```

3. **Connect to your GitHub repository:**
   ```powershell
   git remote add origin https://github.com/YOUR_USERNAME/My-Website.git
   git branch -M main
   git push -u origin main
   ```

### Option 3: Using GitHub Desktop

1. Open GitHub Desktop
2. File → Add Local Repository
3. Navigate to the "My Website" folder
4. Click "Publish repository" button
5. Name it "My-Website" and publish

## Files Included

- `index.html` - Main website file
- `style.css` - Custom styles
- `script.js` - Interactive functionality
- `README.md` - Project documentation
- `.gitignore` - Git ignore rules

## After Setup

Once your repository is set up, you can:
- Make changes locally
- Commit: `git add .` then `git commit -m "Your message"`
- Push: `git push`

## GitHub Pages (Optional)

To host your website on GitHub Pages:

1. Go to your repository settings on GitHub
2. Navigate to "Pages" in the left sidebar
3. Under "Source", select "main" branch
4. Click "Save"
5. Your site will be available at: `https://YOUR_USERNAME.github.io/My-Website/`
