import Vehiculo from "./Clases/Vehiculo.js"; // Ignora este error.
import Auto from "./Clases/Auto.js";
import Camion from "./Clases/Camion.js";

const apiUrl = "https://examenesutn.vercel.app/api/VehiculoAutoCamion";
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

let vehiclesList = []; // Lista en memoria

// Función para inicializar la lista desde la API
const initializeVehiclesList = async () => {
    try {
        showSpinner(); // Mostrar spinner mientras se cargan los datos
        const response = await fetch(apiUrl);
        if (response.ok) {
            vehiclesList = await response.json();
            console.log("Lista inicial de vehículos desde la API:", vehiclesList);
            populateTable(vehiclesList); // Poblar la tabla inicial
        } else {
            console.error("Error al obtener la lista inicial. Código de respuesta:", response.status);
            alert("No se pudo obtener la lista de vehículos.");
        }
    } catch (error) {
        console.error("Error al cargar la lista inicial:", error);
        alert("Ocurrió un error al cargar la lista de vehículos.");
    } finally {
        hideSpinner(); // Ocultar spinner
    }
};

// Llamar a la función de inicialización al cargar la página
initializeVehiclesList();

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

    // Ajustar los campos según el tipo inicial (Vehículo por defecto)
    const tipoInicial = document.querySelector("#tipo").value;
    adjustFieldsByType(tipoInicial);
};

const getFormData = () => {
    const formData = Object.fromEntries(new FormData(abmForm).entries());

    // Eliminar campos deshabilitados
    if (document.querySelector("#cantidadPuertas").disabled) {
        delete formData.cantidadPuertas;
    }
    if (document.querySelector("#asientos").disabled) {
        delete formData.asientos;
    }
    if (document.querySelector("#carga").disabled) {
        delete formData.carga;
    }
    if (document.querySelector("#autonomia").disabled) {
        delete formData.autonomia;
    }

    return formData;
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
document.querySelector("#add-button").addEventListener("click", () => {
    showABMForm("Alta"); // Muestra el formulario con el título correspondiente
    abmForm.reset(); // Limpiar el formulario
});

const toggleFieldVisibility = (type) => {
    document.querySelector("#cantidadPuertas-container").classList.toggle("hidden", type !== "Auto");
    document.querySelector("#asientos-container").classList.toggle("hidden", type !== "Auto");
    document.querySelector("#carga-container").classList.toggle("hidden", type !== "Camion");
    document.querySelector("#autonomia-container").classList.toggle("hidden", type !== "Camion");
};

const submitVehicle = async (formData) => {
    try {
        hideABMForm();
        showSpinner(); // Mostrar spinner

        const requestBody = {
            modelo: formData.modelo,
            anoFabricacion: parseInt(formData.anoFabricacion),
            velMax: parseInt(formData.velMax),
            cantidadPuertas: formData.cantidadPuertas ? parseInt(formData.cantidadPuertas) : null,
            asientos: formData.asientos ? parseInt(formData.asientos) : null,
            carga: formData.carga ? parseInt(formData.carga) : null,
            autonomia: formData.autonomia ? parseInt(formData.autonomia) : null,
        };

        console.log("Enviando datos a la API:", requestBody);

        // Hacer la solicitud POST
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        if (response.ok) {
            const newVehicle = await response.json(); // Vehículo con el ID asignado por la API
            console.log("Nuevo vehículo recibido de la API:", newVehicle);

            // Agregar el nuevo vehículo a la lista en memoria
            vehiclesList.push({
                id: newVehicle.id, // Usar el ID devuelto por la API
                modelo: requestBody.modelo || "N/A",
                anoFabricacion: requestBody.anoFabricacion || "N/A",
                velMax: requestBody.velMax || "N/A",
                cantidadPuertas: requestBody.cantidadPuertas || "N/A",
                asientos: requestBody.asientos || "N/A",
                carga: requestBody.carga || "N/A",
                autonomia: requestBody.autonomia || "N/A",
            });

            console.log("Lista actualizada de vehículos en memoria:", vehiclesList);

            // Actualizar la tabla con la lista en memoria
            populateTable(vehiclesList);

            // Cerrar el formulario ABM
            hideABMForm();
        } else {
            console.error("Error al agregar el vehículo. Código de respuesta:", response.status);
            alert("No se pudo agregar el vehículo.");
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        alert("Ocurrió un error al intentar agregar el vehículo.");
    } finally {
        hideSpinner(); // Ocultar spinner
    }
};

const adjustFieldsByType = (type) => {
    const cantidadPuertasField = document.querySelector("#cantidadPuertas");
    const asientosField = document.querySelector("#asientos");
    const cargaField = document.querySelector("#carga");
    const autonomiaField = document.querySelector("#autonomia");

    if (type === "Vehiculo") {
        // Bloquear campos específicos de Auto y Camión
        cantidadPuertasField.disabled = true;
        asientosField.disabled = true;
        cargaField.disabled = true;
        autonomiaField.disabled = true;
    } else if (type === "Auto") {
        // Bloquear campos específicos de Camión
        cantidadPuertasField.disabled = false;
        asientosField.disabled = false;
        cargaField.disabled = true;
        autonomiaField.disabled = true;
    } else if (type === "Camion") {
        // Bloquear campos específicos de Auto
        cantidadPuertasField.disabled = true;
        asientosField.disabled = true;
        cargaField.disabled = false;
        autonomiaField.disabled = false;
    }
};

document.querySelector("#tipo").addEventListener("change", (e) => {
    const selectedType = e.target.value; // Obtener el tipo seleccionado
    adjustFieldsByType(selectedType);   // Ajustar los campos según el tipo
});

document.addEventListener("DOMContentLoaded", () => {
    //fetchData(); // Obtener los datos y generar la lista en memoria
});

abmForm.addEventListener("submit", (e) => {
    e.preventDefault();    

    const formData = Object.fromEntries(new FormData(abmForm).entries()); // Obtener datos del formulario
    //handleAddVehicle(formData);
    submitVehicle(formData); // Enviar datos a la API
});

// Boton para cancelar en el ABM.
document.querySelector("#abm-cancel").addEventListener("click", () => {
    hideABMForm(); // Llamar a la función para ocultar el formulario ABM
});

