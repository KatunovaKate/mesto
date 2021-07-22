//Класс UserInfo отвечает за управление отображением информации о пользователе на странице.
export default class UserInfo {
    //Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
    constructor({userName, description}) {
        this._userName = userName;
        this._description = description;
    }
//formUserName = импут
//userName = заголовок

    //Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. 
    //Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
    getUserInfo() {
        this.profileInfo = {};
        this.profileInfo.userName = this._userName.textContent;
        this.profileInfo.description = this._description.textContent;
        return this.profileInfo;
    }


    //Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
    setUserInfo({ formUserName, formDescription }) {
        this._userName.textContent = formUserName.value;
        this._description.textContent = formDescription.value;
    }
}