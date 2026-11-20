Write-Host "Restoring repository to baseline-stable snapshot (commit 001d894)..." -ForegroundColor Yellow

# Reset working directory to the tagged baseline
git reset --hard baseline-stable
git clean -fd

# Rebuild Next.js production bundle
npm run build

Write-Host "Successfully restored to pristine baseline snapshot!" -ForegroundColor Green
