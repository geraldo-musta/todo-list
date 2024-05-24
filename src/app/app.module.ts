import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainListComponent } from './list-management/main-list/main-list.component';
import { AddNewActivityComponent } from './list-management/add-new-activity/add-new-activity.component';
import { UpdateActivityComponent } from './list-management/update-activity/update-activity.component';
import { DeleteActivityComponent } from './list-management/delete-activity/delete-activity.component';
import { CompleteActivityComponent } from './list-management/complete-activity/complete-activity.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainListComponent,
    AddNewActivityComponent,
    UpdateActivityComponent,
    DeleteActivityComponent,
    CompleteActivityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
