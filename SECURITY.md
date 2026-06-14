# Security Policy

## Supported Versions

Basket Places se encuentra actualmente en **open beta**. Solo la última versión de la rama `development` (y eventualmente `main`) recibe actualizaciones de seguridad.

| Versión | Soporte |
|---|---|
| `development` (último commit) | ✅ |
| `main` (cuando se estabilice) | ✅ |
| Versiones anteriores | ❌ |

## Reporting a Vulnerability

Si descubres una vulnerabilidad de seguridad, **por favor no abras un issue público** en GitHub ni la discutas en redes sociales.

En su lugar, repórtala de forma privada a través de uno de estos canales:

- 📧 **Email:** `security@basket-places.website` (preferido)
- 🔒 **GitHub Security Advisories:** [crear advisory privada](https://github.com/peks-dev/basket-places/security/advisories/new)

Por favor incluye en tu reporte:

1. **Descripción clara** de la vulnerabilidad y su impacto potencial.
2. **Pasos para reproducirla** (preferiblemente con un PoC).
3. **Versión/branch** afectada.
4. **Tu nombre/handle** si deseas ser acreditado en el fix (opcional).

## Response Timeline

- **Acknowledgement:** dentro de las 72 horas posteriores al reporte.
- **Triage inicial:** dentro de los 7 días siguientes.
- **Fix y divulgación coordinada:** según la severidad, idealmente dentro de 30 días.

Nos comprometemos a mantenerte informado del progreso y a coordinar la divulgación pública una vez que el fix esté disponible.

## Scope

Esta política aplica a:

- El código de Basket Places en este repositorio.
- La configuración documentada de Supabase (auth, RLS, storage).
- Las Server Actions y Route Handlers expuestos por la app.

**Fuera de scope:**

- Dependencias de terceros (reportar a sus mantenedores).
- Issues que requieran ingeniería social o acceso físico.
- Reportes automatizados sin análisis de impacto real.

## Recognition

Agradecemos a los investigadores y contributors que reportan vulnerabilidades de forma responsable. Los reporters que lo deseen serán acreditados en el changelog del fix correspondiente.

---

**Nota:** Basket Places está en beta abierta y aún no ha completado una auditoría formal de seguridad. Estamos trabajando en ello como parte del [open-source launch readiness](https://github.com/peks-dev/basket-places).
