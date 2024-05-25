import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormPopupModule } from './shared/form-popup/form-popup.module';
import { MainListComponent } from './list-management/main-list/main-list.component';
import { AddNewActivityComponent } from './list-management/add-new-activity/add-new-activity.component';
import { UpdateActivityComponent } from './list-management/update-activity/update-activity.component';
import { DeleteActivityComponent } from './list-management/delete-activity/delete-activity.component';
import { CompleteActivityComponent } from './list-management/complete-activity/complete-activity.component';
import { FormActivityComponent } from './shared/form-activity/form-activity.component';
import { DxLoadPanelModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    AppComponent,
    MainListComponent,
    AddNewActivityComponent,
    UpdateActivityComponent,
    DeleteActivityComponent,
    CompleteActivityComponent,
    FormActivityComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    FormPopupModule,
    ReactiveFormsModule,
    DxLoadPanelModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
