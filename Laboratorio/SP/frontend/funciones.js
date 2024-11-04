import { Vehiculo } from "./Clases/Vehiculo.js";
import { Auto } from "./Clases/Auto.js";
import { Camion } from "./Clases/Camion.js";

export function cargarVehiculosDesdeJSON(vehiculos) {
    return fetch('./Registros/datos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("ERROR: Error al cargar el archivo JSON\n");
            }
            return response.json();
        })
        .then(data => {
            data.forEach(item => {
                let vehiculo;
                if ("cantidadPuertas" in item && "asientos" in item) {
                    vehiculo = new Auto(item.id, item.modelo, item.anoFabricacion, item.velMax, item.cantidadPuertas, item.asientos);
                } else if ("carga" in item && "autonomia" in item) {
                    vehiculo = new Camion(item.id, item.modelo, item.anoFabricacion, item.velMax, item.carga, item.autonomia);
                } else {
                    vehiculo = new Vehiculo(item.id, item.modelo, item.anoFabricacion, item.velMax);
                }
                vehiculos.push(vehiculo);
            });
        })
        .catch(error => console.error(error.message));
}

export function cargarVehiculosDesdeAPI(vehiculos, url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("ERROR: Error al cargar los datos de la API\n");
            }
            return response.json();
        })
        .then(data => {
            // Limpiar el array de vehículos antes de llenarlo
            vehiculos.length = 0; // Limpiar el array

            data.forEach(item => {
                let vehiculo;
                if ("cantidadPuertas" in item && "asientos" in item) {
                    vehiculo = new Auto(item.id, item.modelo, item.anoFabricacion, item.velMax, item.cantidadPuertas, item.asientos);
                } else if ("carga" in item && "autonomia" in item) {
                    vehiculo = new Camion(item.id, item.modelo, item.anoFabricacion, item.velMax, item.carga, item.autonomia);
                } else {
                    vehiculo = new Vehiculo(item.id, item.modelo, item.anoFabricacion, item.velMax);
                }
                vehiculos.push(vehiculo);
            });
        })
        .catch(error => console.error(error.message));
}

export function mostrarVehiculosEnTabla(vehiculos) {
    const tablaBody = document.querySelector("#tablaVehiculos tbody");
    tablaBody.innerHTML = ""; // Limpiamos la tabla antes de poblarla

    vehiculos.forEach((vehiculo) => {
        const fila = document.createElement("tr");

        // Columna para cada atributo, rellena con "N/A" si no aplica
        fila.innerHTML = `
            <td>${vehiculo.id}</td>
            <td>${vehiculo.modelo}</td>
            <td>${vehiculo.anoFabricacion}</td>
            <td>${vehiculo.velMax}</td>
            <td>${vehiculo.cantidadPuertas || "N/A"}</td>
            <td>${vehiculo.asientos || "N/A"}</td>
            <td>${vehiculo.carga || "N/A"}</td>
            <td>${vehiculo.autonomia || "N/A"}</td>
            <td><button class="btnModificar">Modificar</button></td>
            <td><button class="btnEliminar">Eliminar</button></td>
        `;

        // Agregar fila al cuerpo de la tabla
        tablaBody.appendChild(fila);
    });
}

export function mostrarFormulario(titulo) {
    console.log(`Mostrando formulario para: ${titulo}`);
    const formularioABM = document.getElementById("formularioABM");
    const formularioTitulo = document.getElementById("formularioTitulo");
    const formularioLista = document.getElementById("formularioLista");

    formularioTitulo.innerText = titulo;
    formularioABM.classList.remove("oculto");
    formularioABM.style.display = "block";

    // Ocultar el formulario lista de manera forzada
    formularioLista.style.display = "none";
}

export function ocultarFormulario() {
    const formularioABM = document.getElementById("formularioABM");
    const formularioLista = document.getElementById("formularioLista");

    formularioABM.classList.add("oculto");
    formularioABM.style.display = "none";

    // Mostrar el formulario lista de manera forzada
    formularioLista.style.display = "block";
}

export function mostrarSpinner() {
    document.getElementById("spinner").style.display = "block";
    console.log("Se mostró spinner...");
}

