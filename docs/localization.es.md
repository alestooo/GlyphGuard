# Localización de GlyphGuard

GlyphGuard Desktop incluye una interfaz multilingüe diseñada como parte de la arquitectura de la aplicación.

Actualmente soporta 12 idiomas.

---

## Idiomas soportados

| Código | Idioma | Nombre nativo |
|---|---|---|
| `en` | Inglés | English |
| `es` | Español | Español |
| `pt` | Portugués | Português |
| `fr` | Francés | Français |
| `de` | Alemán | Deutsch |
| `it` | Italiano | Italiano |
| `ja` | Japonés | 日本語 |
| `ko` | Coreano | 한국어 |
| `zh-CN` | Chino simplificado | 简体中文 |
| `zh-TW` | Chino tradicional | 繁體中文 |
| `ru` | Ruso | Русский |
| `ar` | Árabe | العربية |

El idioma predeterminado es inglés.

---

## Estructura de localización

Los archivos se encuentran en:

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

La aplicación utiliza Vue I18n.

---

## Selección de idioma

El usuario puede cambiar el idioma desde:

- El header
- Configuración

El selector muestra:

- Bandera
- Nombre completo del idioma
- Estado activo

La interfaz cambia inmediatamente.

---

## Preferencia persistente

El idioma seleccionado se guarda localmente.

Clave actual:

```text
glyphguard-language
```

GlyphGuard restaura el idioma automáticamente al volver a abrir la aplicación.

---

## Idioma del documento

Al cambiar de idioma, GlyphGuard actualiza también el atributo `lang`.

Ejemplo:

```html
<html lang="es">
```

Esto mejora:

- Accesibilidad
- Lectores de pantalla
- Metadatos del navegador
- Renderizado del texto

---

## Soporte RTL

El árabe utiliza dirección de derecha a izquierda.

Ejemplo:

```html
<html lang="ar" dir="rtl">
```

Las áreas técnicas pueden mantener dirección LTR cuando sea necesario para que el análisis Unicode siga siendo predecible.

---

## Valores técnicos sin traducir

Algunos contenidos permanecen sin traducir intencionalmente.

Ejemplos:

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

Los nombres oficiales Unicode permanecen como valores técnicos.

---

## El texto del usuario no se traduce

La localización afecta únicamente a la interfaz.

El contenido ingresado por el usuario debe conservarse exactamente.

Esto es importante porque modificarlo alteraría:

- Posiciones de puntos de código
- Posiciones de bytes
- Normalización
- Hallazgos
- Comparaciones

---

## Áreas localizadas

El sistema actual cubre:

- Sidebar
- Header
- Panel
- Analizar texto
- Archivos
- Comparar
- Inspector
- Normalizar
- Configuración
- Acciones comunes
- Estados
- Errores
- Resultados

---

## Banderas

El selector utiliza `flag-icons`.

Mapeos representativos:

```text
Inglés                  US
Español                 ES
Portugués               PT
Francés                 FR
Alemán                  DE
Italiano                IT
Japonés                 JP
Coreano                 KR
Chino simplificado      CN
Chino tradicional       TW
Ruso                    RU
Árabe                   SA
```

Las banderas son una ayuda visual y no sustituyen el nombre completo del idioma.

---

## Principios de traducción

### Mantener estable la terminología técnica

Los estándares Unicode y los identificadores deben seguir siendo reconocibles.

### Traducir la interfaz, no el contenido analizado

Los botones, descripciones y navegación pueden traducirse.

El texto del usuario y la salida técnica no deben modificarse.

### Soportar textos largos

El layout no debe asumir longitudes propias del inglés.

### Preservar legibilidad

Los idiomas CJK y el árabe deben mantenerse legibles sin afectar el diseño técnico.

### Mostrar nombres completos

El selector utiliza nombres completos y no abreviaturas como `EN` o `ES`.

---

## Estado actual

```text
Inglés                   Implementado
Español                  Implementado
Portugués                Implementado
Francés                  Implementado
Alemán                   Implementado
Italiano                 Implementado
Japonés                  Implementado
Coreano                  Implementado
Chino simplificado       Implementado
Chino tradicional        Implementado
Ruso                     Implementado
Árabe                    Implementado

Persistencia idioma      Implementada
Selector en header       Implementado
Selector en ajustes      Implementado
Banderas                 Implementadas
Soporte RTL base         Implementado
QA de traducciones       En progreso
```

---

## Mejoras previstas

Trabajo pendiente:

- Revisión de las 12 traducciones
- Mejor manejo de textos largos
- Más pruebas RTL
- Mejor alineación en árabe
- Mejor tipografía japonesa
- Mejor tipografía coreana
- Mejor tipografía china
- Revisión de pluralización
- Mejor espaciado específico por idioma cuando sea necesario
- Revisión final de accesibilidad

El sistema multilingüe ya está operativo; el trabajo restante es principalmente de refinamiento.
