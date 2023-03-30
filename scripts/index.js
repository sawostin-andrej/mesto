const popup = document.querySelector(".popup");
const popupclose = popup.querySelector(".popup__close");
const Inputname = popup.querySelector("input[name='title']");
const Inputabout = popup.querySelector("input[name='subtitle']");
const profile = document.querySelector(".profile");
const profiletitle = profile.querySelector(".profile__title");
const profilesubtitle = profile.querySelector(".profile__subtitle");
const editButton = profile.querySelector(".profile__edit-button");
const popupbutton = document.querySelector(".popup__button");

function togglePopup() {
  popup.classList.toggle("popup__open");
  if (popup.classList.contains("popup__open")) {
    Inputname.value = profiletitle.textContent;
    Inputabout.value = profilesubtitle.textContent;
  }
}

function formSubmit(event) {
  event.preventDefault();
  profiletitle.textContent = Inputname.value;
  profilesubtitle.textContent = Inputabout.value;
  togglePopup();
}

editButton.addEventListener("click", togglePopup);
popupclose.addEventListener("click", togglePopup);
popup.addEventListener("submit", formSubmit);
