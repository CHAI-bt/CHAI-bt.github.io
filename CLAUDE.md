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

The site is organized into three main sections:

```
根目录/
├── index.html              # 统一首页 - 两个课程的入口
├── mechanics/              # 理论力学文件夹
│   ├── index.html          # 理论力学主页
│   ├── lagrange.html       # 拉格朗日力学
│   ├── hamilton.html       # 哈密顿力学
│   ├── compare.html        # 力学对比
│   └── flashcards.html     # 闪卡复习
└── epa/                    # 经典电动力学文件夹
    ├── index.html          # 电动力学主页
    ├── ch4.html            # 第四章入口页
    ├── ch5.html            # 第五章入口页
    ├── ch6.html            # 第六章入口页
    ├── 第四章 电磁波的传播-知识清单.html
    ├── 第四章 电磁波的传播-章节测试.html
    ├── 第五章 电磁波的辐射和散射-知识清单.html
    ├── 第五章 电磁波的辐射和散射-章节测试.html
    ├── 第六章 运动带电粒子的辐射-知识清单.html
    └── 第六章 运动带电粒子的辐射-章节测试.html
```

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

- `index.html` — 统一首页，两个课程的入口
- `mechanics/index.html` — 理论力学主页
- `mechanics/flashcards.html` — 闪卡复习（~470行）
- `mechanics/compare.html` — 力学对比（唯一使用 `<table>` 的页面）
- `epa/index.html` — 电动力学主页
- `epa/ch4.html`, `epa/ch5.html`, `epa/ch6.html` — 电动力学各章入口页

## Notes

- No external JavaScript libraries are used (only MathJax CDN)
- No CSS framework — all styles are hand-written in each file's `<style>` block
- The `.gitignore` excludes the `.claude/` directory
- Sidebar width is controlled by `--sidebar-width: 280px` (240px on narrow viewports)
- 电动力学页面（epa/）使用纸质风格背景（`#fdf6e3`），理论力学页面使用现代白色风格
- 所有页面都有统一的侧边栏导航，支持响应式布局
