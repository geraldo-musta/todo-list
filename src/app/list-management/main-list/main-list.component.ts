import { Component } from '@angular/core';
import { ActivityList } from 'src/app/models/todo-model';

@Component({
  selector: 'app-main-list',
  templateUrl: './main-list.component.html',
  styleUrls: ['./main-list.component.scss']
})
export class MainListComponent {
activityList: ActivityList[] = [
  {id: 1,  name: 'Task Angular', description: 'Frontend', priority: 'High', deadLine: new Date('2023-05-25'), isCompleted: false },
  {id: 2, name: 'Task C#', description: 'Backend', priority: 'Normal', deadLine: new Date('2023-06-15'), isCompleted: false },
];

selectedActivity!: ActivityList;

constructor() {
}

editactivity(activity: ActivityList) {
  this.selectedActivity = activity
}
deleteactivity(activity: ActivityList) {
  this.selectedActivity.id = activity.id
}
completeActivity(activity: ActivityList) {
  activity.isCompleted = !activity.isCompleted
}

}
