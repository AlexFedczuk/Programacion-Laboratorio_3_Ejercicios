import { Aereo } from "./Clases/Aereo.js";
import { Terrestre } from "./Clases/Terrestre.js";
import * as funciones from './funciones.js';

document.addEventListener('DOMContentLoaded', function () {
  let vehiculos = []; // Lista completa de vehículos
  let vehiculoSeleccionado = null; // Vehículo seleccionado para editar
  let ordenAscendente = true; // Control para alternar el orden ascendente y descendente
  let filtroSeleccionado = 'todos'; // Filtro inicial (todos los vehículos)

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
    if (validarFormularioABM()) { // Validamos el formulario antes de continuar
      const nuevoVehiculo = crearVehiculoDesdeFormulario(); // Crear el vehículo con el ID generado
      vehiculos.push(nuevoVehiculo); // Agregar el vehículo a la lista
      actualizarTablaVehiculos(); // Actualizar la tabla con el nuevo vehículo
      ocultarFormularioABM(); // Ocultar el formulario ABM
    }
  });

  // Modificar un vehículo existente
  document.getElementById('btn-modificar').addEventListener('click', function () {
    if (vehiculoSeleccionado && validarFormularioABM()) { // Validamos el formulario antes de continuar
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

  // Filtrar los vehículos según el valor seleccionado
  document.getElementById('filtro').addEventListener('change', function () {
    filtroSeleccionado = this.value; // Actualizamos el filtro seleccionado
    actualizarTablaVehiculos(); // Actualizamos la tabla con los vehículos filtrados
  });

  // Capturar los clics en los encabezados de la tabla para ordenar
  document.querySelectorAll('th').forEach(th => {
    th.addEventListener('click', function () {
      const columna = this.textContent.toLowerCase().replace(" ", ""); // Obtener el nombre de la columna
      ordenarTablaPorColumna(columna);
    });
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

  // Función para validar los campos del formulario ABM
  function validarFormularioABM() {
    let valido = true;
    let errores = [];

    const modelo = document.getElementById('modelo').value;
    const anoFab = parseInt(document.getElementById('anoFab').value);
    const velMax = parseInt(document.getElementById('velMax').value);
    const tipo = document.getElementById('tipo').value;

    // Validaciones comunes a todos los vehículos
    if (modelo.trim() === '') {
      errores.push('El modelo no puede estar vacío.');
      valido = false;
    }
    if (isNaN(anoFab) || anoFab <= 1885) {
      errores.push('El año de fabricación debe ser mayor a 1885.');
      valido = false;
    }
    if (isNaN(velMax) || velMax <= 0) {
      errores.push('La velocidad máxima debe ser mayor a 0.');
      valido = false;
    }

    // Validaciones específicas para vehículos aéreos
    if (tipo === 'aereo') {
      const altMax = parseInt(document.getElementById('altMax').value);
      const autonomia = parseInt(document.getElementById('autonomia').value);

      if (isNaN(altMax) || altMax <= 0) {
        errores.push('La altura máxima debe ser mayor a 0.');
        valido = false;
      }
      if (isNaN(autonomia) || autonomia <= 0) {
        errores.push('La autonomía debe ser mayor a 0.');
        valido = false;
      }
    }

    // Validaciones específicas para vehículos terrestres
    if (tipo === 'terrestre') {
      const cantPue = parseInt(document.getElementById('cantPue').value);
      const cantRue = parseInt(document.getElementById('cantRue').value);

      if (isNaN(cantPue) || cantPue < 0) {
        errores.push('La cantidad de puertas debe ser mayor o igual a 0.');
        valido = false;
      }
      if (isNaN(cantRue) || cantRue <= 0) {
        errores.push('La cantidad de ruedas debe ser mayor a 0.');
        valido = false;
      }
    }

    // Mostrar errores si hay alguno
    if (!valido) {
      alert(errores.join('\n')); // Mostrar errores en una alerta (puedes cambiarlo por un mejor manejo de errores)
    }

    return valido; // Retornar si el formulario es válido o no
  }

  // Función para ordenar la tabla según la columna clickeada
  function ordenarTablaPorColumna(columna) {
    const vehiculosFiltrados = aplicarFiltro(); // Obtener los vehículos filtrados
    vehiculosFiltrados.sort((a, b) => {
      let valorA = a[columna];
      let valorB = b[columna];

      // Si los valores son strings, hacer la comparación de forma alfabética
      if (typeof valorA === 'string') {
        valorA = valorA.toLowerCase();
        valorB = valorB.toLowerCase();
        if (ordenAscendente) {
          return valorA.localeCompare(valorB);
        } else {
          return valorB.localeCompare(valorA);
        }
      } else { 
        // Para números
        if (ordenAscendente) {
          return valorA - valorB;
        } else {
          return valorB - valorA;
        }
      }
    });

    ordenAscendente = !ordenAscendente; // Alternar el orden en cada clic

    // Actualizar la tabla con los datos ordenados
    funciones.mostrarVehiculosEnTabla(vehiculosFiltrados); // Mostramos los vehículos filtrados y ordenados
  }

  // Función para actualizar la tabla con los vehículos filtrados y ordenados
  function actualizarTablaVehiculos() {
    const vehiculosFiltrados = aplicarFiltro(); // Aplicamos el filtro actual
    funciones.mostrarVehiculosEnTabla(vehiculosFiltrados); // Mostrar solo los vehículos filtrados

    // Re-agregamos los event listeners de doble clic en las filas
    document.querySelectorAll('tbody tr').forEach(fila => {
      fila.addEventListener('dblclick', function () {
        const id = this.querySelector('td:first-child').textContent; // Obtener el ID de la fila
        vehiculoSeleccionado = vehiculos.find(v => v.id == id); // Buscar el vehículo por ID
        mostrarFormularioABM(vehiculoSeleccionado); // Mostrar el formulario con los datos del vehículo
      });
    });
  }

  // Función para aplicar el filtro actual a los vehículos
  function aplicarFiltro() {
    if (filtroSeleccionado === 'terrestre') {
      return vehiculos.filter(v => v instanceof Terrestre);
    } else if (filtroSeleccionado === 'aereo') {
      return vehiculos.filter(v => v instanceof Aereo);
    } else {
      return vehiculos; // Si el filtro es 'todos', devolvemos todos los vehículos
    }
  }
});