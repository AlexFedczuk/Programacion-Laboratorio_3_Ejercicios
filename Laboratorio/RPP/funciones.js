import { Futbolista } from "./Clases/Futbolista.js";
import { Profesional } from "./Clases/Profesional.js";

console.log("El archivo funciones.js se ha cargado correctamente.");

/**
 * Función para generar un array de objetos de las clases Futbolista y Profesional desde una cadena JSON.
 * @param {string} jsonString - La cadena JSON con los datos de las personas.
 * @returns {Array} - Un array con las instancias creadas (Futbolista o Profesional).
 */
export function generarPersonasDesdeJSON(jsonString) {
  const personasArray = JSON.parse(jsonString); // Parsear JSON
  const personas = []; // Array para almacenar las instancias

  personasArray.forEach((personaData) => {
    if (personaData.equipo && personaData.posicion && personaData.cantidadGoles !== undefined) {
      // Es un Futbolista
      const futbolista = new Futbolista(
        personaData.id,
        personaData.nombre,
        personaData.apellido,
        personaData.edad,
        personaData.equipo,
        personaData.posicion,
        personaData.cantidadGoles
      );
      personas.push(futbolista);
    } else if (personaData.titulo && personaData.facultad && personaData.anioGraduacion) {
      // Es un Profesional
      const profesional = new Profesional(
        personaData.id,
        personaData.nombre,
        personaData.apellido,
        personaData.edad,
        personaData.titulo,
        personaData.facultad,
        personaData.anioGraduacion
      );
      personas.push(profesional);
    }
  });

  return personas; // Devuelve el array de personas creadas
}

/**
 * Muestra las personas en la tabla de "Form Datos".
 * @param {Array} personas - Array de objetos (instancias de Futbolista o Profesional).
 */
export function mostrarPersonasEnTabla(personas) {
  const tbody = document.querySelector("tbody");

  // Limpiamos cualquier fila existente en la tabla antes de agregar nuevos datos
  tbody.innerHTML = "";

  // Iteramos sobre las personas y creamos filas en la tabla
  personas.forEach((persona) => {
    const fila = document.createElement("tr");

    // Crear celdas con la información de la persona
    fila.innerHTML = `
      <td>${persona.id}</td>
      <td>${persona.nombre}</td>
      <td>${persona.apellido}</td>
      <td>${persona.edad}</td>
      <td>${persona.equipo || "--"}</td>
      <td>${persona.posicion || "--"}</td>
      <td>${persona.cantidadGoles !== undefined ? persona.cantidadGoles : "--"}</td>
      <td>${persona.titulo || "--"}</td>
      <td>${persona.facultad || "--"}</td>
      <td>${persona.anioGraduacion !== undefined ? persona.anioGraduacion : "--"}</td>
    `;

    // Agregamos la fila al cuerpo de la tabla
    tbody.appendChild(fila);
  });
}

/**
 * Filtra las personas y las muestra en la tabla según el tipo seleccionado.
 * @param {Array} personas - Array de personas.
 * @param {string} filtro - Valor del filtro ('todos', 'futbolista', 'profesional').
 */
export function filtrarPersonas(personas, filtro) {
  let personasFiltradas = [];

  if (filtro === 'futbolista') {
    personasFiltradas = personas.filter(persona => persona instanceof Futbolista);
  } else if (filtro === 'profesional') {
    personasFiltradas = personas.filter(persona => persona instanceof Profesional);
  } else {
    personasFiltradas = personas; // Mostrar todos si el filtro es 'todos'
  }

  mostrarPersonasEnTabla(personasFiltradas); // Mostramos las personas filtradas
}

/**
 * Calcula el promedio de goles (Futbolistas) o el promedio de año de graduación (Profesionales).
 * @param {Array} personas - Array de objetos (instancias de Futbolista o Profesional).
 * @returns {number} - El promedio calculado.
 */
export function calcularPromedio(personas) {
  if (personas.length === 0) return 0;

  const sumaValores = personas
    .map(persona => persona.cantidadGoles !== undefined ? persona.cantidadGoles : persona.anioGraduacion)
    .reduce((suma, valor) => suma + valor, 0);  // Sumamos los goles o los años de graduación

  return sumaValores / personas.length; // Calculamos el promedio
}

/**
 * Muestra el formulario ABM con los datos de la persona (Futbolista o Profesional) o vacío.
 * @param {Object|null} persona - El objeto persona a editar, o null si se va a agregar una nueva.
 */
export function mostrarFormularioABM(persona) {
  console.log("mostrarFormularioABM llamada con persona:", persona); // Para verificar que se llama
  // Ocultamos el "Form Datos"
  document.querySelector('.form-filtros').style.display = 'none';

  // Mostramos el "Formulario ABM"
  const formABM = document.getElementById('form-abm');
  formABM.style.display = 'block';

  if (persona) {
    // Si estamos editando, llenamos los campos con los datos de la persona
    document.getElementById('id').value = persona.id;
    document.getElementById('nombre').value = persona.nombre;
    document.getElementById('apellido').value = persona.apellido;
    document.getElementById('edad').value = persona.edad;
    document.getElementById('equipo').value = persona.equipo || '';
    document.getElementById('posicion').value = persona.posicion || '';
    document.getElementById('cantidadGoles').value = persona.cantidadGoles !== undefined ? persona.cantidadGoles : '';
    document.getElementById('titulo').value = persona.titulo || '';
    document.getElementById('facultad').value = persona.facultad || '';
    document.getElementById('anioGraduacion').value = persona.anioGraduacion || '';

    // Mostramos el botón "Modificar" y ocultamos "Agregar"
    document.getElementById('btn-alta').style.display = 'none';
    document.getElementById('btn-modificar').style.display = 'inline-block';
  } else {
    // Si es un nuevo registro, vaciamos los campos
    document.getElementById('id').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('edad').value = '';
    document.getElementById('equipo').value = '';
    document.getElementById('posicion').value = '';
    document.getElementById('cantidadGoles').value = '';
    document.getElementById('titulo').value = '';
    document.getElementById('facultad').value = '';
    document.getElementById('anioGraduacion').value = '';

    // Mostramos el botón "Agregar" y ocultamos "Modificar"
    document.getElementById('btn-alta').style.display = 'inline-block';
    document.getElementById('btn-modificar').style.display = 'none';
  }
}