export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._initialCards = items;
    this.renderer = renderer;
  }
  //добавление массива с карточками
  addCardsFromArray() {
    this._initialCards.forEach((item) => {
      this.addItem(this.renderer(item));
    });
  }
  //добавление карточки в начало контейнера
  addItem(elementDom) {
    this._container.prepend(elementDom);
  }
}