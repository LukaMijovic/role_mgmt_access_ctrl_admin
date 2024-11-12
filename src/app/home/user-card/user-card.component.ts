import { Component, Input, signal } from '@angular/core';
import { User } from '../../models/user';
import { UserCardService } from './user-card.service';
import {MatCardModule} from '@angular/material/card';
import { HomeService } from '../home.service';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { Role } from '../../models/role';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule, 
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  //public user: User = new User(-1, "test", "test", "test@gmail.com", "11111", "1.1.2000.", new Date(), -1);
  public user: User;
  public roles: Role[] = [];
  public description = signal<string>("");

  constructor(private userCardService: UserCardService, private homeService: HomeService, private router: Router) {
    this.user = userCardService.selectedUser();
  }

  ngOnInit() {
    this.homeService.getAllRegistraionConfirmations().subscribe(
      users => {
        //console.log(users)
        //this.homeService.userList.set(users);

        for (let i = 0; i < users.length; i++) {
          if (users[i].UserID === Number(localStorage.getItem("selectedUser"))) {
            console.log(users[i])
            this.user = users[i];
          
            break;
          }
        } 
      }
    );

    this.userCardService.getRoles().subscribe(
      roles => {
        this.roles = roles;
      }
    )
  }

  readDescription(roleId: number) {
    for (let i = 0; i < this.roles.length; i++) {
      if (this.roles[i].RoleID == roleId) {
        this.description.set(this.roles[i].RoleDescription);

        return;
      }
    }
  }

  updateUser(roleId: number) {
    this.userCardService.addRoleToAUser(this.user.UserID, roleId).subscribe(
      res => {
        alert(res.message);

        this.router.navigateByUrl("/home");
      }
    );
  }

}
