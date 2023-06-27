import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
//Pipes
import { BooleanoPipe } from './pipes/booleano.pipe';
import { CortarNombrePipe } from './pipes/cortar-nombre.pipe';
import { FormatoFechaPipe } from './pipes/formato-fecha.pipe';
import { FormatoNombrePipe } from './pipes/formato-nombre.pipe';
import { ImagenPipe } from './pipes/imagen.pipe';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';

//Angular Material
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCommonModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatLuxonDateModule } from '@angular/material-luxon-adapter';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';

//Format fecha
import { MatNativeDateModule } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { FormatoFechaHoraPipe } from './pipes/formato-fecha-hora.pipe';

@NgModule({
    declarations: [
        ImagenPipe,
        CortarNombrePipe,
        FormatoFechaPipe,
        BooleanoPipe,
        SanitizeHtmlPipe,
        SafeUrlPipe,
        FormatoNombrePipe,
        FormatoFechaHoraPipe,
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,

        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCommonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatLuxonDateModule,
        MatMenuModule,
        MatPaginatorModule,
        MatSelectModule,
        MatTableModule,
        MatTabsModule,
        MatTooltipModule,
        MatToolbarModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRippleModule,

        // MatNativeDateModule,
        // MomentDateModule,
    ],
    exports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,

        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCommonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatLuxonDateModule,
        MatMenuModule,
        MatPaginatorModule,
        MatSelectModule,
        MatTableModule,
        MatTabsModule,
        MatTooltipModule,
        MatToolbarModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRippleModule,
        // MatNativeDateModule,
        // MomentDateModule,
        ImagenPipe,
        CortarNombrePipe,
        FormatoFechaPipe,
        BooleanoPipe,
        SanitizeHtmlPipe,
        SafeUrlPipe,
        FormatoNombrePipe,
        FormatoFechaHoraPipe,
    ],
})
export class SharedModule {}
