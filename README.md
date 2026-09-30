# GlyphGuard

<p align="center">
  <img
    src="apps/desktop/assets/glyphguard-icon.png"
    alt="GlyphGuard"
    width="128"
  />
</p>

<p align="center">
  <strong>Unicode Security, Made Visible.</strong>
</p>

<p align="center">
  A modern desktop interface for inspecting Unicode, suspicious text,
  normalization, confusable characters and file content.
</p>

<p align="center">
  <a href="README.es.md">🇪🇸 Leer en Español</a>
</p>

---

## Overview

GlyphGuard Desktop is a Unicode security application built with:

- Tauri
- Vue 3
- TypeScript
- Rust

It provides a clean visual workspace for inspecting text, comparing strings, reviewing Unicode structure, scanning files and exploring normalization behavior locally.

---

## Desktop Features

GlyphGuard currently includes:

- Dashboard
- Scan Text
- Files
- Compare
- Inspector
- Normalize
- Settings

The interface also includes:

- Dark, Light and System themes
- 12 interface languages
- RTL support for Arabic
- Persistent language and theme preferences
- Custom GlyphGuard branding
- Native Windows packaging
- File and directory scanning workflows
- Unicode findings with technical metadata

---

## Main Tools

### Scan Text

Analyze pasted or typed text and inspect findings such as:

- Mixed scripts
- Invisible characters
- Bidi controls
- Unicode confusables
- Suspicious whitespace

Findings can include:

- Rule ID
- Severity
- Character
- Code point
- Unicode name
- Scalar index
- Byte index
- Escaped representation
- Explanation

### Files

Scan individual files or complete directories through a visual workflow.

The interface can display:

- File metadata
- Encoding information
- UTF-8 BOM information
- Finding counts
- Suspicious files
- Skipped files
- Directory summaries

### Compare

Compare two strings side by side using:

- Binary equality
- NFC equality
- NFKC equality
- Confusable skeleton equality
- Scalar-level differences

### Inspector

Inspect Unicode text at a deeper level with:

- Unicode scalars
- Code points
- Unicode names
- UTF-8 bytes
- Scalar positions
- Byte positions
- Grapheme clusters

### Normalize

Review Unicode normalization forms:

- NFC
- NFD
- NFKC
- NFKD

GlyphGuard also indicates whether each normalized form differs from the original text.

---

## Languages

GlyphGuard Desktop currently supports 12 interface languages:

| Language | Native name |
|---|---|
| 🇺🇸 English | English |
| 🇪🇸 Spanish | Español |
| 🇵🇹 Portuguese | Português |
| 🇫🇷 French | Français |
| 🇩🇪 German | Deutsch |
| 🇮🇹 Italian | Italiano |
| 🇯🇵 Japanese | 日本語 |
| 🇰🇷 Korean | 한국어 |
| 🇨🇳 Simplified Chinese | 简体中文 |
| 🇹🇼 Traditional Chinese | 繁體中文 |
| 🇷🇺 Russian | Русский |
| 🇸🇦 Arabic | العربية |

More details:

[Localization](docs/localization.md)

---

## Themes

Available appearance modes:

- System
- Dark
- Light

The selected preference is stored locally.

The sidebar and header remain dark to preserve the GlyphGuard visual identity while the main workspace adapts to the selected mode.

More details:

[Theme System](docs/themes.md)

---

## Branding

GlyphGuard includes a dedicated visual identity and application icon built around:

- Deep navy
- Cyan
- Blue
- Shield-inspired geometry
- A stylized `G`

The same branding is used across the desktop interface and native application assets.

More details:

[Branding](docs/branding.md)

---

## Running GlyphGuard Desktop

From:

```powershell
cd C:\Users\Alejandro\GlyphGuard\apps\desktop
```

Install dependencies:

```powershell
npm install
```

Run the frontend:

```powershell
npm run dev
```

Run the native desktop application:

```powershell
npm run tauri dev
```

Create a production build:

```powershell
npm run build
npm run tauri build
```

---

## Current Desktop Packaging

The current Windows build can generate:

- Native executable
- MSI installer
- NSIS setup executable

Current package names include:

```text
GlyphGuard_0.1.0_x64_en-US.msi
GlyphGuard_0.1.0_x64-setup.exe
```

---

## Documentation

Detailed desktop documentation is kept separate to keep this README focused.

- [Desktop Interface](docs/desktop.md)
- [Localization](docs/localization.md)
- [Theme System](docs/themes.md)
- [Branding](docs/branding.md)
- [Desktop Visual Roadmap](docs/desktop-roadmap.md)

---

## Current Visual Status

The desktop experience is already substantially implemented.

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

Remaining work is mainly focused on:

- Accessibility
- Keyboard navigation
- Better empty/loading/error states
- RTL refinement
- Translation polish
- Character highlighting
- Copy actions
- File result filtering
- Compare visualization
- Inspector view options
- Normalization difference highlighting
- Final visual polish

See the full plan here:

[Desktop Visual Roadmap](docs/desktop-roadmap.md)

---

## Current Version

```text
GlyphGuard Desktop v0.1.0
```

GlyphGuard Desktop is evolving toward a polished, multilingual and technically focused Unicode security workspace.
