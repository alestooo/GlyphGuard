# Branding de GlyphGuard

GlyphGuard utiliza una identidad visual diseñada alrededor de la claridad, la seguridad y la inspección de Unicode.

El branding busca ser técnico y limpio para funcionar de forma consistente en la aplicación de escritorio, instaladores nativos, iconos del ejecutable y elementos de interfaz.

---

## Identidad visual

La identidad actual de GlyphGuard se construye alrededor de:

- Fondos azul marino profundo
- Detalles en cian
- Acentos azul brillante
- Geometría inspirada en un escudo
- Una `G` estilizada
- Formas técnicas limpias
- Alto contraste
- Pocos elementos decorativos innecesarios

El objetivo es transmitir:

- Seguridad
- Inspección de texto
- Precisión técnica
- Confianza
- Una herramienta de escritorio moderna

---

## Logo principal

La marca principal de GlyphGuard combina:

- Una silueta exterior similar a un escudo
- Una `G` estilizada
- Separación visual mediante azul y cian
- Una construcción geométrica clara

El icono está diseñado para seguir siendo reconocible tanto en tamaños grandes como pequeños.

Recurso fuente principal:

```text
apps/desktop/assets/glyphguard-icon.png
```

Este archivo debe tratarse como la imagen maestra para generar los iconos de la aplicación.

---

## Logo de la aplicación

Dentro de la interfaz se utiliza una versión reducida del logo.

Recurso actual:

```text
apps/desktop/public/glyphguard-logo.png
```

Usos principales:

- Branding del sidebar
- Identidad de la aplicación
- Referencias visuales internas

El logo no debe deformarse, estirarse ni recolorearse de manera independiente al sistema visual principal.

---

## Favicon

La aplicación también incluye un favicon pequeño generado a partir del icono de GlyphGuard.

Archivo actual:

```text
apps/desktop/public/favicon.png
```

Se utiliza principalmente al ejecutar el frontend en un navegador durante el desarrollo.

---

## Iconos nativos

Tauri genera los recursos nativos a partir de la imagen maestra de GlyphGuard.

Directorio actual:

```text
apps/desktop/src-tauri/icons/
```

Entre los recursos generados están:

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

También se generan recursos para:

- Android
- iOS

---

## Regenerar los iconos

Desde:

```powershell
cd C:\Users\Alejandro\GlyphGuard\apps\desktop
```

ejecuta:

```powershell
npx tauri icon .\assets\glyphguard-icon.png
```

Esto regenera el conjunto de iconos nativos usando la imagen maestra.

---

## Dirección de color

GlyphGuard utiliza una paleta centrada en superficies oscuras y acentos cian y azul.

Colores representativos:

```text
Fondo principal oscuro    #0D141D
Fondo del sidebar         #0D1723
Panel oscuro              #121B27
Cian principal            #22B8FF
Texto principal           #F4F7FB
Texto secundario          #AEB9C7
```

El modo claro introduce superficies claras en el área de trabajo mientras conserva el shell oscuro de GlyphGuard.

Los valores exactos activos se controlan mediante variables CSS del sistema de temas.

---

## Principios de uso de marca

### Mantener reconocible el shell

El sidebar y el header deben conservar la identidad oscura de GlyphGuard en ambos temas.

### Evitar efectos innecesarios

El logo no debe depender de brillos excesivos, desenfoques o decoración pesada.

### Preservar la claridad técnica

El branding nunca debe dificultar la lectura de datos técnicos.

### Mantener tamaños consistentes

Los iconos de aplicación deben utilizar los tamaños nativos generados, no un único raster estirado manualmente.

### Separar marca y contenido

El logo representa la aplicación y no debe utilizarse como decoración genérica dentro de resultados de análisis.

---

## Dirección tipográfica

GlyphGuard utiliza un lenguaje visual técnico y compacto.

La tipografía debe priorizar:

- Legibilidad
- Jerarquía clara
- Buen renderizado Unicode
- Visibilidad de puntos de código
- Espaciado consistente
- Soporte multilingüe

Valores técnicos como:

```text
U+202E
UTF-8
NFC
NFKC
GG001
```

deben distinguirse claramente del texto explicativo.

---

## Ubicación de la marca

Ubicaciones actuales y previstas:

- Ejecutable nativo
- Barra de tareas de Windows
- Instalador
- Sidebar
- Favicon durante desarrollo
- Documentación
- Futura pantalla Acerca de

---

## Estado actual

```text
Icono maestro             Completo
Generación de iconos      Completa
ICO de Windows            Completo
ICNS de macOS             Completo
Tamaños PNG               Completos
Recursos Android          Completos
Recursos iOS              Completos
Logo del sidebar          Integrado
Favicon                   Completo
Consistencia visual       En pulido
```

---

## Mejoras previstas

El trabajo visual restante puede incluir:

- Revisión final del espaciado del logo en el sidebar
- Mejor presentación de la pantalla Acerca de
- Variante monocromática opcional
- Variante simplificada para tamaños muy pequeños
- Capturas de documentación con branding consistente
- Revisión final de la presentación del instalador

La identidad principal de GlyphGuard ya está establecida y debería mantenerse estable mientras se pule el resto de la interfaz.
