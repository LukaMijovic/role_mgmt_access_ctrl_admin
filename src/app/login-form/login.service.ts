import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AdminCredentialDTO } from '../models/adminCredentialDTO';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  loginAdmin(email: string, password: string) {

    const url = "http://localhost:8080/admin/login";

    const credentials: AdminCredentialDTO = new AdminCredentialDTO(email, password);

    this.http.post<LoginResponse>(url, credentials).subscribe(
      (resData) => {
        console.log(resData.user_id + "\n" + resData.token);
        return;
      }
    );
  }
}

interface LoginResponse {
  user_id: string;
  token: string;
}
