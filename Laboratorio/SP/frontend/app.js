import { mostrarPersonasEnTabla, 
    mostrarFormulario, 
    ocultarFormulario, 
    mostrarSpinner, 
    ocultarSpinner, 
    fetchData,
    crearPersonaDesdeJSON } from "./funciones.js";

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
    
    function configurarFormularioAlta() {
        const formulario = document.getElementById("abmForm");
        formulario.reset();
    
        // Bloquear el campo de ID para que no sea modificable
        document.getElementById("campoID").disabled = true;

        // Asegurar que los campos se ajusten según la selección actual del tipo
        actualizarCamposSegunTipo();
    
        // Configurar el botón Aceptar para enviar los datos
        const btnAceptar = document.getElementById("btnAceptar");
        btnAceptar.onclick = async function () {
            // Validar y capturar los datos del formulario
            const nombre = document.getElementById("nombre").value;
            const apellido = document.getElementById("apellido").value;
            const edad = document.getElementById("edad").value;
            const sueldo = document.getElementById("sueldo").value;
            const ventas = document.getElementById("ventas").value;
            const compras = document.getElementById("compras").value;
            const telefono = document.getElementById("telefono").value;
    
            // Crear el objeto de datos según los valores ingresados
            const nuevoElemento = { nombre, apellido, edad, sueldo, ventas, compras, telefono };
    
            try {
                mostrarSpinner();
    
                // Enviar la solicitud PUT con fetch
                const response = await fetch("../backend/PersonasEmpleadosClientes.php", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(nuevoElemento)
                });
    
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
                alert("Error al cargar los datos. Por favor, intente nuevamente.");
            }
        };
    
        // Configurar el botón Cancelar para cerrar el formulario
        const btnCancelar = document.getElementById("btnCancelar");
        btnCancelar.onclick = function () {
            ocultarFormulario();
        };
    }  

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