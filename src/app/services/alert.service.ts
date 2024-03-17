import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarAlertComponent } from '../components/snackbar-alert/snackbar-alert.component';
import { HttpErrorResponse } from '@angular/common/http';

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
    });
  }

  sendHttpError(err: HttpErrorResponse) {
    let errorMessage = "Unknown error occurred.";
    
    if (err.name == "HttpErrorResponse")
    {
      errorMessage = `Error ${err.status}: "${err.statusText}"`;
    }

    this._snackbar.openFromComponent(SnackbarAlertComponent, {
      data: {
        message: errorMessage
      },
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 5000
    });
  }
}
