// Ваш Client ID з Google Cloud Console
const CLIENT_ID = "853195618560-p8hr3bq38keq1tle7659a1rk15b4obd8.apps.googleusercontent.com";
const API_KEY = "AIzaSyA8F_8Bqs3oqDashY36EUVDZ0EO4JcafNk";
const SCOPES = "https://www.googleapis.com/auth/spreadsheets";

let accessToken = null;

// Ініціалізація Google API
function initClient() {
  gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      scope: SCOPES,
      discoveryDocs: [
        "https://sheets.googleapis.com/$discovery/rest?version=v4",
      ],
    })
    .then(() => {
      console.log("Google API ініціалізовано");
    });
}

// Авторизація користувача
function handleAuthClick() {
  gapi.auth2
    .getAuthInstance()
    .signIn()
    .then(() => {
      accessToken = gapi.auth2
        .getAuthInstance()
        .currentUser.get()
        .getAuthResponse().access_token;
      console.log("Токен отримано:", accessToken);
    });
}

// Завантаження Google API
function loadClient() {
  gapi.load("client:auth2", initClient);
}

// Відправка даних до Google таблиці
function sendDataToSheet(name, email, message) {
  const spreadsheetId = "1TSODsX-3C_HA-b3Hqx0wFp8EUwQecRE7pTB0lX-rA9U";
  const range = "Sheet1!A1";

  const values = [[name, email, message, new Date().toISOString()]];

  gapi.client.sheets.spreadsheets.values
    .append({
      spreadsheetId: spreadsheetId,
      range: range,
      valueInputOption: "USER_ENTERED",
      resource: {
        values: values,
      },
    })
    .then(
      (response) => {
        console.log("Дані успішно записано:", response);
      },
      (error) => {
        console.error("Помилка:", error);
      }
    );
}

// Ініціалізація після завантаження сторінки
window.onload = loadClient;

// Додаємо обробник кнопки авторизації
document
  .getElementById("authButton")
  .addEventListener("click", handleAuthClick);
