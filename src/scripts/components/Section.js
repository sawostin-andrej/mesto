export default class Section {
  constructor(renderer, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this.renderer = renderer;
  }
  //добавление массива с карточками
  addCardsFromArray(dataCard) {
    dataCard.forEach((element) => {
      this.renderer(element);
    });
  }
  //добавление карточки в начало контейнера
  addItem(elementDom) {
    this._container.prepend(elementDom);
  }
}