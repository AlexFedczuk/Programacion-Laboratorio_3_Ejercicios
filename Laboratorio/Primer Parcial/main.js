import { generarArrayObjetos } from "./funtions.js";

fetch('./data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Aquí puedes trabajar con los datos

        const arrayDeObjetos = generarArrayObjetos(data);

        arrayDeObjetos.forEach(obj => {
            console.log(obj.toString());
            console.log(obj.toJson());
        });
    })
    .catch(error => console.error('Error:', error));
