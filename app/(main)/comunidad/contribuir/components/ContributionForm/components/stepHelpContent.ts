export const STEP_HELP = {
  type: {
    title: '¿De que comunidad se trata?',
    description:
      'Reta para grupos informales y Club para organización con entrenamientos y categorías definidos',
  },
  basicInfo: {
    title: '¿Qué es lo que hace única a la comunidad?',
    description:
      'Incluye nombre claro, ambiente, nivel de juego y cualquier detalle que ayude a otros a decidir si asistir.',
  },
  location: {
    title: 'Ubica la cancha con precisión',
    description:
      'Arrastra el marcador hasta la cancha o punto de reunión. La ubicación se guarda automáticamente después de soltar el marcador.',
  },
  images: {
    title: 'Sube fotos utiles y horizontales',
    description: 'deben ser 2 como mínimo, 4 máximo todas estar en orizontal',
  },
  schedule: {
    title: 'Agrupa dias con el mismo horario',
    description:
      'Crea bloques para días que comparten hora de inicio y fin. Si hay horarios diferentes, agrega otro bloque.',
  },
  services: {
    title: 'Marca solo servicios disponibles',
    description: 'selecciona los que usualmente siempre se encuentran',
  },
  pickupAgeGroup: {
    title: 'Indica la edad predominante',
    description:
      'Elige el grupo de edad que mejor represente a quienes suelen jugar',
  },
  clubCategories: {
    title: 'Categorías y género',
    description:
      'Selecciona las categorías con equipos en el club y define el género de cada una.',
  },
} as const;
