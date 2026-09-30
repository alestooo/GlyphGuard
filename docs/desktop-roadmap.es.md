# Roadmap visual de GlyphGuard Desktop

Este roadmap cubre únicamente la experiencia **visual y de escritorio**.

Se enfoca en:

- UI
- UX
- Localización
- Temas
- Accesibilidad
- Presentación de escritorio
- Pulido visual

---

## Estado visual general

Progreso aproximado:

```text
Estructura general        ███████████████████░  95%
Panel                     ███████████████████░  95%
Analizar texto            ██████████████████░░  90%
Archivos                  █████████████████░░░  85%
Comparar                  ██████████████████░░  90%
Inspector                 ██████████████████░░  90%
Normalizar                ██████████████████░░  90%
Configuración             █████████████████░░░  85%
Temas                     ███████████████████░  95%
Localización              ██████████████████░░  90%
Branding                  ███████████████████░  95%
```

El trabajo restante consiste principalmente en refinamiento y no en construir la interfaz desde cero.

---

# Fase 1 — Consistencia de interfaz

## Espaciado general

Revisar:

- Márgenes
- Espaciado entre tarjetas
- Separación de secciones
- Alineación de botones
- Alineación de inputs
- Espaciado del sidebar

Objetivo:

Crear un ritmo visual consistente en todas las páginas.

---

## Sistema compartido de tarjetas

Estandarizar:

- Border radius
- Color de borde
- Padding
- Hover
- Encabezados
- Presentación de valores técnicos

Objetivo:

Hacer que Analizar, Archivos, Comparar, Inspector y Normalizar se sientan parte de la misma aplicación.

---

## Botones

Revisar:

- Acciones principales
- Acciones secundarias
- Estado deshabilitado
- Estado de carga
- Hover
- Foco

Objetivo:

Mantener una jerarquía de acciones consistente.

---

# Fase 2 — Pulido de Analizar texto

Mejoras previstas:

- Resaltado de caracteres en el texto fuente
- Mejor jerarquía de severidad
- Iconos específicos por regla
- Expandir/contraer hallazgos
- Copiar hallazgo
- Copiar punto de código
- Copiar representación escapada
- Ir a posición escalar
- Ir a posición de byte
- Mejor estado sin hallazgos
- Mejor indicador de análisis

Objetivo:

Hacer los hallazgos más fáciles de comprender y navegar.

---

# Fase 3 — Experiencia de Archivos

Mejoras previstas:

- Indicadores de tipo de archivo
- Resultados de directorios expandibles
- Mejores explicaciones de archivos omitidos
- Ordenamiento
- Búsqueda
- Filtros
- Filtro por severidad
- Limpiar resultados
- Mejor progreso
- Mejor comportamiento con carpetas grandes

Objetivo:

Hacer manejables los resultados incluso con muchos archivos.

---

# Fase 4 — Experiencia de Comparar

Mejoras previstas:

- Resaltado carácter por carácter
- Vista inline de diferencias
- Mejores tarjetas escalares
- Copiar izquierda
- Copiar derecha
- Intercambiar lados
- Limpiar
- Mejores indicadores de igualdad
- Historial de sesión

Objetivo:

Facilitar la comparación de cadenas visualmente engañosas.

---

# Fase 5 — Experiencia del Inspector

Mejoras previstas:

- Vista de tabla
- Vista de tarjetas
- Información de script
- Categoría del carácter
- Buscar por índice escalar
- Buscar por punto de código
- Copiar carácter
- Copiar punto de código
- Copiar bytes UTF-8
- Mejor visualización de grafemas

Objetivo:

Convertir el Inspector en la vista Unicode técnica más detallada de la aplicación.

---

# Fase 6 — Experiencia de Normalizar

Mejoras previstas:

- Comparación carácter por carácter
- Resaltado de diferencias
- Copiar resultado normalizado
- Acción de limpiar
- Mejor explicación de cada forma
- Estado cambiado/sin cambios más visible

