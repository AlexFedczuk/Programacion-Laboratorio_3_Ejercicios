import { mostrarPersonasEnTabla, 
    mostrarFormulario, 
    ocultarFormulario, 
    mostrarSpinner, 
    ocultarSpinner, 
    fetchData,
    crearPersonaDesdeJSON
} from "./funciones.js";

document.addEventListener('DOMContentLoaded', function () {
    let personas = [];

    // Llamada a la función para cargar los datos al cargar la página
    mostrarSpinner();
    fetchData("../backend/PersonasEmpleadosClientes.php", (data) => {
        personas = data.map(item => crearPersonaDesdeJSON(item));
        ocultarSpinner();
        mostrarPersonasEnTabla(personas);
    }, (error) => {
        ocultarSpinner();
        alert("Error al cargar los datos. Por favor, intente nuevamente.");
    });

    // Configuración adicional para el formulario ABM y los botones
    configurarBotonesABM();

    document.getElementById("btnAgregar").addEventListener("click", function () {
        mostrarFormulario("Alta");
        configurarFormularioAlta();
    });

    document.querySelector("#tablaPersonas").addEventListener("click", function (e) {
        if (e.target.classList.contains("btnModificar")) {
            mostrarFormulario("Modificación");
        } else if (e.target.classList.contains("btnEliminar")) {
            mostrarFormulario("Baja");
        }
    });

    document.getElementById("tipo").addEventListener("change", function () {
        actualizarCamposSegunTipo();
    });

    function configurarFormularioAlta() {
        const formulario = document.getElementById("abmForm");
        formulario.reset();
    
        // Bloquear el campo de ID para que no sea modificable
        document.getElementById("campoID").disabled = true;

        // Asegurar que los campos se ajusten según la selección actual del tipo
        actualizarCamposSegunTipo();

        // Configuración y validación de campo "Nombre"
        const nombreInput = document.getElementById("nombre");
        const errorNombre = document.getElementById("error-nombre") || document.createElement("span");
        errorNombre.id = "error-nombre";
        errorNombre.className = "error-message";
        nombreInput.insertAdjacentElement("afterend", errorNombre);

        nombreInput.addEventListener("blur", () => {
            if (nombreInput.value.trim() === "") {
                errorNombre.textContent = "Error: El nombre no puede estar vacío.";
            } else {
                errorNombre.textContent = ""; // Limpia el mensaje de error si el nombre es válido
            }
        });

        // Configuración y validación de campo "Apellido"
        const apellidoInput = document.getElementById("apellido");
        const errorApellido = document.getElementById("error-apellido") || document.createElement("span");
        errorApellido.id = "error-apellido";
        errorApellido.className = "error-message";
        apellidoInput.insertAdjacentElement("afterend", errorApellido);

        apellidoInput.addEventListener("blur", () => {
            if (apellidoInput.value.trim() === "") {
                errorApellido.textContent = "Error: El apellido no puede estar vacío.";
            } else {
                errorApellido.textContent = ""; // Limpia el mensaje de error si el apellido es válido
            }
        });

        // Configuración y validación de campo "Edad"
        const edadInput = document.getElementById("edad");
        const errorEdad = document.getElementById("error-edad") || document.createElement("span");
        errorEdad.id = "error-edad";
        errorEdad.className = "error-message";
        edadInput.insertAdjacentElement("afterend", errorEdad);

        edadInput.addEventListener("blur", () => {
            const edad = parseInt(edadInput.value, 10);
            if (edad < 15) {
                errorEdad.textContent = "Error: La edad debe ser mayor a 15 años.";
            } else {
                errorEdad.textContent = ""; // Limpia el mensaje de error si la edad es válida
            }
        });

        // Configuración y validación de campo "Sueldo"
        const sueldoInput = document.getElementById("sueldo");
        const errorSueldo = document.getElementById("error-sueldo") || document.createElement("span");
        errorSueldo.id = "error-sueldo";
        errorSueldo.className = "error-message";
        sueldoInput.insertAdjacentElement("afterend", errorSueldo);

        sueldoInput.addEventListener("blur", () => {
            const sueldo = parseFloat(sueldoInput.value);
            if (sueldo <= 0) {
                errorSueldo.textContent = "Error: El sueldo debe ser un número positivo.";
            } else {
                errorSueldo.textContent = ""; // Limpia el mensaje de error si el sueldo es válido
            }
        });

        // Configuración y validación de campo "Ventas"
        const ventasInput = document.getElementById("ventas");
        const errorVentas = document.getElementById("error-ventas") || document.createElement("span");
        errorVentas.id = "error-ventas";
        errorVentas.className = "error-message";
        ventasInput.insertAdjacentElement("afterend", errorVentas);

        ventasInput.addEventListener("blur", () => {
            const ventas = parseFloat(ventasInput.value);
            if (ventas <= 0) {
                errorVentas.textContent = "Error: Las ventas deben ser un número positivo.";
            } else {
                errorVentas.textContent = ""; // Limpia el mensaje de error si las ventas son válidas
            }
        });

        // Configuración y validación de campo "Compras"
        const comprasInput = document.getElementById("compras");
        const errorCompras = document.getElementById("error-compras") || document.createElement("span");
        errorCompras.id = "error-compras";
        errorCompras.className = "error-message";
        comprasInput.insertAdjacentElement("afterend", errorCompras);

        comprasInput.addEventListener("blur", () => {
            const compras = parseFloat(comprasInput.value);
            if (compras <= 0) {
                errorCompras.textContent = "Error: Las compras deben ser un número positivo.";
            } else {
                errorCompras.textContent = ""; // Limpia el mensaje de error si las compras son válidas
            }
        });

        // Configuración y validación de campo "Teléfono"
        const telefonoInput = document.getElementById("telefono");
        const errorTelefono = document.getElementById("error-telefono") || document.createElement("span");
        errorTelefono.id = "error-telefono";
        errorTelefono.className = "error-message";
        telefonoInput.insertAdjacentElement("afterend", errorTelefono);

        telefonoInput.addEventListener("blur", () => {
            const telefono = telefonoInput.value;
            if (telefono.length < 8) {
                errorTelefono.textContent = "Error: El teléfono debe tener al menos 8 dígitos.";
            } else {
                errorTelefono.textContent = ""; // Limpia el mensaje de error si el teléfono es válido
            }
        });
    
        // Configurar el botón Aceptar para enviar los datos
        const btnAceptar = document.getElementById("btnAceptar");
        btnAceptar.onclick = async function () {
            // Validar y capturar los datos del formulario
            const nombre = document.getElementById("nombre").value;
            const apellido = document.getElementById("apellido").value;
            const edad = parseInt(document.getElementById("edad").value);
            const sueldo = document.getElementById("sueldo").value ? parseFloat(document.getElementById("sueldo").value) : null;
            const ventas = document.getElementById("ventas").value ? parseFloat(document.getElementById("ventas").value) : null;
            const compras = document.getElementById("compras").value ? parseFloat(document.getElementById("compras").value) : null;
            const telefono = document.getElementById("telefono").value ? parseInt(document.getElementById("telefono").value) : null;
            
            var nuevoElemento;

            if(sueldo === null && ventas === null && compras === null && telefono === null){
                nuevoElemento = {
                    nombre,
                    apellido,
                    edad
                };
            }else if(sueldo === null && ventas === null && compras != null && telefono != null){
                nuevoElemento = {
                    nombre,
                    apellido,
                    edad,
                    compras,
                    telefono,
                };
            }else if(compras === null && telefono === null && sueldo != null && ventas != null){
                nuevoElemento = {
                    nombre,
                    apellido,
                    edad,
                    sueldo,
                    ventas
                };
            }
    
            try {
                mostrarSpinner();
    
                // Enviar la solicitud PUT con fetch
                const response = await fetch("../backend/PersonasEmpleadosClientes.php", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(nuevoElemento)
                });

                ocultarSpinner();
    
                if (response.ok) {
                    const data = await response.json();
                    nuevoElemento.id = data.id; // Asignar el ID recibido de la API
    
                    // Actualizar la lista en memoria y la tabla
                    personas.push(nuevoElemento);
                    ocultarSpinner();
                    ocultarFormulario();
                    mostrarPersonasEnTabla(personas); // Refrescar la tabla con los nuevos datos
                } else {
                    throw new Error("Error en la solicitud");
                }
            } catch (error) {
                ocultarSpinner();
                console.error("Error:", error);
                alert("ERROR: Hubo un problema al enviar el alta.");
            }
        };
    
        // Configurar el botón Cancelar para cerrar el formulario
        const btnCancelar = document.getElementById("btnCancelar");
        btnCancelar.onclick = function () {
            ocultarFormulario();
        };
    }
    
    function actualizarCamposSegunTipo() {
        const tipo = document.getElementById("tipo").value;
        const sueldo = document.getElementById("sueldo");
        const ventas = document.getElementById("ventas");
        const compras = document.getElementById("compras");
        const telefono = document.getElementById("telefono");
    
        // Deshabilitar todos los campos inicialmente
        sueldo.disabled = true;
        ventas.disabled = true;
        compras.disabled = true;
        telefono.disabled = true;
    
        // Habilitar los campos según el tipo seleccionado
        if (tipo === "Empleado") {
            sueldo.disabled = false;
            ventas.disabled = false;
        } else if (tipo === "Cliente") {
            compras.disabled = false;
            telefono.disabled = false;
        }
        // Si es Persona, todos los campos adicionales permanecen deshabilitados
    }    

    function configurarBotonesABM() {
        const btnAceptar = document.getElementById("btnAceptar");
        const btnCancelar = document.getElementById("btnCancelar");

        btnAceptar.addEventListener("click", () => {
            ocultarFormulario();
        });

        btnCancelar.addEventListener("click", ocultarFormulario);
    }

});