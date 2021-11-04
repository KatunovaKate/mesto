export default class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
        this.about = config.about;
        this.name = config.name;
        this.avatar = config.avatar;
    }

    //получить объект информацией с сервера
    getCards() {
        return fetch(this._url + 'cards', {
            method: 'GET',
            headers: this._headers,
        }).then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        }).catch((err) => console.log(err))
    }

    //получение имени и статуса
    getInfo() {
        return fetch(this._url + 'users/me', {
            method: 'GET',
            headers: this._headers,
        }).then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        }).catch((err) => console.log(err))
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
        }).then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        }).catch((err) => console.log(err))
    }

    setAvatar({avatar}) {
        return fetch(this._url + 'users/me/avatar', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar
              })
        }).then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        }).catch((err) => console.log(err))
    }

    //добавление карточки на сервер
    addCard(data) {
        return fetch(this._url + 'cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data),
        }).then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        }).catch((err) => console.log(err))
    }

    deleteTask(_id) {
        return fetch(`${this._url}cards/${_id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        }).catch((err) => console.log(err))
    }

    setLike(_id) {
        return fetch(`${this._url}cards/likes/${_id}`, {
            method: 'PUT',
            headers: this._headers,
            body: JSON.stringify({_id}),
        }).then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        }).catch((err) => console.log(err))
    }

    deletelike(_id) {
        return fetch(`${this._url}cards/likes/${_id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        }).catch((err) => console.log(err))
    }
}