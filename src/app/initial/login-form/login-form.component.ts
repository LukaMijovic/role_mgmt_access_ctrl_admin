import { ChangeDetectionStrategy, Component, Input, NgModule, Output, signal } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIcon,
    MatButtonModule,
    MatButton,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  protected hide = signal(true);
  protected email!: string;
  protected password!: string;
  
  constructor(private loginService: LoginService) {}
  
  onSubmit() {
    //console.log("Form values: ", this.email, " ", this.password);
    this.loginService.loginAdmin(this.email, this.password);
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
