# App Preguntados

### Configurar API

1. Crear Base de Datos en postgres.
2. Crear archivo .env

```sh
       DB_USER = *tu usuario de postgres*
       DB_PASSWORD = *tu password de postgres*
       DB_HOST = localhost
       DB_PORT = *el puerto de postgres (usualmente es 5432)*
       DB_NAME = *nombre de la base de datos*
       SECRET = pregunta2
       SERVER_PORT = 5000
```

4. Descargar ngrok. Esto nos ayuda a poder utilizar la API desde el telefono, haciendo publico el servidor.
   -- Descargar: https://ngrok.com/download

5. Iniciar el servidor con el siguiente comando. Ademas tambien se crean las tablas necesarias para la base de datos:

   ```sh
   $ npm run setup
   ```

6. Iniciar ngrok. Para hacer esto se abre una consola y se escribe:

   ```sh
   $ ngrok http 5000
   ```

El "5000" es el puerto que va a escuchar ngrok, por esto debe ser el SERVER_PORT que se especifico en el archivo .env

Una vez iniciado ngrok se muestra un link que deberas copiar para pegar en el front mas adelante.

### Configurar Front

1. Buscar el archivo **preguntadosApi.js** en _"preguntadosFront/src/api/preguntadosApi.js"_
2. Cambiar el link de **baseURL** por el que se obtuvo en la consola con ngrok:

```sh
    const  instance  =  axios.create({
	    baseURL:  "http://fac02e049bb3.ngrok.io"
    });
```

3. Instalar dependencias

```sh
$ npm install
```

4. Iniciar front

```sh
$ npm start
```

5. Para ver la aplicacion es necesario tener descargado Expo en algun telefono. Se escanea el codigo QR y deberia abrir desde la aplicacion de Expo.

### Crear apk

1. En la carpeta del front se ejecuta este comando

```sh
expo build:android -t apk
```

2. Se comienza el build del apk, esto se tarda un tiempo. Cuando este listo, te va a proveer un link con el cual se podra descargar el apk
