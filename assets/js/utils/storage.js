export function setItem(key, value) {
  localStorage.setItem(key, value);
}

export function getItem(key) {
  return localStorage.getItem(key);
}

export function removeItem(key) {
  localStorage.removeItem(key);
}

export function setJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getJSON(key) {
  const item = localStorage.getItem(key);
  try {
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}
