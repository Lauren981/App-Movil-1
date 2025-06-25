CREATE DATABASE productosdb;
USE productosdb;

CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  descripcion TEXT,
  estado VARCHAR(50),
  categoria VARCHAR(100),
  precio VARCHAR(20),
  foto TEXT
);