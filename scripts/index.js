import FormValidator from "./FormValidator.js";
import initialCards from "./cardsData.js";
import Card from "./Card.js";
import setupValidation from "./constants.js";

const formNew = document.querySelector(".popup__form_new");
const formEdit = document.querySelector(".popup__form_edit");

const formNewInstance = new FormValidator(formNew, setupValidation); //создаем экземпляр класса
const formEditInstance = new FormValidator(formEdit, setupValidation); //создаем экземпляр класса

formEditInstance.enableValidation();
formNewInstance.enableValidation();

// переменные pop-up создание профиля
const popupProfile = document.querySelector(".popup_type_profile");
const inputName = popupProfile.querySelector("input[name='title']");
const inputAbout = popupProfile.querySelector("input[name='subtitle']");
const profile = document.querySelector(".profile");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const editButton = profile.querySelector(".profile__edit-button");
const profileCloseBtn = popupProfile.querySelector(".popup__close");

//Переменные новой карточки
const nameCardInput = document.querySelector("input[name='card-title']");
const urlCardInput = document.querySelector("input[name='card-link']");

//Переменные (Новое место)
const popupAdd = document.querySelector(".popup_type_add");
const popupAddButton = document.querySelector(".profile__add-button");

//Пременные контейнера и шаблона
const elementContainer = document.querySelector(".elements"); //контейнер для карточек
const selectorTemplate = ".card-template"; //шаблон карточки

//Переменные добавления карточки
const buttonSubmitAdd = popupAdd.querySelector(".popup__button");
const formElementAdd = popupAdd.querySelector("form[name='addCard']");
const addCloseBtn = popupAdd.querySelector(".popup__close");

//Переменные для картинки в большом масштабе
const popupWrapImage = document.querySelector(".popup_type_image");
const popupImage = popupWrapImage.querySelector(".popup__image");
const popupImageTitle = popupWrapImage.querySelector(".popup__image-title");
const imageCloseBtn = popupWrapImage.querySelector(".popup__close");

//функция открытия pop-up(общая)
function openPopup(popup) {
  //создаем функцию открытия попап с аргументом popup
  popup.classList.add("popup_opened"); //добавляем класс видимый
  document.addEventListener("keydown", handleEsc); //добавляем слушатель кнопки ESC
  popup.addEventListener("click", closePopupOverlay); //добавляем слушатель клика Overlay
}

//функция открытия pop-up для (Редактировать профиль)
function openProfilePopup() {
  //создаем функцию открытия попап для Редактирования профиля
  inputName.value = profileTitle.textContent; //присваиваем переменной значение поле ИМЯ
  inputAbout.value = profileSubtitle.textContent; //присваиваем переменной значение поле О СЕБЕ
  openPopup(popupProfile); //выполняем функцию открытия попап, добавляем аргумент popupProfile(Редактировать профиль)
}

//функция открытия pop-up для (Новое место)
const openAddPopup = () => {
  //создаем переменную с функцией
  openPopup(popupAdd); //открыть попап, добавляем аргумент popupAdd(попап Новое место)
};

//функции закрытия pop-ups по клику на кнопку Esc или Overlay
function closePopup(popup) {
  //функция закрытия попап с аргументом попап
  document.removeEventListener("keydown", handleEsc); //удалить слушатель закрытия ESC
  popup.removeEventListener("click", closePopupOverlay); //удалить слушатель закрытия по Overlay
  popup.classList.remove("popup_opened"); //удаляем класс видимый
}

//функции закрытия pop-ups по нажатию по Overlay
const closePopupOverlay = (event) => {
  if (event.target !== event.currentTarget)
    //(событие.цель)проверить действие (событие.текущая цель)
    return;
  closePopup(event.target); //выполняем функцию закрытия попап с аргументом event.target
};

//функции закрытия pop-ups по нажатию Esc
function handleEsc(evt) {
  const activePopup = document.querySelector(".popup_opened"); //присваиваем переменной класс видимый
  if (evt.key === "Escape") {
    closePopup(activePopup); //при нажатии на ESC закрыть попап с activePopup
  }
}

//Обрабатывание и сохранение (Редактирования профиля)
function handleProfileFormSubmit(event) {
  event.preventDefault(); //предотвратить невыполнение условий
  profileTitle.textContent = inputName.value; //присвоить зачение введенного текста полю (Имя)
  profileSubtitle.textContent = inputAbout.value; //присвоить зачение введенного текста полю (О себе)
  closePopup(popupProfile); //закрыть попап Редактирования профиля
  formEditInstance.disableButton();
}

//Обрабатывание и сохранение (Новое место)
const handleAddCardFormSubmit = (event) => {
  event.preventDefault(); //предотвратить невыполнение условий
  const cardData = { name: nameCardInput.value, link: urlCardInput.value }; //значение введенных данных

  addCard(elementContainer, newCardAdd(cardData)); //функция добавить в одно другое(в контейнер добавить карточку с данными)

  event.target.reset(); //после выполнения события вернуть значение
  closePopup(popupAdd); //закрыть попап (Новое место)
  formNewInstance.disableButton();
};

//открытие попапа с картинкой
function openImage(data) {
  popupImage.src = data.link;
  popupImage.alt = data.name;
  popupImageTitle.textContent = data.name;
  openPopup(popupWrapImage);
}

function newCardAdd(item) {
  //функция создания новой карточки
  const card = new Card(item, openImage, selectorTemplate);
  return card.createCard();
}

initialCards.forEach((item) => {
  //Функция добавить в контейнер все карточки
  addCard(elementContainer, newCardAdd(item));
});

function addCard(container, card) {
  container.prepend(card);
}

//слушатели событий
//открываем
editButton.addEventListener("click", openProfilePopup);
popupAddButton.addEventListener("click", openAddPopup);

//обрабатываем
formElementAdd.addEventListener("submit", handleAddCardFormSubmit);
popupProfile.addEventListener("submit", handleProfileFormSubmit);

//закрываем
profileCloseBtn.addEventListener("click", () => closePopup(popupProfile));
addCloseBtn.addEventListener("click", () => closePopup(popupAdd));
imageCloseBtn.addEventListener("click", () => closePopup(popupWrapImage));
