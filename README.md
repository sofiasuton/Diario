# Diario

Espacio de journaling con consignas, escritura libre y buscador. Funciona en la compu y en el celu, y se puede instalar como app (PWA).

## Funciones

**Escribir**
- 13 consignas (Memoria, Hoy, Nuevo comienzo, Cápsula del tiempo, Cartas, Personas, Hebreo, Cambios, Cuerpo, Gratitud, Miedos, Sueños, Lugares), consigna del día y "Sorprendeme"
- Consignas propias, cada una con su color
- Escritura libre
- Fecha, título opcional, estado de ánimo, etiquetas y hasta 6 fotos por entrada
- Autoguardado del borrador con un aviso de "Guardado ✓"
- Modo foco: pantalla completa, solo el texto, con contador y meta de palabras
- Cápsula del tiempo: la entrada queda sellada hasta la fecha que elijas

**Releer**
- Buscador por texto o por `#etiqueta`
- Archivo en lista, calendario mensual y "año en píxeles" según el ánimo
- Favoritas ★
- "Un día como hoy": tarjeta con lo que escribiste hace un mes o un año
- Estadísticas: palabras, rachas, consignas y etiquetas más usadas, ánimo

**Privacidad y copias**
- PIN de bloqueo al abrir y después de 2 minutos sin usarlo (es una pantalla de privacidad: no cifra los datos)
- Exportar todo en `.json` (copia completa, para restaurar) o `.md` (para leer)
- Exportar una entrada suelta en PDF o `.md`
- Importar una copia `.json`

**Diseño**
- Modo oscuro, claro o automático
- En el celu la barra lateral pasa a ser una barra de abajo

## Dónde se guardan las entradas

En el navegador (IndexedDB), en ese dispositivo. Si borrás los datos del sitio o cambiás de dispositivo, se pierden: exportá una copia `.json` cada tanto (la app te avisa si pasaron más de 14 días).

## Archivos

- `index.html`, `styles.css`, `app.js`: la app
- `manifest.webmanifest`, `sw.js`, `icon*.png`, `icon.svg`: para instalarla y usarla sin conexión

Para publicar cambios con GitHub Pages, subí los archivos y cambiá `VERSION` en `sw.js` para que los celulares bajen la versión nueva.

## Sincronizar con Google Drive

El diario puede guardar una copia en tu Google Drive (archivo "Diario (sincronización).json") y mezclarla con lo que haya en cada dispositivo. Así entrás desde la compu y el celu y ves lo mismo. Usa el permiso `drive.file`: la app solo puede ver los archivos que ella misma creó, no el resto de tu Drive.

### Configurar el permiso en Google Cloud (una sola vez)

1. Entrá a https://console.cloud.google.com con tu cuenta de Google y creá un proyecto nuevo (por ejemplo "Diario").
2. **APIs y servicios → Biblioteca**: buscá **Google Drive API** y tocá **Habilitar**.
3. **APIs y servicios → Pantalla de consentimiento de OAuth** (o "Google Auth Platform"):
   - Tipo de usuario: **Externo**.
   - Nombre de la app: Diario. Correo de asistencia y de contacto: el tuyo.
   - En **Público / Usuarios de prueba**, agregá tu Gmail. Dejá la app en modo **Prueba**: no hace falta publicarla ni que Google la revise.
4. **APIs y servicios → Credenciales → Crear credenciales → ID de cliente de OAuth**:
   - Tipo: **Aplicación web**.
   - **Orígenes autorizados de JavaScript**: `https://sofiasuton.github.io`. Va sin `/diario` y sin barra al final.
   - Redirecciones: dejalo vacío.
   - Copiá el **ID de cliente**, que termina en `.apps.googleusercontent.com`.
5. En GitHub, abrí `config.js`, tocá el lápiz y pegá el ID entre las comillas de `googleClientId`. Commit.
   - Si no querés tocar el código, lo podés pegar en **Ajustes → Sincronizar con Google Drive**, pero ahí tenés que hacerlo en cada dispositivo.

### Usarlo

- En cada dispositivo: **Ajustes → Conectar con Google Drive** y elegís tu cuenta.
- Si ya tenías entradas en ese dispositivo, se juntan con las del Drive sin pisar nada.
- Se sincroniza solo cuando guardás, borrás o marcás favoritas. Google pide volver a confirmar cada una hora: cuando la nube de arriba tiene un puntito rojo, tocala.
- El PIN, el tema y las metas son de cada dispositivo y no se sincronizan.
