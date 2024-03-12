import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarAlertComponent } from '../components/snackbar-alert/snackbar-alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private _snackbar: MatSnackBar) { }

  sendWarning(message: string) {
    this._snackbar.openFromComponent(SnackbarAlertComponent, {
      data: {
        message
      },
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 5000
    })
  }
}
