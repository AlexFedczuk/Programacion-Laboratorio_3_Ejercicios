import { fetchVehiclesList } from "./api.js";
import { populateTable, showSpinner, hideSpinner } from "./dom.js";
import { initializeEvents } from "./events.js";

// Lista en memoria para manejar los vehículos
let vehiclesList = [];

// Función principal para inicializar la aplicación
const initializeApp = async () => {
    try {
        showSpinner(); // Mostrar spinner antes de cargar los datos

        // Obtener datos iniciales desde la API
        vehiclesList = await fetchVehiclesList();

        // Poblar la tabla con los datos obtenidos
        populateTable(vehiclesList);

        // Inicializar eventos del formulario y tabla
        initializeEvents(vehiclesList);
    } catch (error) {
        console.error("Error al inicializar la aplicación:", error);
        alert("Ocurrió un error al cargar los datos iniciales.");
    } finally {
        hideSpinner(); // Ocultar spinner después de cargar los datos
    }
};

// Iniciar la aplicación al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM completamente cargado e inicializado");
    initializeApp(); // Aquí es donde conectas los eventos al DOM
});
