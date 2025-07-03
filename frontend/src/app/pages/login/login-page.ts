import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { TitleComponent } from '../../components/title-component/title-component';
import { InputComponent } from '../../components/input-component/input-component';
import { ButtonComponent } from '../../components/button-component/button-component'; 

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
    imports: [
    CommonModule,
    FormsModule,
    TitleComponent,
    InputComponent,
    ButtonComponent,
    MatSnackBarModule,
],
})

export class LoginPage {
  email= '';
  password= '';
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  handleLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log(response);

        if (response.token) {
          this.authService.setToken(response.token);
          const snackMessage = this.snackBar.open('Signing in...', 'Close', {
            duration: 0,
          });

          setTimeout(() => {
            snackMessage.dismiss();
            this.router.navigate(['home']);
          }, 1000);

        } else {
          this.snackBar.open('Login failed: invalid token', 'Close', {
            duration: 3000
          });
        }
      },

      error: () => {
        this.snackBar.open('Incorrect e-mail or password', 'Close', {
          duration: 3000
        });
      }
    });
  } 
}
