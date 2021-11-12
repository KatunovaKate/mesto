export default class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
        this.about = config.about;
        this.name = config.name;
        this.avatar = config.avatar;
    }
    
    _checkStatus(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }

    getCards() {
        return fetch(this._url + 'cards', {
            method: 'GET',
            headers: this._headers,
        }).then(res => this._checkStatus(res))
    }

    //получение имени и статуса
    getInfo() {
        return fetch(this._url + 'users/me', {
            method: 'GET',
            headers: this._headers,
        }).then(res => this._checkStatus(res))
    }

    //переписывание уже имеющихся данных = имя и статус пользователя
    setUserInfo({name, about}) {
        return fetch(this._url + 'users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
              })
        }).then(res => this._checkStatus(res))
    }

    setAvatar({avatar}) {
        return fetch(this._url + 'users/me/avatar', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar
              })
        }).then(res => this._checkStatus(res))
    }

    //добавление карточки на сервер
    addCard(data) {
        return fetch(this._url + 'cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data),
        }).then(res => this._checkStatus(res))
    }

    deleteTask(_id) {
        return fetch(`${this._url}cards/${_id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(res => this._checkStatus(res))
    }

    setLike(_id) {
        return fetch(`${this._url}cards/likes/${_id}`, {
            method: 'PUT',
            headers: this._headers,
            body: JSON.stringify({_id}),
        }).then(res => this._checkStatus(res))
    }

    deletelike(_id) {
        return fetch(`${this._url}cards/likes/${_id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(res => this._checkStatus(res))
    }
}