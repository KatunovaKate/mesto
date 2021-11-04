export default class Section {
    constructor({items, renderer}, containerSelector, api) {
        this._items = items;
        this._renderer = renderer;
        this._container = containerSelector;
        this._api = api;
    }

    renderItems() {
        this._items.forEach(item => this._renderer(item));
      }
    
    setItem(item) {
        this._container.prepend(item);
      }
}