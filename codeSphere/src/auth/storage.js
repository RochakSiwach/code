export function getAuthToken() {
  return localStorage.getItem("codesphere_token");
}

export function getStoredUser() {
  const raw = localStorage.getItem("codesphere_user");

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveAuthSession({ token, user }) {
  localStorage.setItem("codesphere_token", token);
  localStorage.setItem("codesphere_user", JSON.stringify(user));
}

export function clearAuthSession() {
  localStorage.removeItem("codesphere_token");
  localStorage.removeItem("codesphere_user");
}
