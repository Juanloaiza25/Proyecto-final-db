-- PostgreSQL migration script for Supabase
-- Converted from MySQL format

-- ==========================================
-- Drop tables and views if they exist
-- ==========================================
DROP VIEW IF EXISTS vw_stock_medicamento;
DROP TABLE IF EXISTS rol_permiso CASCADE;
DROP TABLE IF EXISTS permiso CASCADE;
DROP TABLE IF EXISTS usuario CASCADE;
DROP TABLE IF EXISTS rol CASCADE;
DROP TABLE IF EXISTS receta_item CASCADE;
DROP TABLE IF EXISTS receta CASCADE;
DROP TABLE IF EXISTS salida_medicamento CASCADE;
DROP TABLE IF EXISTS ingreso_medicamento CASCADE;
DROP TABLE IF EXISTS inventario_medicamento CASCADE;
DROP TABLE IF EXISTS nota_clinica CASCADE;
DROP TABLE IF EXISTS archivo_examen CASCADE;
DROP TABLE IF EXISTS historiales_medicos CASCADE;
DROP TABLE IF EXISTS citas CASCADE;
DROP TABLE IF EXISTS pacientes CASCADE;
DROP TABLE IF EXISTS tipo_documento CASCADE;
DROP TABLE IF EXISTS agenda_medico CASCADE;
DROP TABLE IF EXISTS medicos CASCADE;
DROP TABLE IF EXISTS especialidad CASCADE;
DROP TABLE IF EXISTS medicamentos CASCADE;
DROP TABLE IF EXISTS proveedor CASCADE;
DROP TABLE IF EXISTS categoria_medicamento CASCADE;
DROP TABLE IF EXISTS forma_farmaceutica CASCADE;
DROP TABLE IF EXISTS unidad_medida CASCADE;
DROP TABLE IF EXISTS sala CASCADE;

-- ==========================================
-- Create Tables
-- ==========================================

CREATE TABLE especialidad (
  id_especialidad SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
);

CREATE TABLE sala (
  id_sala SERIAL PRIMARY KEY,
  nombre VARCHAR(80) NOT NULL,
  ubicacion VARCHAR(120) DEFAULT NULL,
  capacidad INT DEFAULT 1
);

CREATE TABLE tipo_documento (
  id_tipo_documento SERIAL PRIMARY KEY,
  nombre VARCHAR(80) NOT NULL,
  sigla VARCHAR(10) NOT NULL,
  descripcion TEXT DEFAULT NULL
);

CREATE TABLE rol (
  id_rol SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE,
  descripcion VARCHAR(200) DEFAULT NULL
);

CREATE TABLE permiso (
  id_permiso SERIAL PRIMARY KEY,
  codigo VARCHAR(100) NOT NULL UNIQUE,
  descripcion VARCHAR(200) DEFAULT NULL
);

CREATE TABLE rol_permiso (
  id_rol INT NOT NULL REFERENCES rol(id_rol) ON DELETE CASCADE ON UPDATE CASCADE,
  id_permiso INT NOT NULL REFERENCES permiso(id_permiso) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY (id_rol, id_permiso)
);

