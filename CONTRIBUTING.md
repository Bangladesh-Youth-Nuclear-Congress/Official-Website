# Contributing to the BYNC Official Website

Thanks for helping build the **Bangladesh Youth Nuclear Congress** website! To keep `main` stable
and always deployable, everyone follows the same simple workflow.

## 🥇 Golden rule
**Never commit directly to `main`.** Every change goes through a branch + Pull Request (PR).

## Workflow
```bash
# 1. Start from the latest main
git checkout main
git pull

# 2. Create a branch for your work
git checkout -b feat/events-page      # new feature/section
#   git checkout -b fix/mobile-nav    # bug fix
#   git checkout -b content/about-copy# text / images

# 3. Make changes, then preview locally (see below)

# 4. Commit
git add -A
git commit -m "Add events page section"

# 5. Push your branch
git push -u origin feat/events-page

# 6. Open a Pull Request into main on GitHub, ask a teammate to review,
#    merge once approved, then delete the branch.
```

## Branch naming
| Prefix | Use for |
|--------|---------|
| `feat/` | new features or sections |
| `fix/` | bug fixes |
| `content/` | text, copy, images |
| `chore/` | setup, tooling, docs |

## ⚠️ It's one big file
The whole site lives in a single **`index.html`**. To avoid painful merge conflicts:
- Coordinate who is editing which section.
- Keep PRs **small and focused**.
- `git pull` the latest `main` before you open a PR.

## Local preview
No build step — just serve the folder:
```bash
python -m http.server 8000
# open http://localhost:8000
```

## ✅ Before asking to publish (GitHub Pages)
- [ ] Contact form wired to Formspree (recipient = **bync.bd@gmail.com**)
- [ ] All links work; no placeholder text left
- [ ] Looks correct on **mobile and desktop**
- [ ] Reviewed by at least one other person

## 🚫 Don't commit
Large or sensitive files (the sponsorship PDF, spreadsheets, raw original images) are listed in
`.gitignore`. Keep them out of the repo — don't `git add -f` them.

---
Questions? **bync.bd@gmail.com**
