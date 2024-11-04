import { Persona } from "./Clases/Persona.js";
import { Empleado } from "./Clases/Empleado.js";
import { Cliente } from "./Clases/Cliente.js";

export function cargarPersonasDesdeJSON(personas) {
    return fetch('./Registros/datos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("ERROR: Error al cargar el archivo JSON\n");
            }
            return response.json();
        })
        .then(data => {
            data.forEach(item => {
                let persona;
                if ("sueldo" in item && "ventas" in item) {
                    persona = new Empleado(item.id, item.nombre, item.apellido, item.edad, item.sueldo, item.ventas);
                } else if ("compras" in item && "telefono" in item) {
                    persona = new Cliente(item.id, item.nombre, item.apellido, item.edad, item.compras, item.telefono);
                } else {
                    persona = new Persona(item.id, item.nombre, item.apellido, item.edad);
                }
                personas.push(persona);
            });
        })
        .catch(error => console.error(error.message));
}

export function mostrarPersonasEnTabla(personas) {
    const tablaBody = document.querySelector("#tablaPersonas tbody");
    tablaBody.innerHTML = ""; // Limpiamos la tabla antes de poblarla

    personas.forEach((persona) => {
        const fila = document.createElement("tr");

        // Columna para cada atributo, rellena con "N/A" si no aplica
        fila.innerHTML = `
            <td>${persona.id}</td>
            <td>${persona.nombre}</td>
            <td>${persona.apellido}</td>
            <td>${persona.edad}</td>
            <td>${persona.sueldo || "N/A"}</td>
            <td>${persona.ventas || "N/A"}</td>
            <td>${persona.compras || "N/A"}</td>
            <td>${persona.telefono || "N/A"}</td>
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

// Función para crear una instancia de Persona, Empleado o Cliente según el JSON
export function crearPersonaDesdeJSON(item) {
    if ("sueldo" in item && "ventas" in item) {
        return new Empleado(item.id, item.nombre, item.apellido, item.edad, item.sueldo, item.ventas);
    } else if ("compras" in item && "telefono" in item) {
        return new Cliente(item.id, item.nombre, item.apellido, item.edad, item.compras, item.telefono);
    } else {
        return new Persona(item.id, item.nombre, item.apellido, item.edad);
    }
}

export function configurarFormularioAlta(personas) {
    const formulario = document.getElementById("abmForm");
    formulario.reset();
    
    document.getElementById("campoID").disabled = true;
    actualizarCamposSegunTipo();

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
            const response = await fetch("../backend/PersonasEmpleadosClientes.php", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoElemento)
            });

            ocultarSpinner();
            if (response.ok) {
                const data = await response.json();
                nuevoElemento.id = data.id;
                personas.push(nuevoElemento);
                
                // Mostrar Formulario Lista solo si la alta fue exitosa
                ocultarFormulario();
                mostrarPersonasEnTabla(personas);
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
    document.getElementById("sueldo").disabled = tipo !== "Empleado";
    document.getElementById("ventas").disabled = tipo !== "Empleado";
    document.getElementById("compras").disabled = tipo !== "Cliente";
    document.getElementById("telefono").disabled = tipo !== "Cliente";
}

export function obtenerDatosFormulario() {
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const edad = parseInt(document.getElementById("edad").value);
    const sueldo = document.getElementById("sueldo").value ? parseFloat(document.getElementById("sueldo").value) : null;
    const ventas = document.getElementById("ventas").value ? parseFloat(document.getElementById("ventas").value) : null;
    const compras = document.getElementById("compras").value ? parseFloat(document.getElementById("compras").value) : null;
    const telefono = document.getElementById("telefono").value ? parseInt(document.getElementById("telefono").value) : null;

    let nuevoElemento = { nombre, apellido, edad };
    
    if (compras !== null && telefono !== null) {
        nuevoElemento.compras = compras;
        nuevoElemento.telefono = telefono;
    } else if (sueldo !== null && ventas !== null) {
        nuevoElemento.sueldo = sueldo;
        nuevoElemento.ventas = ventas;
    }

    return nuevoElemento;
}

export function validarFormulario() {
    let esValido = true;

    // Validación del nombre
    const nombreInput = document.getElementById("nombre");
    const errorNombre = obtenerElementoError("nombre", "error-nombre", "");
    if (nombreInput.value.trim() === "") {
        errorNombre.textContent = "Error: El nombre no puede estar vacío.";
        esValido = false;
    } else {
        errorNombre.textContent = "";
    }

    // Validación del apellido
    const apellidoInput = document.getElementById("apellido");
    const errorApellido = obtenerElementoError("apellido", "error-apellido", "");
    if (apellidoInput.value.trim() === "") {
        errorApellido.textContent = "Error: El apellido no puede estar vacío.";
        esValido = false;
    } else {
        errorApellido.textContent = "";
    }

    // Validación de la edad
    const edadInput = document.getElementById("edad");
    const errorEdad = obtenerElementoError("edad", "error-edad", "");
    const edad = parseInt(edadInput.value, 10);
    if (isNaN(edad) || edad < 15) {
        errorEdad.textContent = "Error: La edad debe ser un número mayor a 15 años y no puede estar vacía.";
        esValido = false;
    } else {
        errorEdad.textContent = "";
    }

    // Validación del sueldo (si se aplica)
    const sueldoInput = document.getElementById("sueldo");
    const errorSueldo = obtenerElementoError("sueldo", "error-sueldo", "");
    if (sueldoInput.value && parseFloat(sueldoInput.value) <= 0) {
        errorSueldo.textContent = "Error: El sueldo debe ser un número positivo.";
        esValido = false;
    } else {
        errorSueldo.textContent = "";
    }

    // Validación de ventas (si se aplica)
    const ventasInput = document.getElementById("ventas");
    const errorVentas = obtenerElementoError("ventas", "error-ventas", "");
    if (ventasInput.value && parseFloat(ventasInput.value) <= 0) {
        errorVentas.textContent = "Error: Las ventas deben ser un número positivo.";
        esValido = false;
    } else {
        errorVentas.textContent = "";
    }

    // Validación de compras (si se aplica)
    const comprasInput = document.getElementById("compras");
    const errorCompras = obtenerElementoError("compras", "error-compras", "");
    if (comprasInput.value && parseFloat(comprasInput.value) <= 0) {
        errorCompras.textContent = "Error: Las compras deben ser un número positivo.";
        esValido = false;
    } else {
        errorCompras.textContent = "";
    }

    // Validación del teléfono (si se aplica)
    const telefonoInput = document.getElementById("telefono");
    const errorTelefono = obtenerElementoError("telefono", "error-telefono", "");
    if (telefonoInput.value && telefonoInput.value.length < 8) {
        errorTelefono.textContent = "Error: El teléfono debe tener al menos 8 dígitos.";
        esValido = false;
    } else {
        errorTelefono.textContent = "";
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