export function mostrarSpinnerConRetraso() {
    console.log("Se mostró spinner...");
    const spinner = document.getElementById("spinner");
    spinner.style.display = "block";

    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 2000); // 2000 milisegundos = 2 segundos
    });
}

export function ocultarSpinner() {
    document.getElementById("spinner").style.display = "none";
    console.log("Se ocultó spinner...");
}

// Función para manejar solicitudes XMLHttpRequest
export function fetchData(url, successCallback, errorCallback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                successCallback(data);
            } else {
                errorCallback("Error al cargar datos.");
            }
        }
    };
    xhr.send();
}

// Función para crear una instancia de Vehiculo, Auto o Camion según el JSON
export function crearVehiculoDesdeJSON(item) {
    if ("cantidadPuertas" in item && "asientos" in item) {
        return new Auto(item.id, item.modelo, item.anoFabricacion, item.velMax, item.cantidadPuertas, item.asientos);
    } else if ("carga" in item && "autonomia" in item) {
        return new Camion(item.id, item.modelo, item.anoFabricacion, item.velMax, item.carga, item.autonomia);
    } else {
        return new Vehiculo(item.id, item.modelo, item.anoFabricacion, item.velMax);
    }
}

export function configurarFormularioAlta(vehiculos) {
    const formulario = document.getElementById("abmForm");
    formulario.reset();

    const tipoSeleccionado = document.getElementById("tipo");
    const cantidadPuertasInput = document.getElementById("cantidadPuertas");
    const asientosInput = document.getElementById("asientos");
    const cargaInput = document.getElementById("carga");
    const autonomiaInput = document.getElementById("autonomia");
    
    document.getElementById("campoID").disabled = true;
    actualizarCamposSegunTipo();

    // Agregar evento de cambio al campo tipo
    tipoSeleccionado.addEventListener('change', (event) => {
        const nuevoTipo = event.target.value;
        actualizarCamposPorTipo(nuevoTipo, cantidadPuertasInput, asientosInput, cargaInput, autonomiaInput);
    });
    

    document.getElementById("btnAceptar").onclick = async function () {
        // Llamar a la función de validación y almacenar el resultado
        const esValido = validarFormulario();
        
        // Detener la ejecución si la validación falla
        if (!esValido) {
            console.warn("Errores en la validación del formulario. Corríjalos antes de continuar.");
            return; // Sale de la función si no es válido
        }

        // Capturar datos solo si el formulario es válido
        const nuevoElemento = obtenerDatosFormulario();
        if (!nuevoElemento) return;

        mostrarSpinner();
        try {
            const response = await fetch("../backend/VehiculoAutoCamion.php", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoElemento)
            });

            ocultarSpinner();
            if (response.ok) {
                const data = await response.json();
                nuevoElemento.id = data.id;
                vehiculos.push(nuevoElemento);
                
                // Mostrar Formulario Lista solo si la alta fue exitosa
                ocultarFormulario();
                mostrarVehiculosEnTabla(vehiculos);
            } else {
                throw new Error("Error en la solicitud");
            }
        } catch (error) {
            ocultarSpinner();
            console.error("Error:", error);
            alert("ERROR: Hubo un problema al enviar el alta.");
        }
    };

    document.getElementById("btnCancelar").onclick = function () {
        ocultarFormulario();
    };
}

export function configurarBotonesABM() {
    document.getElementById("btnAceptar").addEventListener("click", () => ocultarFormulario());
    document.getElementById("btnCancelar").addEventListener("click", ocultarFormulario);
}

function actualizarCamposSegunTipo() {
    const tipo = document.getElementById("tipo").value;
    document.getElementById("cantidadPuertas").disabled = tipo !== "Auto";
    document.getElementById("asientos").disabled = tipo !== "Auto";
    document.getElementById("carga").disabled = tipo !== "Camion";
    document.getElementById("autonomia").disabled = tipo !== "Camion";
}

