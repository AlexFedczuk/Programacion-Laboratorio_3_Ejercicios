/******************** CONSULTAS ********************/

-- 1. Obtener los detalles completos de todos los usuarios, ordenados alfabéticamente.
SELECT * 
FROM usuario
ORDER BY apellido ASC;

-- 2. Obtener los detalles completos de todos los productos líquidos.
SELECT * 
FROM producto
WHERE tipo = "liquido";

-- 3. Obtener todas las compras en los cuales la cantidad esté entre 6 y 10 inclusive.
SELECT * 
FROM venta
WHERE cantidad BETWEEN 6 AND 10;

-- 4. Obtener la cantidad total de todos los productos vendidos.
SELECT SUM(cantidad) AS total_productos_vendidos
FROM venta;

-- 5. Mostrar los primeros 3 números de productos que se han enviado.
SELECT id_producto 
FROM venta
LIMIT 3;

-- 6. Mostrar los nombres del usuario y los nombres de los productos de cada venta.
SELECT usuario.nombre, producto.nombre
FROM venta
JOIN usuario ON venta.id_usuario = usuario.id
JOIN producto ON venta.id_producto = producto.id;

-- 7. Indicar el monto (cantidad * precio) por cada una de las ventas.
SELECT
    venta.id,
    (venta.cantidad * producto.precio) AS monto
FROM venta
JOIN producto ON venta.id_producto = producto.id

-- 8. Obtener la cantidad total del producto 1003 vendido por el usuario 104.
SELECT SUM(ventas.cantidad) AS total_vendido
FROM venta
WHERE venta.id_usuario = 1003 AND venta.id_producto = 104;

-- 9. Obtener todos los números de los productos vendidos por algún usuario de ‘Avellaneda’.
SELECT producto.id
FROM venta
JOIN usuario ON venta.id_usuario = usuario.id
JOIN producto ON venta.id_producto = producto.id
WHERE usuario.direccion LIKE "%Avellaneda%";

-- 10. Obtener los datos completos de los usuarios cuyos nombres contengan la letra ‘u’.
SELECT *
FROM usuario
WHERE usuario.nombre LIKE "%u%";

-- 11. Traer las ventas entre junio del 2020 y febrero 2021.
SELECT *
FROM venta
WHERE venta.fecha_de_venta BETWEEN "2020-06-01" AND "2021-02-28";

-- 12. Obtener los usuarios registrados antes del 2021.
SELECT *
FROM usuario
WHERE usuario.fecha_de_registro < "2021-01-01";

-- 13.Agregar el producto llamado ‘Chocolate’, de tipo Sólido y con un precio de 25,35.
INSERT INTO producto (codigo_de_barra, nombre, tipo, stock, precio, fecha_de_creacion, fecha_de_modificacion)
VALUES (77900361, 'Chocolate', 'liquido', 15, 25.35, CURRENT_DATE(), CURRENT_DATE());

-- 14. Insertar un nuevo usuario.
INSERT INTO usuario (nombre, apellido, clave, mail, fecha_de_registro, Localidad)
VALUES ('Alex', 'Fedczuk', '1234', 'alex@example.com', CURRENT_DATE(), 'San Telmo');

-- 15. Cambiar los precios de los productos de tipo sólido a 66,60.
UPDATE producto
SET precio = 66.60
WHERE tipo = 'Solido';

-- 16. Cambiar el stock a 0 de todos los productos cuyas cantidades de stock sean menores a 20 inclusive.
UPDATE producto
SET stock = 0
WHERE stock < 20;

-- 17. Eliminar el producto número 1010.
DELETE FROM producto
WHERE id = 1010;

-- 18. Eliminar a todos los usuarios que no han vendido productos.
DELETE FROM usuario
WHERE id NOT IN (SELECT id_usuario FROM venta);