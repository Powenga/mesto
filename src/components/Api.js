export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo(handler) {
    fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(res => {
        if(res.ok){
          return res.json();
        }
        return Promise.reject(res.status);
      })
        .then(data => {
          handler(data);
        })
      .catch((err) => {
        console.log(`Что-то пошло не так. Ошибка: ${err}`)
      })
  }

  getInitialCards(handler) {
    fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
        .then(data => {
          handler(data);
        })
      .catch((err) => {
         console.log(`Что-то пошло не так. Ошибка: ${err}`)
      })
  }

  editProfile(data, handler) {
    fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
        .then(data => {
          handler(data)
        })
      .catch(err => {
        console.log(`Что-то пошло не так. Ошибка: ${err}`)
      })
  }
}



