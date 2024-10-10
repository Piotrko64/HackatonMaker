# HackatonMaker

## Spis treści

[Funkcje aplikacji](#Features)  
[Technologie](#Technologies)  
[Testy jednostkowe](#Units)  
[Swagger](#Swagger)  
[Instrukcja uruchomienia](#Installation)  
[Screenshoty](#Screenshots)  
[Plan rozbudowy aplikacji](#Plans)

## Funkcje aplikacji

Aplikacja umożliwia:

-   **Wysyłanie zgłoszeń na hackaton**. Zgłoszenie zawiera nazwę zespołu, opis zespołu oraz kontakty do wszystkich jego członku. Formularz dodawania kontaktów umożliwia dynamiczne zarządzanie ilością członków w zespole, któych chcemy dodać.
-   **Wysyłanie plików pdf**. Do każdego zgłoszenia możemy przesłać plik pdf który umieszczany jest na zewnętrznym serwisie.
-   **Edycja przesłanych zgłoszeń**. Aplikacja umożliwia edytowanie wcześniej przesłanego zgłoszenia na hackaton. Możemy edytować ilość członków zespołu oraz podmienić lub usunąć wcześniej przesłąny plik pdf.
-   **Usuwanie zgłoszen**. Aplikacja umożliwia usuwanie wcześniej przesłanych zgłoszeń.
-   **Logowanie oraz rejestracja**. Przed uzyskaniem dostępu do operacji zarządzania zgłoszeniami użytkownik musi założyć konto oraz poprawnie się zalogować przy użyciu adresu email oraz hasła.
-   **Autoryzacja użytkowników**. Dostęp do poszczególnych funkcji aplikacji jest chroniony.

Dodatkowe:

-   **Wyświetlanie listy użytkowników**. Przygotowany został specjalny endpoint do wyświetlania listy wszystkich użytkowników.
-   **Pobieranie konkretnego użytkownika**. Specjalny endpoint pozwalający na uzyskanie informacji o konkretnym użytkowniku.
-   **Identyfikacja aktualnie zalogowanego użytkownika**. Aplikacja oferuje specjalny endpoint który umożliwia wyświetlenie informacji o aktualnie zalogowanym użytkowniku.

## Technologie

**Backend**

-   TypeScript
-   NestJS
-   MySql
-   Prisma
-   Jest (for unit tests)

**Frontend**

-   Angular
-   Angular Material
-   Type Script
-   RxJs

> Autentykacja do aplikacji zostałą wykonana na zasadzie tokenów sesji przechowywanych w ciasteczkach. Pliki pdf w celu optymalizacji przestrzeni dyskowej umieszczane są w zewnętrznym serwisie AWS S3. Aplikacja zawiera wszystkie niezbędne walidacje zaróno po stronie frontendu oraz backendu. Dodatkowo została dodana specjalna reguła zabezpieczeń w S3 przechowującym pliki uniemożliwiająca upload plikó innych niż pdf, co stanowi dodatkowe zabezpieczenie.

## Testy jednostkowe

Po zakończonym procesie implementacji aplikacji został wykonane testy jednostkowe przygotowanego API. Zostały one wykonane przy użyciu biblioteki JEST.

![tests](https://i.imgur.com/0lPTFqA.png)

Powyżej znajduje się screen demonstrujący pokrycie testami całej aplikacji.

> Aktualnie aplikacja przestestowana jest w 80 procentach

## Swagger

Aby uzyskać dostęp do swaggera prezentującego wszystkie endpointy należy wpisać w przeglądarce poniższy adres:

http://localhost:3000/swagger#/

![swagger](https://i.imgur.com/3lMQUBK.png)

## Instrukcja uruchomienia

**Backend**

Do uruchomienia części backendowej niezbędny jest serwer Apache z bazą danych MySql. W tym celu można wykorzystać bardzo popularnego klienta XAMPP.

https://www.apachefriends.org/pl/download.html

1. Sklonuj repozytorium.
2. Przejdz do katalogu Backend
3. Wpisz polecenie
    > npm install
4. W katalogu "Backend" znajduje się plik ".env". Znajdują się tam klucze prywatne do koszyka S3 AWS oraz connection string do bazy danych. Należy sprawdzić czy connection string jest poprawny (zwrócić uwagę na port na jakim działa baza danych na komputerze).

    > DATABASE_URL="mysql://root@localhost:3307/hackaton"

5. W konsoli należy wpisać polecenie:
    > npm run prisma-migration
6. Następnie należy wprowadzić polecenie:
    > npm run prisma-generate
7. Po poprawnym wykonaniu powyższych kroków używamy polecenia:
    > npm run start:dev

> Serwer backendowy uruchomiony jest na porcie 3000

Backend w tym momecie powinien działać poprawnie 😁

**Frontend**

1. Przejdz do katalogu "Frontend".
2. Wpisz polecenie:
    > npm install
3. Użyj polecenia
    > npm run start

> Serwer frontendowy działa pod adresem localhost:4200

## Screenshoty

-   Pomyślny proces rejestracji

![register](https://i.imgur.com/ChVjXax.png)

-   Proces logowania

![login](https://i.imgur.com/Qqnq71j.png)

-   Formularz zgłaszania zespołu

![application](https://i.imgur.com/lFCrKYL.png)

-   Dashboard

![dashboard](https://i.imgur.com/P9SmPDQ.png)

-   Szczegóły zgłoszenia

![details](https://i.imgur.com/npI0kvK.png)

## Plan rozbudowy aplikacji

Po przenalizowaniu zaimplementowanych funkcjonalności stworzyliśmy listę kolejnych funkcjonalności które udoskonaliłyby naszą aplikację.

-   Kompresja przesyłanych plików pdf w celu optymalizacji czasu trwania zapytań oraz przestrzeni dyskowej.
-   Zarządzanie użytkownikami (w tym celu zostały już zaimplementowane niektóre endpoiny po stronie backendowej)
-   Dodanie ról dla użytkowników oraz administratorów.
-   Możliwość zatwierdzania zgłoszeń przed administratora.
