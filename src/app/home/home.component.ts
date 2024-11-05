import { Component, Input } from '@angular/core';
import { User } from '../models/user';
import { CommonModule, NgFor } from '@angular/common';
import { HomeService } from './home.service';
import { UserCardComponent } from './user-card/user-card.component';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @Input() public  uList: User[] = this.homeService.userList();

  constructor(private homeService: HomeService) {}

  // protected addUserToList(u: User) {
  //   this.userList.push(u)
  // }

  // ngOnChanges() {
  //   this.uList = this.homeService.userList;
  // }

  ngOnInit() {
    this.homeService.getAllRegistraionConfirmations().subscribe(
      users => {
        console.log(users)
        this.homeService.userList.set(users)
        this.uList = users;
      }
    );
  }
}
