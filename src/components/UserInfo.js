//Класс UserInfo отвечает за управление отображением информации о пользователе на странице.
export default class UserInfo {
    //Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
    constructor(nameSelector, subSelector, api) {

        this._nameSelector = document.querySelector(nameSelector);
        this._subSelector = document.querySelector(subSelector);
        this._api = api;
    }

    //Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. 
    //Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
    getUserInfo({ name, about }) {
        this.profileInfo = {};
        this.profileInfo.nameSelector = name;
        this.profileInfo.subSelector = about;
        return this.profileInfo;
    }


    //Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
    setUserInfo({ formUserName, formDescription }) {
        this._nameSelector.textContent = formUserName; 
        this._subSelector.textContent = formDescription;
    }
}