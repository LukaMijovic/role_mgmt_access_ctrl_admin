import { Component, Input } from '@angular/core';
import { User } from '../models/user';
import { CommonModule, NgFor } from '@angular/common';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @Input() public  uList: User[] = this.homeService.userList;

  constructor(private homeService: HomeService) {}

  // protected addUserToList(u: User) {
  //   this.userList.push(u)
  // }
}
