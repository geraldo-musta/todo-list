import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainListComponent } from './list-management/main-list/main-list.component';
import { AddNewActivityComponent } from './list-management/add-new-activity/add-new-activity.component';
import { UpdateActivityComponent } from './list-management/update-activity/update-activity.component';
import { DeleteActivityComponent } from './list-management/delete-activity/delete-activity.component';
import { CompleteActivityComponent } from './list-management/complete-activity/complete-activity.component';

const routes: Routes = [
  {path: '', redirectTo: '/manage-todo-list', pathMatch: 'full'},
  {path: 'manage-todo-list', component: MainListComponent},
  {path: 'add-activity', component: AddNewActivityComponent},
  {path: 'update-activity', component: UpdateActivityComponent},
  {path: 'delete-activity', component: DeleteActivityComponent},
  {path: 'complete-activity', component: CompleteActivityComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