CREATE TABLE usuario (
  id_usuario SERIAL PRIMARY KEY,
  username VARCHAR(80) NOT NULL UNIQUE,
  email VARCHAR(150) UNIQUE DEFAULT NULL,
  password_hash VARCHAR(255) NOT NULL,
  nombre VARCHAR(100) DEFAULT NULL,
  apellido VARCHAR(100) DEFAULT NULL,
  id_rol INT REFERENCES rol(id_rol),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pacientes (
  id_paciente SERIAL PRIMARY KEY,
  id_tipo_documento INT NOT NULL REFERENCES tipo_documento(id_tipo_documento),
  numero_documento VARCHAR(30) NOT NULL,
  nombre VARCHAR(80) NOT NULL,
  apellido VARCHAR(80) NOT NULL,
  fecha_nacimiento DATE DEFAULT NULL,
  sexo VARCHAR(10) CHECK (sexo IN ('M','F','Otro')) DEFAULT 'M',
  direccion VARCHAR(150) DEFAULT NULL,
  telefono VARCHAR(30) DEFAULT NULL,
  correo VARCHAR(150) DEFAULT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_paciente_doc UNIQUE (id_tipo_documento, numero_documento)
);

CREATE TABLE medicos (
  id_medico SERIAL PRIMARY KEY,
  num_registro VARCHAR(50) DEFAULT NULL UNIQUE,
  nombre VARCHAR(80) NOT NULL,
  apellido VARCHAR(80) NOT NULL,
  id_especialidad INT REFERENCES especialidad(id_especialidad),
  telefono VARCHAR(30) DEFAULT NULL,
  correo VARCHAR(150) DEFAULT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE agenda_medico (
  id_agenda SERIAL PRIMARY KEY,
  id_medico INT NOT NULL REFERENCES medicos(id_medico) ON DELETE CASCADE,
  dia_semana SMALLINT NOT NULL,
  hora_inicio TIME NOT NULL,
  hora_fin TIME NOT NULL,
  activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE citas (
  id_cita SERIAL PRIMARY KEY,
  id_paciente INT NOT NULL REFERENCES pacientes(id_paciente),
  id_medico INT NOT NULL REFERENCES medicos(id_medico),
  id_sala INT REFERENCES sala(id_sala),
  fecha_hora TIMESTAMP NOT NULL,
  duracion_min INT DEFAULT 30,
  motivo VARCHAR(250) DEFAULT NULL,
  estado_cita VARCHAR(30) CHECK (estado_cita IN ('Programada','Cancelada','Atendida','NoPresentado')) DEFAULT 'Programada',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE historiales_medicos (
  id_historial SERIAL PRIMARY KEY,
  id_paciente INT NOT NULL REFERENCES pacientes(id_paciente),
  fecha_apertura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  diagnosticos TEXT,
  notas TEXT,
  created_by INT REFERENCES usuario(id_usuario)
);

CREATE TABLE nota_clinica (
  id_nota SERIAL PRIMARY KEY,
  id_historial INT NOT NULL REFERENCES historiales_medicos(id_historial),
  id_medico INT REFERENCES medicos(id_medico),
  titulo VARCHAR(200) DEFAULT NULL,
  descripcion TEXT,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE archivo_examen (
  id_archivo SERIAL PRIMARY KEY,
  id_historial INT NOT NULL REFERENCES historiales_medicos(id_historial),
  nombre_archivo VARCHAR(200) DEFAULT NULL,
  ruta VARCHAR(300) DEFAULT NULL,
  tipo_mime VARCHAR(100) DEFAULT NULL,
  fecha_subida TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE proveedor (
  id_proveedor SERIAL PRIMARY KEY,
  nombre VARCHAR(200) NOT NULL,
  contacto VARCHAR(150) DEFAULT NULL,
  telefono VARCHAR(50) DEFAULT NULL,
  correo VARCHAR(150) DEFAULT NULL,
  direccion VARCHAR(200) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categoria_medicamento (
  id_categoria SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
);

CREATE TABLE forma_farmaceutica (
  id_forma SERIAL PRIMARY KEY,
  nombre VARCHAR(60) NOT NULL
);

CREATE TABLE unidad_medida (
  id_unidad SERIAL PRIMARY KEY,
  nombre VARCHAR(30) NOT NULL
);

CREATE TABLE medicamentos (
  id_medicamento SERIAL PRIMARY KEY,
  nombre_comercial VARCHAR(150) NOT NULL,
  nombre_generico VARCHAR(150) DEFAULT NULL,
  id_categoria INT REFERENCES categoria_medicamento(id_categoria),
  id_unidad INT REFERENCES unidad_medida(id_unidad),
  id_forma INT REFERENCES forma_farmaceutica(id_forma),
  concentracion VARCHAR(80) DEFAULT NULL,
  presentacion VARCHAR(100) DEFAULT NULL,
  efectos_secundarios TEXT,
  contraindicaciones TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE inventario_medicamento (
  id_inventario SERIAL PRIMARY KEY,
  id_medicamento INT NOT NULL REFERENCES medicamentos(id_medicamento),
  lote VARCHAR(80) DEFAULT NULL,
  fecha_vencimiento DATE DEFAULT NULL,
  cantidad_actual DECIMAL(12,2) DEFAULT 0.00,
  cantidad_minima DECIMAL(12,2) DEFAULT 0.00,
  ubicacion VARCHAR(120) DEFAULT NULL,
  id_proveedor INT REFERENCES proveedor(id_proveedor),
  fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE ingreso_medicamento (
  id_ingreso SERIAL PRIMARY KEY,
  id_inventario INT NOT NULL REFERENCES inventario_medicamento(id_inventario),
  cantidad DECIMAL(12,2) NOT NULL,
  costo_unitario DECIMAL(12,2) DEFAULT NULL,
  fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  referencia VARCHAR(200) DEFAULT NULL,
  created_by INT REFERENCES usuario(id_usuario)
);

CREATE TABLE salida_medicamento (
  id_salida SERIAL PRIMARY KEY,
  id_inventario INT NOT NULL REFERENCES inventario_medicamento(id_inventario),
  cantidad DECIMAL(12,2) NOT NULL,
  fecha_salida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  tipo VARCHAR(30) CHECK (tipo IN ('CONSUMO','ENTREGA_PACIENTE','DESCARTE')) DEFAULT 'CONSUMO',
  referencia VARCHAR(200) DEFAULT NULL,
  created_by INT REFERENCES usuario(id_usuario)
);

CREATE TABLE receta (
  id_receta SERIAL PRIMARY KEY,
  id_paciente INT NOT NULL REFERENCES pacientes(id_paciente),
  id_medico INT NOT NULL REFERENCES medicos(id_medico),
  fecha_emision TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  validez_dias INT DEFAULT 30,
  observaciones TEXT,
  created_by INT REFERENCES usuario(id_usuario)
);

CREATE TABLE receta_item (
  id_receta_item SERIAL PRIMARY KEY,
  id_receta INT NOT NULL REFERENCES receta(id_receta) ON DELETE CASCADE,
  id_medicamento INT NOT NULL REFERENCES medicamentos(id_medicamento),
  dosis VARCHAR(100) NOT NULL,
  frecuencia VARCHAR(100) NOT NULL,
  duracion_dias INT DEFAULT NULL,
  instrucciones TEXT
);


-- ==========================================
-- Insert Data
-- ==========================================

INSERT INTO categoria_medicamento (id_categoria, nombre) VALUES 
(1,'Analgesico'),(2,'Antibiotico'),(3,'Vitaminas'),(4,'Antiinflamatorios no esteroideos (AINEs)'),(5,'Antihipertensivos'),(6,'Antidiabéticos orales'),(7,'Antihistamínicos'),(8,'Antidepresivos'),(9,'Antipsicóticos'),(10,'Anticonvulsivantes'),(11,'Anticoagulantes'),(12,'Antiarrítmicos'),(13,'Antieméticos'),(14,'Antifúngicos'),(15,'Antivirales'),(16,'Antipiréticos'),(17,'Broncodilatadores'),(18,'Corticoesteroides'),(19,'Hipolipemiantes'),(20,'Gastroprotectores'),(21,'Laxantes'),(22,'Antiespasmódicos'),(23,'Diuréticos');

INSERT INTO forma_farmaceutica (id_forma, nombre) VALUES 
(1,'Tableta'),(2,'Cápsula'),(3,'Jarabe'),(4,'Suspensión'),(5,'Gotas'),(6,'Ampolla inyectable'),(7,'Vial'),(8,'Crema'),(9,'Ungüento'),(10,'Gel'),(11,'Supositorio'),(12,'Inhalador'),(13,'Aerosol'),(14,'Parche transdérmico'),(15,'Emulsión'),(16,'Solución oral'),(17,'Solución intravenosa'),(18,'Polvo para reconstituir'),(19,'Enema'),(20,'Espuma'),(21,'Colirio');

INSERT INTO tipo_documento (id_tipo_documento, nombre, sigla, descripcion) VALUES 
(1,'Cédula de ciudadanía','CC',NULL),(2,'Cédula de extranjería','CE',NULL),(3,'Pasaporte','PA',NULL),(4,'Tarjeta de identidad','TI',NULL);

INSERT INTO unidad_medida (id_unidad, nombre) VALUES 
(1,'mg'),(2,'ml'),(3,'tableta'),(4,'g'),(5,'µg'),(6,'kg'),(7,'L'),(8,'UI'),(9,'mEq'),(10,'mcg/mL'),(11,'g/mL'),(12,'%'),(13,'mL/h'),(14,'mg/mL'),(15,'mg/h'),(16,'µg/h'),(17,'g/100 mL'),(18,'dosis'),(19,'frasco'),(20,'ampolla'),(21,'inhalación'),(22,'aplicación'),(23,'unidades por dosis');

INSERT INTO medicamentos (id_medicamento, nombre_comercial, nombre_generico, id_categoria, id_unidad, id_forma, concentracion, presentacion, efectos_secundarios, contraindicaciones, is_active, created_at, updated_at) VALUES 
(9,'Ibuprofeno','Ibuprofeno',1,2,1,'400mg','Caja x 20 tabletas','Náuseas, mareos','Alergia al ibuprofeno, úlcera gástrica',false,'2025-11-17 03:42:21','2025-11-17 05:37:53'),
(10,'Omeprazol MK','Omeprazol',4,1,2,'20 mg','Caja X 14 capsulas','Náuseas, dolor de cabeza, diarrea, dolor abdominal.','Hipersensibilidad al omeprazol o benzimidazoles; evitar en pacientes con sospecha de patología maligna gástrica.',true,'2025-11-17 05:24:02','2025-11-17 05:24:02');

INSERT INTO rol (id_rol, nombre, descripcion) VALUES 
(1,'ROLE_ADMIN','Administrador'),(2,'ROLE_MEDICO','Médico'),(3,'ROLE_FARMACIA','Farmacia');

INSERT INTO usuario (id_usuario, username, email, password_hash, nombre, apellido, id_rol, is_active, created_at, updated_at) VALUES 
(1,'admin','admin@svb.com','$2y$..hash..','Admin','SVB',1,true,'2025-11-16 20:41:11','2025-11-16 20:41:11');

-- ==========================================
-- Ensure Sequences Continue Correctly
-- ==========================================
SELECT setval('categoria_medicamento_id_categoria_seq', COALESCE((SELECT MAX(id_categoria) FROM categoria_medicamento), 1), true);
SELECT setval('forma_farmaceutica_id_forma_seq', COALESCE((SELECT MAX(id_forma) FROM forma_farmaceutica), 1), true);
SELECT setval('tipo_documento_id_tipo_documento_seq', COALESCE((SELECT MAX(id_tipo_documento) FROM tipo_documento), 1), true);
SELECT setval('unidad_medida_id_unidad_seq', COALESCE((SELECT MAX(id_unidad) FROM unidad_medida), 1), true);
SELECT setval('medicamentos_id_medicamento_seq', COALESCE((SELECT MAX(id_medicamento) FROM medicamentos), 1), true);
SELECT setval('rol_id_rol_seq', COALESCE((SELECT MAX(id_rol) FROM rol), 1), true);
SELECT setval('usuario_id_usuario_seq', COALESCE((SELECT MAX(id_usuario) FROM usuario), 1), true);


-- ==========================================
-- Create Views
-- ==========================================
CREATE OR REPLACE VIEW vw_stock_medicamento AS 
SELECT m.id_medicamento, m.nombre_comercial, COALESCE(SUM(i.cantidad_actual), 0) AS stock_total 
FROM medicamentos m 
LEFT JOIN inventario_medicamento i ON m.id_medicamento = i.id_medicamento AND i.is_active = TRUE 
GROUP BY m.id_medicamento, m.nombre_comercial;