export function obtenerDatosFormulario() {
    const modelo = document.getElementById("modelo").value.trim();
    const anoFabricacion = parseInt(document.getElementById("anoFabricacion").value.trim());
    const velMax = parseFloat(document.getElementById("velMax").value);
    const cantidadPuertas = document.getElementById("cantidadPuertas").value ? parseInt(document.getElementById("cantidadPuertas").value) : null;
    const asientos = document.getElementById("asientos").value ? parseInt(document.getElementById("asientos").value) : null;
    const carga = document.getElementById("carga").value ? parseInt(document.getElementById("carga").value) : null;
    const autonomia = document.getElementById("autonomia").value ? parseInt(document.getElementById("autonomia").value) : null;

    let nuevoElemento = { modelo, anoFabricacion, velMax };
    
    if (carga !== null && autonomia !== null) {
        nuevoElemento.carga = carga;
        nuevoElemento.autonomia = autonomia;
    } else if (cantidadPuertas !== null && asientos !== null) {
        nuevoElemento.cantidadPuertas = cantidadPuertas;
        nuevoElemento.asientos = asientos;
    }

    return nuevoElemento;
}

export function validarFormulario() {
    let esValido = true;

    // Validación del modelo
    const modeloInput = document.getElementById("modelo");
    const errorModelo = obtenerElementoError("modelo", "error-modelo", "");
    if (modeloInput.value.trim() === "") {
        errorModelo.textContent = "Error: El modelo no puede estar vacío.";
        esValido = false;
    } else {
        errorModelo.textContent = "";
    }

    // Validación del anoFabricacion
    const anoFabricacionInput = document.getElementById("anoFabricacion");
    const errorAnoFabricacion = obtenerElementoError("anoFabricacion", "error-anoFabricacion", "");
    const anoFabricacion = parseInt(anoFabricacionInput.value, 10);
    if (isNaN(anoFabricacion) || anoFabricacion < 1986) {
        errorAnoFabricacion.textContent = "Error: La anoFabricacion debe ser un número mayor a 1986 y no puede estar vacía.";
        esValido = false;
    } else {
        errorAnoFabricacion.textContent = "";
    }

    // Validación de la velMax
    const velMaxInput = document.getElementById("velMax");
    const errorVelMax = obtenerElementoError("velMax", "error-velMax", "");
    const velMax = parseFloat(velMaxInput.value, 10);
    if (isNaN(velMax) || velMax < 1) {
        errorVelMax.textContent = "Error: La velMax debe ser un número mayor a 0 y no puede estar vacía.";
        esValido = false;
    } else {
        errorVelMax.textContent = "";
    }

    // Validación del cantidadPuertas (si se aplica)
    const cantidadPuertasInput = document.getElementById("cantidadPuertas");
    if(!cantidadPuertasInput.disabled){
        const errorCantidadPuertas = obtenerElementoError("cantidadPuertas", "error-cantidadPuertas", "");
        const cantidadPuertas = parseInt(cantidadPuertasInput.value, 10);
        if (isNaN(cantidadPuertas) || cantidadPuertas < 1) {
            errorCantidadPuertas.textContent = "Error: La cantidadPuertas debe ser un número mayor a 1 y no puede estar vacía.";
            esValido = false;
        } else {
            errorCantidadPuertas.textContent = "";
        }
    }
    

    // Validación de asientos (si se aplica)
    const asientosInput = document.getElementById("asientos");
    if(!asientosInput.disabled){
        const errorAsientos = obtenerElementoError("asientos", "error-asientos", "");
        const asientos = parseInt(asientosInput.value, 10);
        if (isNaN(asientos) || asientos < 1) {
            errorAsientos.textContent = "Error: La asientos debe ser un número mayor a 1 y no puede estar vacía.";
            esValido = false;
        } else {
            errorAsientos.textContent = "";
        }
    }
    

    // Validación de carga (si se aplica)
    const cargaInput = document.getElementById("carga");
    if(!cargaInput.disabled){
        const errorCarga = obtenerElementoError("carga", "error-carga", "");
        const carga = parseInt(cargaInput.value, 10);
        if (isNaN(carga) || carga < 1) {
            errorCarga.textContent = "Error: La carga debe ser un número mayor a 0 y no puede estar vacía.";
            esValido = false;
        } else {
            errorCarga.textContent = "";
        }
    }
    

    // Validación del autonomia (si se aplica)
    const autonomiaInput = document.getElementById("autonomia");
    if(!cargaInput.disabled){
        const errorAutonomia = obtenerElementoError("autonomia", "error-autonomia", "");
        const autonomia = parseInt(autonomiaInput.value, 10);
        if (isNaN(autonomia) || autonomia < 1) {
            errorAutonomia.textContent = "Error: La autonomia debe ser un número mayor a 0 y no puede estar vacía.";
            esValido = false;
        } else {
            errorAutonomia.textContent = "";
        }
    }    

    return esValido;
}

