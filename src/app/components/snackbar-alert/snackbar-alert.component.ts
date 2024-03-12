import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar-alert',
  templateUrl: './snackbar-alert.component.html',
  styleUrl: './snackbar-alert.component.scss'
})
export class SnackbarAlertComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackbarAlertData
  ) {}
}

export type SnackbarAlertData = {
  message: string
};
