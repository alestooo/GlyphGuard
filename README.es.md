# GlyphGuard

<p align="center">
  <img
    src="apps/desktop/assets/glyphguard-icon.png"
    alt="GlyphGuard"
    width="128"
  />
</p>

<p align="center">
  <strong>Seguridad Unicode, de forma visual.</strong>
</p>

<p align="center">
  Una aplicación de escritorio moderna para inspeccionar Unicode,
  texto sospechoso, normalización, caracteres confundibles y contenido de archivos.
</p>

<p align="center">
  <a href="README.md">🇺🇸 English</a>
</p>

---

## Descripción general

GlyphGuard Desktop es una aplicación de seguridad Unicode construida con:

- Tauri
- Vue 3
- TypeScript
- Rust

Ofrece un espacio de trabajo visual y limpio para inspeccionar texto, comparar cadenas, revisar estructuras Unicode, analizar archivos y explorar el comportamiento de normalización de forma local.

---

## Funciones de escritorio

GlyphGuard actualmente incluye:

- Panel
- Analizar texto
- Archivos
- Comparar
- Inspector
- Normalizar
- Configuración

La interfaz también incluye:

- Temas Oscuro, Claro y Sistema
- 12 idiomas de interfaz
- Soporte RTL para árabe
- Persistencia de idioma y tema
- Branding propio de GlyphGuard
- Empaquetado nativo para Windows
- Flujo visual para archivos y directorios
- Hallazgos Unicode con información técnica

---

## Herramientas principales

### Analizar texto

Permite analizar texto escrito o pegado y revisar hallazgos como:

- Mezcla de escrituras
- Caracteres invisibles
- Controles bidi
- Caracteres Unicode confundibles
- Espacios sospechosos

Los hallazgos pueden incluir:

- ID de regla
- Severidad
- Carácter
- Punto de código
- Nombre Unicode
- Índice escalar
- Índice de byte
- Representación escapada
- Explicación

### Archivos

Permite analizar archivos individuales o directorios completos mediante una interfaz visual.

La aplicación puede mostrar:

- Metadatos del archivo
- Información de codificación
- Información BOM UTF-8
- Cantidad de hallazgos
- Archivos sospechosos
- Archivos omitidos
- Resúmenes de directorio

### Comparar

Permite comparar dos cadenas lado a lado mediante:

- Igualdad binaria
- Igualdad NFC
- Igualdad NFKC
- Igualdad de esqueletos confundibles
- Diferencias a nivel escalar

### Inspector

Permite inspeccionar texto Unicode con mayor detalle mediante:

- Escalares Unicode
- Puntos de código
- Nombres Unicode
- Bytes UTF-8
- Posiciones escalares
- Posiciones de bytes
- Clústeres de grafemas

### Normalizar

Permite revisar las formas de normalización Unicode:

- NFC
- NFD
- NFKC
- NFKD

GlyphGuard también indica si cada forma normalizada difiere del texto original.

---

## Idiomas

GlyphGuard Desktop actualmente soporta 12 idiomas de interfaz:

| Idioma | Nombre nativo |
|---|---|
| 🇺🇸 Inglés | English |
| 🇪🇸 Español | Español |
| 🇵🇹 Portugués | Português |
| 🇫🇷 Francés | Français |
| 🇩🇪 Alemán | Deutsch |
| 🇮🇹 Italiano | Italiano |
| 🇯🇵 Japonés | 日本語 |
| 🇰🇷 Coreano | 한국어 |
| 🇨🇳 Chino simplificado | 简体中文 |
| 🇹🇼 Chino tradicional | 繁體中文 |
| 🇷🇺 Ruso | Русский |
| 🇸🇦 Árabe | العربية |

Más información:

[Localización](docs/localization.es.md)

---

## Temas

Modos de apariencia disponibles:

- Sistema
- Oscuro
- Claro

La preferencia seleccionada se guarda localmente.

La barra lateral y el encabezado permanecen oscuros para mantener la identidad visual de GlyphGuard, mientras el área principal se adapta al modo seleccionado.

Más información:

[Sistema de temas](docs/themes.es.md)

---

## Branding

GlyphGuard cuenta con una identidad visual y un icono propios basados en:

- Azul marino profundo
- Cian
- Azul
- Geometría inspirada en un escudo
- Una `G` estilizada

El mismo branding se utiliza en la interfaz de escritorio y en los recursos nativos de la aplicación.

Más información:

[Branding](docs/branding.es.md)

---

## Ejecutar GlyphGuard Desktop

Desde:

```powershell
cd C:\Users\Alejandro\GlyphGuard\apps\desktop
```

Instalar dependencias:

```powershell
npm install
```

Ejecutar el frontend:

```powershell
npm run dev
```

Ejecutar la aplicación nativa:

```powershell
npm run tauri dev
```

Crear una build de producción:

```powershell
npm run build
npm run tauri build
```

---

## Empaquetado actual

La build actual para Windows puede generar:

- Ejecutable nativo
- Instalador MSI
- Instalador NSIS

Los paquetes actuales incluyen:

```text
GlyphGuard_0.1.0_x64_en-US.msi
GlyphGuard_0.1.0_x64-setup.exe
```

---

## Documentación

La documentación detallada se mantiene separada para evitar sobrecargar este README.

- [Interfaz Desktop](docs/desktop.es.md)
- [Localización](docs/localization.es.md)
- [Sistema de temas](docs/themes.es.md)
- [Branding](docs/branding.es.md)
- [Roadmap visual](docs/desktop-roadmap.es.md)

---

## Estado visual actual

La experiencia de escritorio ya está ampliamente implementada.

```text
Estructura general        95%
Panel                     95%
Analizar texto            90%
Archivos                  85%
Comparar                  90%
Inspector                 90%
Normalizar                90%
Configuración             85%
Temas                     95%
Localización              90%
Branding                  95%
```

El trabajo restante se centra principalmente en:

- Accesibilidad
- Navegación por teclado
- Mejores estados vacíos, de carga y error
- Mejoras RTL
- Revisión de traducciones
- Resaltado de caracteres
- Acciones para copiar
- Filtros de resultados de archivos
- Mejor visualización de comparación
- Opciones de vista para Inspector
- Resaltado de diferencias de normalización
- Pulido visual final

Consulta el plan completo aquí:

[Roadmap visual de escritorio](docs/desktop-roadmap.es.md)

---

## Versión actual

```text
GlyphGuard Desktop v0.1.0
```

GlyphGuard Desktop continúa evolucionando hacia un espacio de trabajo Unicode pulido, multilingüe y técnicamente enfocado.
