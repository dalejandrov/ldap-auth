# LDAP Auth

Este proyecto es una aplicación web simple basada en Node.js que permite la autenticación de usuarios utilizando Active Directory (AD) a través de LDAP. Proporciona una interfaz de inicio de sesión y una página principal que solo es accesible para usuarios autenticados.

## Tecnologías Utilizadas

- Node.js
- Express
- EJS (Embedded JavaScript)
- LDAPjs
- Express-session
- dotenv

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [npm](https://www.npmjs.com/) (generalmente se instala con Node.js)

## Instalación

1. **Clona el repositorio**

   ```bash
   $ git clone <URL_DEL_REPOSITORIO>
   $ cd ldap-auth
   ```

2. **Instala las dependencias del proyecto**

    ```bash
    $ npm install
    ```

3. **Configura las variables de entorno**

    Crea un archivo .env en la raíz del proyecto y define las siguientes variables:

    `LDAP_URL`=ldap://tu-servidor-ad      # Cambia esto por la IP o el nombre de dominio de tu servidor AD

    `DOMAIN`=tu-dominio.local              # Cambia esto según tu dominio

    `SESSION_SECRET`=supersecret            # Cambia esto por un secreto seguro para tus sesiones

    `PORT`=3000                             # (Opcional) Cambia esto si deseas usar otro puerto

## Ejecución

1. **Inicia el servidor**

    ```bash
    $ npm run start
    ```

1. **Accede a la aplicación**

    `http://localhost:3000/login`

## Rutas de la Aplicación

`GET /login:` Muestra la página de inicio de sesión.

`POST /login:` Procesa la autenticación del usuario.

`GET /main:` Muestra la página principal para usuarios autenticados.

`GET /logout:` Cierra la sesión del usuario.

`GET /ping:` Devuelve un mensaje de prueba (pong) para verificar que el servidor esté en funcionamiento.
