export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(res => {
        if(res.ok){
          return res.json();
        }
        return Promise.reject(res.status);
      })
  }

  getInitialCards(handler) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })

  }

  editProfile(data, handler) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
  }

  removeCard(data, handler) {
    fetch(`${this._baseUrl}/cards/${data.cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => {
        if(res.ok) {
          return res;
        }
        return Promise.reject(res.status);
      })
        .then(data => {
          handler(data);
        })
        .catch(err => {
          console.log(`Что-то пошло не так. Ошибка: ${err}`)
        })
  }
}



