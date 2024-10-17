import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './initial/login-form/login-form.component';
import { FormsModule } from '@angular/forms';

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
}
