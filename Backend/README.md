# Hackaton Backend

## Jak uruchomić część Backendową?

### Baza danych

- Należy z poziomu folderu /Backend uruchomić komendę **npm install** (trzeba pamiętać aby mieć zainstalowanego **NodeJS** oraz system paczek **npm**)

- Należy mieć uruchomioną **baze danych MySQL** :
  - Na porcie: **3306**, użytkownik: **root**, **bez hasła**, baza o nazwie: **hackaton**
  - W pliku .env znajduje się database URL do podłączenia bazy danych:
    **"mysql://root@localhost:3306/perand"**
  - Jeżeli wszystko poszło pomyślnie należy użyć następujących komend:
    - **npm run prisma-migration**
    - **npm run prisma-generate**

### UWAGA!

Normalnie klucze dostępne w pliku .env nie powinny być dostępne publicznie. Udostępniamy je jednak w celu łatwiejszego testowania aplikacji

### Uruchomienie Serweru REST API

Jeżeli wszystko poszło pomyślnie należy uruchomić nasze api poprzez komende:

**npm run start:dev**

aplikacja uruchomi się na porcie 3000

### Dostępne ścieżki API są dostępne poprzez dokumentacje Swagger znajdującą się pod URL: localhost:3000/swagger

### Przetrzymywanie pdfów

Pliki PDF które będą przesyłane przez nasze API, korzystają z zewnętrznego serwisu (AWS).
