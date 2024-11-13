import { EventEmitter, Injectable, Output, signal } from '@angular/core';
import { User } from '../../models/user';
import { enviroment } from '../../env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Role } from '../../models/role';
import { BehaviorSubject, map, Observable, ReplaySubject, Subject } from 'rxjs';
import { UserRoleDTO } from '../../models/dto/userRoleDTO';
import { WebSocketConnectionService } from '../../web-socket-connection.service';

@Injectable({
  providedIn: 'root'
})
export class UserCardService {

  public selectedUser = signal<User>(new User(-1, "test", "test", "test@gmail.com", "11111", "1.1.2000.", new Date(), -1));
  private headers: HttpHeaders = new HttpHeaders().append('Authorization', `Bearer ${localStorage.getItem("token")}`);
  public roles: Role[] = [];
  //@Output() responseEvent: EventEmitter<UserRoleDTO> = new EventEmitter<UserRoleDTO>(false);
  source: Subject<UserRoleDTO> = new ReplaySubject<UserRoleDTO>();
  //userRoleData$: Observable<UserRoleDTO> = this.source.asObservable();

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

    //console.log({userId, roleId});
    // WebSocketConnectionService.subject.next({
    //   "User_id": userId,
    //   "Role_id": roleId
    // });


    //this.source.next({User_id: userId, Role_id: roleId});

    //console.log(userId + " " + roleId);
    //this.responseEvent.emit({User_id: userId, Role_id: roleId});
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