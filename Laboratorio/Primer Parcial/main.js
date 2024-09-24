/*
import { generarArrayDeObjetos } from "./funtions.js";
import dataPath from "./data.json"

const arrayDeObjetos = generarArrayDeObjetos(dataPath);

arrayDeObjetos.forEach(obj => {
    console.log(obj.toString());
    console.log(obj.toJson());
});

const empleado = new Empleado(1, "Alex Yago", "Fedczuk", 30, 50000, 120000);
console.log(empleado.toString());
console.log(empleado.toJson());

const cliente = new Cliente(2, "Ana", "Isabel de la Cruz", 28, 1500, "123456789");
console.log(cliente.toString());
console.log(cliente.toJson());
*/
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
