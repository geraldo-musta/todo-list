import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityList } from 'src/app/models/todo-model';
import { ActivityService } from 'src/app/service/activity.service';
import { NotificationService } from 'src/app/shared/service/notification.service';

@Component({
  selector: 'app-add-new-activity',
  templateUrl: './add-new-activity.component.html',
  styleUrls: ['./add-new-activity.component.scss'],
})
export class AddNewActivityComponent implements OnInit {
  isLoadingVisible: boolean = false;
  newActivity!: ActivityList;

  constructor(
    private service: ActivityService,
    private router: Router,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.newActivity = {
      id: 0,
      name: '',
      description: '',
      priority: '',
      isCompleted: false,
    };
  }

  addActivity(model: ActivityList) {
    this.isLoadingVisible = true;
    this.service.addTodoList(model).subscribe({
      next: () => {
        setTimeout(() => {
          this.isLoadingVisible = false;
          this.router.navigate(['/manage-todo-list']);
        }, 300);
        this.notify.success('Activity added successfully');
      },
      error: (err) => {
        this.isLoadingVisible = false;
        this.notify.error(err.message || err.statusText);
      },
    });
  }

  goBack() {
    this.router.navigate(['/manage-todo-list']);
  }
}
