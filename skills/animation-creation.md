---
name: animation-creation
description: Crear animaciones con Framer Motion en Basket Places. Usar para reforzar el concepto sci-fi/futurista de la UI.
version: 1.0.0
---

# Animation Creation - Basket Places

Guía para crear animaciones que refuercen el concepto de diseño: **sci-fi, futurismo, digitalidad y minimalismo**.

## Filosofía de Animaciones

**Menos es más.** Las animaciones deben:
- ✅ Ser sutiles y minimalistas
- ✅ Reforzar el concepto "holográfico/digital"
- ✅ Tener propósito (feedback, transición, atención)
- ❌ NO ser distractibles o excesivas
- ❌ NO competir por atención con el contenido

## Estilo Sci-Fi

**Características de las animaciones en Basket Places:**

- **Easing suave**: `[0.16, 1, 0.3, 1]` (ease-out-expo) o `'easeOut'`
- **Duraciones cortas**: 200-400ms para micro-interacciones
- **Opacidad + transform**: Preferir fade + scale/translate sobre efectos complejos
- **Scan lines**: Efectos de "línea de escaneo" para elementos que aparecen (hologramas)
- **Glow sutil**: Sombras difusas que sugieren luz digital

## Patrones Comunes

**Fade in + Scale (aparición de elementos):**
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.94 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
>
  {content}
</motion.div>
```

**Fade in + Slide (paneles/modales):**
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
>
  {content}
</motion.div>
```

**Stagger (listas, elementos secuenciales):**
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

**Scan line (efecto holográfico):**
```tsx
<motion.div
  initial={{ scaleY: 0, opacity: 0 }}
  animate={{
    scaleY: [0, 1, 0],
    opacity: [0, 0.5, 0],
  }}
  transition={{
    duration: 0.5,
    times: [0, 0.5, 1],
    ease: 'easeInOut',
  }}
  style={{
    background: 'linear-gradient(180deg, transparent, var(--color-border-interactive), transparent)',
    transformOrigin: 'top',
  }}
/>
```

## Uso de AnimatePresence

Para elementos que se montan/desmontan (modales, loaders):

```tsx
<AnimatePresence mode="wait">
  {isOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {content}
    </motion.div>
  )}
</AnimatePresence>
```
## Duraciones Recomendadas

| Contexto | Duración | Uso |
|----------|----------|-----|
| Micro-interacción | 200ms | Hover, focus |
| Aparición elemento | 300-400ms | Cards, items |
| Modal/panel | 350ms | Entrada/salida |
| Página/transición | 500ms | Navegación |
| Stagger delay | 50-100ms | Entre items |

## Qué NO hacer

- ❌ Animaciones largas (>500ms para UI)
- ❌ Múltiples animaciones simultáneas que compitan
- ❌ Efectos excesivos (rotaciones 3D, rebotes exagerados)
- ❌ Animar propiedades costosas (box-shadow, blur constante)
- ❌ Parallax o efectos de scroll complejos
- ❌ `layoutId` en listas grandes (pérdida de performance)

## Referencias

- `app/components/ui/Modal/Modal.tsx` - Animaciones de modal con scan line
- `app/components/ui/NavigationLoader.tsx` - Loader con efectos de colapso
- `app/components/ui/skeletons/` - Skeletons con pulse
- Framer Motion: [Documentation](https://www.framer.com/motion/)
