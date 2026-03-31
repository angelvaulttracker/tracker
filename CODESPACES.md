# Codespaces workflow

This repo can run in GitHub Codespaces without a separate build step.

## First-time setup

1. Push this repo to GitHub.
2. On GitHub, open the repository and choose **Code -> Codespaces -> Create codespace on main**.
3. Wait for the codespace to finish booting.
4. GitHub should auto-forward port `8000` and open a preview for the site.

If the preview does not open automatically, open the terminal in the codespace and run:

```bash
bash .devcontainer/start-preview.sh
```

Then open the forwarded port `8000`.

## Phone workflow

1. Open the repo or codespace in your phone browser.
2. Open the preview URL so you can see the website.
3. In ChatGPT/Codex web, connect GitHub and give it access to this repository.
4. Ask Codex to make changes in the repo.
5. Review the branch or pull request Codex creates, then merge it.
6. In the codespace, pull the latest changes if needed and refresh the preview.
7. Later on your Mac, run `git pull` in this repo.

## Important note

Codex web works against the GitHub repository, not directly against your Mac's local files. The source of truth is GitHub, and this local folder catches up when you pull.
