export default class Section {
    constructor({renderer}, containerSelector) {
        this._renderer = renderer;
        this._container = containerSelector;
    }

    renderItems(data) {
        data.forEach(item => this._renderer(item));
      }
    
    setItem(item) {
        this._container.prepend(item);
      }
}