import { Terrestre } from './classTerrestre.js';
import { Aereo } from './classAereo.js';

document.addEventListener('DOMContentLoaded', () => {
    const jsonString = '[{"id":14, "modelo":"Ferrari F100", "anoFab":1998, "velMax":400, "cantPue":2, "cantRue":4},{"id":51, "modelo":"Dodge Viper", "anoFab":1991, "velMax":266, "cantPue":2, "cantRue":4},{"id":67, "modelo":"Boeing CH-47 Chinook", "anoFab":1962, "velMax":302, "altMax":6, "autonomia":1200},{"id":666, "modelo":"Aprilia RSV 1000 R", "anoFab":2004, "velMax":280, "cantPue":0, "cantRue":2},{"id":872, "modelo":"Boeing 747-400", "anoFab":1989, "velMax":988, "altMax":13, "autonomia":13450},{"id":742, "modelo":"Cessna CH-1 SkyhookR", "anoFab":1953, "velMax":174, "altMax":3, "autonomia":870}]';
    const vehiculosData = JSON.parse(jsonString);
    const vehiculos = [];

    vehiculosData.forEach(data => {
        try {
            if (data.altMax !== undefined && data.autonomia !== undefined) {
                const aereo = new Aereo(data.id, data.modelo, data.anoFab, data.velMax, data.altMax, data.autonomia);
                vehiculos.push(aereo);
            } else if (data.cantPue !== undefined && data.cantRue !== undefined) {
                const terrestre = new Terrestre(data.id, data.modelo, data.anoFab, data.velMax, data.cantPue, data.cantRue);
                vehiculos.push(terrestre);
            }
        } catch (error) {
            console.error(`Error: Hubo un problema al crear vehículo: ${error.message}`);
        }
    });

    const dataTableBody = document.querySelector('#data-table tbody');

    function mostrarDatos(vehiculosFiltrados) {
        dataTableBody.innerHTML = '';

        vehiculosFiltrados.forEach(vehiculo => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${vehiculo.id}</td>
                <td>${vehiculo.modelo}</td>
                <td>${vehiculo.anoFab}</td>
                <td>${vehiculo.velMax}</td>
                <td>${vehiculo.altMax !== undefined ? vehiculo.altMax : '--'}</td>
                <td>${vehiculo.autonomia !== undefined ? vehiculo.autonomia : '--'}</td>
                <td>${vehiculo.cantPue !== undefined ? vehiculo.cantPue : '--'}</td>
                <td>${vehiculo.cantRue !== undefined ? vehiculo.cantRue : '--'}</td>
            `;

            // Agregar evento de doble clic en la fila de la tabla
            row.addEventListener('dblclick', () => {
                cargarDatosEnFormulario(vehiculo);
                mostrarFormulario('formABM');
            });

            dataTableBody.appendChild(row);
        });

        // Inicializar el campo de promedio vacío al cargar
        document.getElementById('promedioVelocidad').value = '';
    }

    function cargarDatosEnFormulario(vehiculo) {
        document.getElementById('modelo').value = vehiculo.modelo;
        document.getElementById('anoFab').value = vehiculo.anoFab;
        document.getElementById('velMax').value = vehiculo.velMax;

        // Cargar propiedades específicas según el tipo de vehículo
        if (vehiculo instanceof Aereo) {
            document.getElementById('altMax').value = vehiculo.altMax;
            document.getElementById('autonomia').value = vehiculo.autonomia;
            document.getElementById('cantPue').value = '';
            document.getElementById('cantRue').value = '';
        } else if (vehiculo instanceof Terrestre) {
            document.getElementById('cantPue').value = vehiculo.cantPue;
            document.getElementById('cantRue').value = vehiculo.cantRue;
            document.getElementById('altMax').value = '';
            document.getElementById('autonomia').value = '';
        }

        // Ocultar el botón "Agregar"
        document.getElementById('agregarBtn').style.display = 'none';
    }

    function mostrarFormulario(formularioId) {
        document.getElementById('formABM').style.display = formularioId === 'formABM' ? 'block' : 'none';
        document.getElementById('formDatos').style.display = formularioId === 'formDatos' ? 'block' : 'none';
    }

    function filtrarDatos(tipo) {
        let vehiculosFiltrados;
        if (tipo === 'Todos') {
            vehiculosFiltrados = vehiculos;
        } else {
            vehiculosFiltrados = vehiculos.filter(vehiculo => {
                if (tipo === 'Terrestres') {
                    return vehiculo instanceof Terrestre;
                } else if (tipo === 'Aereos') {
                    return vehiculo instanceof Aereo;
                }
                return false;
            });
        }
        mostrarDatos(vehiculosFiltrados);
    }

    document.getElementById('filtro').addEventListener('change', (event) => {
        filtrarDatos(event.target.value);
    });

    // Función para ordenar la tabla
    function ordenarTabla(index) {
        const ordenado = vehiculos.map(vehiculo => ({ ...vehiculo })) // Copia los objetos
            .sort((a, b) => {
                const aValue = Object.values(a)[index];
                const bValue = Object.values(b)[index];

                // Manejo de valores no definidos
                if (aValue === undefined) return 1;
                if (bValue === undefined) return -1;
                
                // Comparación
                return aValue > bValue ? 1 : -1;
            });
        vehiculos.length = 0; // Limpiar el array original
        vehiculos.push(...ordenado); // Copiar los vehículos ordenados al array original
        mostrarDatos(vehiculos); // Actualizar la tabla
    }

    // Evento para los encabezados de la tabla
    document.querySelectorAll('#data-table th').forEach((header, index) => {
        header.addEventListener('click', () => ordenarTabla(index));
    });

    // Mostrar todos los datos al cargar la página
    mostrarDatos(vehiculos);

    document.getElementById('calcularBtn').addEventListener('click', () => {
        const selectedFilter = document.getElementById('filtro').value;
        const filteredVehiculos = vehiculos.filter(vehiculo => {
            if (selectedFilter === 'Todos') return true;
            if (selectedFilter === 'Terrestres' && vehiculo instanceof Terrestre) return true;
            if (selectedFilter === 'Aereos' && vehiculo instanceof Aereo) return true;
            return false;
        });

        // Extraer las velocidades máximas de los vehículos filtrados
        const velocidadesMaximas = filteredVehiculos.map(vehiculo => vehiculo.velMax);

        // Calcular la suma de las velocidades máximas
        const sumaVelocidades = velocidadesMaximas.reduce((acc, velocidad) => acc + velocidad, 0);

        // Calcular el promedio
        const promedioVelocidad = filteredVehiculos.length > 0 ? (sumaVelocidades / filteredVehiculos.length).toFixed(2) : 0;

        // Mostrar el promedio solo en el input al hacer clic en calcular
        document.getElementById('promedioVelocidad').value = promedioVelocidad;
    });

    function limpiarFormulario() {
        document.getElementById('modelo').value = '';
        document.getElementById('anoFab').value = '';
        document.getElementById('velMax').value = '';
        document.getElementById('altMax').value = ''; // Campo para Aereo
        document.getElementById('autonomia').value = ''; // Campo para Aereo
        document.getElementById('cantPue').value = ''; // Campo para Terrestre
        document.getElementById('cantRue').value = ''; // Campo para Terrestre
        
        // Mostrar el botón "Agregar" al limpiar el formulario
        document.getElementById('agregarBtn').style.display = 'block';
    }
});
