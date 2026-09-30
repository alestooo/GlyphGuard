# GlyphGuard Localization

GlyphGuard Desktop includes a multilingual interface designed as part of the application architecture.

The current desktop interface supports 12 languages.

---

## Supported Languages

| Code | Language | Native name |
|---|---|---|
| `en` | English | English |
| `es` | Spanish | Español |
| `pt` | Portuguese | Português |
| `fr` | French | Français |
| `de` | German | Deutsch |
| `it` | Italian | Italiano |
| `ja` | Japanese | 日本語 |
| `ko` | Korean | 한국어 |
| `zh-CN` | Simplified Chinese | 简体中文 |
| `zh-TW` | Traditional Chinese | 繁體中文 |
| `ru` | Russian | Русский |
| `ar` | Arabic | العربية |

English is the default interface language.

---

## Localization Structure

Current localization files are stored in:

```text
apps/desktop/src/i18n/
├── index.ts
├── types.ts
└── locales/
    ├── en.ts
    ├── es.ts
    ├── pt.ts
    ├── fr.ts
    ├── de.ts
    ├── it.ts
    ├── ja.ts
    ├── ko.ts
    ├── zh-CN.ts
    ├── zh-TW.ts
    ├── ru.ts
    └── ar.ts
```

The desktop application uses Vue I18n.

---

## Language Selection

Users can change the interface language from:

- The application header
- Settings

The header selector displays:

- Country flag
- Full language name
- Active selection

The interface updates immediately after changing the language.

---

## Persistent Language Preference

The selected language is stored locally.

Current storage key:

```text
glyphguard-language
```

GlyphGuard restores the selected interface language when reopened.

---

## Document Language

When the interface language changes, GlyphGuard also updates the document language.

Example:

```html
<html lang="es">
```

This improves:

- Accessibility
- Screen-reader behavior
- Browser language metadata
- Text rendering expectations

---

## RTL Support

Arabic uses right-to-left interface direction.

When Arabic is selected, GlyphGuard updates the root document direction.

Example:

```html
<html lang="ar" dir="rtl">
```

Technical text areas may preserve left-to-right behavior when needed for predictable Unicode analysis.

---

## Technical Values Are Not Translated

Some content intentionally remains unchanged across interface languages.

Examples include:

```text
Unicode
UTF-8
NFC
NFD
NFKC
NFKD
GG001
GG002
GG003
GG004
GG005
U+202E
LATIN SMALL LETTER A
```

Official Unicode names remain technical rather than being translated into interface prose.

---

## User Input Is Never Translated

GlyphGuard localization affects the interface only.

Text entered by the user must remain exactly as provided.

This is especially important because changing user input would invalidate:

- Code-point positions
- Byte positions
- Normalization analysis
- Security findings
- Confusable comparisons

---

## Current Localized Areas

The current translation system covers the main desktop interface, including:

- Sidebar
- Header
- Dashboard
- Scan Text
- Files
- Compare
- Inspector
- Normalize
- Settings
- Common actions
- Common status labels
- Error labels
- Result labels

---

## Flags

The language selector uses visual flag icons.

The current UI uses the `flag-icons` package.

Representative mappings include:

```text
English                US
Spanish                ES
Portuguese             PT
French                 FR
German                 DE
Italian                IT
Japanese               JP
Korean                 KR
Simplified Chinese     CN
Traditional Chinese    TW
Russian                RU
Arabic                 SA
```

Flags are used as interface aids and do not replace the full language name.

---

## Translation Design Principles

### Keep technical terminology stable

Unicode standards and technical identifiers should remain recognizable.

### Translate interface language, not analyzed content

Buttons, descriptions and navigation can be localized.

User text and technical Unicode output should remain unchanged.

### Support longer strings

Layouts should not assume English-length labels.

### Preserve readability

CJK and Arabic text should remain readable without damaging technical data layout.

### Keep language names explicit

The selector uses full language names instead of abbreviations like `EN` or `ES`.

---

## Current Status

```text
English                 Implemented
Spanish                 Implemented
Portuguese              Implemented
French                  Implemented
German                  Implemented
Italian                 Implemented
Japanese                Implemented
Korean                  Implemented
Simplified Chinese      Implemented
Traditional Chinese     Implemented
Russian                 Implemented
Arabic                  Implemented

Language persistence    Implemented
Header selector         Implemented
Settings selector       Implemented
Flag icons              Implemented
RTL base support        Implemented
Translation QA          Ongoing
```

---

## Planned Localization Improvements

Remaining visual and language work includes:

- Translation review for all 12 languages
- Better long-string layout handling
- More extensive Arabic RTL testing
- Better Arabic alignment in dense technical views
- Better Japanese typography
- Better Korean typography
- Better Simplified Chinese typography
- Better Traditional Chinese typography
- Additional pluralization review
- Better locale-specific spacing where needed
- Final accessibility review for language controls

The multilingual system is already operational; remaining work is mainly refinement and quality assurance.
