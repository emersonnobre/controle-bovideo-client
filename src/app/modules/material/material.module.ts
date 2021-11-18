import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button' 
import { MatTableModule } from '@angular/material/table' 
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule  } from '@angular/material/form-field'
import { MatInputModule  } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatCardModule } from '@angular/material/card'
import { MatSnackBarModule } from '@angular/material/snack-bar'

const material_modules = [
  MatButtonModule,
  MatTableModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatSelectModule,
  MatSnackBarModule,
]

@NgModule({
  imports: [material_modules],
  exports: [material_modules],
})
export class MaterialModule { }
