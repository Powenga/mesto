export default class UserInfo {
  constructor({userNameSelector, userInfoSelector, userAvatarSelector}){
    this._userNameElement = document.querySelector(userNameSelector);
    this._userInfoElement = document.querySelector(userInfoSelector);
    this._userAvatarElement = document.querySelector(userAvatarSelector);
    this.setUserInfo = this.setUserInfo.bind(this);
    this.userId = '';
  }

  getUserInfo(){
    return {userName: this._userNameElement.textContent, userInfo: this._userInfoElement.textContent};
  }

  setUserInfo({name, about, _id}){
    this._userNameElement.textContent = name;
    this._userInfoElement.textContent = about;
    this.userId = _id;
  }

  setUserAvatar({avatar}){
    this._userAvatarElement.src = avatar;
  }
}
