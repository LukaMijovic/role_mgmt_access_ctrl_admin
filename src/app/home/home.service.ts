import { Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroment } from '../env';
import { map, single } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCardService } from './user-card/user-card.service';
import { Device } from '../models/device';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  public userList = signal<User[]>([]);
  public deviceList = signal<Device[]>([]);
  //userList = signal<User[]>([]);
  private headers: HttpHeaders = new HttpHeaders().append('Authorization', `Bearer ${localStorage.getItem("token")}`);

  constructor(private http: HttpClient, private router: Router, private userCardService: UserCardService) { 
    
  }

  addUser(u: User) {
    //console.log("Adding new user to list");
    //this.userList().push(u);
    //this.userList.set(this.userList());

    console.log(this.userList());

    for (let i = 0; i < this.userList().length; i++) {
      if (this.userList()[i].Email === u.Email) {
        return;
      }
    }

    this.userList().push(u)

    //console.log(this.userList());
  }

  getAllRegistraionConfirmations() {
    const url = `http://${enviroment.domain}:${enviroment.port}/admin/user/confirmation`;
    
  
    return this.http.get<User[]>(url, {headers: this.headers}).pipe(
      map(
        resData => {
          return resData;
        }
      )
    )
  }

  getAllUserDevices() {
    const url = `http://${enviroment.domain}:${enviroment.port}/admin/devices`;

    return this.http.get<Device[]>(url, {headers: this.headers}).pipe(
      map(
        resData => {
          return resData;
        }
      )
    )
  }

  getAllUsersWithIds(ids: number[]) {
    const url = `http://${enviroment.domain}:${enviroment.port}/admin/device/users`;

    return this.http.post<User[]>(url, ids,{headers: this.headers}).pipe(
      map(
        resData => {
          //console.log(resData);
          return resData;
        }
      )
    )
  }

  openUserDetails(url: string, user: User) {
    this.userCardService.selectedUser.set(user);
    localStorage.setItem("selectedUser", "" + user.UserID);
    this.router.navigateByUrl(url);
  }
}
