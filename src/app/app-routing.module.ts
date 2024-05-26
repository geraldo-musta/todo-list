import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainListComponent } from './list-management/main-list/main-list.component';
import { AddNewActivityComponent } from './list-management/add-new-activity/add-new-activity.component';
import { UpdateActivityComponent } from './list-management/update-activity/update-activity.component';

const routes: Routes = [
  {path: '', redirectTo: '/manage-todo-list', pathMatch: 'full'},
  {path: 'manage-todo-list', component: MainListComponent},
  {path: 'add-activity', component: AddNewActivityComponent},
  {path: 'update-activity/:id', component: UpdateActivityComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
