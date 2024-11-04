import { 
    mostrarVehiculosEnTabla, 
    mostrarFormulario, 
    ocultarFormulario, 
    mostrarSpinner, 
    ocultarSpinner, 
    fetchData, 
    crearVehiculoDesdeJSON,
    configurarFormularioAlta,
    configurarFormularioModificacion,
    configurarBotonesABM,
    configurarFormularioEliminacion, 
    cargarVehiculosDesdeAPI
} from "./funciones.js";

document.addEventListener('DOMContentLoaded', function () {
    let vehiculos = [];

    // Cargar los datos iniciales al cargar la página para la lista.
    mostrarSpinner();
    fetchData("../backend/VehiculoAutoCamion.php", (data) => {
        //vehiculos = data.map(item => cargarVehiculosDesdeAPI(item, 'https://examenesutn.vercel.app/api/VehiculoAutoCamion'));
        vehiculos = data.map(item => crearVehiculoDesdeJSON(item));
        ocultarSpinner();
        mostrarVehiculosEnTabla(vehiculos);
    }, (error) => {
        ocultarSpinner();
        alert("Error al cargar los datos. Por favor, intente nuevamente.");
    });

    // Configuración de botones
    configurarBotonesABM();

    document.getElementById("btnAgregar").addEventListener("click", function () {
        mostrarFormulario("Alta");
        configurarFormularioAlta(vehiculos);
    });

    document.querySelector("#tablaVehiculos").addEventListener("click", function (e) {
        if (e.target.classList.contains("btnModificar")) {
            const fila = e.target.closest("tr"); // Encuentra la fila correspondiente
            const id = fila.cells[0].textContent; // Asumiendo que el ID está en la primera celda
            const modelo = fila.cells[1].textContent;
            const anoFabricacion = fila.cells[2].textContent;
            const velMax = fila.cells[3].textContent;
            const cantidadPuertas = fila.cells[4].textContent;
            const asientos = fila.cells[5].textContent;
            const carga = fila.cells[6].textContent;
            const autonomia = fila.cells[7].textContent;
    
            // Mostrar el formulario de modificación
            mostrarFormulario("Modificación");

            console.log(modelo);
            console.log(anoFabricacion);
            console.log(velMax);
            console.log(cantidadPuertas);
            console.log(asientos);
            console.log(carga);
            console.log(autonomia);
    
            // Cargar datos en el formulario
            document.getElementById("campoID").value = id; // Asignar el ID y deshabilitarlo
            document.getElementById("campoID").disabled = true;

            document.getElementById("modelo").value = modelo;

            document.getElementById("anoFabricacion").value = anoFabricacion;

            document.getElementById("velMax").value = velMax;

            document.getElementById("cantidadPuertas").value = cantidadPuertas;

            document.getElementById("asientos").value = asientos;

            document.getElementById("carga").value = carga;

            document.getElementById("autonomia").value = autonomia;
            
            // Aquí puedes llamar a la función para configurar el formulario de modificación
            configurarFormularioModificacion(id, vehiculos);
        }
    });

    // app.js
    document.querySelector("#tablaVehiculos").addEventListener("click", function (e) {
        if (e.target.classList.contains("btnEliminar")) {
            const fila = e.target.closest("tr"); // Encuentra la fila correspondiente
            const id = fila.cells[0].textContent;
            const modelo = fila.cells[1].textContent;
            const anoFabricacion = fila.cells[2].textContent;
            const velMax = fila.cells[3].textContent;
            const cantidadPuertas = fila.cells[4].textContent;
            const asientos = fila.cells[5].textContent;
            const carga = fila.cells[6].textContent;
            const autonomia = fila.cells[7].textContent;

            console.log(modelo);
            console.log(anoFabricacion);
            console.log(velMax);
            console.log(cantidadPuertas);
            console.log(asientos);
            console.log(carga);
            console.log(autonomia);
            
            mostrarFormulario("Eliminación");
            // Cargar datos en el formulario
            document.getElementById("campoID").value = id;
            document.getElementById("campoID").disabled = true;

            document.getElementById("modelo").value = modelo;
            document.getElementById("modelo").disabled = true;

            document.getElementById("anoFabricacion").value = anoFabricacion;
            document.getElementById("anoFabricacion").disabled = true;

            document.getElementById("velMax").value = velMax;
            document.getElementById("velMax").disabled = true;

            document.getElementById("cantidadPuertas").value = cantidadPuertas;
            document.getElementById("cantidadPuertas").disabled = true;

            document.getElementById("asientos").value = asientos;
            document.getElementById("asientos").disabled = true;

            document.getElementById("carga").value = carga;
            document.getElementById("carga").disabled = true;

            document.getElementById("autonomia").value = autonomia;
            document.getElementById("autonomia").disabled = true;

            configurarFormularioEliminacion(id, vehiculos); // Llama a la función para configurar el formulario
        }
    });
});
