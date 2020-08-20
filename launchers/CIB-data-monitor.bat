@ECHO OFF 
:: Este archivo .bat ejecuta el frontend en el browser, habiendo instalado previamente el paquete npm "live-server" (npm i -g live-server).
TITLE CIB-data-monitor
ECHO Launching user app in browser for CIB-data-scrapper...
ECHO ======================================================
cd C:\Users\MrIsrael\Desktop\CIB-data-scrapper\CIB-data-monitor
live-server
PAUSE