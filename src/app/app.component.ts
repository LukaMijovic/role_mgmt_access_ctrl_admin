import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './initial/login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { webSocket } from "rxjs/webSocket";
import { WebSocketConnectionService } from './web-socket-connection.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    MatTabsModule,
    RegistrationFormComponent,
    LoginFormComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'role_mgmt_access_ctrl_admin';
  subject = webSocket("ws://localhost:8080/admin/connect");

  constructor(private webSocketConn: WebSocketConnectionService) {}

  ngOnInit() {
    console.log("Connection start");
    this.subject.subscribe({
      next: (msg) => this.webSocketConn.handleConnection(msg),
      error: (e) => console.log(e),
      complete: () => console.log("Connection closed.")
    })
  }
}
