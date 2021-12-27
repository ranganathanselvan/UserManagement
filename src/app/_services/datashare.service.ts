import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../_models/user';

@Injectable()
export class DataShareService {

  private isUserLoggedIn = new BehaviorSubject<boolean>(false);
  private currentUser = new BehaviorSubject<User>(new User());
  
  storedUser = this.currentUser.asObservable();
  userLoggedin = this.isUserLoggedIn.asObservable();

  setCurrentUser(value: User) {
    this.currentUser.next(value);
  }

  setUserLoggedIn(value: boolean){
    this.isUserLoggedIn.next(value);
  }

}
