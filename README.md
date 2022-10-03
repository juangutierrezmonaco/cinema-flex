# CINEMAFLEX

Página de venta de entradas de cine responsive realizada para el curso de "React JS" de Coderhouse. Se consumió la API "The Movie Database API" para generar las películas y se usó Firestore como DB para almacenar compras de tickets y usuarios, como también para obtener las funciones disponibles con cada película. Por último, para crear el proyecto con React se utilizó Vite JS y para el hosting Vercel.

## Tecnologias Utilizadas
- SASS
- Framework CSS: Tailwind CSS (También se integró la librería DaisyUI).
- React JS
  - Hooks utilizados: useState, useEffect, useContext y useRef.
  - Librerías complementarias: react-credit-cards, react-barcode y react-qr-code.
- Vite JS.
- Vercel.
- Librerías complementarias: UUID/SweetAlert2.

## Deploy

[Link para ir a la página](https://cinemaflex.vercel.app/)

## ¿Qué se puede hacer en la página?

- Buscar películas.
- Agregar o quitar entradas al carrito y que esto tenga persistencia en el local storage, y en el caso de estar loggeado, en la base de datos.
- Modificar en el carrito la función seleccionada para cada película.
- Simular una compra con tarjeta de crédito, seleccionando los asientos a través de una interfaz gráfica.
- Crear una cuenta donde se almacenan todos los tickets de las compras realizadas.

En este video se recorre un poco la página:
https://user-images.githubusercontent.com/104147035/193689795-be4e69a8-dc78-49f4-b73f-4cd1b8ff0f36.mp4

## Consideraciones para ejecutar el proyecto
- Al haberse utilizado algunas librerías que requerían de versiones más antiguas de React, cada vez que se utilice el comando npm i/npm install, debe estar acompañado por la siguiente línea: `--legacy-peer-deps`.
- Para inicializar el proyecto, se utiliza el comando `npm i --legacy-peer-deps`. Luego cada vez que quiera ejecutar: `npm run dev`.
- Al usar SASS, cada vez que se quiera hacer un cambio los archivos scss y verlo reflejado, se deberá utilizar el comando `npm run sass`.
- Para poder hacer uso de la base de datos, se necesita crear un archivo ".env" con las claves para acceder a la DB, por lo cual si alguien las requiere puedo mandarlas por mail, mi mail es juan.monaco.gutierrez@gmail.com
