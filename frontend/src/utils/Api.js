import { configApi } from './utils';

class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkServerResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Код ошибки: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkServerResponse);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkServerResponse);
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkServerResponse);
  }

  setUserAvatar({ link }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._checkServerResponse);
  }

  setNewCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkServerResponse);
  }

  removeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkServerResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkServerResponse);
  }
}

export const api = new Api(configApi);
