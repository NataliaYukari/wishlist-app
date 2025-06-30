import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

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
    RouterLink,
    TitleComponent,
    InputComponent,
    ButtonComponent
],
})

export class LoginPage {
  email= '';
  password= '';
  errorMessage= '';
  loading= false;

}
