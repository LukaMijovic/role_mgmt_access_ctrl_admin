import { Component, Input } from '@angular/core';
import { User } from '../../models/user';
import { UserCardService } from './user-card.service';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  //public user: User = new User(-1, "test", "test", "test@gmail.com", "11111", "1.1.2000.", new Date(), -1);
  public user: User;

  constructor(private userCardService: UserCardService) {
    this.user = userCardService.selectedUser();
  }

}
