import Persona from './Persona.js';

class Empleado extends Persona {
    constructor(nombre, edad, dni, rol, salario) {
        super(nombre, edad, dni);
        this.rol = rol;
        this.salario = salario;
    }
}

export default Empleado;