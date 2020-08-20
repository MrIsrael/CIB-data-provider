@ECHO OFF 
:: Este archivo .bat ejecuta el backend en Node, que contiene la API y el scrapper propiamente dicho.
TITLE CIB-data-provider
ECHO Initializing backend and API endpoints for CIB-data-scrapper...
ECHO ================================================================
cd C:\Users\MrIsrael\Desktop\CIB-data-scrapper\CIB-data-provider
node index.js
PAUSE