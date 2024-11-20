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

document.addEventListener("DOMContentLoaded", () => {
    fetchData(); // Obtener los datos y generar la lista en memoria
});
