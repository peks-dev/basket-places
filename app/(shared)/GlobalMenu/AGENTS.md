# Dominio: Menú Global

## Contexto

Menú hamburguesa global accesible desde cualquier parte de la app. Contiene navegación, opciones de tema, y gestión de cuenta.

## Stack Tecnológico

- **Zustand**: Estado del menú (abierto/cerrado)
- **Framer Motion**: Animaciones de apertura/cierre
- **next-themes**: Cambio de tema claro/oscuro

## Estructura

```
app/(shared)/GlobalMenu/
├── index.tsx                      # Componente principal
├── MenuContent.tsx                # Contenido del menú
├── components/
│   ├── MenuOpenButton.tsx         # Botón para abrir
│   ├── OptionMenu.tsx             # Opción individual
│   └── sections/
│       ├── MenuHeader.tsx         # Header con info de usuario
│       ├── NavigationSection.tsx  # Links de navegación
│       ├── ThemeSection.tsx       # Selector de tema
│       └── MenuFooter.tsx         # Footer con logout
├── hooks/
│   ├── useGlobalMenu.ts           # Hook principal
│   ├── useMenuNavigation.ts       # Navegación dentro del menú
│   ├── useMenuKeyboard.ts         # Atajos de teclado
│   ├── useThemeControls.ts        # Control de tema
│   └── useGlobalMenuGestures.ts   # Gestos táctiles
├── constants/
│   ├── menuConstants.ts           # Configuración
│   └── menuClasses.ts             # Clases CSS
├── utils/
│   └── menuUtils.ts               # Utilidades
└── README.md                      # Documentación interna
```

## Patrones Importantes

### useGlobalMenu

Hook principal que maneja estado y navegación:

```tsx
const {
  isOpen,
  openMenu,
  closeMenu,
  toggleMenu,
  currentSection,
  navigateToSection,
} = useGlobalMenu();
```

### Gestos

- **Swipe**: Cerrar menú deslizando hacia la izquierda
- **Tecla Escape**: Cerrar menú
- **Click fuera**: Cerrar menú

### Tema

```tsx
const { theme, setTheme } = useThemeControls();

// Valores: 'light' | 'dark' | 'system'
setTheme('dark');
```

## Reglas Específicas

1. **Siempre usar** `useGlobalMenu` para abrir/cerrar
2. **No** manejar estado del menú directamente en componentes
3. **Animaciones** usar Framer Motion con `AnimatePresence`
4. **Navegación** usar helper del hook, no router directamente
5. **Teclado**: ESC cierra menú (manejado automáticamente)


## Referencias

- `hooks/useGlobalMenu.ts` - Hook principal
- `components/MenuContent.tsx` - Estructura del menú
- `components/sections/` - Secciones del menú
- `README.md` - Documentación detallada
