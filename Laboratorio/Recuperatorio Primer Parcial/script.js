import { Aereo } from "./Clases/Aereo.js";
import { Terrestre } from "./Clases/Terrestre.js";
import * as funciones from './funciones.js';

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
        // Convertimos el JSON en string para usarlo con nuestra función
        const jsonString = JSON.stringify(data);

        // Llamamos a la función que generará las instancias y lo asignamos a 'vehiculos'
        vehiculos = funciones.generarVehiculosDesdeJSON(jsonString);

        // Mostramos los vehículos en la consola
        vehiculos.forEach(vehiculo => {
            console.log(vehiculo.toString());
        });

        // Mostrar los vehículos en la tabla
        funciones.mostrarVehiculosEnTabla(vehiculos);
    })
    .catch(error => {
        console.error("ERROR: Hubo un problema al cargar el archivo JSON:\n", error);
    });

// Filtrar los vehículos según el valor seleccionado
document.getElementById('filtro').addEventListener('change', function() {
  const filtroSeleccionado = this.value;

  // Llamamos a la función filtrarVehiculos pasándole el array vehiculos
  funciones.filtrarVehiculos(vehiculos, filtroSeleccionado);
});

// Calcular la velocidad máxima promedio al hacer click en "Calcular"
document.querySelector('button[type="button"]').addEventListener('click', function() {
  const filtroSeleccionado = document.getElementById('filtro').value;

  // Filtramos los vehículos según el filtro seleccionado
  let vehiculosFiltrados = [];
  if (filtroSeleccionado === 'terrestre') {
    vehiculosFiltrados = vehiculos.filter(vehiculo => vehiculo instanceof Terrestre);
  } else if (filtroSeleccionado === 'aereo') {
    vehiculosFiltrados = vehiculos.filter(vehiculo => vehiculo instanceof Aereo);
  } else {
    vehiculosFiltrados = vehiculos;
  }

  // Llamamos a la función para calcular el promedio de la velocidad máxima
  const promedioVelocidadMax = funciones.calcularPromedioVelocidadMax(vehiculosFiltrados);

  // Mostrar el promedio en el input correspondiente
  document.getElementById('prom-vel-max').value = promedioVelocidadMax.toFixed(2);
});
