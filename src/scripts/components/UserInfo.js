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
      userId: this._profileUserId,
      title: this._profileTitle.textContent,
      subtitle: this._profileSubtitle.textContent,
    };
  }

  setUserInfo({ userId, avatar, title, subtitle }) {
    this._profileAvatar.src = avatar;
    this._profileTitle.textContent = title;
    this._profileSubtitle.textContent = subtitle;
    this._profileUserId = userId;
  }
}