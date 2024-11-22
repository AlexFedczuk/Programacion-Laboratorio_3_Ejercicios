
import { fetchVehiclesList, sendVehicleToApi } from "./api.js";
import { populateTable, showSpinner, hideSpinner } from "./dom.js";

// Mostrar el formulario ABM
const showABMForm = () => {
    const abmContainer = document.querySelector("#abm-container");
    const listContainer = document.querySelector("#list-container");

    abmContainer.classList.remove("hidden"); // Mostrar el formulario ABM
    listContainer.classList.add("hidden"); // Ocultar la lista
};

// Ocultar el formulario ABM
const hideABMForm = () => {
    const abmContainer = document.querySelector("#abm-container");
    const listContainer = document.querySelector("#list-container");

    abmContainer.classList.add("hidden"); // Ocultar el formulario ABM
    listContainer.classList.remove("hidden"); // Mostrar la lista
};

// Inicializar eventos
export const initializeEvents = (vehiclesList) => {
    // Manejar clic en "Agregar Elemento"
    document.querySelector("#add-button").addEventListener("click", () => {
        console.log("Agregar elemento (event handler)");
        showABMForm(); // Mostrar el formulario ABM
    });

    // Manejar clic en "Cancelar" dentro del formulario ABM
    document.querySelector("#abm-cancel").addEventListener("click", () => {
        console.log("Cancelar acción (event handler)");
        hideABMForm(); // Ocultar el formulario ABM
    });

    // Manejar envío del formulario ABM
    document.querySelector("#abm-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        showSpinner(); // Mostrar spinner
        console.log("Formulario enviado");
        hideSpinner(); // Ocultar spinner
    });
};