import {NgModule } from "@angular/core";
import { FormPopupComponent } from "./form-popup.component";
import {
    DxButtonModule,
    DxPopupModule,
  } from 'devextreme-angular';
  @NgModule({
    declarations: [FormPopupComponent],
    imports: [DxPopupModule, DxButtonModule],
    exports: [FormPopupComponent],
  })
  export class FormPopupModule {}