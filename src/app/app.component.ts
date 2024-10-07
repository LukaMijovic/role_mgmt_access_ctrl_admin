import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import { RegistrationFormComponent } from './registration-form/registration-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    MatTabsModule,
    RegistrationFormComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'role_mgmt_access_ctrl_admin';
}
