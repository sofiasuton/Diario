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
