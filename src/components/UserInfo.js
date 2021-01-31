export default class UserInfo {
  constructor({userNameSelector, userInfoSelector}){
    this._userNameElement = document.querySelector(userNameSelector);
    this._userInfoElement = document.querySelector(userInfoSelector);
  }
  getUserInfo(){
    return {userName: this._userNameElement.textContent, userInfo: this._userInfoElement.textContent};
  }
  setUserInfo({userName, userInfo}){
    this._userNameElement.textContent = userName;
    this._userInfoElement.textContent = userInfo;
  }
}
