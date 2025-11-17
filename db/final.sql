-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: final
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `agenda_medico`
--

DROP TABLE IF EXISTS `agenda_medico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agenda_medico` (
  `id_agenda` int(11) NOT NULL AUTO_INCREMENT,
  `id_medico` int(11) NOT NULL,
  `dia_semana` tinyint(4) NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL,
  `activo` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_agenda`),
  KEY `fk_agenda_medico` (`id_medico`),
  CONSTRAINT `fk_agenda_medico` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`id_medico`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agenda_medico`
--

LOCK TABLES `agenda_medico` WRITE;
/*!40000 ALTER TABLE `agenda_medico` DISABLE KEYS */;
/*!40000 ALTER TABLE `agenda_medico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `archivo_examen`
--

DROP TABLE IF EXISTS `archivo_examen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `archivo_examen` (
  `id_archivo` int(11) NOT NULL AUTO_INCREMENT,
  `id_historial` int(11) NOT NULL,
  `nombre_archivo` varchar(200) DEFAULT NULL,
  `ruta` varchar(300) DEFAULT NULL,
  `tipo_mime` varchar(100) DEFAULT NULL,
  `fecha_subida` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_archivo`),
  KEY `fk_archivo_historial` (`id_historial`),
  CONSTRAINT `fk_archivo_historial` FOREIGN KEY (`id_historial`) REFERENCES `historiales_medicos` (`id_historial`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `archivo_examen`
--

LOCK TABLES `archivo_examen` WRITE;
/*!40000 ALTER TABLE `archivo_examen` DISABLE KEYS */;
/*!40000 ALTER TABLE `archivo_examen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria_medicamento`
--

DROP TABLE IF EXISTS `categoria_medicamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria_medicamento` (
  `id_categoria` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria_medicamento`
--

LOCK TABLES `categoria_medicamento` WRITE;
/*!40000 ALTER TABLE `categoria_medicamento` DISABLE KEYS */;
INSERT INTO `categoria_medicamento` VALUES (1,'Analgesico'),(2,'Antibiotico'),(3,'Vitaminas'),(4,'Antiinflamatorios no esteroideos (AINEs)'),(5,'Antihipertensivos'),(6,'Antidiabéticos orales'),(7,'Antihistamínicos'),(8,'Antidepresivos'),(9,'Antipsicóticos'),(10,'Anticonvulsivantes'),(11,'Anticoagulantes'),(12,'Antiarrítmicos'),(13,'Antieméticos'),(14,'Antifúngicos'),(15,'Antivirales'),(16,'Antipiréticos'),(17,'Broncodilatadores'),(18,'Corticoesteroides'),(19,'Hipolipemiantes'),(20,'Gastroprotectores'),(21,'Laxantes'),(22,'Antiespasmódicos'),(23,'Diuréticos');
/*!40000 ALTER TABLE `categoria_medicamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `citas`
--

DROP TABLE IF EXISTS `citas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `citas` (
  `id_cita` int(11) NOT NULL AUTO_INCREMENT,
  `id_paciente` int(11) NOT NULL,
  `id_medico` int(11) NOT NULL,
  `id_sala` int(11) DEFAULT NULL,
  `fecha_hora` datetime NOT NULL,
  `duracion_min` int(11) DEFAULT '30',
  `motivo` varchar(250) DEFAULT NULL,
  `estado_cita` enum('Programada','Cancelada','Atendida','NoPresentado') DEFAULT 'Programada',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_cita`),
  KEY `fk_cita_paciente` (`id_paciente`),
  KEY `fk_cita_sala` (`id_sala`),
  KEY `idx_cita_medico_fecha` (`id_medico`,`fecha_hora`),
  CONSTRAINT `fk_cita_medico` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`id_medico`),
  CONSTRAINT `fk_cita_paciente` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_paciente`),
  CONSTRAINT `fk_cita_sala` FOREIGN KEY (`id_sala`) REFERENCES `sala` (`id_sala`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `citas`
--

LOCK TABLES `citas` WRITE;
/*!40000 ALTER TABLE `citas` DISABLE KEYS */;
/*!40000 ALTER TABLE `citas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especialidad`
--

DROP TABLE IF EXISTS `especialidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especialidad` (
  `id_especialidad` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id_especialidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especialidad`
--

LOCK TABLES `especialidad` WRITE;
/*!40000 ALTER TABLE `especialidad` DISABLE KEYS */;
/*!40000 ALTER TABLE `especialidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forma_farmaceutica`
--

DROP TABLE IF EXISTS `forma_farmaceutica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forma_farmaceutica` (
  `id_forma` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  PRIMARY KEY (`id_forma`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forma_farmaceutica`
--

LOCK TABLES `forma_farmaceutica` WRITE;
/*!40000 ALTER TABLE `forma_farmaceutica` DISABLE KEYS */;
INSERT INTO `forma_farmaceutica` VALUES (1,'Tableta'),(2,'Cápsula'),(3,'Jarabe'),(4,'Suspensión'),(5,'Gotas'),(6,'Ampolla inyectable'),(7,'Vial'),(8,'Crema'),(9,'Ungüento'),(10,'Gel'),(11,'Supositorio'),(12,'Inhalador'),(13,'Aerosol'),(14,'Parche transdérmico'),(15,'Emulsión'),(16,'Solución oral'),(17,'Solución intravenosa'),(18,'Polvo para reconstituir'),(19,'Enema'),(20,'Espuma'),(21,'Colirio');
/*!40000 ALTER TABLE `forma_farmaceutica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historiales_medicos`
--

DROP TABLE IF EXISTS `historiales_medicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historiales_medicos` (
  `id_historial` int(11) NOT NULL AUTO_INCREMENT,
  `id_paciente` int(11) NOT NULL,
  `fecha_apertura` datetime DEFAULT CURRENT_TIMESTAMP,
  `diagnosticos` text,
  `notas` text,
  `created_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_historial`),
  KEY `fk_historial_paciente` (`id_paciente`),
  KEY `fk_historial_usuario` (`created_by`),
  CONSTRAINT `fk_historial_paciente` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_paciente`),
  CONSTRAINT `fk_historial_usuario` FOREIGN KEY (`created_by`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historiales_medicos`
--

LOCK TABLES `historiales_medicos` WRITE;
/*!40000 ALTER TABLE `historiales_medicos` DISABLE KEYS */;
/*!40000 ALTER TABLE `historiales_medicos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingreso_medicamento`
--

DROP TABLE IF EXISTS `ingreso_medicamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingreso_medicamento` (
  `id_ingreso` int(11) NOT NULL AUTO_INCREMENT,
  `id_inventario` int(11) NOT NULL,
  `cantidad` decimal(12,2) NOT NULL,
  `costo_unitario` decimal(12,2) DEFAULT NULL,
  `fecha_ingreso` datetime DEFAULT CURRENT_TIMESTAMP,
  `referencia` varchar(200) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_ingreso`),
  KEY `fk_ing_inv` (`id_inventario`),
  KEY `fk_ing_user` (`created_by`),
  CONSTRAINT `fk_ing_inv` FOREIGN KEY (`id_inventario`) REFERENCES `inventario_medicamento` (`id_inventario`),
  CONSTRAINT `fk_ing_user` FOREIGN KEY (`created_by`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingreso_medicamento`
--

LOCK TABLES `ingreso_medicamento` WRITE;
/*!40000 ALTER TABLE `ingreso_medicamento` DISABLE KEYS */;
/*!40000 ALTER TABLE `ingreso_medicamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventario_medicamento`
--

DROP TABLE IF EXISTS `inventario_medicamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventario_medicamento` (
  `id_inventario` int(11) NOT NULL AUTO_INCREMENT,
  `id_medicamento` int(11) NOT NULL,
  `lote` varchar(80) DEFAULT NULL,
  `fecha_vencimiento` date DEFAULT NULL,
  `cantidad_actual` decimal(12,2) DEFAULT '0.00',
  `cantidad_minima` decimal(12,2) DEFAULT '0.00',
  `ubicacion` varchar(120) DEFAULT NULL,
  `id_proveedor` int(11) DEFAULT NULL,
  `fecha_ingreso` datetime DEFAULT CURRENT_TIMESTAMP,
  `is_active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_inventario`),
  KEY `fk_inv_prov` (`id_proveedor`),
  KEY `idx_inv_medic_venc` (`id_medicamento`,`fecha_vencimiento`),
  CONSTRAINT `fk_inv_medic` FOREIGN KEY (`id_medicamento`) REFERENCES `medicamentos` (`id_medicamento`),
  CONSTRAINT `fk_inv_prov` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor` (`id_proveedor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventario_medicamento`
--

LOCK TABLES `inventario_medicamento` WRITE;
/*!40000 ALTER TABLE `inventario_medicamento` DISABLE KEYS */;
/*!40000 ALTER TABLE `inventario_medicamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicamentos`
--

DROP TABLE IF EXISTS `medicamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicamentos` (
  `id_medicamento` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_comercial` varchar(150) NOT NULL,
  `nombre_generico` varchar(150) DEFAULT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  `id_unidad` int(11) DEFAULT NULL,
  `id_forma` int(11) DEFAULT NULL,
  `concentracion` varchar(80) DEFAULT NULL,
  `presentacion` varchar(100) DEFAULT NULL,
  `efectos_secundarios` text,
  `contraindicaciones` text,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_medicamento`),
  KEY `fk_medic_categoria` (`id_categoria`),
  KEY `fk_medic_unidad` (`id_unidad`),
  KEY `fk_medic_forma` (`id_forma`),
  KEY `idx_medic_nombre` (`nombre_comercial`),
  CONSTRAINT `fk_medic_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria_medicamento` (`id_categoria`),
  CONSTRAINT `fk_medic_forma` FOREIGN KEY (`id_forma`) REFERENCES `forma_farmaceutica` (`id_forma`),
  CONSTRAINT `fk_medic_unidad` FOREIGN KEY (`id_unidad`) REFERENCES `unidad_medida` (`id_unidad`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicamentos`
--

LOCK TABLES `medicamentos` WRITE;
/*!40000 ALTER TABLE `medicamentos` DISABLE KEYS */;
INSERT INTO `medicamentos` VALUES (9,'Ibuprofeno','Ibuprofeno',1,2,1,'400mg','Caja x 20 tabletas','Náuseas, mareos','Alergia al ibuprofeno, úlcera gástrica',0,'2025-11-17 03:42:21','2025-11-17 05:37:53'),(10,'Omeprazol MK','Omeprazol',4,1,2,'20 mg','Caja X 14 capsulas','Náuseas, dolor de cabeza, diarrea, dolor abdominal.','Hipersensibilidad al omeprazol o benzimidazoles; evitar en pacientes con sospecha de patología maligna gástrica.',1,'2025-11-17 05:24:02','2025-11-17 05:24:02');
/*!40000 ALTER TABLE `medicamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicos`
--

DROP TABLE IF EXISTS `medicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicos` (
  `id_medico` int(11) NOT NULL AUTO_INCREMENT,
  `num_registro` varchar(50) DEFAULT NULL,
  `nombre` varchar(80) NOT NULL,
  `apellido` varchar(80) NOT NULL,
  `id_especialidad` int(11) DEFAULT NULL,
  `telefono` varchar(30) DEFAULT NULL,
  `correo` varchar(150) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_medico`),
  UNIQUE KEY `num_registro` (`num_registro`),
  KEY `fk_medico_especialidad` (`id_especialidad`),
  CONSTRAINT `fk_medico_especialidad` FOREIGN KEY (`id_especialidad`) REFERENCES `especialidad` (`id_especialidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicos`
--

LOCK TABLES `medicos` WRITE;
/*!40000 ALTER TABLE `medicos` DISABLE KEYS */;
/*!40000 ALTER TABLE `medicos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nota_clinica`
--

DROP TABLE IF EXISTS `nota_clinica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nota_clinica` (
  `id_nota` int(11) NOT NULL AUTO_INCREMENT,
  `id_historial` int(11) NOT NULL,
  `id_medico` int(11) DEFAULT NULL,
  `titulo` varchar(200) DEFAULT NULL,
  `descripcion` text,
  `fecha` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_nota`),
  KEY `fk_nota_historial` (`id_historial`),
  KEY `fk_nota_medico` (`id_medico`),
  CONSTRAINT `fk_nota_historial` FOREIGN KEY (`id_historial`) REFERENCES `historiales_medicos` (`id_historial`),
  CONSTRAINT `fk_nota_medico` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`id_medico`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nota_clinica`
--

LOCK TABLES `nota_clinica` WRITE;
/*!40000 ALTER TABLE `nota_clinica` DISABLE KEYS */;
/*!40000 ALTER TABLE `nota_clinica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pacientes`
--

DROP TABLE IF EXISTS `pacientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pacientes` (
  `id_paciente` int(11) NOT NULL AUTO_INCREMENT,
  `id_tipo_documento` int(11) NOT NULL,
  `numero_documento` varchar(30) NOT NULL,
  `nombre` varchar(80) NOT NULL,
  `apellido` varchar(80) NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `sexo` enum('M','F','Otro') DEFAULT 'M',
  `direccion` varchar(150) DEFAULT NULL,
  `telefono` varchar(30) DEFAULT NULL,
  `correo` varchar(150) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_paciente`),
  UNIQUE KEY `uq_paciente_doc` (`id_tipo_documento`,`numero_documento`),
  CONSTRAINT `fk_paciente_tipo_doc` FOREIGN KEY (`id_tipo_documento`) REFERENCES `tipo_documento` (`id_tipo_documento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pacientes`
--

LOCK TABLES `pacientes` WRITE;
/*!40000 ALTER TABLE `pacientes` DISABLE KEYS */;
/*!40000 ALTER TABLE `pacientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permiso`
--

DROP TABLE IF EXISTS `permiso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permiso` (
  `id_permiso` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(100) NOT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_permiso`),
  UNIQUE KEY `codigo` (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permiso`
--

LOCK TABLES `permiso` WRITE;
/*!40000 ALTER TABLE `permiso` DISABLE KEYS */;
/*!40000 ALTER TABLE `permiso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedor`
--

DROP TABLE IF EXISTS `proveedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedor` (
  `id_proveedor` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `contacto` varchar(150) DEFAULT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `correo` varchar(150) DEFAULT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_proveedor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedor`
--

LOCK TABLES `proveedor` WRITE;
/*!40000 ALTER TABLE `proveedor` DISABLE KEYS */;
/*!40000 ALTER TABLE `proveedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receta`
--

DROP TABLE IF EXISTS `receta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receta` (
  `id_receta` int(11) NOT NULL AUTO_INCREMENT,
  `id_paciente` int(11) NOT NULL,
  `id_medico` int(11) NOT NULL,
  `fecha_emision` datetime DEFAULT CURRENT_TIMESTAMP,
  `validez_dias` int(11) DEFAULT '30',
  `observaciones` text,
  `created_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_receta`),
  KEY `fk_rec_medico` (`id_medico`),
  KEY `fk_rec_user` (`created_by`),
  KEY `idx_receta_paciente` (`id_paciente`,`fecha_emision`),
  CONSTRAINT `fk_rec_medico` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`id_medico`),
  CONSTRAINT `fk_rec_paciente` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_paciente`),
  CONSTRAINT `fk_rec_user` FOREIGN KEY (`created_by`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receta`
--

LOCK TABLES `receta` WRITE;
/*!40000 ALTER TABLE `receta` DISABLE KEYS */;
/*!40000 ALTER TABLE `receta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receta_item`
--

DROP TABLE IF EXISTS `receta_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receta_item` (
  `id_receta_item` int(11) NOT NULL AUTO_INCREMENT,
  `id_receta` int(11) NOT NULL,
  `id_medicamento` int(11) NOT NULL,
  `dosis` varchar(100) NOT NULL,
  `frecuencia` varchar(100) NOT NULL,
  `duracion_dias` int(11) DEFAULT NULL,
  `instrucciones` text,
  PRIMARY KEY (`id_receta_item`),
  KEY `fk_ri_receta` (`id_receta`),
  KEY `fk_ri_medic` (`id_medicamento`),
  CONSTRAINT `fk_ri_medic` FOREIGN KEY (`id_medicamento`) REFERENCES `medicamentos` (`id_medicamento`),
  CONSTRAINT `fk_ri_receta` FOREIGN KEY (`id_receta`) REFERENCES `receta` (`id_receta`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receta_item`
--

LOCK TABLES `receta_item` WRITE;
/*!40000 ALTER TABLE `receta_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `receta_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id_rol` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_rol`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'ROLE_ADMIN','Administrador'),(2,'ROLE_MEDICO','Médico'),(3,'ROLE_FARMACIA','Farmacia');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol_permiso`
--

DROP TABLE IF EXISTS `rol_permiso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol_permiso` (
  `id_rol` int(11) NOT NULL,
  `id_permiso` int(11) NOT NULL,
  PRIMARY KEY (`id_rol`,`id_permiso`),
  KEY `fk_rp_perm` (`id_permiso`),
  CONSTRAINT `fk_rp_perm` FOREIGN KEY (`id_permiso`) REFERENCES `permiso` (`id_permiso`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_rp_rol` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol_permiso`
--

LOCK TABLES `rol_permiso` WRITE;
/*!40000 ALTER TABLE `rol_permiso` DISABLE KEYS */;
/*!40000 ALTER TABLE `rol_permiso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sala`
--

DROP TABLE IF EXISTS `sala`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sala` (
  `id_sala` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(80) NOT NULL,
  `ubicacion` varchar(120) DEFAULT NULL,
  `capacidad` int(11) DEFAULT '1',
  PRIMARY KEY (`id_sala`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sala`
--

LOCK TABLES `sala` WRITE;
/*!40000 ALTER TABLE `sala` DISABLE KEYS */;
/*!40000 ALTER TABLE `sala` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salida_medicamento`
--

DROP TABLE IF EXISTS `salida_medicamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salida_medicamento` (
  `id_salida` int(11) NOT NULL AUTO_INCREMENT,
  `id_inventario` int(11) NOT NULL,
  `cantidad` decimal(12,2) NOT NULL,
  `fecha_salida` datetime DEFAULT CURRENT_TIMESTAMP,
  `tipo` enum('CONSUMO','ENTREGA_PACIENTE','DESCARTE') DEFAULT 'CONSUMO',
  `referencia` varchar(200) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_salida`),
  KEY `fk_sal_inv` (`id_inventario`),
  KEY `fk_sal_user` (`created_by`),
  CONSTRAINT `fk_sal_inv` FOREIGN KEY (`id_inventario`) REFERENCES `inventario_medicamento` (`id_inventario`),
  CONSTRAINT `fk_sal_user` FOREIGN KEY (`created_by`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salida_medicamento`
--

LOCK TABLES `salida_medicamento` WRITE;
/*!40000 ALTER TABLE `salida_medicamento` DISABLE KEYS */;
/*!40000 ALTER TABLE `salida_medicamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_documento`
--

DROP TABLE IF EXISTS `tipo_documento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_documento` (
  `id_tipo_documento` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(80) NOT NULL,
  `sigla` varchar(10) NOT NULL,
  `descripcion` text,
  PRIMARY KEY (`id_tipo_documento`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_documento`
--

LOCK TABLES `tipo_documento` WRITE;
/*!40000 ALTER TABLE `tipo_documento` DISABLE KEYS */;
INSERT INTO `tipo_documento` VALUES (1,'Cédula de ciudadanía','CC',NULL),(2,'Cédula de extranjería','CE',NULL),(3,'Pasaporte','PA',NULL),(4,'Tarjeta de identidad','TI',NULL);
/*!40000 ALTER TABLE `tipo_documento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unidad_medida`
--

DROP TABLE IF EXISTS `unidad_medida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unidad_medida` (
  `id_unidad` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  PRIMARY KEY (`id_unidad`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidad_medida`
--

LOCK TABLES `unidad_medida` WRITE;
/*!40000 ALTER TABLE `unidad_medida` DISABLE KEYS */;
INSERT INTO `unidad_medida` VALUES (1,'mg'),(2,'ml'),(3,'tableta'),(4,'g'),(5,'µg'),(6,'kg'),(7,'L'),(8,'UI'),(9,'mEq'),(10,'mcg/mL'),(11,'g/mL'),(12,'%'),(13,'mL/h'),(14,'mg/mL'),(15,'mg/h'),(16,'µg/h'),(17,'g/100 mL'),(18,'dosis'),(19,'frasco'),(20,'ampolla'),(21,'inhalación'),(22,'aplicación'),(23,'unidades por dosis');
/*!40000 ALTER TABLE `unidad_medida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(80) NOT NULL,
  `email` varchar(150) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `id_rol` int(11) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_user_rol` (`id_rol`),
  CONSTRAINT `fk_user_rol` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'admin','admin@svb.com','$2y$..hash..','Admin','SVB',1,1,'2025-11-16 20:41:11','2025-11-16 20:41:11');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vw_stock_medicamento`
--

DROP TABLE IF EXISTS `vw_stock_medicamento`;
/*!50001 DROP VIEW IF EXISTS `vw_stock_medicamento`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_stock_medicamento` AS SELECT 
 1 AS `id_medicamento`,
 1 AS `nombre_comercial`,
 1 AS `stock_total`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `vw_stock_medicamento`
--

/*!50001 DROP VIEW IF EXISTS `vw_stock_medicamento`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_stock_medicamento` AS select `m`.`id_medicamento` AS `id_medicamento`,`m`.`nombre_comercial` AS `nombre_comercial`,coalesce(sum(`i`.`cantidad_actual`),0) AS `stock_total` from (`medicamentos` `m` left join `inventario_medicamento` `i` on(((`m`.`id_medicamento` = `i`.`id_medicamento`) and (`i`.`is_active` = 1)))) group by `m`.`id_medicamento`,`m`.`nombre_comercial` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-17  1:17:14
