export default class UserInfo {
  constructor(configInfo) {
    this._profileTitle = document.querySelector(
      configInfo.profileTitleSelector
    );
    this._profileSubtitle = document.querySelector(
      configInfo.profileSubtitleSelector
    );
  }

  getUserInfo() {
    return {
      title: this._profileTitle.textContent,
      subtitle: this._profileSubtitle.textContent,
    };
  }

  setUserInfo(data) {
    this._profileTitle.textContent = data.title;
    this._profileSubtitle.textContent = data.subtitle;
  }
}