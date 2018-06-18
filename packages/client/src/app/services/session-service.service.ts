import { Injectable } from '@angular/core';
import { isEmpty, isObject } from 'lodash';

interface IJWTUser {
  email: string;
  firstname: string;
  lastname: string;
  scope: string;
  user_id: string;
}

@Injectable()
export class SessionServiceService {

  get currentUser(): IJWTUser {
    let currentUser = this._currentUser;

    if (isEmpty(currentUser)) {
      currentUser = JSON.parse(localStorage.getItem('current-user')) || {
        email: '',
        firstname: 'Nick',
        lastname: 'Vlug',
        scope: null,
        user_id: null
      };
      // We are updating the current user so we ensure this getter doesnt return new values every time its called
      // which would cause our view to re-render everytime
      //
      this._currentUser = currentUser;
    }

    return this._currentUser;
  }
  set currentUser(user) {
    this._currentUser = user;

    if ( isObject(user) ) {
      localStorage.setItem('current-user', JSON.stringify(user));
    }

  }

  private _currentUser: IJWTUser;

  constructor() { }

  check(): void {
    const jwt = this.getParameterByName('token');

    if ( jwt ) {
      const jwtData = jwt.split('.')[1];
      try {
        const decodedJwtJsonData = window.atob(jwtData);
        this.currentUser = JSON.parse(decodedJwtJsonData);
      } catch (e) {
        console.error('failed to decode string...');
      }
    }
  }

  getParameterByName = (name: string) => {
    const url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) {
      return null;
    }
    if (!results[2]) {
      return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

}
