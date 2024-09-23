try {
    const empleado = new Empleado(1, "Alex Yago", "Fedczuk", 30, 50000, 120000);
    console.log(empleado.toString());
    console.log(empleado.toJson());

    const cliente = new Cliente(2, "Ana", "Isabel de la Cruz", 28, 1500, "123456789");
    console.log(cliente.toString());
    console.log(cliente.toJson());
} catch (error) {
    console.error(error.message);
}