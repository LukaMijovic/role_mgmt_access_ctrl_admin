import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [
    MatCardModule,
  ],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss'
})
export class RegistrationFormComponent {

}
