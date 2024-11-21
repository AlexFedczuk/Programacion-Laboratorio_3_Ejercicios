import Vehiculo from "./Clases/Vehiculo.js"; // Ignora este error.
import Auto from "./Clases/Auto.js";
import Camion from "./Clases/Camion.js";

const apiUrl = "https://examenesutn.vercel.app/api/VehiculoAutoCamion";
let vehiclesList = []; // Lista en memoria
const tableBody = document.querySelector("#list-container tbody"); // Contenedor de la tabla

const showSpinner = () => {
    const spinner = document.querySelector("#spinner");
    if (spinner) {
        spinner.style.display = "flex"; // Mostrar el spinner
    }
};

const hideSpinner = () => {
    const spinner = document.querySelector("#spinner");
    if (spinner) {
        spinner.style.display = "none"; // Ocultar el spinner
    }
};

const fetchData = () => {
    showSpinner();
    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error al obtener los datos de la API.");
            }
            return response.json();
        })
        .then((data) => {
            vehiclesList = data.map((item) => createVehicleInstance(item));
            console.log("Lista de vehículos en memoria:", vehiclesList);
            populateTable(vehiclesList); // Actualizar la tabla
        })
        .catch((error) => {
            alert(error.message);
        })
        .finally(() => {
            hideSpinner();
        });
};

const createVehicleInstance = (data) => {
    if (data.cantidadPuertas !== undefined || data.asientos !== undefined) {
        return new Auto(
            data.id,
            data.modelo,
            data.anoFabricacion,
            data.velMax,
            data.cantidadPuertas,
            data.asientos
        );
    } else if (data.carga !== undefined || data.autonomia !== undefined) {
        return new Camion(
            data.id,
            data.modelo,
            data.anoFabricacion,
            data.velMax,
            data.carga,
            data.autonomia
        );
    } else {
        return new Vehiculo(
            data.id,
            data.modelo,
            data.anoFabricacion,
            data.velMax
        );
    }
};

const populateTable = (data) => {
    tableBody.innerHTML = ""; // Limpiamos la tabla
    data.forEach((vehicle) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${vehicle.id}</td>
            <td>${vehicle.modelo || "N/A"}</td>
            <td>${vehicle.anoFabricacion || "N/A"}</td>
            <td>${vehicle.velMax || "N/A"}</td>
            <td>${vehicle.cantidadPuertas || "N/A"}</td>
            <td>${vehicle.asientos || "N/A"}</td>
            <td>${vehicle.carga || "N/A"}</td>
            <td>${vehicle.autonomia || "N/A"}</td>
            <td>
                <button class="modify-btn" data-id="${vehicle.id}">Modificar</button>
                <button class="delete-btn" data-id="${vehicle.id}">Eliminar</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
};

const generateUniqueId = () => {
    const ids = vehiclesList.map((vehicle) => vehicle.id);
    return ids.length > 0 ? Math.max(...ids) + 1 : 1; // Si no hay IDs, comenzamos en 1
};

const handleAddVehicle = (formData) => {
    console.log(formData);
    const newId = generateUniqueId();
    let newVehicle;

    if((formData.cantidadPuertas || formData.asientos) && (formData.carga || formData.autonomia)){
        console.log("ERROR: No se puede crear un vehiculo con todos los atributos definidos. Debe ser un Auto, Camion o Vehiculo.");
        newVehicle = null;
    } else if (formData.cantidadPuertas || formData.asientos) {
        newVehicle = new Auto(
            newId,
            formData.modelo,
            parseInt(formData.anoFabricacion),
            parseFloat(formData.velMax),
            parseInt(formData.cantidadPuertas),
            parseInt(formData.asientos)
        );
    } else if (formData.carga || formData.autonomia) {
        newVehicle = new Camion(
            newId,
            formData.modelo,
            parseInt(formData.anoFabricacion),
            parseFloat(formData.velMax),
            parseFloat(formData.carga),
            parseInt(formData.autonomia)
        );
    } else {
        newVehicle = new Vehiculo(
            newId,
            formData.modelo,
            parseInt(formData.anoFabricacion),
            parseFloat(formData.velMax),
        );
    }

    vehiclesList.push(newVehicle); // Agregar a la lista en memoria
    console.log("Nuevo vehículo agregado:", newVehicle);
    populateTable(vehiclesList); // Actualizar la tabla
    hideABMForm(); // Ocultar el formulario
};

const abmForm = document.querySelector("#abm-form");
const addButton = document.querySelector("#add-button");
const listContainer = document.querySelector("#list-container"); // Contenedor de la lista

// Mostrar el formulario ABM
const showABMForm = (title) => {
    const abmTitle = document.querySelector("#abm-title");
    const abmContainer = document.querySelector("#abm-container");

    if (!abmTitle || !abmContainer || !listContainer) {
        console.error("Elementos no encontrados en el DOM.");
        return;
    }

    abmTitle.textContent = title; // Cambiar el título según la acción
    abmContainer.classList.remove("hidden"); // Mostrar el formulario ABM
    listContainer.classList.add("hidden"); // Ocultar la tabla de vehículos
};

// Ocultar el formulario ABM
const hideABMForm = () => {
    const abmContainer = document.querySelector("#abm-container");
    const listContainer = document.querySelector("#list-container");
    const abmForm = document.querySelector("#abm-form");

    if (!abmContainer || !listContainer || !abmForm) {
        console.error("Elementos no encontrados en el DOM.");
        return;
    }

    abmContainer.classList.add("hidden"); // Ocultar el formulario ABM
    listContainer.classList.remove("hidden"); // Mostrar la lista de vehículos
    abmForm.reset(); // Resetear el formulario
};

// Configurar el evento para el botón de "Agregar Elemento"
addButton.addEventListener("click", () => {
    showABMForm("Agregar Vehículo"); // Muestra el formulario con el título correspondiente
});

document.addEventListener("DOMContentLoaded", () => {
    fetchData(); // Obtener los datos y generar la lista en memoria
});

abmForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(abmForm).entries());
    handleAddVehicle(formData);
});

// Boton para cancelar en el ABM.
document.querySelector("#abm-cancel").addEventListener("click", () => {
    hideABMForm(); // Llamar a la función para ocultar el formulario ABM
});

