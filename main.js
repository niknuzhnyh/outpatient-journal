// google btn
// Функція для обробки колбека після авторизації
function handleCredentialResponse(response) {
  console.log("Відповідь від Google:", response);

  // Розкодовуємо JWT токен (якщо потрібно)
  const decodedToken = parseJwt(response.credential);
  console.log("Розкодований токен:", decodedToken);

  // Виводимо інформацію про користувача
  const userName = decodedToken.name;
  const userEmail = decodedToken.email;
  alert(`Вітаємо, ${userName}! Ваш email: ${userEmail}`);
}

// Функція для розкодування JWT токену
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  return JSON.parse(jsonPayload);
}