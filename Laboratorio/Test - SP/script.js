import { 
    generarInstanciasDesdeJSON,
    mostrarPersonasEnTabla 
} from "./funciones.js";

document.addEventListener('DOMContentLoaded', () => {
  // Usamos fetch para cargar el archivo JSON desde la raíz
  fetch('./datos.json')
    .then(response => {
      if (!response.ok) {
        throw new Error("Error al cargar el archivo JSON.");
      }
      return response.json();
    })
    .then(data => {
      // Generamos las instancias a partir de los datos cargados
      const personas = generarInstanciasDesdeJSON(JSON.stringify(data));
      mostrarPersonasEnTabla(personas); // Llamamos a la función para llenar la tabla con las instancias
    })
    .catch(error => console.error("Error:", error));
});