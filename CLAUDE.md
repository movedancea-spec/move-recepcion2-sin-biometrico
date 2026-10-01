# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es este repo

Pantalla de bienvenida de la recepción de MOVE Dance Academy: se deja prendida todo el día en la pantalla de recepción. Muestra el logo, un saludo, la hora y la fecha, frases que van rotando y botones con enlaces a otras páginas (clase de prueba, precios, inscripciones, asistencia y, en temporada, la caja de entradas).

- Sitio estático, sin build ni tests. Se edita el HTML/CSS/JS directamente.
- Se publica con GitHub Pages: `https://movedancea-spec.github.io/move-recepcion2-sin-biometrico/`.
- `index.html` — la pantalla.
- `script.js` — reloj y fecha, saludo, mensajes y frases que rotan, botón de la caja de entradas.
- `styles.css` — estilos.
- `horarios.html` — imágenes de horarios y precios (las `.png` de edades y latino).
- No tiene service worker. Para que las pantallas tomen un cambio, sube el `?v=` de `styles.css` y `script.js` en `index.html`.

## Hora de Guatemala

El reloj, la fecha y el saludo ("Buenos días / tardes / noches") se calculan siempre con Intl y `timeZone: "America/Guatemala"`, nunca con la hora de la tablet. Para la hora del saludo se usa `hourCycle: "h23"`, para que la medianoche sea 0 y no 24.

## Botón "🎟️ Caja de entradas (solo personal)"

- **Qué abre:** `https://academiamovedance.com/entradas-caja.html` (repo `portalpapasMOVE`), en otra pestaña. Es solo un enlace: la caja sigue pidiendo su propia clave (`CLAVE_ENTRADAS_SHOW`, validada por el Worker), así que el botón no se salta ninguna seguridad.
- **Cuándo se ve:** solo en temporada de venta. Recepción lo enciende o apaga en `recepcion.html` (repo `portalpapasMOVE`), opción "🎟️ Venta de entradas". Ese interruptor se guarda en la casilla `VENTA ENTRADAS RECEPCION` del registro único de `CONFIGURACION GENERAL` en Airtable.
- **Cómo se entera la pantalla:** `script.js` le pregunta al Worker `https://portalalumnas.movedancea.workers.dev` con `{ accion: "ventaEntradasVisible" }` al abrir, cada minuto y al volver a la pantalla. El botón aparece o desaparece solo, sin recargar.
- **Si algo falla, se oculta:** el botón empieza oculto y solo se muestra si el Worker responde `success: true` y `activa: true` en menos de 10 s. Si el Worker no responde, da error o tarda, queda oculto. Es más seguro no mostrarlo.
- **Ojo con `hidden`:** `.btn` usa `display:block`, que le gana al atributo `hidden`. Por eso `styles.css` tiene `[hidden]{display:none !important}`. No la quites.
- **No confundir:** este interruptor no abre ni pausa la venta en línea de entradas. Eso es "Venta Habilitada", en el panel de entradas.

## Convenciones

- Textos y comentarios en español, explicando el porqué.
- Mantén el estilo de `script.js`: 4 espacios y una línea en blanco entre bloques.
- El rosa de la marca es `#ef4b9b`.
