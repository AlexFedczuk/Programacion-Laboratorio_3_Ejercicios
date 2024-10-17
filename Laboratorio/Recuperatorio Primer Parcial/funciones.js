import { Aereo } from './Clases/Aereo.js';
import { Terrestre } from './Clases/Terrestre.js';

/**
 * Función para generar un array de objetos de las clases Vehiculo, Aereo y Terrestre desde una cadena JSON.
 * @param {string} jsonString - La cadena JSON con los datos de los vehículos.
 * @returns {Array} - Un array con las instancias creadas (Aereo o Terrestre).
 */
export function generarVehiculosDesdeJSON(jsonString) {
  const vehiculosArray = JSON.parse(jsonString);  // Parsear JSON
  const vehiculos = [];  // Array para almacenar las instancias

  vehiculosArray.forEach(vehiculoData => {
    if (vehiculoData.cantPue !== undefined && vehiculoData.cantRue !== undefined) {
      // Es un vehículo Terrestre
      const terrestre = new Terrestre(
        vehiculoData.id,
        vehiculoData.modelo,
        vehiculoData.anoFab,
        vehiculoData.velMax,
        vehiculoData.cantPue,
        vehiculoData.cantRue
      );
      vehiculos.push(terrestre);
    } else if (vehiculoData.altMax !== undefined && vehiculoData.autonomia !== undefined) {
      // Es un vehículo Aereo
      const aereo = new Aereo(
        vehiculoData.id,
        vehiculoData.modelo,
        vehiculoData.anoFab,
        vehiculoData.velMax,
        vehiculoData.altMax,
        vehiculoData.autonomia
      );
      vehiculos.push(aereo);
    }
  });

  return vehiculos;  // Devuelve el array de vehículos creados
}