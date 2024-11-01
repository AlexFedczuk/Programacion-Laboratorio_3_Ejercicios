import { 
    cargarPersonasDesdeJSON,
    mostrarPersonasEnTabla 
} from "./funciones.js";

document.addEventListener('DOMContentLoaded', function () {
    let personas = [];

    // Cargar datos desde JSON y luego mostrar en la tabla
    cargarPersonasDesdeJSON(personas).then(() => {
        console.log(personas); // Ver lista de personas en la consola
        mostrarPersonasEnTabla(personas);
    });

    // Event listeners para los botones de la tabla (Modificar y Eliminar)
    document.querySelector("#tablaPersonas").addEventListener("click", function (e) {
        if (e.target.classList.contains("btnModificar")) {
            console.log("Modificar:", e.target.closest("tr").children[0].innerText);
        } else if (e.target.classList.contains("btnEliminar")) {
            console.log("Eliminar:", e.target.closest("tr").children[0].innerText);
        }
    });

    // Botón para agregar elemento
    document.querySelector("#btnAgregar").addEventListener("click", function () {
        console.log("Agregar nuevo elemento");
    });
});
