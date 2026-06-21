import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de privacidad · Basket Places',
  description:
    'Qué datos trata Basket Places, con qué fines, qué servicios externos intervienen y cómo controlas tu información.',
};

export default function PrivacyPage() {
  return (
    <>
      <h1>Política de privacidad</h1>
      <p className="text-foreground-secondary text-sm">
        Última actualización: 21 de junio de 2026
      </p>

      <p>
        Basket Places es un <strong>proyecto personal de código abierto</strong>{' '}
        que actualmente se encuentra en <strong>beta pública</strong>. Esta
        política explica, de forma clara, qué datos tratamos y bajo qué
        condiciones participas. Al usar la plataforma, aceptas lo aquí descrito.
      </p>
      <p>
        Responsable del tratamiento: el mantenedor del proyecto. Contacto:{' '}
        <a href="mailto:contacto@basket-places.website">
          contacto@basket-places.website
        </a>
        .
      </p>

      <h2>Qué datos recopilamos</h2>
      <ul>
        <li>
          <strong>Cuenta:</strong> tu dirección de correo electrónico, necesaria
          para iniciar sesión mediante un código de un solo uso (OTP).
        </li>
        <li>
          <strong>Perfil:</strong> un nombre para mostrar (opcional) y una
          imagen de avatar (opcional).
        </li>
        <li>
          <strong>Contenido que aportas:</strong> la información de las
          comunidades que registras (nombre, descripción, ubicación en el mapa,
          horarios, servicios, categorías), las imágenes que subes y las reseñas
          que escribes.
        </li>
        <li>
          <strong>Datos técnicos y de diagnóstico:</strong> datos de
          funcionamiento como cookies de sesión, registros generados por nuestro
          proveedor de hosting, errores de la aplicación, navegador, ruta
          afectada y datos técnicos similares usados para operar, proteger y
          depurar el servicio.
        </li>
        <li>
          <strong>Analítica de uso:</strong> métricas agregadas sobre páginas
          visitadas y eventos de producto (por ejemplo, envío de feedback o
          contribuciones completadas), sin enviar correos, nombres ni texto
          libre.
        </li>
        <li>
          <strong>Feedback:</strong> si usas el formulario de feedback,
          almacenamos el tipo de reporte, título, descripción y metadatos
          mínimos asociados a tu cuenta para poder darle seguimiento.
        </li>
      </ul>

      <h2>Para qué usamos tus datos</h2>
      <ul>
        <li>Autenticarte y mantener tu sesión iniciada.</li>
        <li>
          Mostrar las comunidades, reseñas e imágenes en el mapa y el
          directorio.
        </li>
        <li>
          Analizar las imágenes de una comunidad al registrarla, para apoyar la
          calidad del contenido (ver servicios externos).
        </li>
        <li>Prevenir abuso y moderar contenido inapropiado.</li>
        <li>Detectar, diagnosticar y corregir errores técnicos.</li>
        <li>Entender el uso agregado del producto para priorizar mejoras.</li>
        <li>
          Recibir y gestionar reportes de bugs, solicitudes de features y
          sugerencias.
        </li>
      </ul>

      <h2>Contenido público</h2>
      <p>
        Las comunidades, reseñas e imágenes que publicas son{' '}
        <strong>visibles públicamente</strong> para cualquier visitante. No
        publiques información que no quieras hacer pública. Tu correo
        electrónico <strong>no</strong> se muestra públicamente.
      </p>

      <h2>Servicios externos que intervienen</h2>
      <p>
        Para funcionar, la plataforma se apoya en proveedores que pueden tratar
        algunos de tus datos por nuestra cuenta:
      </p>
      <ul>
        <li>
          <strong>Supabase</strong> — base de datos, autenticación y
          almacenamiento de imágenes. Aloja tu cuenta, tu perfil y tu contenido.
        </li>
        <li>
          <strong>Resend</strong> — envío de los correos con tu código de acceso
          (recibe tu dirección de correo).
        </li>
        <li>
          <strong>Google (Gemini)</strong> — análisis de imágenes mediante IA.
          Al registrar una comunidad,{' '}
          <strong>las imágenes que subes se envían</strong> a este servicio para
          su análisis.
        </li>
        <li>
          <strong>OpenStreetMap / Nominatim</strong> — mapa y geocodificación.
          Las <strong>coordenadas</strong> de una ubicación se envían para
          obtener ciudad, estado y país; los mosaicos del mapa se cargan desde
          sus servidores.
        </li>
        <li>
          <strong>Vercel</strong> — hosting de la aplicación.
        </li>
        <li>
          <strong>GlitchTip</strong> — monitoreo de errores y datos de
          diagnóstico para detectar fallos de cliente y servidor. No usamos
          session replay ni tracing de rendimiento al inicio.
        </li>
        <li>
          <strong>Umami</strong> — analítica web privacy-friendly para métricas
          agregadas de uso y eventos de producto. La integración está
          configurada para no enviar datos personales directos ni texto libre.
        </li>
      </ul>

      <h2>Feedback y observabilidad</h2>
      <p>
        Durante la beta usamos herramientas de observabilidad para mantener el
        servicio estable y entender qué mejorar. Los reportes de errores se usan
        para diagnosticar fallos; la analítica se usa de forma agregada para
        entender uso general; y el feedback que envías voluntariamente se usa
        para priorizar bugs, features y mejoras.
      </p>
      <p>
        Evita incluir datos sensibles en campos de texto libre como reseñas,
        descripciones o feedback. Si accidentalmente envías información
        sensible, puedes escribirnos para solicitar su revisión o eliminación.
      </p>

      <h2>Inicio de sesión por correo (OTP)</h2>
      <p>
        Usamos acceso sin contraseña: introduces tu correo y te enviamos un
        código temporal de un solo uso. Por eso solo necesitamos tu dirección de
        correo y no almacenamos contraseñas. La frecuencia de envío de estos
        correos está limitada para evitar abuso.
      </p>

      <h2>Tus derechos y control</h2>
      <ul>
        <li>
          <strong>Editar o borrar tu contenido:</strong> puedes modificar o
          eliminar tus comunidades y reseñas desde la aplicación.
        </li>
        <li>
          <strong>Eliminar tu cuenta:</strong> al eliminar tu cuenta, se borran
          tu perfil, tus comunidades y tus reseñas asociadas.
        </li>
        <li>
          <strong>Contacto:</strong> para cualquier solicitud sobre tus datos,
          escríbenos al correo indicado más abajo.
        </li>
      </ul>

      <h2>Conservación de datos</h2>
      <p>
        Conservamos tu información mientras tu cuenta esté activa. Cuando
        eliminas tu cuenta o tu contenido, este se elimina de la base de datos.
        Algunas copias técnicas o registros pueden persistir temporalmente en
        los sistemas de nuestros proveedores.
      </p>

      <h2>Cambios en esta política</h2>
      <p>
        Al tratarse de un producto en beta, esta política puede actualizarse.
        Publicaremos cualquier cambio en esta misma página, actualizando la
        fecha del encabezado.
      </p>
    </>
  );
}
