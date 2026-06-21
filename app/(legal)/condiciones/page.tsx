import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Condiciones de uso · Basket Places',
  description:
    'Condiciones de uso de Basket Places: contenido generado por usuarios, uso aceptable, moderación y estado beta.',
};

export default function TermsPage() {
  return (
    <>
      <h1>Condiciones de uso</h1>
      <p className="text-foreground-secondary text-sm">
        Última actualización: 21 de junio de 2026
      </p>

      <p>
        Basket Places es un <strong>proyecto personal de código abierto</strong>{' '}
        en <strong>beta pública</strong>. Al usar la plataforma aceptas estas
        condiciones. Si no estás de acuerdo, por favor no la utilices.
      </p>

      <h2>El servicio</h2>
      <p>
        Basket Places es un directorio colaborativo para descubrir comunidades y
        lugares donde se juega básquetbol. El contenido lo aportan las personas
        usuarias.
      </p>

      <h2>Tu cuenta</h2>
      <p>
        El acceso se realiza mediante un código enviado a tu correo electrónico.
        Eres responsable de mantener el control de tu cuenta de correo y de la
        actividad realizada desde tu sesión.
      </p>

      <h2>Contenido que aportas</h2>
      <ul>
        <li>
          Eres responsable del contenido que publicas o envías (comunidades,
          imágenes, reseñas y feedback) y declaras tener derecho a compartirlo.
        </li>
        <li>
          Debe ser <strong>veraz y respetuoso</strong>. No se permite contenido
          ilegal, ofensivo, engañoso, spam, ni que infrinja derechos de terceros
          o la privacidad de otras personas.
        </li>
        <li>
          Al publicarlo, nos concedes permiso para mostrar y distribuir ese
          contenido dentro de la plataforma con el fin de operarla. El contenido
          sigue siendo tuyo.
        </li>
      </ul>

      <h2>Moderación</h2>
      <p>
        Para mantener un espacio sano, podemos{' '}
        <strong>revisar, ocultar o eliminar</strong> contenido que incumpla
        estas condiciones, así como suspender cuentas con uso abusivo o
        reiterado. También puedes usar el formulario de feedback de la
        aplicación para reportar bugs, problemas o sugerencias.
      </p>

      <h2>Uso aceptable</h2>
      <ul>
        <li>No intentes vulnerar, sobrecargar o abusar del servicio.</li>
        <li>
          No realices envíos masivos automatizados ni extracción masiva de
          datos.
        </li>
        <li>
          No suplantes a otras personas ni publiques en su nombre sin permiso.
        </li>
      </ul>

      <h2>Feedback y reportes</h2>
      <p>
        Puedes enviar feedback, reportes de bugs y solicitudes de features desde
        la plataforma. Al hacerlo, aceptas que usemos esa información para
        analizar, priorizar y mejorar el servicio. No garantizamos implementar
        todas las solicitudes ni responder individualmente a cada reporte.
      </p>
      <p>
        No incluyas información sensible, datos personales de terceros, secretos
        ni contenido confidencial en el feedback.
      </p>

      <h2>Propiedad intelectual</h2>
      <p>
        El código de Basket Places es de código abierto y se distribuye bajo su
        licencia (MIT). El contenido aportado por las personas usuarias
        pertenece a quienes lo crean.
      </p>

      <h2>Estado beta y disponibilidad</h2>
      <p>
        El servicio se ofrece <strong>“tal cual”</strong>, en fase beta y sin
        garantías de disponibilidad. Puede cambiar, interrumpirse o presentar
        errores, y no podemos garantizar que el contenido no se pierda. Úsalo
        teniendo esto en cuenta.
      </p>

      <h2>Limitación de responsabilidad</h2>
      <p>
        En la medida que permita la ley, no nos hacemos responsables de daños
        derivados del uso del servicio ni de la exactitud del contenido aportado
        por terceros. La información sobre lugares y comunidades puede no estar
        actualizada; verifícala antes de actuar sobre ella.
      </p>

      <h2>Cambios en estas condiciones</h2>
      <p>
        Podemos actualizar estas condiciones durante la beta. Publicaremos los
        cambios en esta misma página, actualizando la fecha del encabezado. El
        uso continuado implica su aceptación.
      </p>
    </>
  );
}
