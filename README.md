<p align="center">
  <img src="public/readme/banner.png" alt="Basket Places banner" width="100%" />
</p>

# Basket Places

Una plataforma abierta para descubrir comunidades locales de básquetbol.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org)
[![Status](https://img.shields.io/badge/status-beta-de9e36)](#estado-del-proyecto)
[![AI-native](https://img.shields.io/badge/workflow-AI--native-242628)](#proyecto-ai-native)

🌐 **Live:** [basket-places.website](https://basket-places.website/)

---

## Qué es

La plataforma permite encontrar lugares donde el básquetbol sucede como comunidad: canchas, grupos, dinámicas locales y puntos de encuentro donde jugadores se reúnen para jugar, convivir y mejorar.

Más que ubicar canchas, busca hacer visibles los espacios donde el básquetbol ya forma parte de la vida cotidiana de una comunidad.

## Por qué existe

En muchas ciudades, pueblos y barrios existen lugares donde el básquetbol se juega de forma constante, pero esa información suele vivir únicamente entre quienes ya conocen la zona.

El proyecto nace para convertir ese conocimiento local en información accesible: dónde se juega, cómo es el lugar y qué tipo de comunidad existe alrededor.

## Qué permite hacer

Funciona como un mapa colaborativo para:

- Descubrir lugares donde se juega básquetbol.
- Explorar comunidades locales.
- Conocer canchas y puntos de encuentro.
- Contribuir información sobre nuevos lugares.
- Ayudar a que otros jugadores encuentren dónde jugar.

## Tecnología

Está construido con una base moderna, flexible y orientada a productos web dinámicos:

- **Next.js** para la aplicación web.
- **Supabase** para base de datos, autenticación y storage.
- **Leaflet** para la experiencia de mapa.
- **Tailwind CSS** para el sistema visual.
- **Motion** para transiciones e interacciones.
- **Zustand** para estado global.
- **Sonner** para notificaciones.
- **Zod** para validación.
- **Google Gemini** para exploración de capacidades AI.

La documentación técnica y operativa vive principalmente en [`AGENTS.md`](./AGENTS.md).

## Proyecto AI-native

Este repositorio está pensado para ser gestionado, documentado y evolucionado con apoyo de agentes de inteligencia artificial.

El proyecto mantiene lineamientos específicos para que humanos y agentes puedan colaborar de forma consistente:

- [`AGENTS.md`](./AGENTS.md): contexto técnico, arquitectura, convenciones y flujo de trabajo para agentes.
- [`CONTRIBUTING.md`](./CONTRIBUTING.md): lineamientos de contribución y colaboración AI-assisted.
- [`SECURITY.md`](./SECURITY.md): reporte responsable de vulnerabilidades.
- [`LICENSE`](./LICENSE): licencia del proyecto.

## Estado del proyecto

El producto se encuentra en beta.

Durante esta etapa, la prioridad está en fortalecer los cimientos del producto antes de ampliar agresivamente sus funcionalidades.

Áreas principales de enfoque:

- Seguridad y privacidad de datos.
- Calidad del sistema de contribuciones.
- Experiencia de exploración en el mapa.
- Distribución del proyecto.
- Uso responsable de AI generativa.

## Dirección

Apunta a convertirse en una referencia abierta para descubrir dónde se juega básquetbol en cualquier ciudad, pueblo o destino.

Su objetivo es simple:

> Hacer que encontrar una comunidad de básquetbol sea tan fácil como abrir un mapa.

## Contribución

Las contribuciones son bienvenidas siempre que sigan los lineamientos del proyecto.

Antes de proponer cambios, revisa [`CONTRIBUTING.md`](./CONTRIBUTING.md) y [`AGENTS.md`](./AGENTS.md). Esto permite que las contribuciones humanas y las asistidas por AI mantengan el mismo contexto, estándares y criterios de revisión.

## Seguridad

Si encuentras una vulnerabilidad, no abras un issue público. Consulta [`SECURITY.md`](./SECURITY.md) para conocer el canal de reporte responsable.

Como producto en beta, todavía no debe asumirse como un sistema completamente auditado para datos sensibles.

## Licencia

Basket Places está disponible bajo licencia MIT. Ver [`LICENSE`](./LICENSE).
