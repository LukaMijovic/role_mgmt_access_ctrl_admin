import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from '../registration-form/registration-form.component';
import { MatTab, MatTabGroup } from '@angular/material/tabs';


@Component({
  selector: 'app-initial',
  standalone: true,
  imports: [  
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIcon,
    MatButton,
    LoginFormComponent,
    RegistrationFormComponent,
    MatTab,
    MatTabGroup,
  ],
  templateUrl: './initial.component.html',
  styleUrl: './initial.component.scss'
})
export class InitialComponent {

}
