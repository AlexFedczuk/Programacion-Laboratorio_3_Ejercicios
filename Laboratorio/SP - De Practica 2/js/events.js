
import { fetchVehiclesList, sendVehicleToApi } from "./api.js";
import { populateTable, showSpinner, hideSpinner } from "./dom.js";

// Obtener datos del formulario
const getFormData = () => {
    // Capturar valores del formulario
    const modelo = document.querySelector("#modelo")?.value.trim() || "N/A";
    const anoFabricacion = document.querySelector("#anoFabricacion")?.value.trim();
    const velMax = document.querySelector("#velMax")?.value.trim();
    const cantidadPuertas = document.querySelector("#cantidadPuertas")?.value.trim();
    const asientos = document.querySelector("#asientos")?.value.trim();
    const carga = document.querySelector("#carga")?.value.trim();
    const autonomia = document.querySelector("#autonomia")?.value.trim();

    console.log("Datos capturados (raw):", {
        modelo,
        anoFabricacion,
        velMax,
        cantidadPuertas,
        asientos,
        carga,
        autonomia
    });

    return {
        modelo,
        anoFabricacion: anoFabricacion ? parseInt(anoFabricacion, 10) : null,
        velMax: velMax ? parseFloat(velMax) : null,
        cantidadPuertas: cantidadPuertas ? parseInt(cantidadPuertas, 10) : null,
        asientos: asientos ? parseInt(asientos, 10) : null,
        carga: carga ? parseFloat(carga) : null,
        autonomia: autonomia ? parseFloat(autonomia) : null,
    };
    /*return {
        modelo,
        anoFabricacion,
        velMax,
        cantidadPuertas,
        asientos,
        carga,
        autonomia
    };*/
};

// Enviar datos a la API
const submitVehicle = async () => {
    const data = getFormData();

    // Filtrar campos opcionales que sean null para no enviarlos
    const filteredData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== null)
    );

    console.log("Datos enviados a la API:", filteredData);

    try {
        const newVehicle = await sendVehicleToApi("POST", filteredData);
        return newVehicle;
    } catch (error) {
        console.error("Error al enviar el vehículo:", error);
        alert("No se pudo agregar el vehículo.");
    }
};

// Mostrar el formulario ABM
const showABMForm = (title) => {
    const abmContainer = document.querySelector("#abm-container");
    const listContainer = document.querySelector("#list-container");
    const abmTitle = document.querySelector("#abm-title"); // Seleccionar el encabezado

    abmTitle.textContent = title; // Cambiar el texto del encabezado
    abmContainer.classList.remove("hidden"); // Mostrar el formulario ABM
    listContainer.classList.add("hidden"); // Ocultar la lista
};

// Ocultar el formulario ABM
const hideABMForm = () => {
    const abmContainer = document.querySelector("#abm-container");
    const listContainer = document.querySelector("#list-container");

    abmContainer.classList.add("hidden"); // Ocultar el formulario ABM
    listContainer.classList.remove("hidden"); // Mostrar la lista
    document.querySelector("#abm-form").reset(); // Limpiar el formulario
};

// Inicializar eventos
export const initializeEvents = (vehiclesList) => {
    // Manejar clic en "Agregar Elemento"
    document.querySelector("#add-button").addEventListener("click", () => {
        console.log("Agregar elemento (event handler)");
        showABMForm("Alta"); // Mostrar el formulario ABM
    });

    // Manejar clic en "Cancelar" dentro del formulario ABM
    document.querySelector("#abm-cancel").addEventListener("click", () => {
        console.log("Cancelar acción (event handler)");
        hideABMForm(); // Ocultar el formulario ABM
    });

    // Manejar envío del formulario ABM
    document.querySelector("#abm-form").addEventListener("submit", async (e) => {
        e.preventDefault(); // Detener el comportamiento por defecto del formulario
        console.log("Formulario enviado"); // Asegúrate de que esto se imprime

        const formData = getFormData();
        console.log("Datos capturados del formulario:", formData);

        hideABMForm();
        showSpinner(); // Mostrar spinner

        const newVehicle = await submitVehicle();
        if (newVehicle) {
            vehiclesList.push(newVehicle);
            populateTable(vehiclesList); // Actualiza la tabla
            console.log("Nuevo vehículo agregado:", newVehicle);
            hideABMForm(); // Ocultar el formulario ABM tras agregar el vehículo
        }else{
            showABMForm();
        }

        hideSpinner(); // Ocultar spinner
    });
};