import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityList } from 'src/app/models/todo-model';
import { ActivityService } from 'src/app/service/activity.service';
import { NotificationService } from 'src/app/shared/service/notification.service';

@Component({
  selector: 'app-main-list',
  templateUrl: './main-list.component.html',
  styleUrls: ['./main-list.component.scss'],
})
export class MainListComponent implements OnInit {
  activityList: ActivityList[] = [];
  filterList: ActivityList[] = [];
  selectedActivity!: ActivityList;
  totalActivities!: number;
  completedActivities!: number;
  filter: string = 'All';

  constructor(
    private service: ActivityService,
    private router: Router,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.getAllActivityList();
    this.getListCount();
  }

  getAllActivityList() {
    this.service.getTodoList().subscribe({
      next: (res) => {
        this.activityList = res;
        this.totalActivities = res.length;
        this.completedActivities = res.filter(
          (activity) => activity.isCompleted
        ).length;
        this.applyFilter();
      },
      error: (err) => {
        this.notify.error(err.statusText);
      },
    });
  }

  getListCount() {
    this.service.getCountList().subscribe({
      next:(count) => {
        this.totalActivities = count.total
        this.completedActivities = count.completed
      },
      error:(err) => {
        this.notify.error(err.statusText);
      }
    })
  }

  onFilterChange(filter: string) {
    this.filter = filter;
    this.applyFilter();
  }

  applyFilter() {
    switch (this.filter) {
      case 'Completed':
        this.filterList = this.activityList.filter(
          (activity) => activity.isCompleted
        );
        break;
      case 'Incomplete':
        this.filterList = this.activityList.filter(
          (activity) => !activity.isCompleted
        );
        break;
      default:
        this.filterList = this.activityList;
    }
  }

  addActivity() {
    this.router.navigate(['/add-activity']);
  }
  editactivity(activity: ActivityList) {
    this.router.navigate(['/update-activity', activity.id]);
  }
  deleteactivity(activity: ActivityList) {
    this.router.navigate(['/delete-activity', activity.id]);
  }
  completeActivity(activity: ActivityList) {
    this.router.navigate(['/complete-activity', activity.id]);
  }
}
