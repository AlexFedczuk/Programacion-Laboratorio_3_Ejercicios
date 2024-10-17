import { Aereo } from "./Clases/Aereo.js";
import { Terrestre } from "./Clases/Terrestre.js";

/**
 * Función para generar un array de objetos de las clases Vehiculo, Aereo y Terrestre desde una cadena JSON.
 * @param {string} jsonString - La cadena JSON con los datos de los vehículos.
 * @returns {Array} - Un array con las instancias creadas (Aereo o Terrestre).
 */
export function generarVehiculosDesdeJSON(jsonString) {
  const vehiculosArray = JSON.parse(jsonString); // Parsear JSON
  const vehiculos = []; // Array para almacenar las instancias

  vehiculosArray.forEach((vehiculoData) => {
    if (
      vehiculoData.cantPue !== undefined &&
      vehiculoData.cantRue !== undefined
    ) {
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
    } else if (
      vehiculoData.altMax !== undefined &&
      vehiculoData.autonomia !== undefined
    ) {
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

  return vehiculos; // Devuelve el array de vehículos creados
}

/**
 * Muestra los vehículos en la tabla de "Form Datos".
 * @param {Array} vehiculos - Array de objetos (instancias de Terrestre o Aereo).
 */
export function mostrarVehiculosEnTabla(vehiculos) {
  const tbody = document.querySelector("tbody"); // Seleccionamos el cuerpo de la tabla

  // Limpiamos cualquier fila existente en la tabla antes de agregar nuevos datos
  tbody.innerHTML = "";

  // Iteramos sobre los vehículos y creamos filas en la tabla
  vehiculos.forEach((vehiculo) => {
    const fila = document.createElement("tr");

    // Crear celdas con la información del vehículo
    fila.innerHTML = `
        <td>${vehiculo.id}</td>
        <td>${vehiculo.modelo}</td>
        <td>${vehiculo.anoFab}</td>
        <td>${vehiculo.velMax}</td>
        <td>${vehiculo.altMax || "--"}</td>
        <td>${vehiculo.autonomia || "--"}</td>
        <td>${vehiculo.cantPue || "--"}</td>
        <td>${vehiculo.cantRue || "--"}</td>
      `;

    // Agregamos la fila al cuerpo de la tabla
    tbody.appendChild(fila);
  });
}

/**
 * Filtra los vehículos y los muestra en la tabla según el tipo seleccionado.
 * @param {string} filtro - Valor del filtro ('todos', 'terrestre', 'aereo').
 */
export function filtrarVehiculos(vehiculos, filtro) {
  let vehiculosFiltrados = [];

  if (filtro === 'terrestre') {
    vehiculosFiltrados = vehiculos.filter(vehiculo => vehiculo instanceof Terrestre);
  } else if (filtro === 'aereo') {
    vehiculosFiltrados = vehiculos.filter(vehiculo => vehiculo instanceof Aereo);
  } else {
    vehiculosFiltrados = vehiculos; // Mostrar todos si el filtro es 'todos'
  }

  mostrarVehiculosEnTabla(vehiculosFiltrados); // Mostramos los vehículos filtrados
}
