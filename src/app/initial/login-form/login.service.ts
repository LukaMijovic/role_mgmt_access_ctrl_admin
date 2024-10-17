import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminCredential } from '../../models/adminCredential';
import { enviroment } from '../../env';
import { LoginResponseDTO } from '../../models/dto/loginResponseDTO';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) { }

  loginAdmin(email: string, password: string) {

    const url = `http://${enviroment.domain}:${enviroment.post}/admin/login`;

    const credentials: AdminCredential = new AdminCredential(email, password);

    this.http.post<LoginResponseDTO>(url, credentials).subscribe(
      (resData) => {
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.user_id);
        
        this.router.navigateByUrl("/home");
      }
    );
  }
}
