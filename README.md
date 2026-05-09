# hf — tiny git workflow helper

Three commands you actually use every day. No config, no templates, no surprises.

This repo replaces the original Ruby version (now in [`Ruby/`](./Ruby)) with a small Node.js implementation.

## Install

Requires Node.js 18+.

```bash
git clone https://github.com/ruslanpalagin/git-hotfix.git
cd git-hotfix
npm install
npm install -g .
```

`hf` is now available in your shell.

To update later:

```bash
cd /path/to/git-hotfix
git pull
npm install -g .
```

## Commands

### `hf save "<message>"`

Stage everything, commit, pull, push the current branch.

If the current branch name contains `/`, the part after the last `/` is used as a task prefix. Branch `feature/123` + message `"fix typo"` → commit message `#123: fix typo`. Otherwise the message is used as-is.

```bash
hf save "fix typo"
```

Steps:

1. `git add -A`
2. `git commit -m '<prefix><message>'`
3. `git pull origin <current>` (only if the branch exists on origin)
4. `git push -u origin <current>`

If there are no local changes, the commit step is skipped and the command just syncs with origin.

### `hf get`

Pull the current branch from origin. Refuses to run if there are uncommitted changes.

```bash
hf get
```

### `hf my`

List the 20 most recently committed local branches, sorted by last commit date.

```bash
hf my
```

## Confirmation

Before running anything that touches the repo, `hf` prints the exact git commands it is about to execute and asks `Ok? (y/n) [y]:`. Hit Enter to confirm or type `n` to abort. `hf my` is read-only and skips the prompt.

## Quoting

Commit messages cannot contain `'` or `"`. `hf` will refuse and exit. Rephrase or use a different word.

## Project layout

```
bin/hf                 entry script (shebang + commander)
src/git.js             git helpers (read-only git invocations)
src/run.js             print commands → confirm → exec
src/commands/get.js
src/commands/save.js
src/commands/my.js
Ruby/                  the original Ruby implementation, kept for reference
```

## Why so small?

The Ruby version had templates, `.hf.yml` config, deploy hooks, multi-branch merges, `delete-merged`, `init`, and more. In practice, the three commands above cover the daily flow. Anything missing? Open an issue or send a PR.
