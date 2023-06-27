import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadArchivoComponent } from './upload-archivo.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [UploadArchivoComponent],
  imports: [
    CommonModule,
    SharedModule
  ],exports:[UploadArchivoComponent]
})
export class UploadArchivoModule { }
