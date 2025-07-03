import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
//import { AuthService } from '../services/auth.service';

import { TitleComponent } from '../../components/title-component/title-component';
import { InputComponent } from "../../components/input-component/input-component";
import { ButtonComponent } from "../../components/button-component/button-component"; 

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
    imports: [
    CommonModule,
    FormsModule,
   // Router,
    TitleComponent,
    InputComponent,
    ButtonComponent
],
})

export class LoginPage {
  email= '';
  password= '';
  message= '';
  
  /*
  constructor (
    private router: Router,
    private authService: AuthService,
  )

  handleLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log(response);

        this.AuthService.setToken(response.token);

        if (response.token) {
          this.message = "Signing in"
          this.router.navigate(['home']);
        }
      },

      error: (error) => {
        this.message = "Incorrect u-mail or password"
      }
    });
  } */
}
