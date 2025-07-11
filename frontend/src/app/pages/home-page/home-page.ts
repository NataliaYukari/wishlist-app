import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';

import { TitleComponent } from '../../components/title-component/title-component';
import { InputComponent } from '../../components/input-component/input-component';
import { ButtonComponent } from '../../components/button-component/button-component';
import { IconButtonComponent } from '../../components/icon-button-component/icon-button-component';
import { ItemCardComponent } from '../../components/item-card-component/item-card-component';

@Component({
  selector: 'app-home-page',
  imports: [
    CommonModule,
    TitleComponent,
    ButtonComponent,
    InputComponent,
    MatIconModule,
    IconButtonComponent,
    ItemCardComponent
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {

}
