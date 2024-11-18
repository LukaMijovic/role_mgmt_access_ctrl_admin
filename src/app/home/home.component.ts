import { Component, Input, signal } from '@angular/core';
import { User } from '../models/user';
import { CommonModule, NgFor } from '@angular/common';
import { HomeService } from './home.service';
import { UserCardComponent } from './user-card/user-card.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { Device } from '../models/device';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTabGroup,
    MatTab,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @Input() public  uList: User[] = this.homeService.userList();
  @Input() public dList: Device[] = this.homeService.deviceList();
  @Input() public usersWithDevices: User[] = [new User(-1, "Test", "Testic", "test@test.com", "99999", "01.01.1999.", new Date(), -1)];
  
  constructor(private homeService: HomeService) {
    console.log(this.usersWithDevices);
  }

  // protected addUserToList(u: User) {
  //   this.userList.push(u)
  // }

  // ngOnChanges() {
  //   this.uList = this.homeService.userList;
  // }

  ngOnInit() {
    this.homeService.getAllRegistraionConfirmations().subscribe(
      users => {
        //console.log(users)

        if (users === null) {
          users = [];
        }

        this.homeService.userList.set(users)
        this.uList = users;
      }
    );

    this.homeService.getAllUserDevices().subscribe(
      devices => {
        if (devices === null) {
          devices = [];
        }

        this.homeService.deviceList.set(devices);
        this.dList = devices;

        let userIds: number[] = [];

        this.dList.forEach((device) => {
          userIds.push(device.UserID);
        });

        //console.log(userIds);

        this.homeService.getAllUsersWithIds(userIds).subscribe(
          users => {
            //console.log(users);
            this.usersWithDevices = users;
          }
        );
      }
    );
  }

  openUserDetails(user: User) {
    //console.log(user);
    const url = `/home/user/${user.UserID}/details`;
    this.homeService.openUserDetails(url, user);
  }

  deleteDeviceOfTheUser() {
    console.log(this.dList[0].IMEI)
  }
}
