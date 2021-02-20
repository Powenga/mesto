(()=>{"use strict";var t={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function e(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var n=function(){function t(e,n){var r=e.data,o=e.handleCardClick,i=e.handleTrashClick,a=e.handleLikeClick,s=e.handleLikeError,u=e.clearLikeError;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._title=r.title,this._image=r.link,this._likes=r.likes,this._likedUserIdList=this._likes.map((function(t){return t._id})),this._id=r.id,this._ownerId=r.owner._id,this._userId=r.userId,this._numberOfLikes=this._likes.length,this._templateSelector=n,this._handleCardClick=o,this._handleTrashClick=i,this._handleLikeClick=a,this._handleLikeError=s,this._clearLikeError=u}var n,r;return n=t,(r=[{key:"_getTemplate",value:function(){return document.querySelector(this._templateSelector).content.querySelector(".card").cloneNode(!0)}},{key:"deleteCard",value:function(){this._element.remove()}},{key:"_likeCard",value:function(){var t=this;this._likeCardAnimation(!0);var e=!this._likeBttn.classList.contains("btn_status_liked");this._handleLikeClick({like:e,cardId:this._id}).then((function(e){console.log(e),t._numberOfLikes=e.likes.length,t._clearLikeError(),t._likeBttn.classList.toggle("btn_status_liked"),t._setLikeCount()})).catch((function(e){t._handleLikeError({err:e,container:t._element})})).finally((function(){t._likeCardAnimation(!1)}))}},{key:"_likeCardAnimation",value:function(t){t?this._likeBttn.classList.add("btn_animate_like"):this._likeBttn.classList.remove("btn_animate_like")}},{key:"_setEventListeners",value:function(){var t=this;this._cardImage.addEventListener("click",(function(){t._handleCardClick({title:t._title,src:t._image})})),this._cardTrashBttn.addEventListener("click",(function(){t._handleTrashClick({id:t._id,removedCard:t._element})})),this._likeBttn.addEventListener("click",(function(){t._likeCard()}))}},{key:"_setLikeCount",value:function(){this._cardLikeCount.textContent=this._numberOfLikes}},{key:"_removeTrashBttn",value:function(){this._cardTrashBttn=this._element.querySelector(".card__trash-btn"),this._ownerId!==this._userId&&this._cardTrashBttn.remove()}},{key:"_setLikeStatus",value:function(){this._likeBttn=this._element.querySelector(".card__like-btn"),this._likedUserIdList.includes(this._userId)&&this._likeBttn.classList.add("btn_status_liked"),this._setLikeCount()}},{key:"generateCard",value:function(){return this._element=this._getTemplate(),this._cardImage=this._element.querySelector(".card__img"),this._removeTrashBttn(),this._cardLikeCount=this._element.querySelector(".card__like-count"),this._setLikeStatus(),this._element.querySelector(".card__title").textContent=this._title,this._cardImage.src=this._image,this._cardImage.alt=this._title,this._setEventListeners(),this._element}}])&&e(n.prototype,r),t}();function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var i=function(){function t(e,n){var o;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._formNode=n,this._inputSelector=e.inputSelector,this._submitButtonSelector=e.submitButtonSelector,this._inactiveButtonClass=e.inactiveButtonClass,this._inputErrorClass=e.inputErrorClass,this._errorClass=e.errorClass,this._inputs=function(t){if(Array.isArray(t))return r(t)}(o=this._formNode.querySelectorAll(this._inputSelector))||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(o)||function(t,e){if(t){if("string"==typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(t,e):void 0}}(o)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),this._submitBttn=this._formNode.querySelector(this._submitButtonSelector)}var e,n;return e=t,(n=[{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?this._disableSubmit():this._enableSubmit()}},{key:"_disableSubmit",value:function(){this._submitBttn.classList.add(this._inactiveButtonClass),this._submitBttn.disabled=!0}},{key:"_enableSubmit",value:function(){this._submitBttn.classList.remove(this._inactiveButtonClass),this._submitBttn.disabled=!1}},{key:"_hasInvalidInput",value:function(){return this._inputs.some((function(t){return!t.validity.valid}))}},{key:"_checkInputValidity",value:function(t){t.validity.valid?this._hideInputError(t):this._showInputError(t)}},{key:"_showInputError",value:function(t){var e=this._formNode.querySelector(".".concat(t.id,"-error"));t.classList.add(this._inputErrorClass),e.textContent=t.validationMessage,e.classList.add(this._errorClass)}},{key:"_hideInputError",value:function(t){var e=this._formNode.querySelector(".".concat(t.id,"-error"));t.classList.remove(this._inputErrorClass),e.classList.remove(this._errorClass),e.textContent=""}},{key:"_setEventListeners",value:function(){var t=this;this._formNode.addEventListener("submit",(function(t){t.preventDefault()})),this._inputs.forEach((function(e){e.addEventListener("input",(function(){t._checkInputValidity(e),t._toggleButtonState()}))}))}},{key:"resetValidation",value:function(){var t=this;this._inputs.forEach((function(e){t._hideInputError(e)})),this._toggleButtonState()}},{key:"enableValidation",value:function(){this._setEventListeners()}}])&&o(e.prototype,n),t}();function a(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var s=function(){function t(e,n){var r=e.renderer;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._renderer=r,this._container=document.querySelector(n)}var e,n;return e=t,(n=[{key:"addItem",value:function(t){this._container.prepend(t)}},{key:"renderItems",value:function(t){var e=this;t.forEach((function(t){e._renderer(t)}))}},{key:"clearContainer",value:function(){this._container.innerHTML=""}}])&&a(e.prototype,n),t}();function u(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var c=function(){function t(e){var n=e.popupSelector;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._popupElement=document.querySelector(n),this.setEventListeners(),this._handleEscCloseBinded=this._handleEscClose.bind(this)}var e,n;return e=t,(n=[{key:"open",value:function(){this._popupElement.classList.add("popup_visible"),document.addEventListener("keydown",this._handleEscCloseBinded)}},{key:"close",value:function(){this._popupElement.classList.remove("popup_visible"),document.removeEventListener("keydown",this._handleEscCloseBinded)}},{key:"_handleEscClose",value:function(t){"Escape"===t.key&&this.close()}},{key:"setEventListeners",value:function(){var t=this;this._popupElement.addEventListener("click",(function(e){(e.target.classList.contains("popup")||e.target.classList.contains("popup__close-btn"))&&t.close()}))}}])&&u(e.prototype,n),t}();function l(t){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function f(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function p(t,e,n){return(p="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=_(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(n):o.value}})(t,e,n||t)}function h(t,e){return(h=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function d(t,e){return!e||"object"!==l(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function _(t){return(_=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var y=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&h(t,e)}(a,t);var e,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=_(r);if(o){var n=_(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return d(this,t)});function a(t){var e,n=t.popupSelector;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(e=i.call(this,{popupSelector:n})).image=e._popupElement.querySelector(".popup__image"),e.title=e._popupElement.querySelector(".popup__figcaption"),e}return e=a,(n=[{key:"open",value:function(t){this.image.src=t.src,this.title.textContent=t.title,p(_(a.prototype),"open",this).call(this)}}])&&f(e.prototype,n),a}(c);function m(t){return(m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function v(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function b(t,e,n){return(b="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=E(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(n):o.value}})(t,e,n||t)}function k(t,e){return(k=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function S(t,e){return!e||"object"!==m(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function E(t){return(E=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var C=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&k(t,e)}(a,t);var e,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=E(r);if(o){var n=E(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return S(this,t)});function a(t){var e,n=t.popupSelector,r=t.handleFormSubmit;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(e=i.call(this,{popupSelector:n}))._handleFormSubmit=r,e._submitButton=e._form.querySelector(".popup__submit-btn"),e._submitButtonText=e._submitButton.textContent,e}return e=a,(n=[{key:"_getInputValues",value:function(){var t=this;return this._inputList=this._form.querySelectorAll(".popup__input"),this._formValues={},this._inputList.forEach((function(e){t._formValues[e.name]=e.value})),this._formValues}},{key:"setInputValues",value:function(t){var e=this;return this._inputList=this._form.querySelectorAll(".popup__input"),this._formValues=t,this._inputList.forEach((function(t){t.value=e._formValues[t.name]})),this._formValues}},{key:"close",value:function(){b(E(a.prototype),"close",this).call(this),this._form.reset()}},{key:"setEventListeners",value:function(){var t=this;b(E(a.prototype),"setEventListeners",this).call(this),this._form=this._popupElement.querySelector(".popup__form"),this._form.addEventListener("submit",(function(e){e.preventDefault(),t._handleFormSubmit(t._getInputValues())}))}},{key:"startLoadAnimation",value:function(t){this._submitButton.textContent=t,this._submitButton.classList.add("popup__submit-btn_animated")}},{key:"stopLoadAnimation",value:function(){this._submitButton.textContent=this._submitButtonText,this._submitButton.classList.remove("popup__submit-btn_animated")}}])&&v(e.prototype,n),a}(c);function g(t){return(g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function w(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function L(t,e,n){return(L="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=T(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(n):o.value}})(t,e,n||t)}function I(t,e){return(I=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function O(t,e){return!e||"object"!==g(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function T(t){return(T=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var P=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&I(t,e)}(a,t);var e,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=T(r);if(o){var n=T(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return O(this,t)});function a(t){var e,n=t.popupSelector;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(e=i.call(this,{popupSelector:n})).title=e._popupElement.querySelector(".popup__title"),e.text=e._popupElement.querySelector(".popup__text"),e}return e=a,(n=[{key:"open",value:function(t){var e=t.title,n=t.text;this.title.textContent=e,this.text.textContent=n,L(T(a.prototype),"open",this).call(this)}}])&&w(e.prototype,n),a}(c);function j(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var B=function(){function t(e){var n=e.userNameSelector,r=e.userInfoSelector,o=e.userAvatarSelector;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._userNameElement=document.querySelector(n),this._userInfoElement=document.querySelector(r),this._userAvatarElement=document.querySelector(o),this.setUserInfo=this.setUserInfo.bind(this),this.userId=""}var e,n;return e=t,(n=[{key:"getUserInfo",value:function(){return{userName:this._userNameElement.textContent,userInfo:this._userInfoElement.textContent}}},{key:"setUserInfo",value:function(t){var e=t.name,n=t.about,r=t._id;this._userNameElement.textContent=e,this._userInfoElement.textContent=n,this.userId=r}},{key:"setUserAvatar",value:function(t){var e=t.avatar;this._userAvatarElement.src=e}}])&&j(e.prototype,n),t}();function A(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var q=function(){function t(e){var n=e.baseUrl,r=e.headers;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._baseUrl=n,this._headers=r}var e,n;return e=t,(n=[{key:"_onError",value:function(t){return t.ok?t.json():Promise.reject(t.status)}},{key:"getUserInfo",value:function(){return fetch("".concat(this._baseUrl,"/users/me"),{headers:this._headers}).then(this._onError)}},{key:"getInitialCards",value:function(){return fetch("".concat(this._baseUrl,"/cards"),{headers:this._headers}).then(this._onError)}},{key:"editProfile",value:function(t){return fetch("".concat(this._baseUrl,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify(t)}).then(this._onError)}},{key:"addCard",value:function(t){return fetch("".concat(this._baseUrl,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify(t)}).then(this._onError)}},{key:"removeCard",value:function(t){return fetch("".concat(this._baseUrl,"/cards/").concat(t.cardId),{method:"DELETE",headers:this._headers}).then(this._onError)}},{key:"likeCard",value:function(t,e){var n=e?"PUT":"DELETE";return fetch("".concat(this._baseUrl,"/cards/likes/").concat(t),{method:n,headers:this._headers}).then(this._onError)}},{key:"editAvatar",value:function(t){return fetch("".concat(this._baseUrl,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify(t)}).then(this._onError)}}])&&A(e.prototype,n),t}();function x(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var R=function(){function t(e,n){var r=e.data,o=e.handleClick,i=e.position;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._title=r.title,this._handleClick=o,this._templateSelector=n,this._position=i,this._generate()}var e,n;return e=t,(n=[{key:"_getTemplate",value:function(){return document.querySelector(this._templateSelector).content.querySelector(".error-notification").cloneNode(!0)}},{key:"setErrorType",value:function(t){this._errorType=t}},{key:"show",value:function(){this._element.classList.add("error-notification_visible")}},{key:"hide",value:function(){this._element.classList.remove("error-notification_visible")}},{key:"_render",value:function(){this._container.append(this._element)}},{key:"_setEventListener",value:function(){var t=this;this._element.addEventListener("click",(function(e){t._handleClick(e,{title:t._title,err:t._errorType})}))}},{key:"setContainer",value:function(t){this._container=t,this._setContainerPosition(),this._setNotificationPosition(),this._render()}},{key:"_setNotificationPosition",value:function(){for(var t in this._position)this._element.style[t]=this._position[t]}},{key:"_setContainerPosition",value:function(){var t=this._container.style.position;"absolute"===t&&"relative"===t&&"fixed"===t||(this._container.style.position="relative")}},{key:"_generate",value:function(){this._element=this._getTemplate(),this._setEventListener()}}])&&x(e.prototype,n),t}(),U=document.querySelector(".profile__edit-btn"),N=document.querySelector(".profile__add-btn"),V=document.querySelector(".profile__avatar-container"),D=document.querySelector(".profile"),F=document.querySelector(".popup_type_edit-profile"),H=F.querySelector(".popup__input_type_name"),J=F.querySelector(".popup__input_type_status"),M=document.forms["add-card"],z=document.forms["edit-profile"],$=document.forms["edit-avatar"];function G(t){dt.open(t)}function K(t){var e=t.id,n=t.removedCard;ft.setInputValues({cardId:e}),ft.removedCard=n,ft.open()}function Q(t){var e=t.like,n=t.cardId;return ut.likeCard(n,e)}function W(t){var e=t.err,n=t.container;at.setContainer(n),at.setErrorType(e),at.show()}function X(){at.hide()}function Y(t){return new n({data:t,handleCardClick:G,handleTrashClick:K,handleLikeClick:Q,handleLikeError:W,clearLikeError:X},"#template-card").generateCard()}function Z(t,e){var n=e.title,r=e.err;t.stopPropagation();var o="Ошибка: ".concat(r,". Пожалуйста, повторите попытку позже");_t.open({title:n,text:o})}function tt(t,e){return new R({data:{title:t},position:e,handleClick:Z},"#template-error-notification")}var et=tt("Не удалось загрузить данные");et.setContainer(D);var nt=tt("Не удалось сохранить данные пользователя");nt.setContainer(document.querySelector(".profile__info"));var rt=tt("Не удалось добавить новое место");rt.setContainer(N);var ot=tt("Не удалось сохранить аватар");ot.setContainer(D);var it=tt("Не удалось удалить карточку",{top:0,left:"100%"}),at=tt("Ошибка лайка карточки",{top:"100%",left:"100%"}),st=new B({userNameSelector:".profile__name",userInfoSelector:".profile__status",userAvatarSelector:".profile__avatar"}),ut=new q({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-20",headers:{authorization:"aad15f24-a077-4b33-9695-f949d459f3da","Content-Type":"application/json"}}),ct=new s({renderer:function(t){var e=Y({title:t.name,link:t.link,likes:t.likes,id:t._id,owner:t.owner,userId:st.userId});ct.addItem(e)}},".places__grid");Promise.all([ut.getUserInfo(),ut.getInitialCards()]).then((function(t){et.hide(),st.setUserInfo(t[0]),st.setUserAvatar(t[0]);var e=t[1].sort((function(t,e){return t.createdAt>e.createdAt?1:-1}));ct.renderItems(e)})).catch((function(t){et.setErrorType(t),et.show()}));var lt=new C({popupSelector:".popup_type_add-card",handleFormSubmit:function(t){var e=t.title,n=t.link;lt.startLoadAnimation("Сохранение"),ut.addCard({name:e,link:n}).then((function(t){rt.hide();var e=Y({title:t.name,link:t.link,likes:t.likes,id:t._id,owner:t.owner,userId:st.userId});ct.addItem(e),lt.close()})).catch((function(t){rt.setErrorType(t),rt.show()})).finally((function(){lt.stopLoadAnimation()}))}}),ft=new C({popupSelector:".popup_type_remove-card",handleFormSubmit:function(t){var e=t.cardId;ft.startLoadAnimation("Удаление"),it.setContainer(ft.removedCard),ut.removeCard({cardId:e}).then((function(){it.hide(),ft.removedCard.remove(),ft.close()})).catch((function(t){it.setErrorType(t),it.show()})).finally((function(){ft.stopLoadAnimation()}))}}),pt=new C({popupSelector:".popup_type_edit-profile",handleFormSubmit:function(t){pt.startLoadAnimation("Загрузка");var e=t.userName,n=t.userAbout;ut.editProfile({name:e,about:n}).then((function(t){nt.hide(),st.setUserInfo(t),pt.close()})).catch((function(t){nt.setErrorType(t),nt.show()})).finally((function(){pt.stopLoadAnimation()}))}}),ht=new C({popupSelector:".popup_type_edit-avatar",handleFormSubmit:function(t){ht.startLoadAnimation("Сохранение");var e=t.link;ut.editAvatar({avatar:e}).then((function(t){ot.hide(),st.setUserAvatar(t),ht.close()})).catch((function(t){ot.setErrorType(t),ot.show()})).finally((function(){ht.stopLoadAnimation()}))}}),dt=new y({popupSelector:".popup_type_image"}),_t=new P({popupSelector:".popup_type_error"}),yt=new i(t,M);yt.enableValidation();var mt=new i(t,z);mt.enableValidation();var vt=new i(t,$);vt.enableValidation(),N.addEventListener("click",(function(){yt.resetValidation(),lt.open()})),U.addEventListener("click",(function(){var t=st.getUserInfo();H.value=t.userName,J.value=t.userInfo,mt.resetValidation(),pt.open()})),V.addEventListener("click",(function(){vt.resetValidation(),ht.open()}))})();