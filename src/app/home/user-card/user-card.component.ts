import { Component, Input } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  //public user: User = new User(-1, "test", "test", "test@gmail.com", "11111", "1.1.2000.", new Date(), -1);

  constructor() {}

}
