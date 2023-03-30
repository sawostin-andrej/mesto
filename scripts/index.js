const popup = document.querySelector(".popup");
const popupclose = popup.querySelector(".popup__close");
const inputname = popup.querySelector("input[name='title']");
const inputabout = popup.querySelector("input[name='subtitle']");
const profile = document.querySelector(".profile");
const profiletitle = profile.querySelector(".profile__title");
const profilesubtitle = profile.querySelector(".profile__subtitle");
const editButton = profile.querySelector(".profile__edit-button");
const popupbutton = document.querySelector(".popup__button");

function togglePopup() {
  popup.classList.toggle("popup_open");
  if (popup.classList.contains("popup_open")) {
    inputname.value = profiletitle.textContent;
    inputabout.value = profilesubtitle.textContent;
  }
}

function formSubmit(event) {
  event.preventDefault();
  profiletitle.textContent = inputname.value;
  profilesubtitle.textContent = inputabout.value;
  togglePopup();
}

editButton.addEventListener("click", togglePopup);
popupclose.addEventListener("click", togglePopup);
popup.addEventListener("submit", formSubmit);
