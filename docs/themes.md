# GlyphGuard Theme System

GlyphGuard Desktop includes a persistent appearance system with support for:

- System
- Dark
- Light

The theme architecture is designed to keep the application visually consistent while allowing the main workspace to adapt to user preference.

---

## Theme Modes

### System

`System` follows the operating-system appearance preference.

If the operating system changes between light and dark mode, GlyphGuard can follow that preference while System mode is active.

### Dark

Dark mode uses:

- Dark workspace surfaces
- Dark panels
- High-contrast text
- Cyan and blue accents
- Dark inputs
- Dark technical cards

### Light

Light mode uses:

- Light workspace background
- White panels
- Dark text
- Light inputs
- Cyan and blue accents

The sidebar and header remain dark to preserve the GlyphGuard visual identity.

---

## Persistent Preference

The selected theme is stored locally.

Current storage key:

```text
glyphguard-theme
```

This allows GlyphGuard to restore the selected mode when the application is opened again.

---

## Theme Architecture

Theme logic is centralized in:

```text
apps/desktop/src/theme/index.ts
```

The theme system handles:

- Stored preference
- Theme resolution
- Applying the active mode
- Following system preference
- Updating document theme attributes

The active visual state is applied through attributes on the root document element.

---

## CSS Variables

The visual theme is controlled with centralized CSS variables.

Main theme file:

```text
apps/desktop/src/styles/variables.css
```

Common variable categories include:

```text
--bg-primary
--bg-secondary
--bg-panel
--bg-panel-hover
--bg-muted
--input-bg

--text-primary
--text-secondary
--text-muted

--border-color

--primary-button-bg
--primary-button-text

--secondary-button-bg
--secondary-button-text

--code-bg
```

Using shared variables prevents individual pages from defining unrelated theme colors.

---

## Shared Dark Shell

The application shell intentionally remains dark in both themes.

This includes:

- Sidebar
- Header
- Language selector shell
- Main brand area

This design choice creates a stable GlyphGuard identity while still allowing the main workspace to switch appearance.

---

## Dark Theme Direction

The dark theme is the strongest expression of the GlyphGuard visual identity.

It uses:

- Near-black navy workspace
- Slightly elevated panels
- Cyan primary actions
- Blue technical accents
- Soft gray secondary text
- Strong contrast for Unicode data

The interface avoids fully black surfaces where possible to preserve depth and readability.

---

## Light Theme Direction

The light theme does not simply invert the dark interface.

Instead, it uses:

- Light neutral workspace
- White content panels
- Dark readable text
- Light form controls
- Dark persistent shell
- Shared cyan actions

This keeps the application recognizable between themes.

---

## Inputs and Technical Areas

Text analysis areas must remain readable in both themes.

This includes:

- Scan Text textarea
- Compare textareas
- Inspector input
- Normalize input
- File result cards
- Unicode technical values

Inputs should use theme variables rather than hardcoded dark colors.

---

## Buttons

### Primary Actions

Primary actions use the GlyphGuard cyan accent.

Typical examples:

- Scan
- Open scanner
- Normalize
- Inspect

### Secondary Actions

Secondary actions adapt to the active theme.

In dark mode:

- Dark background
- Visible border
- Light text

In light mode:

- White background
- Dark text
- Strong enough border for contrast

---

## Accessibility Considerations

Theme design should maintain:

- Strong text contrast
- Visible focus states
- Clear disabled states
- Distinguishable active navigation
- Readable technical text
- Consistent hover feedback

Theme changes should never reduce the legibility of Unicode data.

---

## Current Status

```text
System mode               Implemented
Dark mode                 Implemented
Light mode                Implemented
Theme persistence         Implemented
System preference follow  Implemented
Dark shared shell         Implemented
Page compatibility        Mostly complete
Accessibility polish      In progress
```

---

## Planned Theme Improvements

Remaining visual work includes:

- Final contrast review
- Better focus-state consistency
- Reduced-motion support
- Final hover-state review
- Better disabled-state consistency
- Additional RTL + theme testing
- Final visual QA across all desktop pages

The theme system itself is already functional; remaining work is mostly interface polish.
