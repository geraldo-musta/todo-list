import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityList } from 'src/app/models/todo-model';
import { ActivityService } from 'src/app/service/activity.service';
import { NotificationService } from 'src/app/shared/service/notification.service';

@Component({
  selector: 'app-update-activity',
  templateUrl: './update-activity.component.html',
  styleUrls: ['./update-activity.component.scss'],
})
export class UpdateActivityComponent implements OnInit {
  userId!: number;
  selectedActivity!: ActivityList;
  isLoadingVisible: boolean = true;

  constructor(
    private service: ActivityService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notify: NotificationService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.userId = +params['id'];
    });
  }

  ngOnInit(): void {
    this.getActivityById(this.userId);
  }

  getActivityById(id: number) {
    this.service.getTodoListById(id).subscribe({
      next: (res: ActivityList) => {
        this.selectedActivity = res;
        setTimeout(() => {
          this.isLoadingVisible = false;
        }, 250);
      },
      error: () => {
        this.isLoadingVisible = false;
      },
    });
  }

  updateActivity(model: ActivityList) {
    this.isLoadingVisible = true;
    this.service.updateActivity(model).subscribe({
      next: () => {
        setTimeout(() => {
          this.isLoadingVisible = false;
          this.router.navigate(['/manage-todo-list']);
        }, 250);
        this.notify.success('Activity updated successfully');
      },
      error: (err) => {
        this.isLoadingVisible = false;
        this.notify.error(err.statusText);
      },
    });
  }

  goBack() {
    this.router.navigate(['/manage-todo-list']);
  }
}
