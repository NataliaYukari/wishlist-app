import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

import { TitleComponent } from '../../components/title-component/title-component';
import { InputComponent } from '../../components/input-component/input-component';
import { ButtonComponent } from '../../components/button-component/button-component';
import { IconButtonComponent } from '../../components/icon-button-component/icon-button-component';
import { ItemCardComponent } from '../../components/item-card-component/item-card-component';
import { NewItemPage } from '../new-item-page/new-item-page';

@Component({
  selector: 'app-home-page',
  imports: [
    CommonModule,
    TitleComponent,
    ButtonComponent,
    InputComponent,
    MatIconModule,
    IconButtonComponent,
    ItemCardComponent,
    MatDialogModule
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})

export class HomePage {

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) {}

  openNewItemModal(): void {
    const dialogRef = this.dialog.open(NewItemPage, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/home']);
      }
    });
  }

}
