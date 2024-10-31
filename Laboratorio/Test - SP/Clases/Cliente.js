import Persona from './Persona.js';

class Cliente extends Persona {
    constructor(nombre, edad, dni, numeroCliente, historialCompras) {
        super(nombre, edad, dni);
        this.numeroCliente = numeroCliente;
        this.historialCompras = historialCompras || [];
    }
}

export default Cliente;