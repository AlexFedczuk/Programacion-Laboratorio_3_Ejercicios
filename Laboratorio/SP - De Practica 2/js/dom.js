const spinner = document.querySelector("#spinner");
const tableBody = document.querySelector("#list-container tbody");


// Mostrar spinner
export const showSpinner = () => spinner.classList.remove("hidden");

// Ocultar spinner
export const hideSpinner = () => spinner.classList.add("hidden");

// Poblar la tabla con datos
export const populateTable = (data) => {
    tableBody.innerHTML = "";
    data.forEach(vehicle => {
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
