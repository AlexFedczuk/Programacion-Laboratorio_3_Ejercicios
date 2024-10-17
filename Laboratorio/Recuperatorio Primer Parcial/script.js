import { generarVehiculosDesdeJSON } from './funciones.js';

// Hacemos una solicitud fetch para obtener el archivo JSON
fetch('./Registros/vehiculos.json')
  .then(response => {
    if (!response.ok) {
      throw new Error("ERROR: Error al cargar el archivo JSON\n");
    }
    return response.json(); // Convertimos la respuesta a formato JSON
  })
  .then(data => {
    // Convertimos el JSON en string para usarlo con nuestra función
    const jsonString = JSON.stringify(data);
    
    // Llamamos a la función que generará las instancias
    const vehiculos = generarVehiculosDesdeJSON(jsonString);
    
    // Mostramos los vehículos en la consola
    vehiculos.forEach(vehiculo => {
      console.log(vehiculo.toString());
    });
  })
  .catch(error => {
    console.error("ERROR: Hubo un problema al cargar el archivo JSON:\n", error);
  });