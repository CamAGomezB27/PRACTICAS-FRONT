export type Estado =
  | 'CREADA'
  | 'GESTIONADA'
  | 'EN GESTIÓN'
  | 'RECHAZADA'
  | 'PENDIENTE';

export function getMensajePorEstado(
  estado: Estado,
  esNomina: boolean,
  esIndividual: boolean = false, // 👈 nuevo parámetro opcional
): string {
  if (esIndividual) {
    // 👉 Mensajes para NOVEDADES INDIVIDUALES
    if (esNomina) {
      switch (estado) {
        case 'CREADA':
        case 'PENDIENTE':
          return 'Formulario recibido. Debes revisar y validar esta solicitud.';
        case 'EN GESTIÓN':
          return 'Está novedad individual se esta gestionando.';
        case 'GESTIONADA':
          return 'Formulario gestionado exitosamente.';
        case 'RECHAZADA':
          return 'Formulario rechazado por Nómina.';
        default:
          return '';
      }
    } else {
      switch (estado) {
        case 'CREADA':
        case 'PENDIENTE':
          return 'Formulario enviado. El equipo de Nómina revisará tu solicitud.';
        case 'EN GESTIÓN':
          return 'Nómina está validando tu solicitud individual.';
        case 'GESTIONADA':
          return 'Tu novedad individual fue gestionada correctamente.';
        case 'RECHAZADA':
          return 'Tu solicitud individual fue rechazada.';
        default:
          return '';
      }
    }
  }

  // 👉 Mensajes para NOVEDADES MASIVAS (ya existentes)
  if (esNomina) {
    switch (estado) {
      case 'CREADA':
      case 'PENDIENTE':
        return 'Solicitud recibida. Aún no ha sido gestionada.';
      case 'EN GESTIÓN':
        return 'Se está gestionando esta novedad.';
      case 'GESTIONADA':
        return 'Validación completada. Esta novedad ya fue gestionada.';
      case 'RECHAZADA':
        return 'La novedad fue rechazada por el equipo de Nómina.';
      default:
        return '';
    }
  } else {
    switch (estado) {
      case 'CREADA':
      case 'PENDIENTE':
        return 'Archivo subido correctamente. Tu solicitud está lista para ser validada por el equipo de Nómina.';
      case 'EN GESTIÓN':
        return 'El equipo de Nómina se encuentra validando tus solicitudes de esta novedad.';
      case 'GESTIONADA':
        return 'El equipo de Nómina ya validó tu novedad. Verifica si hay anotaciones o comentarios.';
      case 'RECHAZADA':
        return 'La novedad fue rechazada. Revisa las observaciones del equipo de Nómina.';
      default:
        return '';
    }
  }
}
