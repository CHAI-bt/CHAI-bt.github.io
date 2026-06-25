# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal academic course notes website deployed to GitHub Pages at `CHAI-bt.github.io`. It contains study notes for physics courses (currently electrodynamics, previously theory mechanics and analytic philosophy). The site is static HTML with no build system — just open the HTML files in a browser or serve locally.

## Architecture

**Single-file pages with shared patterns.** Each content page is a self-contained HTML file with embedded `<style>` and `<script>`. There is no bundler, framework, or shared component system — each page duplicates the CSS/JS patterns (sidebar, scrollspy, progress bar, MathJax config).

**Key structural elements in each content page:**
- `.sidebar` (fixed left nav) + `.sidebar-backdrop` (mobile overlay) + `#sidebarToggle` (hamburger button)
- `.container` holds the main content as a sequence of `<section class="section anchor" id="sec-xxx">` blocks
- `.math-block` wraps display LaTeX; `.math-inline` for inline
- `.note-box`, `.warning-box`, `.result-box` for callouts
- MathJax 3 loaded via CDN (`tex-mml-chtml.js`) with AMS tag support and `$`/`$$` delimiters

**Scrollspy + progress bar + back-to-top** are implemented as vanilla JS at the bottom of each page. The sidebar highlights the current section via `getBoundingClientRect()` on scroll (throttled via `requestAnimationFrame`).

**MathJax gotcha:** Inline `<` and `>` in HTML content must be escaped as `&lt;` `&gt` or `\lt` `\gt` — MathJax's `skipHtmlTypes: 'script'` does not protect against this. Previous commits fixed this repeatedly.

## Files

- `electrodynamics/Electrodynamics_Notes.html` — The main content page (~3580 lines). Contains 12 sections covering electrodynamics topics (Green's function, KK relations, propagators, multipole radiation, Liénard-Wiechert, periodic spectrum, etc.). Sidebar nav is the table of contents.
- `image_to_ascii/index.html` — Standalone web app for converting uploaded images to ASCII art. Pure client-side canvas pixel manipulation.
- `index.html` — Root landing page. Minimal card-grid page linking to the two content sections below.
- `.claude/settings.json`, `.claude/settings.local.json` — Claude Code settings (excluded from git via `.gitignore`).

## Common Commands

**Serve locally (required for MathJax CDN and some browser features):**
```bash
# Python 3
python -m http.server 8000

# Or Node.js
npx serve .
```
Then open `http://localhost:8000/electrodynamics/Electrodynamics_Notes.html`.

**Deploy:** Push to `main` branch — GitHub Pages serves automatically. No build step.

**Adding a new section to electrodynamics notes:**
1. Add a new `<section class="section anchor" id="sec-your-id">` block inside the `.container`
2. Add a corresponding `<li><a href="#sec-your-id">标题</a></li>` to the `<ul class="sidebar-nav">` at the top of the file
3. The scrollspy, progress bar, and back-to-top will pick it up automatically

**Adding a new standalone tool page:**
Create a new directory with its own `index.html` (like `image_to_ascii/`). No shared dependencies except optionally MathJax from CDN.

## Historical Context

The site previously had `mechanics/` (theory mechanics) and `intro_phil/` (analytic philosophy) directories with many chapter files, flashcards, and tests. These were deleted in commit `ee64fc6` ("清理") which removed ~25k lines and consolidated electrodynamics into a single file. The current structure is intentionally minimal.