function obtenerElementoError(idElemento, idError, mensaje) {
    const elemento = document.getElementById(idElemento);
    let errorElemento = document.getElementById(idError);
    
    if (!errorElemento) {
        errorElemento = document.createElement("span");
        errorElemento.id = idError;
        errorElemento.className = "error-message";
        elemento.insertAdjacentElement("afterend", errorElemento);
    }
    
    errorElemento.textContent = mensaje;
    return errorElemento;
}

// Función para prellenar el formulario según los datos de una vehiculo
export function prellenarFormulario(vehiculo) {
    document.getElementById("campoID").value = vehiculo.id || "";
    document.getElementById("modelo").value = vehiculo.modelo || "";
    document.getElementById("anoFabricacion").value = vehiculo.anoFabricacion || "";
    document.getElementById("velMax").value = vehiculo.velMax || "";
    document.getElementById("cantidadPuertas").value = vehiculo.cantidadPuertas || "";
    document.getElementById("asientos").value = vehiculo.asientos || "";
    document.getElementById("carga").value = vehiculo.carga || "";
    document.getElementById("autonomia").value = vehiculo.autonomia || "";

    actualizarCamposSegunTipo();
}

// Función que configura el botón de aceptar y cancelar en el formulario ABM
export function configurarBotonesForm(vehiculos, tipoAccion, vehiculoId = null) {
    document.getElementById("btnAceptar").onclick = async function () {
        if (!validarFormulario()) return;

        const elemento = obtenerDatosFormulario();
        if (!elemento) return;

        mostrarSpinner();
        try {
            const metodo = tipoAccion === "modificar" ? "POST" : "PUT";
            const response = await fetch("../backend/VehiculoAutoCamion.php", {
                method: metodo,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(elemento)
            });

            ocultarSpinner();
            if (response.ok) {
                const data = await response.json();
                if (tipoAccion === "modificar" && vehiculoId !== null) {
                    const index = vehiculos.findIndex(p => p.id === vehiculoId);
                    if (index !== -1) vehiculos[index] = { ...vehiculos[index], ...elemento };
                } else {
                    elemento.id = data.id;
                    vehiculos.push(elemento);
                }

                ocultarFormulario();
                mostrarVehiculosEnTabla(vehiculos);
            } else {
                throw new Error("Error en la solicitud");
            }
        } catch (error) {
            ocultarSpinner();
            console.error("Error:", error);
            alert(`ERROR: No se pudo completar la ${tipoAccion}.`);
        }
    };

    // Configurar el botón Cancelar
    document.getElementById("btnCancelar").onclick = function () {
        ocultarFormulario();
    };
}

