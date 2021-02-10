export default class UserInfo {
  constructor({userNameSelector, userInfoSelector, userAvatarSelector}){
    this._userNameElement = document.querySelector(userNameSelector);
    this._userInfoElement = document.querySelector(userInfoSelector);
    this._userAvatarElement = document.querySelector(userAvatarSelector);
    this.setUserInfo = this.setUserInfo.bind(this);
  }

  getUserInfo(){
    return {userName: this._userNameElement.textContent, userInfo: this._userInfoElement.textContent};
  }

  setUserInfo({name, about}){
    this._userNameElement.textContent = name;
    this._userInfoElement.textContent = about;
  }

  setUserAvatar({avatar}){
    this._userAvatarElement.src = avatar;
  }
}
