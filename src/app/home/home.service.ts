import { Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroment } from '../env';
import { map, single } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  public userList = signal<User[]>([])
  //userList = signal<User[]>([]);
  private headers: HttpHeaders = new HttpHeaders().append('Authorization', `Bearer ${localStorage.getItem("token")}`);

  constructor(private http: HttpClient) { 
    
  }

  addUser(u: User) {
    //console.log("Adding new user to list");
    //this.userList().push(u);
    //this.userList.set(this.userList());
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
}
