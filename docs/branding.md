# GlyphGuard Branding

GlyphGuard uses a visual identity designed around clarity, security and Unicode inspection.

The branding is intentionally technical and minimal so it can work consistently across the desktop application, native installers, executable icons and interface elements.

---

## Visual Identity

The current GlyphGuard identity is built around:

- Deep navy backgrounds
- Cyan highlights
- Bright blue accents
- Shield-inspired geometry
- A stylized `G`
- Clean technical shapes
- High contrast
- Minimal decorative noise

The goal is to communicate:

- Security
- Text inspection
- Technical precision
- Trust
- Modern desktop tooling

---

## Primary Logo

The primary GlyphGuard mark combines:

- A shield-like outer silhouette
- A stylized `G`
- Blue and cyan visual separation
- Strong geometric construction

The icon is designed to remain recognizable at both large and small sizes.

Primary source asset:

```text
apps/desktop/assets/glyphguard-icon.png
```

This file should be treated as the visual master for application icon generation.

---

## Application Logo

A reduced application logo is used inside the desktop interface.

Current frontend asset:

```text
apps/desktop/public/glyphguard-logo.png
```

Typical uses include:

- Sidebar branding
- Application identity
- Internal visual references

The logo should not be stretched, skewed or recolored independently from the main visual system.

---

## Favicon

The application also includes a small favicon generated from the GlyphGuard icon.

Current file:

```text
apps/desktop/public/favicon.png
```

This is primarily used while running the frontend in a browser during development.

---

## Native Icon Assets

Tauri generates native icon resources from the master GlyphGuard image.

Current icon directory:

```text
apps/desktop/src-tauri/icons/
```

Generated assets include:

```text
32x32.png
64x64.png
128x128.png
128x128@2x.png
icon.png
icon.ico
icon.icns
StoreLogo.png
Square30x30Logo.png
Square44x44Logo.png
Square71x71Logo.png
Square89x89Logo.png
Square107x107Logo.png
Square142x142Logo.png
Square150x150Logo.png
Square284x284Logo.png
Square310x310Logo.png
```

Additional mobile icon assets are also generated for:

- Android
- iOS

---

## Regenerating Native Icons

From:

```powershell
cd C:\Users\Alejandro\GlyphGuard\apps\desktop
```

run:

```powershell
npx tauri icon .\assets\glyphguard-icon.png
```

This regenerates the native application icon set from the master image.

---

## Color Direction

GlyphGuard currently uses a visual palette centered around dark neutral surfaces with cyan and blue accents.

Representative colors include:

```text
Deep shell background     #0D141D
Sidebar background        #0D1723
Dark panel                #121B27
Primary cyan              #22B8FF
Primary text              #F4F7FB
Secondary text            #AEB9C7
```

Light mode introduces lighter workspace surfaces while preserving the dark shell identity.

The exact active values are controlled through the theme CSS variables.

---

## Brand Usage Principles

### Keep the shell recognizable

The sidebar and header should maintain the GlyphGuard dark identity across themes.

### Avoid unnecessary visual effects

The logo should not rely on excessive glow, blur or heavy decorative effects.

### Preserve technical clarity

Branding must never make technical data harder to read.

### Maintain consistent icon sizing

Application icons should always use generated native sizes instead of manually stretching a single raster image.

### Keep the logo separate from content

The logo represents the application and should not be reused as a generic decoration inside analysis results.

---

## Typography Direction

GlyphGuard uses a technical and compact visual language.

Typography should prioritize:

- Readability
- Clear hierarchy
- Good Unicode rendering
- Strong code-point visibility
- Consistent spacing
- Support for multilingual content

Technical values such as:

```text
U+202E
UTF-8
NFC
NFKC
GG001
```

should remain visually distinct from explanatory prose.

---

## Brand Placement

Current and intended locations include:

- Native application executable
- Windows taskbar
- Installer
- Sidebar
- Browser favicon during frontend development
- Application documentation
- Future About screen

---

## Current Status

```text
Master icon              Complete
Native icon generation   Complete
Windows ICO              Complete
macOS ICNS               Complete
PNG sizes                Complete
Android assets           Complete
iOS assets               Complete
Sidebar logo             Complete / integrated
Favicon                  Complete
Brand consistency        Ongoing polish
```

---

## Planned Branding Improvements

Remaining visual branding work may include:

- Final spacing review around the sidebar logo
- Improved About screen presentation
- Optional monochrome logo variant
- Optional simplified small-size mark
- Documentation screenshots with consistent branding
- Final review of installer presentation

The main GlyphGuard identity is already established and should remain stable while the rest of the desktop interface is polished.
