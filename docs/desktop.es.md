# Interfaz Desktop de GlyphGuard

GlyphGuard Desktop es la capa visual de la aplicación.

Está construida con:

- Tauri
- Vue 3
- TypeScript
- Rust

La interfaz está diseñada como un espacio de trabajo local enfocado en seguridad Unicode.

---

## Diseño general

La aplicación utiliza tres regiones principales:

```text
┌─────────────────────────────────────────────────────┐
│ Header                                              │
├───────────────┬─────────────────────────────────────┤
│               │                                     │
│ Sidebar       │ Área principal                      │
│               │                                     │
│               │                                     │
└───────────────┴─────────────────────────────────────┘
```

### Sidebar

El sidebar proporciona navegación permanente entre:

- Panel
- Analizar texto
- Archivos
- Comparar
- Inspector
- Normalizar
- Configuración

También contiene:

- Branding de GlyphGuard
- Etiqueta Desktop
- Versión

### Header

Actualmente contiene:

- Contexto de análisis local
- Selector de idioma
- Estado del motor

El header permanece oscuro en ambos temas.

### Área principal

El contenido cambia según la página activa.

Soporta modo oscuro y claro.

---

## Panel

El Panel funciona como punto de entrada.

Incluye:

- Título
- Descripción
- Acción rápida de Analizar texto
- Acción rápida de Comparar
- Estado de GlyphGuard Core
- Categorías de detección

Categorías actuales:

- Mezcla de escrituras
- Caracteres invisibles
- Controles bidi
- Confundibles Unicode
- Espacios sospechosos

---

## Analizar texto

Es el principal espacio de análisis visual.

Incluye:

- Área grande de texto
- Contador de caracteres
- Acción de análisis
- Estado de carga
- Estado de error
- Estado sin hallazgos
- Cantidad de hallazgos
- Tarjetas de hallazgos

Las tarjetas pueden mostrar:

```text
ID de regla
Severidad
Carácter
Punto de código
Nombre Unicode
Índice escalar
Índice de byte
Representación escapada
Explicación
```

---

## Archivos

La página Archivos proporciona análisis visual de archivos y directorios.

Incluye:

- Área de arrastrar y soltar
- Seleccionar archivo
- Seleccionar carpeta
- Resultado de archivo
- Resultado de directorio
- Estados de error
- Resumen
- Archivos sospechosos
- Archivos omitidos

Información posible:

- Ruta
- Codificación
- BOM
- Longitud en bytes
- Cantidad de hallazgos

Los directorios pueden mostrar:

- Archivos encontrados
- Archivos analizados
- Archivos omitidos
- Archivos sospechosos
- Hallazgos totales

---

## Comparar

La página Comparar coloca dos cadenas lado a lado.

Incluye:

- Entrada izquierda
- Entrada derecha
- Acción de comparar
- Resumen
- Información de esqueletos
- Diferencias escalares

El resumen puede mostrar:

- Igualdad binaria
- Igualdad NFC
- Igualdad NFKC
- Igualdad de esqueletos confundibles

Las diferencias pueden mostrar:

- Posición
- Valor izquierdo
- Valor derecho
- Punto de código
- Nombre Unicode

---

## Inspector

El Inspector proporciona una vista Unicode más profunda.

Secciones actuales:

- Entrada
- Escalares
- Grafemas

Información escalar:

- Carácter
- Punto de código
- Nombre Unicode
- Posición escalar
- Posición de byte
- Bytes UTF-8

Información de grafema:

- Índice
- Valor
- Cantidad de escalares
- Cantidad de bytes

---

## Normalizar

La página Normalizar muestra:

- Original
- NFC
- NFD
- NFKC
- NFKD

Cada resultado aparece en su propio bloque.

La interfaz indica además si el resultado cambió respecto al texto original.

---

## Configuración

Configuración contiene tres áreas principales.

### Idioma

Permite cambiar el idioma de la interfaz.

### Reglas de detección

Muestra controles para:

```text
GG001 Mezcla de escrituras
GG002 Caracteres invisibles
GG003 Controles bidi
GG004 Confundibles Unicode
GG005 Espacios sospechosos
```

### Apariencia

Permite seleccionar:

- Sistema
- Oscuro
- Claro

La preferencia es persistente.

---

## Componentes compartidos

Componentes reutilizables:

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

Esta estructura mantiene consistencia entre páginas.

---

## Páginas actuales

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

## Servicios

El frontend se comunica con la aplicación local mediante:

```text
apps/desktop/src/services/glyphguard.ts
```

Las páginas utilizan este servicio en lugar de incluir directamente la lógica nativa dentro de los componentes.

---

## Comportamiento responsive

GlyphGuard está pensado principalmente como aplicación de escritorio.

Aun así, debe funcionar correctamente en ventanas más estrechas.

Objetivos actuales:

- Navegación estable
- Evitar overflow horizontal
- Contenido apilable cuando sea necesario
- Inputs legibles
- Resultados técnicos legibles
- Selector de idioma usable

---

## Estados visuales

La interfaz debe soportar de forma consistente:

- Inactivo
- Cargando
- Éxito
- Resultado vacío
- Error
- Deshabilitado
- Activo
- Hover
- Foco por teclado

No todas las páginas tienen todavía el pulido final para todos los estados.

---

## Estado actual

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

---

## Mejoras previstas

Trabajo restante:

- Consistencia final de espaciado
- Mejor navegación por teclado
- Mejores estados de foco
- Mejor feedback de carga
- Mejores estados vacíos
- Mejor presentación de errores
- Mejor feedback de éxito
- Resaltado de caracteres
- Acciones para copiar
- Mejor filtrado de archivos
- Mejores diferencias visuales
- Modos de vista del Inspector
- Mejor visualización de normalización
- Mejor soporte RTL
- Revisión de traducciones
- Refinamiento de accesibilidad
- Pantalla Acerca de
- Información de versión

Consulta:

[Roadmap visual de escritorio](desktop-roadmap.es.md)
