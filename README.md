<div align="center">

  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" alt="React" width=300 />

  <img src="https://www.gstatic.com/devrel-devsite/prod/veaa02889f0c07424beaa31d9bac1e874b6464e7ed7987fde4c94a59ace9487fa/firebase/images/touchicon-180.png" alt="Firebase" width=200 />    

# React Native + Firebase

</div>

# Proyecto E-Commerce

## 📌 Introducción

Este proyecto trata sobre una aplicación móvil de artículos electrónicos hecha con [React Native](https://reactnative.dev) y [Firebase](https://firebase.google.com).

## ⚙ Instalación

Para instalar y ejecutar este proyecto es nesesario tener instalado Node.js en tu computadora y crear un proyecto en Firebase.

Deberás descargar el archivo `google-services.json` que te proporcionará Firebase al crear una aplicación Android y posicionarlo en el directorio `./android/app/` para que se pueda establecer la conexión correctamente.

Posteriormente deberás de configurar tus llaves secretas de Google, Facebook y Twitter para poder hacer uso de los métodos de inicio de sesión que proporcionan.

Guías para obtener llaves secretas:

* Inicio de sesión de Google\
https://github.com/react-native-google-signin/google-signin/blob/master/docs/android-guide.md

* Inicio de sesión de Twitter por medio de la API de Twitter
  * API de Twitter: https://developer.twitter.com
  * Repo de cómo aplicarla: https://github.com/GoldenOwlAsia/react-native-twitter-signin

* Inicio de sesión de Facebook\
https://goldplugins.com/documentation/wp-social-pro-documentation/how-to-get-an-app-id-and-secret-key-from-facebook/

Una vez obtenidas las llaves asegúrate de registrarlas como métodos de inicio de sesión en Firebase y de ponerlas en un archivo `.env`. Puedes usar el archivo `.env.example` de este proyecto para guiarte.

> **NOTA**: Si en este punto tienes dificultades puedes solo comentar las líneas que inicializan los métodos de inicio de sesión en el archivo `./src/navigation/AuthNavigator.tsx` pero no podrás usar los métodos de Google, Facebook o Twitter. Solamente estará disponible el método de inicio de sesión por defecto.

## 🚀 Uso

### Instala todas las dependencias
```bash
npm i
```

### Inicializa Metro para Hot Reload
```bash
npx react-native start
```

### Instala la aplicación en tu dispositivo conectado o emulado
```bash
npx react-native run-android
```
