import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button' 
import { MatTableModule } from '@angular/material/table' 
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule  } from '@angular/material/form-field'
import { MatInputModule  } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatCardModule } from '@angular/material/card'

const materialModules = [
  MatButtonModule,
  MatTableModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatSelectModule,
]

@NgModule({
  imports: [materialModules],
  exports: [materialModules],
})
export class MaterialModule { }
