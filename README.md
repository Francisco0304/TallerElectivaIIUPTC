# Redmi

## Descripción
Este repositorio contiene una aplicación web para gestionar una librería. Permite realizar operaciones como agregar libros, editar información de libros existentes, prestar y devolver libros, así como eliminar libros (siempre que estén disponibles).

## Requisitos Previos
- Node.js instalado en el sistema.
- Express: El marco de aplicación web de Node.js.
- Body-parser: Un middleware que analiza los cuerpos de las solicitudes entrantes en una cadena de texto.
- EJS: Un motor de plantillas para generar HTML con JavaScript.
- Path: Un módulo de Node.js para trabajar con rutas de archivos y directorios.
- FS: Un módulo de Node.js para interactuar con el sistema de archivos.
- Nodemon: Herramienta de desarrollo que automáticamente reinicia el servidor cuando detecta cambios en los archivos.

## Instalación
1. Clonar este repositorio en su máquina local.
2. Abrir una terminal en la carpeta del proyecto.
3. Ejecuta el comando `npm install` para instalar las dependencias.

## Uso
1. Ejecuta el servidor con el comando `nodemon index.js`.
2. Abra su navegador web y acceda a `http://localhost:3000` para ver la aplicación.
3. Desde la página principal, puede agregar nuevos libros, editar la información de libros existentes, prestar y devolver libros, así como eliminar libros si están disponibles.
4. Para eliminar un libro, asegúrese de que esté disponible. Si intenta eliminar un libro no disponible, recibirá un mensaje de error y será redirigido automáticamente a la página principal.

## Tecnologías Utilizadas
- Node.js
- Express.js
- HTML
- CSS (Bootstrap)
- JavaScript (Frontend y Backend)

## Contribución
Las contribuciones son bienvenidas. Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:
1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3. Haz tus cambios.
4. Haz commit de tus cambios (`git commit -am 'Agrega nueva característica'`).
5. Sube tus cambios (`git push origin feature/nueva-caracteristica`).
6. Abre un Pull Request.

## Licencia
Este proyecto está bajo la licencia del usuario, destinado para un taller de la materia ELECTIVA II, UPTC Sogamoso.