Objetivo:

Hacer que las diferencias de normalización se entiendan de inmediato.

---

# Fase 7 — Mejoras del Panel

Posibles incorporaciones:

- Análisis recientes
- Archivos recientes
- Comparaciones recientes
- Resumen de detecciones
- Accesos rápidos
- Estado de la aplicación
- Idioma actual
- Tema actual

Objetivo:

Hacer el Panel más útil sin convertirlo en una pantalla saturada.

---

# Fase 8 — Mejoras de Configuración

Mejoras previstas:

- Mejores descripciones de reglas
- Estados activado/desactivado más claros
- Persistencia de reglas
- Mejor selector de tema
- Mejor configuración de idioma
- Información de la aplicación
- Información de versión
- Pantalla Acerca de

Objetivo:

Hacer que Configuración se sienta completa.

---

# Fase 9 — QA de localización

Idiomas actuales:

```text
Inglés
Español
Portugués
Francés
Alemán
Italiano
Japonés
Coreano
Chino simplificado
Chino tradicional
Ruso
Árabe
```

Revisar:

- Etiquetas largas
- Overflow de botones
- Sidebar
- Selector del header
- Descripciones
- Resultados
- Errores
- Estados vacíos

Objetivo:

Que cada idioma se sienta natural dentro del layout.

---

# Fase 10 — Refinamiento RTL

El árabe ya activa dirección RTL.

Trabajo restante:

- Revisar sidebar
- Revisar header
- Revisar tarjetas
- Revisar grupos de acciones
- Revisar tablas técnicas
- Mantener legibilidad Unicode
- Preservar LTR cuando sea técnicamente necesario

Objetivo:

Soportar árabe sin dañar el análisis técnico.

---

# Fase 11 — Tipografía CJK

Revisar:

- Japonés
- Coreano
- Chino simplificado
- Chino tradicional

Áreas principales:

- Renderizado
- Line-height
- Altura de botones
- Tarjetas técnicas
- Selector de idioma
- Explicaciones largas

Objetivo:

Mantener el texto CJK equilibrado con la interfaz latina.

---

# Fase 12 — Accesibilidad

Mejoras previstas:

- Navegación solo con teclado
- Orden lógico de tabulación
- Foco visible
- Etiquetas ARIA
- Revisión con lectores de pantalla
- Contraste
- Reducción de movimiento
- Estados deshabilitados más claros

Objetivo:

Hacer que la aplicación pueda utilizarse sin depender exclusivamente del mouse.

---

# Fase 13 — Estados vacíos, carga y error

Todas las páginas principales deberían tener estados pulidos para:

```text
Inactivo
Cargando
Éxito
Vacío
Error
Deshabilitado
```

Objetivo:

Evitar que una página parezca incompleta cuando todavía no hay resultados.

---

# Fase 14 — Finalización del branding

Revisión restante:

- Espaciado del logo en sidebar
- Legibilidad del icono pequeño
- Presentación de la pantalla Acerca de
- Consistencia del instalador
- Capturas de documentación

Objetivo:

Aplicar la identidad de GlyphGuard consistentemente sin sobrecargar la interfaz.

---

# Fase 15 — QA final de escritorio

Antes de considerar completa la experiencia visual:

- Probar todas las páginas en Oscuro
- Probar todas las páginas en Claro
- Probar Sistema
- Probar los 12 idiomas
- Probar árabe RTL
- Probar ventanas estrechas
- Probar textos largos
- Probar input vacío
- Probar input grande
- Probar errores
- Probar navegación por teclado
- Probar ejecutable nativo
- Probar presentación del instalador

---

## Objetivo de finalización

La experiencia final debería sentirse:

- Técnica
- Limpia
- Consistente
- Multilingüe
- Accesible
- Nativa
- Enfocada
- Confiable

El objetivo no es añadir complejidad visual innecesaria.

La meta es hacer la seguridad Unicode más comprensible sin perder el detalle técnico que hace útil a GlyphGuard.
