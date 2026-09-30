# GlyphGuard Desktop Visual Roadmap

This roadmap covers the remaining **desktop and visual experience only**.

It intentionally focuses on:

- UI
- UX
- Localization
- Themes
- Accessibility
- Desktop presentation
- Visual polish

---

## Current Overall Visual Status

Approximate current progress:

```text
Application shell        ███████████████████░  95%
Dashboard                ███████████████████░  95%
Scan Text                ██████████████████░░  90%
Files                    █████████████████░░░  85%
Compare                  ██████████████████░░  90%
Inspector                ██████████████████░░  90%
Normalize                ██████████████████░░  90%
Settings                 █████████████████░░░  85%
Themes                   ███████████████████░  95%
Localization             ██████████████████░░  90%
Branding                 ███████████████████░  95%
```

The remaining work is primarily refinement rather than initial interface construction.

---

# Phase 1 — Interface Consistency

## General spacing

Review:

- Page margins
- Card spacing
- Section gaps
- Button alignment
- Input alignment
- Footer spacing
- Sidebar spacing

Goal:

Create a consistent rhythm across every page.

---

## Shared card system

Standardize:

- Border radius
- Border color
- Panel padding
- Hover behavior
- Header spacing
- Technical-value presentation

Goal:

Make Scan, Files, Compare, Inspector and Normalize feel like parts of the same application.

---

## Buttons

Review:

- Primary actions
- Secondary actions
- Disabled state
- Loading state
- Hover state
- Focus state

Goal:

All pages should use the same action hierarchy.

---

# Phase 2 — Scan Text Polish

Planned improvements:

- Character highlighting in source input
- Better severity hierarchy
- Rule-specific icons
- Expand/collapse finding cards
- Copy finding
- Copy code point
- Copy escaped representation
- Jump to scalar position
- Jump to byte position
- Better clean-result state
- Better scanning indicator

Goal:

Make findings easier to understand and navigate.

---

# Phase 3 — Files Experience

Planned improvements:

- File-type indicators
- Expandable directory result groups
- Better skipped-file explanations
- Sort results
- Search files
- Filter findings
- Filter by severity
- Clear result action
- Better progress feedback
- Better large-directory behavior

Goal:

Make directory scanning visually manageable even with many files.

---

# Phase 4 — Compare Experience

Planned improvements:

- Character-level highlighting
- Inline difference view
- Better scalar difference cards
- Copy left value
- Copy right value
- Swap left/right
- Clear comparison
- Better equality indicators
- Session comparison history

Goal:

Make visually deceptive strings easier to compare.

---

# Phase 5 — Inspector Experience

Planned improvements:

- Table view
- Card view
- Script information
- Character category
- Search by scalar index
- Search by code point
- Copy character
- Copy code point
- Copy UTF-8 bytes
- Better grapheme visualization

Goal:

Turn Inspector into the most detailed technical Unicode view in the desktop app.

---

# Phase 6 — Normalize Experience

Planned improvements:

- Character-by-character comparison
- Difference highlighting
- Copy normalized value
- Clear action
- Better explanation for each normalization form
- More obvious changed/unchanged state

Goal:

Make normalization differences understandable at a glance.

---

# Phase 7 — Dashboard Improvements

Potential additions:

- Recent analysis
- Recent files
- Recent comparisons
- Detection overview
- Quick shortcuts
- Application status
- Current language
- Current theme

Goal:

Make the Dashboard more useful without turning it into a cluttered analytics screen.

---

# Phase 8 — Settings Improvements

Planned improvements:

- Better rule descriptions
- Stronger enabled/disabled visuals
- Persistent rule controls
- Improved theme selector
- Improved language settings
- Application information
- Version information
- About screen

Goal:

Make Settings feel complete and intentional.

---

# Phase 9 — Localization QA

Current supported languages:

```text
English
Spanish
Portuguese
French
German
Italian
Japanese
Korean
Simplified Chinese
Traditional Chinese
Russian
Arabic
```

Planned review:

- Long labels
- Button overflow
- Sidebar text
- Header selector
- Settings descriptions
- Result labels
- Error messages
- Empty states

Goal:

Ensure every supported language feels native to the layout.

---

# Phase 10 — RTL Refinement

Arabic already enables RTL direction.

Remaining work:

- Review sidebar alignment
- Review header layout
- Review cards
- Review action groups
- Review technical tables
- Keep technical Unicode values readable
- Preserve LTR behavior where technically necessary

Goal:

Support Arabic without damaging technical analysis layout.

---

# Phase 11 — CJK Typography

Review:

- Japanese
- Korean
- Simplified Chinese
- Traditional Chinese

Focus areas:

- Font rendering
- Line height
- Button height
- Dense technical cards
- Language selector
- Long explanations

Goal:

Keep CJK text visually balanced with Latin-script UI.

---

# Phase 12 — Accessibility

Planned improvements:

- Keyboard-only navigation
- Logical tab order
- Visible focus states
- ARIA labels
- Screen-reader review
- Contrast review
- Reduced-motion support
- Better disabled-state semantics

Goal:

Make the desktop application usable without relying only on mouse interaction.

---

# Phase 13 — Empty, Loading and Error States

Every major page should have polished visual states for:

```text
Idle
Loading
Success
Empty
Error
Disabled
```

Goal:

Avoid pages that feel unfinished when there is no result yet.

---

# Phase 14 — Branding Finalization

Remaining branding review:

- Sidebar logo spacing
- Small-size icon readability
- About screen presentation
- Installer visual consistency
- Documentation screenshot consistency

Goal:

Use the GlyphGuard identity consistently without over-branding the interface.

---

# Phase 15 — Final Desktop QA

Before considering the visual desktop experience complete:

- Test every page in Dark
- Test every page in Light
- Test System mode
- Test all 12 languages
- Test Arabic RTL
- Test narrow window sizes
- Test long text
- Test empty input
- Test very large input
- Test error states
- Test keyboard navigation
- Test native executable
- Test installer presentation

---

## Visual Completion Target

The final desktop experience should feel:

- Technical
- Clean
- Consistent
- Multilingual
- Accessible
- Native
- Focused
- Reliable

The objective is not to add unnecessary visual complexity.

The goal is to make Unicode security information easier to understand while preserving the technical detail that makes GlyphGuard useful.
