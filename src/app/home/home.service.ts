import { Injectable, signal } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  public userList: User[] = []
  //userList = signal<User[]>([]);

  constructor() { }

  addUser(u: User) {
    //console.log("Adding new user to list");
    //this.userList().push(u);
    //this.userList.set(this.userList());
    this.userList.push(u)

    console.log(this.userList);
  }
}
