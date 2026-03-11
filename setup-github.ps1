# GitHub Setup Script for My Website
# This script will help you initialize git and push to GitHub

Write-Host "Setting up GitHub repository for My Website..." -ForegroundColor Green

# Check if git is available
try {
    $gitVersion = git --version
    Write-Host "Git found: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Git is not installed or not in PATH." -ForegroundColor Red
    Write-Host "Please install Git from https://git-scm.com/downloads" -ForegroundColor Yellow
    Write-Host "Or add Git to your system PATH." -ForegroundColor Yellow
    exit 1
}

# Navigate to the project directory
Set-Location $PSScriptRoot

# Initialize git repository (if not already initialized)
if (-not (Test-Path .git)) {
    Write-Host "Initializing git repository..." -ForegroundColor Cyan
    git init
} else {
    Write-Host "Git repository already initialized." -ForegroundColor Yellow
}

# Add all files
Write-Host "Adding files to git..." -ForegroundColor Cyan
git add .

# Create initial commit
Write-Host "Creating initial commit..." -ForegroundColor Cyan
git commit -m "Initial commit: Frank Lloyd Wright-inspired photography portfolio website"

Write-Host "`n=== Next Steps ===" -ForegroundColor Green
Write-Host "1. Create a new repository on GitHub named 'My-Website' (or your preferred name)" -ForegroundColor White
Write-Host "2. Copy the repository URL from GitHub" -ForegroundColor White
Write-Host "3. Run the following commands:" -ForegroundColor White
Write-Host "   git remote add origin <YOUR_GITHUB_REPO_URL>" -ForegroundColor Cyan
Write-Host "   git branch -M main" -ForegroundColor Cyan
Write-Host "   git push -u origin main" -ForegroundColor Cyan
Write-Host "`nOr if you prefer, you can run:" -ForegroundColor Yellow
Write-Host "   gh repo create My-Website --public --source=. --remote=origin --push" -ForegroundColor Cyan
Write-Host "   (if you have GitHub CLI installed)" -ForegroundColor Yellow
