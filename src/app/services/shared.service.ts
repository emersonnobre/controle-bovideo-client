import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private snack_bar: MatSnackBar
  ) { }

  showMessage(msg: string, is_error: boolean = false): void {
    this.snack_bar.open(msg, '', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: is_error ? ['bgRed'] : ['bgGreen']
    })
  }

}
