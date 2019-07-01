import { NgModule } from '@angular/core';
import { MatNativeDateModule, MatIconModule, MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatListModule, MatSidenav, MatSidenavContent, MatSidenavModule, MatTableModule,MatSelectModule,MatSelectTrigger,MatMenuModule, MatTabsModule, MatDialogModule,MatGridListModule, MatStepperModule} from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        MatNativeDateModule, 
        MatDatepickerModule, 
        MatIconModule, 
        MatButtonModule, 
        MatCheckboxModule, 
        MatToolbarModule, 
        FormsModule, 
        MatCardModule, 
        MatFormFieldModule, 
        MatInputModule, 
        MatListModule, 
        MatRadioModule,
        MatSidenavModule,
        MatTableModule,
        MatSelectModule,
        MatMenuModule,
        MatTabsModule,
        MatDialogModule,
        MatGridListModule,
        MatStepperModule
    ],

    exports: [
        MatNativeDateModule, 
        FormsModule,
        MatDatepickerModule, 
        MatIconModule, 
        MatButtonModule, 
        MatCheckboxModule, 
        MatToolbarModule, 
        MatCardModule, 
        MatFormFieldModule, 
        MatInputModule, 
        MatListModule, 
        MatRadioModule,
        MatSidenavModule,
        MatTableModule,
        MatSelectModule,
        MatMenuModule,
        MatTabsModule,
        MatDialogModule,
        MatGridListModule,
        MatStepperModule
    ],

})

export class MyMaterialModule { }