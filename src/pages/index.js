import "./index.css";
import FormValidator from "../scripts/components/FormValidator.js";
import Card from "../scripts/components/Card.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Section from "../scripts/components/Section.js";
import PopupCardDelete from "../scripts/components/PopupCardDelete.js";
import Api from "../scripts/components/Api";

import {
  editButton,
  popupAddButton,
  buttonEditAvatar,
  formEdit,
  formNew,
  formAvatar,
  selectorTemplate,
  elementContainer,
  popupProfile,
  popupWrapImage,
  popupAdd,
  popupAvatarSelector,
  popupDeleteCardSelector,
  setupValidation,
  configInfo,
} from "../scripts/utils/constants.js";

const formEditInstance = new FormValidator(formEdit, setupValidation);
const formNewInstance = new FormValidator(formNew, setupValidation);
const formAvatarInstance = new FormValidator(formAvatar, setupValidation);

formNewInstance.enableValidation();
formEditInstance.enableValidation();
formAvatarInstance.enableValidation();

const userInfo = new UserInfo(configInfo);
const popupImage = new PopupWithImage(popupWrapImage);

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
  headers: {
    authorization: "0d2042a6-4158-4b2d-9cd1-8958c66a2f7c",
    "Content-Type": "application/json",
  },
});

const popupDeleteCard = new PopupCardDelete(
  popupDeleteCardSelector,
  ({ card, cardId }) => {
    api
      .deleteCard(cardId)
      .then(() => {
        card.removeCard();
        popupDeleteCard.close();
      })
      .catch((error) => console.error(`Ошибка при удалении карточки ${error}`));
  }
);

const profilePopup = new PopupWithForm(popupProfile, (data) => {
  api
    .setUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo({
        title: res.name,
        subtitle: res.about,
        avatar: res.avatar,
        userId: res._id,
      });
      profilePopup.close();
    })
    .catch((error) => console.error(`Ошибка редактирования профиля ${error}`))
    .finally(() => profilePopup.settingsText());
});

const popupMesto = new PopupWithForm(popupAdd, (data) => {
  api
    .addCard(data)
    .then((dataCard) => {
      const dataUser = userInfo.getUserInfo();
      dataCard.myid = dataUser.userId;
      section.addItem(createCard(dataCard));
      popupMesto.close();
    })
    .catch((error) =>
      console.error(`ошибка при создании новой карточки ${error}`)
    )
    .finally(() => popupMesto.settingsText());
});

function createCard(values) {
  const newCard = new Card(
    values,
    selectorTemplate,
    popupImage.open,
    popupDeleteCard.open,
    (cardId) => {
      api
        .likeCard(cardId)
        .then((data) => {
          newCard.toggleLike(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  );
  return newCard.createCard();
}

const section = new Section((element) => {
  section.addItem(createCard(element));
}, elementContainer);

const popupEditAvatar = new PopupWithForm(popupAvatarSelector, (data) => {
  api
    .setAvatar(data)
    .then((res) => {
      userInfo.setUserInfo({
        title: res.name,
        subtitle: res.about,
        avatar: res.avatar,
        userId: res._id,
      });
      popupEditAvatar.close();
    })
    .catch((error) => console.error(`Ошибка обновления аватара ${error}`))
    .finally(() => popupEditAvatar.settingsText());
});

profilePopup.setEventListeners();
popupMesto.setEventListeners();
popupImage.setEventListeners();
popupEditAvatar.setEventListeners();
popupDeleteCard.setEventListeners();

editButton.addEventListener("click", () => {
  profilePopup.setInputValues(userInfo.getUserInfo());
  profilePopup.open();
  formEditInstance.disableButton(); //выключение кнопка
});

popupAddButton.addEventListener("click", () => {
  popupMesto.open();
  formNewInstance.disableButton(); //выключение кнопки
});

buttonEditAvatar.addEventListener("click", () => {
  popupEditAvatar.open();
  formAvatarInstance.disableButton();
});

Promise.all([api.getinfo(), api.getInitialCards()])
  .then(([dataUser, dataCard]) => {
    dataCard.forEach((element) => (element.myid = dataUser._id));
    userInfo.setUserInfo({
      userId: dataUser._id,
      title: dataUser.name,
      subtitle: dataUser.about,
      avatar: dataUser.avatar,
    });
    section.addCardsFromArray(dataCard.reverse());
  })
  .catch((error) =>
    console.error(`Ошибка при создании начальных данных страницы ${error}`)
  );