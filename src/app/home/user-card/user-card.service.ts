import { Injectable, signal } from '@angular/core';
import { User } from '../../models/user';
import { enviroment } from '../../env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Role } from '../../models/role';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserCardService {

  public selectedUser = signal<User>(new User(-1, "test", "test", "test@gmail.com", "11111", "1.1.2000.", new Date(), -1));
  private headers: HttpHeaders = new HttpHeaders().append('Authorization', `Bearer ${localStorage.getItem("token")}`);
  public roles: Role[] = [];

  constructor(private http: HttpClient) {

  }

  getRoles() {
    const url = `http://${enviroment.domain}:${enviroment.port}/admin/roles`;

    return this.http.get<Role[]>(url, {headers: this.headers}).pipe(
      map(
        resData => {
          return resData;
        }
      )
    );
  }

  addRoleToAUser(userId: number, roleId: number) {
    const url = `http://${enviroment.domain}:${enviroment.port}/admin/user/${userId}`;

    return this.http.patch<ResponseMessage>(url, roleId, {headers: this.headers}).pipe(
      map(
        res => {
          return res;
        }
      )
    );
  }
}

interface ResponseMessage {
  message: string
}