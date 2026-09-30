# Sistema de temas de GlyphGuard

GlyphGuard Desktop incluye un sistema de apariencia persistente con soporte para:

- Sistema
- Oscuro
- Claro

La arquitectura de temas está diseñada para mantener la aplicación visualmente consistente mientras permite adaptar el área principal a la preferencia del usuario.

---

## Modos de tema

### Sistema

`Sistema` sigue la preferencia visual del sistema operativo.

Si el sistema cambia entre modo claro y oscuro, GlyphGuard puede seguir esa preferencia mientras este modo esté activo.

### Oscuro

El modo oscuro utiliza:

- Superficies oscuras
- Paneles oscuros
- Texto de alto contraste
- Acentos cian y azul
- Campos de entrada oscuros
- Tarjetas técnicas oscuras

### Claro

El modo claro utiliza:

- Fondo claro del área de trabajo
- Paneles blancos
- Texto oscuro
- Campos claros
- Acentos cian y azul

El sidebar y el header permanecen oscuros para conservar la identidad visual de GlyphGuard.

---

## Preferencia persistente

El tema seleccionado se guarda localmente.

Clave actual:

```text
glyphguard-theme
```

Esto permite recuperar automáticamente el modo seleccionado al abrir la aplicación nuevamente.

---

## Arquitectura del tema

La lógica principal está centralizada en:

```text
apps/desktop/src/theme/index.ts
```

El sistema se encarga de:

- Leer la preferencia guardada
- Resolver el tema activo
- Aplicar el modo visual
- Seguir la preferencia del sistema
- Actualizar los atributos del documento

---

## Variables CSS

El sistema visual utiliza variables CSS centralizadas.

Archivo principal:

```text
apps/desktop/src/styles/variables.css
```

Categorías principales:

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

El uso de variables compartidas evita que cada página defina colores independientes.

---

## Shell oscuro compartido

El shell principal permanece oscuro en ambos temas.

Incluye:

- Sidebar
- Header
- Selector de idioma
- Área principal de branding

Esto genera una identidad visual estable mientras el workspace puede cambiar entre claro y oscuro.

---

## Dirección del tema oscuro

El tema oscuro representa de forma más fuerte la identidad de GlyphGuard.

Utiliza:

- Azul marino casi negro
- Paneles ligeramente elevados
- Acciones principales en cian
- Acentos técnicos en azul
- Texto secundario gris suave
- Alto contraste para datos Unicode

Se evita usar negro puro en todas las superficies para mantener profundidad y legibilidad.

---

## Dirección del tema claro

El modo claro no es simplemente una inversión del modo oscuro.

Utiliza:

- Workspace neutro claro
- Paneles blancos
- Texto oscuro
- Controles claros
- Shell oscuro persistente
- Acciones cian compartidas

Esto mantiene la aplicación reconocible en ambos modos.

---

## Campos y áreas técnicas

Las áreas de análisis deben seguir siendo legibles en ambos temas.

Incluye:

- Textarea de Analizar texto
- Textareas de Comparar
- Entrada del Inspector
- Entrada de Normalizar
- Resultados de archivos
- Valores técnicos Unicode

Los inputs deben utilizar variables de tema y evitar colores oscuros hardcodeados.

---

## Botones

### Acciones principales

Las acciones principales utilizan el cian de GlyphGuard.

Ejemplos:

- Analizar
- Abrir analizador
- Normalizar
- Inspeccionar

### Acciones secundarias

Las acciones secundarias se adaptan al tema.

En oscuro:

- Fondo oscuro
- Borde visible
- Texto claro

En claro:

- Fondo blanco
- Texto oscuro
- Borde suficientemente visible

---

## Accesibilidad

El sistema de temas debe mantener:

- Buen contraste
- Estados de foco visibles
- Estados deshabilitados claros
- Navegación activa reconocible
- Texto técnico legible
- Hover consistente

Los cambios de tema nunca deben reducir la legibilidad de los datos Unicode.

---

## Estado actual

```text
Modo Sistema              Implementado
Modo Oscuro               Implementado
Modo Claro                Implementado
Persistencia del tema     Implementada
Seguimiento del sistema   Implementado
Shell oscuro compartido   Implementado
Compatibilidad páginas    Casi completa
Pulido de accesibilidad   En progreso
```

---

## Mejoras previstas

Trabajo visual restante:

- Revisión final de contraste
- Mejor consistencia de estados de foco
- Soporte para reducción de movimiento
- Revisión final de estados hover
- Mejor consistencia de estados deshabilitados
- Pruebas adicionales RTL + temas
- QA visual final de todas las páginas

El sistema de temas ya es funcional; el trabajo restante es principalmente de pulido visual.
