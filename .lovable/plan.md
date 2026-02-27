

# Fix Favicon: Replace heart icon with S logo

## Problem
The favicon files (`favicon-32x32.png`, `favicon-16x16.png`, `apple-touch-icon.png`) are showing a heart icon instead of the branded S logo. The correct logo exists in `public/favicon.png` but the copies made previously may have been corrupted.

## Solution
Re-copy `public/favicon.png` (which contains the correct S superellipse logo) to overwrite:
- `public/favicon-32x32.png`
- `public/favicon-16x16.png`
- `public/apple-touch-icon.png`

Also regenerate `public/favicon.ico` from the same source if needed.

No code changes required -- only asset file replacements.

