export default class UserInfo {
  constructor(configInfo) {
    this._profileTitle = document.querySelector(
      configInfo.profileTitleSelector
    );
    this._profileSubtitle = document.querySelector(
      configInfo.profileSubtitleSelector
    );
    this._profileAvatar = document.querySelector(configInfo.profileAvatar);
  }

  getUserInfo() {
    return {
      title: this._profileTitle.textContent,
      subtitle: this._profileSubtitle.textContent,
    };
  }

  setUserInfo({ avatar, title, subtitle }) {
    this._profileAvatar.src = avatar;
    this._profileTitle.textContent = title;
    this._profileSubtitle.textContent = subtitle;
  }
}