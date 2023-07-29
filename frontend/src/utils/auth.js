export const BASE_URL = 'https://api.project.mesto.student.nomoreparties.sbs';

function checkServerResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Код ошибки: ${res.status}`);
}

export function register({ email, password }) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    } ,
    body: JSON.stringify({
      password: password,
      email: email,
    })
  })
    .then(checkServerResponse)
}

export function authorize({ email, password }) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: password,
      email: email
    })
  })
  .then(checkServerResponse)
}

export function getContent(userId) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(checkServerResponse)
}