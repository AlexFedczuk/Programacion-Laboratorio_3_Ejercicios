import { Aereo } from "./Clases/Aereo.js";
import { Terrestre } from "./Clases/Terrestre.js";
import * as funciones from './funciones.js';

document.addEventListener('DOMContentLoaded', function () {
  let vehiculos = []; // Definimos 'vehiculos' en un ámbito global
  let vehiculoSeleccionado = null; // Variable para almacenar el vehículo seleccionado para editar

  // Hacemos una solicitud fetch para obtener el archivo JSON
  fetch('./Registros/vehiculos.json')
    .then(response => {
      if (!response.ok) {
        throw new Error("ERROR: Error al cargar el archivo JSON\n");
      }
      return response.json(); // Convertimos la respuesta a formato JSON
    })
    .then(data => {
      const jsonString = JSON.stringify(data);

      // Generamos las instancias de los vehículos
      vehiculos = funciones.generarVehiculosDesdeJSON(jsonString);

      // Mostrar los vehículos en la tabla
      funciones.mostrarVehiculosEnTabla(vehiculos);

      // Agregar event listener de doble clic para editar cada fila
      document.querySelectorAll('tbody tr').forEach(fila => {
        fila.addEventListener('dblclick', function () {
          const id = this.querySelector('td:first-child').textContent; // Obtener el ID de la fila
          vehiculoSeleccionado = vehiculos.find(v => v.id == id); // Buscar el vehículo por ID
          mostrarFormularioABM(vehiculoSeleccionado); // Mostrar el formulario con los datos del vehículo
        });
      });
    })
    .catch(error => {
      console.error("ERROR: Hubo un problema al cargar el archivo JSON:\n", error);
    });

  // Filtrar los vehículos según el valor seleccionado
  document.getElementById('filtro').addEventListener('change', function () {
    const filtroSeleccionado = this.value;
    funciones.filtrarVehiculos(vehiculos, filtroSeleccionado);
  });

  // Calcular la velocidad máxima promedio al hacer clic en "Calcular"
  document.getElementById('btn-calcular').addEventListener('click', function () {
    const filtroSeleccionado = document.getElementById('filtro').value;
    const vehiculosFiltrados = filtroSeleccionado === 'terrestre'
      ? vehiculos.filter(v => v instanceof Terrestre)
      : filtroSeleccionado === 'aereo'
        ? vehiculos.filter(v => v instanceof Aereo)
        : vehiculos;
    const promedioVelocidadMax = funciones.calcularPromedioVelocidadMax(vehiculosFiltrados);
    document.getElementById('prom-vel-max').value = promedioVelocidadMax.toFixed(2);
  });

  // Mostrar el formulario ABM al hacer clic en el botón "Agregar" desde el Form Datos
  document.getElementById('btn-agregar-form-datos').addEventListener('click', function () {
    mostrarFormularioABM(null); // Mostrar el formulario vacío para agregar un nuevo vehículo
  });

  // Agregar un nuevo vehículo al hacer clic en el botón "Agregar" del formulario ABM
  document.getElementById('btn-agregar-abm').addEventListener('click', function () {
    // Crear un nuevo vehículo
    const nuevoVehiculo = crearVehiculoDesdeFormulario();
    nuevoVehiculo.id = generarIdUnico(); // Generar un ID único para el nuevo vehículo
    vehiculos.push(nuevoVehiculo); // Agregar el vehículo a la lista
    actualizarTablaVehiculos(); // Actualizar la tabla
    ocultarFormularioABM(); // Ocultar el formulario ABM
  });

  // Modificar un vehículo existente
  document.getElementById('btn-modificar').addEventListener('click', function () {
    if (vehiculoSeleccionado) {
      // Actualizar los datos del vehículo (menos el ID)
      actualizarVehiculoDesdeFormulario(vehiculoSeleccionado);
      actualizarTablaVehiculos(); // Actualizar la tabla
      ocultarFormularioABM(); // Ocultar el formulario ABM
    }
  });

  // Eliminar un vehículo
  document.getElementById('btn-eliminar').addEventListener('click', function () {
    if (vehiculoSeleccionado) {
      vehiculos = vehiculos.filter(v => v.id !== vehiculoSeleccionado.id); // Filtrar para eliminar el vehículo
      actualizarTablaVehiculos(); // Actualizar la tabla
      ocultarFormularioABM(); // Ocultar el formulario ABM
    }
  });

  // Ocultar el "Formulario ABM" y mostrar el "Form Datos" al hacer clic en "Cancelar"
  document.getElementById('btn-cancelar').addEventListener('click', function () {
    ocultarFormularioABM(); // Ocultar el formulario ABM
  });

  // Función para mostrar el formulario ABM con los datos de un vehículo o vacío para agregar uno nuevo
  function mostrarFormularioABM(vehiculo) {
    document.querySelector('.form-filtros').style.display = 'none';
    const formABM = document.getElementById('form-abm');
    formABM.style.display = 'block';

    if (vehiculo) {
      document.getElementById('id').value = vehiculo.id;
      document.getElementById('modelo').value = vehiculo.modelo;
      document.getElementById('anoFab').value = vehiculo.anoFab;
      document.getElementById('velMax').value = vehiculo.velMax;
      document.getElementById('tipo').value = vehiculo instanceof Aereo ? 'aereo' : 'terrestre';
      document.getElementById('altMax').value = vehiculo.altMax || '';
      document.getElementById('autonomia').value = vehiculo.autonomia || '';
      document.getElementById('cantPue').value = vehiculo.cantPue || '';
      document.getElementById('cantRue').value = vehiculo.cantRue || '';

      document.getElementById('btn-agregar-abm').style.display = 'none';
      document.getElementById('btn-modificar').style.display = 'inline-block';
      document.getElementById('btn-eliminar').style.display = 'inline-block';
    } else {
      document.getElementById('id').value = '';
      document.getElementById('modelo').value = '';
      document.getElementById('anoFab').value = '';
      document.getElementById('velMax').value = '';
      document.getElementById('tipo').value = 'aereo'; // Valor por defecto
      document.getElementById('altMax').value = '';
      document.getElementById('autonomia').value = '';
      document.getElementById('cantPue').value = '';
      document.getElementById('cantRue').value = '';

      document.getElementById('btn-agregar-abm').style.display = 'inline-block';
      document.getElementById('btn-modificar').style.display = 'none';
      document.getElementById('btn-eliminar').style.display = 'none';
    }
  }

  // Función para crear un nuevo vehículo desde el formulario
  function crearVehiculoDesdeFormulario() {
    const tipo = document.getElementById('tipo').value;
    const nuevoId = generarIdUnico();

    if (tipo === 'aereo') {
      return new Aereo(
        nuevoId,
        document.getElementById('modelo').value,
        parseInt(document.getElementById('anoFab').value),
        parseInt(document.getElementById('velMax').value),
        parseInt(document.getElementById('altMax').value),
        parseInt(document.getElementById('autonomia').value)
      );
    } else {
      return new Terrestre(
        nuevoId,
        document.getElementById('modelo').value,
        parseInt(document.getElementById('anoFab').value),
        parseInt(document.getElementById('velMax').value),
        parseInt(document.getElementById('cantPue').value),
        parseInt(document.getElementById('cantRue').value)
      );
    }
  }

  // Función para actualizar los datos de un vehículo desde el formulario
  function actualizarVehiculoDesdeFormulario(vehiculo) {
    vehiculo.modelo = document.getElementById('modelo').value;
    vehiculo.anoFab = parseInt(document.getElementById('anoFab').value);
    vehiculo.velMax = parseInt(document.getElementById('velMax').value);

    if (vehiculo instanceof Aereo) {
      vehiculo.altMax = parseInt(document.getElementById('altMax').value);
      vehiculo.autonomia = parseInt(document.getElementById('autonomia').value);
    } else if (vehiculo instanceof Terrestre) {
      vehiculo.cantPue = parseInt(document.getElementById('cantPue').value);
      vehiculo.cantRue = parseInt(document.getElementById('cantRue').value);
    }
  }

  // Función para generar un ID único para un nuevo vehículo
  function generarIdUnico() {
    if (vehiculos.length === 0) {
      return 1; // Si no hay vehículos, el primer ID será 1
    }

    // Usamos map/reduce para obtener el ID máximo y generar uno nuevo
    const idMax = vehiculos
      .map(v => v.id)
      .reduce((max, id) => (id > max ? id : max), 0);

    return idMax + 1; // El nuevo ID será el máximo + 1
  }

  // Función para actualizar la tabla con los vehículos actuales
  function actualizarTablaVehiculos() {
    funciones.mostrarVehiculosEnTabla(vehiculos); // Usamos la función ya existente
    // Re-agregamos los event listeners de doble clic en las filas
    document.querySelectorAll('tbody tr').forEach(fila => {
      fila.addEventListener('dblclick', function () {
        const id = this.querySelector('td:first-child').textContent; // Obtener el ID de la fila
        vehiculoSeleccionado = vehiculos.find(v => v.id == id); // Buscar el vehículo por ID
        mostrarFormularioABM(vehiculoSeleccionado); // Mostrar el formulario con los datos del vehículo
      });
    });
  }

  // Función para ocultar el formulario ABM y mostrar el "Form Datos"
  function ocultarFormularioABM() {
    document.querySelector('.form-filtros').style.display = 'block';
    document.getElementById('form-abm').style.display = 'none';
    // Limpiamos la selección del vehículo
    vehiculoSeleccionado = null;
  }
});