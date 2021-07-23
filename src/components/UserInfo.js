//Класс UserInfo отвечает за управление отображением информации о пользователе на странице.
export default class UserInfo {
    //Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
    constructor(nameSelector, subSelector) {
        this._nameSelector = document.querySelector(nameSelector);
        this._subSelector = document.querySelector(subSelector);
    }

    //Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. 
    //Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
    getUserInfo() {
        this.profileInfo = {};
        this.profileInfo.nameSelector = this._nameSelector.textContent;
        this.profileInfo.subSelector = this._subSelector.textContent;
        return this.profileInfo;
    }


    //Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
    setUserInfo({ formUserName, formDescription }) {
        this._nameSelector.textContent = formUserName.value;
        this._subSelector.textContent = formDescription.value;
    }
}