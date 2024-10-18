import { Aereo } from "./Clases/Aereo.js";
import { Terrestre } from "./Clases/Terrestre.js";
import * as funciones from './funciones.js';

console.log(funciones); // Ver las funciones exportadas

document.addEventListener('DOMContentLoaded', function() {
  let vehiculos = []; // Definimos 'vehiculos' en un ámbito global

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

          // Mostramos los vehículos en la consola
          vehiculos.forEach(vehiculo => {
              console.log(vehiculo.toString());
          });

          // Mostrar los vehículos en la tabla
          funciones.mostrarVehiculosEnTabla(vehiculos);

          // Agregar event listener de doble clic para editar cada fila
          document.querySelectorAll('tbody tr').forEach(fila => {
              fila.addEventListener('dblclick', function() {
                  const id = this.querySelector('td:first-child').textContent; // Obtener el ID de la fila
                  const vehiculo = vehiculos.find(v => v.id == id); // Buscar el vehículo por ID

                  // En lugar de llamar a una función, directamente ejecutamos el código aquí
                  mostrarFormularioABM(vehiculo);
              });
          });
      })
      .catch(error => {
          console.error("ERROR: Hubo un problema al cargar el archivo JSON:\n", error);
      });

  // Filtrar los vehículos según el valor seleccionado
  document.getElementById('filtro').addEventListener('change', function() {
    const filtroSeleccionado = this.value;

    // Filtrar los vehículos según el filtro seleccionado
    funciones.filtrarVehiculos(vehiculos, filtroSeleccionado);
  });

  // Calcular la velocidad máxima promedio al hacer clic en "Calcular"
  document.getElementById('btn-calcular').addEventListener('click', function() {
    const filtroSeleccionado = document.getElementById('filtro').value;

    // Filtrar los vehículos según el filtro seleccionado
    let vehiculosFiltrados = [];
    if (filtroSeleccionado === 'terrestre') {
      vehiculosFiltrados = vehiculos.filter(vehiculo => vehiculo instanceof Terrestre);
    } else if (filtroSeleccionado === 'aereo') {
      vehiculosFiltrados = vehiculos.filter(vehiculo => vehiculo instanceof Aereo);
    } else {
      vehiculosFiltrados = vehiculos;
    }

    // Calcular el promedio de la velocidad máxima
    const promedioVelocidadMax = funciones.calcularPromedioVelocidadMax(vehiculosFiltrados);

    // Mostrar el promedio en el input correspondiente
    document.getElementById('prom-vel-max').value = promedioVelocidadMax.toFixed(2);
  });

  // Mostrar el formulario ABM al hacer clic en el botón "Agregar"
  document.getElementById('btn-agregar').addEventListener('click', function() {
    mostrarFormularioABM(null); // Ejecutamos el código directamente aquí para agregar un nuevo vehículo
  });

  // Ocultar el "Formulario ABM" y mostrar el "Form Datos" al hacer clic en "Cancelar"
  document.getElementById('btn-cancelar').addEventListener('click', function() {
    document.querySelector('.form-filtros').style.display = 'block';
    document.getElementById('form-abm').style.display = 'none';
  });

  // Aquí coloco directamente el código de la función en lugar de llamarla desde otro archivo
  function mostrarFormularioABM(vehiculo) {
    console.log("mostrarFormularioABM llamada con vehiculo:", vehiculo);

    // Ocultamos el "Form Datos"
    document.querySelector('.form-filtros').style.display = 'none';

    // Mostramos el "Formulario ABM"
    const formABM = document.getElementById('form-abm');
    formABM.style.display = 'block';

    if (vehiculo) {
      // Si estamos editando, llenamos los campos con los datos del vehículo
      document.getElementById('id').value = vehiculo.id;
      document.getElementById('modelo').value = vehiculo.modelo;
      document.getElementById('anoFab').value = vehiculo.anoFab;
      document.getElementById('velMax').value = vehiculo.velMax;
      document.getElementById('tipo').value = vehiculo instanceof Aereo ? 'aereo' : 'terrestre';
      document.getElementById('altMax').value = vehiculo.altMax || '';
      document.getElementById('autonomia').value = vehiculo.autonomia || '';
      document.getElementById('cantPue').value = vehiculo.cantPue || '';
      document.getElementById('cantRue').value = vehiculo.cantRue || '';

      // Mostramos el botón "Modificar" y ocultamos "Agregar"
      document.getElementById('btn-agregar').style.display = 'none';
      document.getElementById('btn-modificar').style.display = 'inline-block';
    } else {
      // Si es un nuevo registro, vaciamos los campos
      document.getElementById('id').value = '';
      document.getElementById('modelo').value = '';
      document.getElementById('anoFab').value = '';
      document.getElementById('velMax').value = '';
      document.getElementById('tipo').value = 'aereo'; // Valor por defecto
      document.getElementById('altMax').value = '';
      document.getElementById('autonomia').value = '';
      document.getElementById('cantPue').value = '';
      document.getElementById('cantRue').value = '';

      // Mostramos el botón "Agregar" y ocultamos "Modificar"
      document.getElementById('btn-agregar').style.display = 'inline-block';
      document.getElementById('btn-modificar').style.display = 'none';
    }
  }
});