export default class Api {
  constructor(feature) {
    this._url = feature.baseUrl;
    this._headers = feature.headers;
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject;
  }

  getinfo() {
    return this._request(`${this._url}/users/me`, { headers: this._headers });
  }

  getInitialCards() {
    return this._request(`${this._url}/cards`, { headers: this._headers });
  }

  setUserInfo(data) {
    return this._request(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        about: data.subtitle,
      }),
    });
  }

  setAvatar(data) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }

  addCard(data) {
    return this._request(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
  }

  addLike(cardId) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  deleteLike(cardId) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  deleteCard(cardId) {
    return this._request(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
}