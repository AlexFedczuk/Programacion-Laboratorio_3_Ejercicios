import { Persona } from "./Persona.js";
import { Empleado } from "./Empleado.js";
import { Cliente } from "./Cliente.js";

/**
 * Genera un array de instancias de Persona, Empleado o Cliente desde una cadena JSON.
 * @param {string} jsonString - La cadena JSON con los datos.
 * @returns {Array} - Un array de instancias creadas.
 */
export function generarInstanciasDesdeJSON(jsonString) {
  const data = JSON.parse(jsonString);
  const instancias = [];

  data.forEach(item => {
    let instancia;
    
    if (item.puesto && item.salario !== undefined) {
      // Crear instancia de Empleado
      instancia = new Empleado(item.id, item.nombre, item.apellido, item.edad, item.puesto, item.salario);
    } else if (item.email && item.telefono) {
      // Crear instancia de Cliente
      instancia = new Cliente(item.id, item.nombre, item.apellido, item.edad, item.email, item.telefono);
    } else {
      // Crear instancia de Persona
      instancia = new Persona(item.id, item.nombre, item.apellido, item.edad);
    }
    
    instancias.push(instancia);
  });

  return instancias;
}

/**
 * Muestra una lista de personas en una tabla HTML.
 * La tabla HTML debe tener un `<tbody>` con el id `#tabla-personas`.
 * La función vacía el contenido de la tabla antes de llenarla con los nuevos datos.
 *
 * @param {Array} personas - Array de objetos que representan personas. Cada objeto debe tener
 * las propiedades `id`, `nombre`, `apellido`, y `edad`. Si el objeto es de tipo `Empleado` o `Cliente`,
 * también puede tener `puesto`, `salario`, `email`, y `telefono`.
 */
export function mostrarPersonasEnTabla(personas) {
    const tbody = document.querySelector('tbody');
    
    if (!tbody) {
      console.error("Error: No se encontró el elemento tbody en el DOM.");
      return;
    }
  
    tbody.innerHTML = ''; // Limpiar contenido anterior
  
    personas.forEach(persona => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${persona.id}</td>
        <td>${persona.atributo1 || 'N/A'}</td>
        <td>${persona.atributo2 || 'N/A'}</td>
        <td>${persona.atributo3 || 'N/A'}</td>
        <td>${persona.atributo4 || 'N/A'}</td>
        <td><button>Modificar</button></td>
        <td><button>Eliminar</button></td>
      `;
      tbody.appendChild(fila);
    });
}