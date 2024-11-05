import { Injectable, signal } from '@angular/core';
import { UserCredentialDTO } from './models/dto/userCredentialDTO';
import { HomeComponent } from './home/home.component';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { User } from './models/user';
import { enviroment } from './env';
import { map, reduce } from 'rxjs';
import { HomeService } from './home/home.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketConnectionService {

  //user = signal<User>(new User(-1, "test", "test", "test@gmail.com", "11111", "1.1.2000.", new Date(), -1));
  user: User = new User(-1, "test", "test", "test@gmail.com", "11111", "1.1.2000.", new Date(), -1);

  private headers: HttpHeaders = new HttpHeaders().append('Authorization', `Bearer ${localStorage.getItem("token")}`);

  constructor(private homeService: HomeService, private http: HttpClient) { }

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