export function configurarFormularioModificacion(id, vehiculos) {
    const tipoSeleccionado = document.getElementById("tipo");
    const cantidadPuertasInput = document.getElementById("cantidadPuertas");
    const asientosInput = document.getElementById("asientos");
    const cargaInput = document.getElementById("carga");
    const autonomiaInput = document.getElementById("autonomia");

    // Llenar los datos de la vehiculo seleccionada
    const vehiculo = vehiculos.find(p => p.id == id); // Encuentra la vehiculo por ID

    if (vehiculo) {
        // Asignar valores a los campos
        document.getElementById("modelo").value = vehiculo.modelo;
        document.getElementById("anoFabricacion").value = vehiculo.anoFabricacion;
        document.getElementById("velMax").value = vehiculo.velMax;
        cantidadPuertasInput.value = vehiculo.cantidadPuertas || ''; // Asigna valor o vacío
        asientosInput.value = vehiculo.asientos || ''; // Asigna valor o vacío
        cargaInput.value = vehiculo.carga || ''; // Asigna valor o vacío
        autonomiaInput.value = vehiculo.autonomia || ''; // Asigna valor o vacío

        actualizarCamposPorTipo(tipoSeleccionado.value, cantidadPuertasInput, asientosInput, cargaInput, autonomiaInput);
    } else {
        console.error("Vehiculo no encontrada.");
    }

    // Agregar evento de cambio al campo tipo
    tipoSeleccionado.addEventListener('change', (event) => {
        const nuevoTipo = event.target.value;
        actualizarCamposPorTipo(nuevoTipo, cantidadPuertasInput, asientosInput, cargaInput, autonomiaInput);
    });

    const btnAceptar = document.getElementById("btnAceptar");
    btnAceptar.onclick = async function () {
        const nuevoElemento = obtenerDatosFormulario(); // Esta función debe validar los datos del formulario
        //nuevoElemento.id = id;
        console.log(nuevoElemento);

        if (!nuevoElemento) return; // Verifica que los datos sean válidos

        nuevoElemento.id = parseInt(id, 10); // Asegúrate de que el ID sea un entero

        mostrarSpinner();
        try {
            const response = await fetch("../backend/VehiculoAutoCamion.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...nuevoElemento, id: nuevoElemento.id }) // Incluye el ID en el cuerpo
            });

            ocultarSpinner();
            if (response.ok) {
                const data = await response.json();
                // Actualiza la lista en memoria y la tabla
                const index = vehiculos.findIndex(p => p.id === id);
                vehiculos[index] = { ...vehiculos[index], ...nuevoElemento }; // Actualiza el objeto

                ocultarFormulario();  
                mostrarVehiculosEnTabla(vehiculos);                              
            } else {
                throw new Error("Error en la solicitud");
            }
        } catch (error) {
            ocultarSpinner();
            console.error("Error:", error);
            alert("ERROR: Hubo un problema al enviar la modificación.");
        }
    };
}

// Nueva función para habilitar/deshabilitar campos
function actualizarCamposPorTipo(tipo, cantidadPuertasInput, asientosInput, cargaInput, autonomiaInput) {
    // Habilitar o deshabilitar campos según el tipo
    if (tipo === 'Vehiculo') {
        cantidadPuertasInput.disabled = true;
        asientosInput.disabled = true;
        cargaInput.disabled = true;
        autonomiaInput.disabled = true;
    } else if (tipo === 'Auto') {
        cantidadPuertasInput.disabled = false;
        asientosInput.disabled = false;
        cargaInput.disabled = true;
        autonomiaInput.disabled = true;
    } else if (tipo === 'Camion') {
        cantidadPuertasInput.disabled = true;
        asientosInput.disabled = true;
        cargaInput.disabled = false;
        autonomiaInput.disabled = false;
    }
}

// Función para configurar el formulario de eliminación
export function configurarFormularioEliminacion(id, vehiculos) {
    const vehiculo = vehiculos.find(p => p.id == id);

    if (vehiculo) {
        // Muestra los datos de la vehiculo a eliminar
        document.getElementById("modelo").value = vehiculo.modelo;
        document.getElementById("anoFabricacion").value = vehiculo.anoFabricacion;

        // Deshabilita el campo de ID
        document.getElementById("campoID").disabled = true;
        document.getElementById("modelo").disabled = true;
        document.getElementById("anoFabricacion").disabled = true;

        const btnAceptar = document.getElementById("btnAceptar");
        btnAceptar.onclick = async function () {
            mostrarSpinner();
            try {
                const response = await fetch(`../backend/VehiculoAutoCamion.php?id=${id}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                });

                ocultarSpinner();
                if (response.ok) {
                    // Actualiza la lista en memoria
                    vehiculos = vehiculos.filter(p => p.id != id);
                    ocultarFormulario();
                    mostrarVehiculosEnTabla(vehiculos);
                } else {
                    throw new Error("Error en la solicitud de eliminación.");
                }
            } catch (error) {
                ocultarSpinner();
                alert("ERROR: No se pudo eliminar la vehiculo.");
            }
        };
    } else {
        console.error("Vehiculo no encontrada.");
    }

    // Configura el botón de cancelar
    document.getElementById("btnCancelar").onclick = function () {
        ocultarFormulario();
    };
}
