import { Injectable, signal } from '@angular/core';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserCardService {

  public selectedUser = signal<User>(new User(-1, "test", "test", "test@gmail.com", "11111", "1.1.2000.", new Date(), -1));

  constructor() { }
}
