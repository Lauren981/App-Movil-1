-- Crear base de datos
CREATE DATABASE IF NOT EXISTS producto_examen_db;

-- Usar la base de datos
USE producto_examen_db;

-- Crear tabla Producto
CREATE TABLE IF NOT EXISTS Productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    estado ENUM('disponible', 'no disponible') DEFAULT 'disponible',
    categoria VARCHAR(255) NOT NULL,
    url_foto TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertar datos de prueba (opcional)
INSERT INTO Productos (nombre, descripcion, precio, estado, categoria, url_foto) VALUES
('iPhone 14', 'Smartphone Apple iPhone 14 128GB', 899.99, 'disponible', 'Electrónicos', null),
('Camiseta Nike', 'Camiseta deportiva Nike talla M', 39.99, 'disponible', 'Ropa', null),
('Mesa de Comedor', 'Mesa de comedor de madera para 6 personas', 299.99, 'no disponible', 'Hogar', null);