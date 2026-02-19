# 🏥 Salud & Vida - Sistema de Gestión Médica

Un sistema profesional y moderno de gestión farmacéutica diseñado para clínicas y hospitales. Ofrece una experiencia de usuario premium con un enfoque en la eficiencia, claridad visual y rendimiento.

![Main View](https://img.shields.io/badge/UI-Premium-blue) ![Theme](https://img.shields.io/badge/Theme-Dark%20Mode-blueviolet) ![Stack](https://img.shields.io/badge/Stack-Spring--Boot--React-green)

---

## ✨ Características Principales

### 🎨 Interfaz de Usuario "Med-Tech"
- **Diseño Premium**: Estética moderna con colores curados, tipografía optimizada y layouts limpios.
- **Temas Dinámicos**: Soporte completo para **Modo Claro** y **Modo Oscuro** con persistencia en el navegador.
- **Transiciones Ultra-Suaves**: Sistema de transiciones globales sincronizadas (250ms) para una navegación fluida.
- **Iconografía Moderna**: Integración completa con `lucide-react`.

### 📦 Gestión de Inventario
- **Catálogo Inteligente**: Búsqueda dinámica en tiempo real por nombre comercial o genérico.
- **Panel Administrativo**: CRUD completo para medicamentos, categorías, formas farmacéuticas y unidades.
- **Detalle Expandido**: Panel lateral (Slide-over) para visualización profunda de información técnica.
- **Control de Estados**: Gestión intuitiva de medicamentos activos e inactivos.

---

## 🛠️ Tecnologías Usadas

### **Backend (Core)**
- **Java / Spring Boot**: API RESTful robusta y escalable.
- **Spring Data JPA**: Gestión eficiente de la persistencia de datos.
- **PostgreSQL (Supabase)**: Base de datos relacional de alto rendimiento en la nube.
- **HikariCP**: Pool de conexiones optimizado para baja latencia.

### **Frontend (UI)**
- **React 19**: Biblioteca de vanguardia para interfaces de usuario.
- **Vite**: Herramienta de construcción ultra rápida.
- **Tailwind CSS v4**: Motor de estilos de última generación para diseño responsivo.
- **Lucide Icons**: Set de iconos vectoriales consistentes y modernos.

---

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/Juanloaiza25/Proyecto-final-db.git
cd Proyecto-final-db
```

### 2. Configurar Backend
- Asegúrate de tener instalado Java 17 o superior.
- Configura las variables de entorno en un archivo `.env` dentro de `/backend`:
```env
DB_URL=jdbc:postgresql://...&prepareThreshold=0
DB_USER=tu_usuario
DB_PASSWORD=tu_password
```
- Compila y ejecuta:
```bash
cd backend
./mvnw.cmd spring-boot:run
```

### 3. Configurar Frontend
- Requiere Node.js 18+.
```bash
cd frontend
npm install
npm run dev
```
- Abre [http://localhost:5173/](http://localhost:5173/) en tu navegador.

---

## 🛡️ Seguridad y Optimización
- **JDBC Tuning**: Desactivación de *prepared statements* para compatibilidad total con connection poolers (pgbouncer).
- **Responsive Design**: Adaptado para dispositivos móviles, tablets y escritorio.
- **Persistencia de Tema**: Implementación de `localStorage` para recordar la preferencia visual del usuario.

---

Desarrollado con ❤️ para el sector salud.
