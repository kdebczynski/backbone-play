Uruchamianie aplikacji
======================

Kod źródłowy aplikacji znajduje się w folderze src.

Wygenerowana aplikacja znajduje się w folderze build.

Aplikacja działa bez serwera http na przeglądarce Firefox.

Aby uruchomić aplikację w przeglądarce Chrome, należy uruchomić przeglądarkę z flagami --allow-file-access-from-files --disable-web-security
lub wystawić aplikację na serwerze http.

Aby wygenerować aplikację za pomocą grunta:

1. Zainstaluj node.js - https://nodejs.org/
2. Przejdź do katalogu głównego z aplikacją
3. W konsoli wpisz npm install
4. Aby wygenerować aplikację w folderze build wpisz: grunt build