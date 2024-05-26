import {NgModule } from "@angular/core";
import { FormPopupComponent } from "./form-popup.component";
import {
    DxButtonModule,
    DxPopupModule,
  } from 'devextreme-angular';
import { CommonModule } from "@angular/common";
  @NgModule({
    declarations: [FormPopupComponent],
    imports: [CommonModule, DxPopupModule, DxButtonModule],
    exports: [FormPopupComponent],
  })
  export class FormPopupModule {}