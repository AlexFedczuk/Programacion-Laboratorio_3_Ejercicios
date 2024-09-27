/********************CREACIÓN DE TABLAS********************/

-- Alumno: Alejo Martin Carmona.
-- División: 3D.

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-10-2023 a las 00:01:14
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: tp_01_sql
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla producto
--

CREATE TABLE producto (
  id int(11) NOT NULL,
  codigo_de_barra int(8) NOT NULL,
  nombre varchar(30) NOT NULL,
  tipo varchar(30) NOT NULL,
  stock int(11) NOT NULL DEFAULT 0,
  precio decimal(10,2) NOT NULL,
  fecha_de_creacion date NOT NULL DEFAULT current_timestamp(),
  fecha_de_modificacion date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla producto
--

INSERT INTO producto (id, codigo_de_barra, nombre, tipo, stock, precio, fecha_de_creacion, fecha_de_modificacion) VALUES
(1001, 77900361, 'Westmacott', 'liquido', 33, 15.87, '2021-02-09', '2020-09-26'),
(1002, 77900362, 'Spirit', 'solido', 45, 69.74, '2020-09-18', '2020-04-14'),
(1003, 77900363, 'Newgrosh', 'polvo', 14, 68.19, '2020-11-29', '2021-02-11'),
(1004, 77900364, 'McNickle', 'polvo', 19, 53.51, '2020-11-28', '2020-04-17'),
(1005, 77900365, 'Hudd', 'solido', 68, 26.56, '2020-12-19', '2020-06-19'),
(1006, 77900366, 'Schrader', 'polvo', 17, 96.54, '2020-08-02', '2020-04-18'),
(1007, 77900367, 'Bachellier', 'solido', 59, 69.17, '2021-01-30', '2020-06-07'),
(1008, 77900368, 'Fleming', 'solido', 38, 66.77, '2020-10-26', '2020-10-03'),
(1009, 77900369, 'Hurry', 'solido', 44, 43.01, '2020-07-04', '2020-05-30'),
(1010, 77900310, 'Krauss', 'polvo', 73, 35.73, '2021-03-03', '2020-08-30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla usuario
--

CREATE TABLE usuario (
  id int(11) NOT NULL,
  nombre varchar(30) NOT NULL,
  apellido varchar(50) NOT NULL,
  clave varchar(30) NOT NULL,
  mail varchar(30) NOT NULL,
  fecha_de_registro date NOT NULL DEFAULT current_timestamp(),
  Localidad varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla usuario
--

INSERT INTO usuario (id, nombre, apellido, clave, mail, fecha_de_registro, Localidad) VALUES
(101, 'Esteban', 'Madou', '2345', 'dkantor0@example.com', '2021-01-07', 'Quilmes'),
(102, 'German', 'Gerram', '1234', 'ggerram1@hud.gov', '2020-05-08', 'Berazategui'),
(103, 'Deloris', 'Fosis', '5678', 'bsharpe2@wisc.edu', '2020-11-28', 'Avellaneda'),
(104, 'Brok', 'Neiner', '4567', 'bblazic3@desdev.cn', '2020-12-08', 'Quilmes'),
(105, 'Garrick', 'Brent', '6789', 'gbrent4@theguardian.com', '2020-12-17', 'Moron'),
(106, 'Bili', 'Baus', '0123', 'bhoff5@addthis.com', '2020-11-27', 'Moreno');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla venta
--

CREATE TABLE venta (
  id int(11) NOT NULL,
  id_producto int(11) NOT NULL,
  id_usuario int(11) NOT NULL,
  cantidad int(11) NOT NULL,
  fecha_de_venta date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla venta
--

INSERT INTO venta (id, id_producto, id_usuario, cantidad, fecha_de_venta) VALUES
(1, 1001, 101, 2, '2020-07-19'),
(2, 1008, 102, 3, '2020-08-16'),
(3, 1007, 102, 4, '2021-01-24'),
(4, 1006, 103, 5, '2021-01-14'),
(5, 1003, 104, 6, '2021-03-20'),
(6, 1005, 105, 7, '2021-02-22'),
(7, 1003, 104, 6, '2020-12-02'),
(8, 1003, 106, 6, '2020-06-10'),
(9, 1002, 106, 6, '2021-02-04'),
(10, 1001, 106, 1, '2020-05-17');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla producto
--
ALTER TABLE producto
  ADD PRIMARY KEY (id);

--
-- Indices de la tabla usuario
--
ALTER TABLE usuario
  ADD PRIMARY KEY (id);

--
-- Indices de la tabla venta
--
ALTER TABLE venta
  ADD PRIMARY KEY (id);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla producto
--
ALTER TABLE producto
  MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1011;

--
-- AUTO_INCREMENT de la tabla usuario
--
ALTER TABLE usuario
  MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla venta
--
ALTER TABLE venta
  MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;