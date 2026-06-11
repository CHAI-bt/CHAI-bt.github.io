# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Chinese-language static website for a Peking University theoretical mechanics (理论力学) course, hosted on GitHub Pages. The site contains interactive study materials including lecture notes, formula comparisons, and a flashcard review system.

**Course context**: 赵鹏巍 (Zhao Peiwei) · 2026 Spring semester · 3 credits

## Development

No build system — pure static HTML/CSS/JS. To develop:

- Edit `.html` files directly in any text editor
- Open files in a browser to view changes (no dev server needed)
- MathJax is loaded from CDN for formula rendering

The site is deployed to GitHub Pages automatically from the default branch.

## Architecture

### Page Structure

Five standalone HTML pages sharing a common visual design:

| Page | Purpose |
|------|---------|
| `index.html` | Course home — info, syllabus, module navigation |
| `lagrange.html` | Lagrangian mechanics notes (constraints → Noether's theorem → three-body problem) |
| `hamilton.html` | Hamiltonian mechanics notes (Legendre transform → Penning trap → rigid body → Maupertuis principle) |
| `compare.html` | Side-by-side comparison of Newton/Lagrangian/Hamiltonian frameworks |
| `flashcards.html` | Interactive Q&A flashcard review (~80 cards covering all topics) |

### Shared Patterns

Each page follows a consistent two-column layout:
- **Left sidebar** — section navigation with collapsible sub-items and scroll-based active highlighting
- **Main content** — vertically stacked `.card` elements containing formulas, explanations, and highlight boxes

All pages include MathJax configured for Chinese content:
```javascript
MathJax = {
    tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
        processEscapes: true
    },
    options: { ignoreHtmlClass: 'no-mathjax' }
};
```

### CSS Variables

Each page defines its own color scheme via CSS custom properties. The primary color varies per section:
- Home: `#2563eb` (blue)
- Lagrangian: `#2563eb` (blue)
- Hamiltonian: `#7c3aed` (purple)
- Comparison: `#059669` (green)
- Flashcards: `#d97706` (amber)

### JavaScript Patterns

- **Navigation**: `toggleSection()` for collapsible sidebar sections, `scrollToSection()` for smooth scrolling with active state tracking
- **Scroll spy**: Each page tracks scroll position to highlight the current section in the sidebar
- **Flashcards**: `flashcardsData` array holds all Q&A pairs; cards are shuffled via Fisher-Yates; `MathJax.typesetPromise()` is called after each card update to re-render formulas

### Content Conventions

- All content is in Chinese (Simplified)
- Formula-heavy sections use `.formula-display` class for centered math blocks
- Highlight boxes (`.highlight-box`) come in semantic variants: default (blue), `.accent`, `.warn`
- Tags use `.tag` with `.tag-primary`, `.tag-accent`, `.tag-warn`, `.tag-success` variants
- Exam-highlighted content is marked with `<span class="tag tag-warn">考试重点</span>`

## Key Files

- `flashcards.html` — the largest file (~470 lines) containing all flashcard data and logic
- `compare.html` — the only page using `<table>` for structured comparison
- `index.html` — entry point with course metadata and overview cards

## Notes

- No external JavaScript libraries are used (only MathJax CDN)
- No CSS framework — all styles are hand-written in each file's `<style>` block
- The `.gitignore` excludes the `.claude/` directory
- Sidebar width is controlled by `--sidebar-width: 280px` and collapses to 240px on narrow viewports
