import "./index.css";
import FormValidator from "../scripts/components/FormValidator.js";
import initialCards from "../scripts/utils/cardsData.js";
import Card from "../scripts/components/Card.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Section from "../scripts/components/Section.js";

import {
  editButton,
  popupAddButton,
  formEdit,
  formNew,
  selectorTemplate,
  elementContainer,
  popupProfile,
  popupWrapImage,
  popupAdd,
  setupValidation,
  configInfo,
} from "../scripts/utils/constants.js";

const formEditInstance = new FormValidator(formEdit, setupValidation);
const formNewInstance = new FormValidator(formNew, setupValidation);

formNewInstance.enableValidation();
formEditInstance.enableValidation();

const userInfo = new UserInfo(configInfo);
const popupImage = new PopupWithImage(popupWrapImage);

const profilePopup = new PopupWithForm(popupProfile, sendProfile);

function sendProfile() {
  userInfo.setUserInfo(profilePopup.getInputValues());
}

const popupMesto = new PopupWithForm(popupAdd, sendAdd);

function sendAdd(values) {
  const newCard = new Card(values, selectorTemplate, popupImage.open);
  const newCardElement = newCard.createCard(values);
  section.addItem(newCardElement);
}

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, selectorTemplate, popupImage.open);
      return card.createCard();
    },
  },
  elementContainer
);

section.addCardsFromArray();

profilePopup.setEventListeners();
popupMesto.setEventListeners();
popupImage.setEventListeners();

editButton.addEventListener("click", () => {
  profilePopup.setInputValues(userInfo.getUserInfo());
  profilePopup.open();
  formEditInstance.disableButton(); //выключение кнопка
});

popupAddButton.addEventListener("click", () => {
  popupMesto.open();
  formNewInstance.disableButton(); //выключение кнопки
});