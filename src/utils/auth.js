// src/utils/auth.js

const TOKEN_KEY = "levelup_token";
const USER_KEY = "levelup_user";

export function saveSession(authResponse) {
  // authResponse viene del backend: { token, nombre, email, roles, puntos, descuentoPct }
  localStorage.setItem(TOKEN_KEY, authResponse.token);
  localStorage.setItem(USER_KEY, JSON.stringify(authResponse));
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getCurrentUser() {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function isAdmin() {
  const user = getCurrentUser();
  if (!user || !user.roles) return false;
  return user.roles.includes("ROLE_ADMIN");
}
