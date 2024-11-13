import { Injectable } from '@angular/core';
import { UserCredentialDTO } from './models/dto/userCredentialDTO';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { User } from './models/user';
import { enviroment } from './env';
import { map, skip, Subscription } from 'rxjs';
import { HomeService } from './home/home.service';
import { webSocket } from 'rxjs/webSocket';
import { UserCardService } from './home/user-card/user-card.service';
import { UserRoleDTO } from './models/dto/userRoleDTO';
import { L } from '@angular/cdk/keycodes';

@Injectable({
  providedIn: 'root'
})
export class WebSocketConnectionService {

  //user = signal<User>(new User(-1, "test", "test", "test@gmail.com", "11111", "1.1.2000.", new Date(), -1));
  user: User = new User(-1, "test", "test", "test@gmail.com", "11111", "1.1.2000.", new Date(), -1);
  subject = webSocket("ws://localhost:8080/admin/connect");
  private headers: HttpHeaders = new HttpHeaders().append('Authorization', `Bearer ${localStorage.getItem("token")}`);

  constructor(private homeService: HomeService, private http: HttpClient, private userCardService: UserCardService) { 

  }

  connect() {
    this.subject.subscribe({
      next: (msg) => this.handleConnection(msg),
      error: (e) => console.log(e),
      complete: () => console.log("Connection closed.")
    })
  }

  // static handleEvent(data: UserRoleDTO) {
   

  //   WebSocketConnectionService.subject.next(data);
  // }

  handleConnection(msg: any) {
    //console.log(msg)
    const uc: UserCredentialDTO = msg
    //console.log(uc.Email)

    //console.log(uc);
    //this.homeComp.addUserToList()
    this.getUserInfo(uc.UserId).subscribe(user => {
      //console.log(user);
      this.user = user;
      this.homeService.addUser(this.user);
    });

    //this.subject.next({User_id: 2, Role_id: 2});

    // console.log("Prosao prvi sub");
    //let userRoledto: UserRoleDTO = {User_id: -1, Role_id: -1};

    // this.userCardService.source.subscribe(
    //   (data: UserRoleDTO) => {
    //     console.log("Catchovo event: " + data.Role_id);
    //     //WebSocketConnectionService.subject.subscribe();
        
    //     //WebSocketConnectionService.subject.next(data);
    //     //console.log(WebSocketConnectionService.subject);
    //     this.subject.next(data);
    //     //console.log(this.subject);
    //   }
    // );

    // let res = await this.userCardService.source.toPromise();
    // this.subject.next(res);
    

  //  const pipedObv = this.userCardService.userRoleData$.pipe(
  //     //skip(1)
  //   );

  //   pipedObv.subscribe(
  //     (data: UserRoleDTO) => {
  //       console.log("Catchovo event: " + data.Role_id);
  //       //WebSocketConnectionService.subject.subscribe();
        
  //       WebSocketConnectionService.subject.next(data);
  //       //console.log(WebSocketConnectionService.subject);
  //     }
  //   );


    console.log("Prosao event");
  }

  getUserInfo(userId: number){
    const url = `http://${enviroment.domain}:${enviroment.port}/admin/user/${userId}`;

    //console.log(this.headers.get("Authorization"));

    return this.http.get<User>(url, {headers: this.headers}).pipe(
      map(
        resData => {
          var u: User = new User(
            userId,
            resData.Firstname,
            resData.Lastname,
            resData.Email,
            resData.Telephone,
            resData.Birthdate,
            resData.UserRegistrationDate,
            -1
          );
        
          return u;
        }
      )
    )
    
    // return this.http.get<User>(url, {headers: this.headers}).subscribe(
    //   (resData) => {
    //     var u: User = new User(
    //       userId,
    //       resData.Firstname,
    //       resData.Lastname,
    //       resData.Email,
    //       resData.Telephone,
    //       resData.Birthdate,
    //       resData.userRegistration,
    //       -1
    //     );

    //     return u;
    //   }
    // )
    
  }
}

