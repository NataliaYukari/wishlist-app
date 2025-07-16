import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatDialogRef, MatDialogContent } from '@angular/material/dialog';

import { InputComponent } from '../../components/input-component/input-component';
import { ButtonComponent } from '../../components/button-component/button-component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TitleComponent } from "../../components/title-component/title-component";

import { NewUserService } from '../../services/newUser.service';

@Component({
  selector: 'app-new-user-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputComponent,
    ButtonComponent,
    TitleComponent,
    MatDialogContent,
],
  templateUrl: './new-user-page.html',
  styleUrl: './new-user-page.css'
})
export class NewUserPage {
  email='';
  password= '';
  confirmPassword= '';

  constructor(
    private router: Router,
    private newUserService: NewUserService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<NewUserPage>
  ) {}

  handleNewUser(): void {
    if (!(this.password === this.confirmPassword)) {
      const snackMessage = this.snackBar.open('Passwords are different', 'Close')
      return;
    }

    this.newUserService.newUser(this.email, this.password).subscribe({
      next: (response) => {
        console.log("Success in creating new user:", response);
        this.snackBar.open('New account created','Close', {duration: 2000});
        this.dialogRef.close(true);
      },

      error: (errorResponse) => {
        console.log("Error in registration:", errorResponse);
        this.snackBar.open("Error in creating account", 'Close', {duration: 5000});
      }
    });
  }
}
