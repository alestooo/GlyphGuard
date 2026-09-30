# GlyphGuard Desktop Interface

GlyphGuard Desktop is the visual application layer of GlyphGuard.

It is built with:

- Tauri
- Vue 3
- TypeScript
- Rust

The interface is designed as a focused local Unicode security workspace.

---

## Application Layout

The desktop application uses three primary visual regions:

```text
┌─────────────────────────────────────────────────────┐
│ Header                                              │
├───────────────┬─────────────────────────────────────┤
│               │                                     │
│ Sidebar       │ Main Workspace                      │
│               │                                     │
│               │                                     │
└───────────────┴─────────────────────────────────────┘
```

### Sidebar

The sidebar provides permanent navigation between the main tools.

Current entries:

- Dashboard
- Scan Text
- Files
- Compare
- Inspector
- Normalize
- Settings

The sidebar also contains:

- GlyphGuard branding
- Desktop label
- Version display

### Header

The application header currently contains:

- Local analysis context
- Language selector
- Engine-ready status

The header remains dark across themes.

### Main Workspace

The main content area changes according to the active page.

It supports both dark and light appearance modes.

---

## Dashboard

The Dashboard acts as the entry point to the desktop experience.

Current visual content includes:

- Page title
- Workspace description
- Quick Scan Text action
- Quick Compare action
- GlyphGuard Core status
- Active detection categories

Current categories:

- Mixed scripts
- Invisible characters
- Bidi controls
- Unicode confusables
- Suspicious whitespace

---

## Scan Text

The Scan Text page is the main visual text-analysis workspace.

Current interface includes:

- Large text input
- Character count
- Scan action
- Loading state
- Error state
- No-findings state
- Finding count
- Finding cards

Finding cards can display:

```text
Rule ID
Severity
Character
Code point
Unicode name
Scalar index
Byte index
Escaped representation
Explanation
```

The page is designed to make suspicious Unicode findings understandable without hiding technical detail.

---

## Files

The Files page provides visual file and directory analysis.

Current interface includes:

- Drag-and-drop area
- Select file
- Select folder
- File result view
- Directory result view
- Error states
- Summary information
- Suspicious file results
- Skipped files

File information can include:

- Path
- Encoding
- BOM information
- Byte length
- Finding count

Directory summaries can include:

- Files discovered
- Files scanned
- Files skipped
- Suspicious files
- Total findings

---

## Compare

The Compare page places two strings side by side.

Current interface includes:

- Left text input
- Right text input
- Compare action
- Comparison summary
- Skeleton information
- Scalar differences

Comparison summary can display:

- Binary equality
- NFC equality
- NFKC equality
- Confusable skeleton equality

Detailed differences can display:

- Position
- Left value
- Right value
- Unicode code point
- Unicode name

---

## Inspector

The Inspector provides a deeper Unicode-oriented view.

Current visual sections include:

- Input
- Scalars
- Graphemes

Scalar information can display:

- Character
- Code point
- Unicode name
- Scalar position
- Byte position
- UTF-8 bytes

Grapheme information can display:

- Grapheme index
- Grapheme value
- Scalar count
- Byte count

---

## Normalize

The Normalize page displays Unicode normalization forms.

Current output includes:

- Original
- NFC
- NFD
- NFKC
- NFKD

Each result is displayed in its own visual block.

The interface also indicates whether a normalized result changed relative to the original input.

---

## Settings

Settings currently contains three primary visual areas:

### Language

Allows the user to choose the interface language.

### Detection Rules

Displays controls for:

```text
GG001 Mixed Scripts
GG002 Invisible Characters
GG003 Bidi Controls
GG004 Unicode Confusables
GG005 Suspicious Whitespace
```

### Appearance

Allows the user to select:

- System
- Dark
- Light

Theme preference is persistent.

---

## Shared Components

Reusable interface components include:

```text
components/
├── common/
│   └── PageTitle.vue
│
├── findings/
│   ├── FindingCard.vue
│   ├── FindingList.vue
│   └── SeverityBadge.vue
│
└── layout/
    ├── AppLayout.vue
    ├── Header.vue
    └── Sidebar.vue
```

This structure keeps visual behavior consistent across the application.

---

## Desktop Pages

Current desktop pages:

```text
pages/
├── DashboardPage.vue
├── ScanPage.vue
├── FilesPage.vue
├── ComparePage.vue
├── InspectorPage.vue
├── NormalizePage.vue
└── SettingsPage.vue
```

---

## Desktop Services

The frontend communicates with the local application layer through:

```text
apps/desktop/src/services/glyphguard.ts
```

The visual pages use this service instead of embedding native command logic directly into components.

This keeps UI code easier to maintain.

---

## Responsive Behavior

GlyphGuard is primarily designed as a desktop application.

However, the interface should still behave correctly at narrower application widths.

Current design goals include:

- Stable navigation
- Avoiding horizontal overflow
- Stackable content when needed
- Readable inputs
- Readable technical results
- Usable language selection

Responsive behavior will continue to be refined.

---

## Visual States

The desktop interface should consistently support:

- Idle
- Loading
- Success
- Empty result
- Error
- Disabled
- Active
- Hover
- Keyboard focus

Not every page has final polish for all states yet.

---

## Current Desktop Status

```text
Application shell        95%
Dashboard                95%
Scan Text                90%
Files                    85%
Compare                  90%
Inspector                90%
Normalize                90%
Settings                 85%
Themes                   95%
Localization             90%
Branding                 95%
```

---

## Planned Desktop Improvements

Remaining desktop work includes:

- Final spacing consistency
- Improved keyboard navigation
- Improved focus states
- Better loading feedback
- Better empty states
- Better error presentation
- Better success feedback
- Character highlighting
- Copy actions
- Better file filtering
- Better compare differences
- Inspector display modes
- Better normalization differences
- Improved RTL behavior
- Translation polish
- Accessibility refinement
- About screen
- Version information

For a more detailed visual plan, see:

[Desktop Visual Roadmap](desktop-roadmap.md)
