export function loadSession(key: string) {
  try {
    const value = sessionStorage.getItem(key);
    return value;
  } catch (e) {}
}

export function saveSession(key: string, value: string) {
  try {
    sessionStorage.setItem(key, value);
  } catch (e) {}
}

export function clearSession() {
  try {
    sessionStorage.clear();
  } catch (e) {}
}