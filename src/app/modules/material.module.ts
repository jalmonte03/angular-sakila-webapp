import { NgModule } from "@angular/core";

//Material Modules
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    exports: [
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatCardModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule
    ],
    providers: [],
    declarations: []
})
export class MaterialModule{}