import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountModel } from 'src/app/models/counter-model';
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
  countModel: CountModel;
  filter: string = 'All';

  isDeleteModalVisible!: boolean;
  isCompleteModalVisivle!: boolean;
  isLoadingVisible: boolean = false;

  constructor(
    private service: ActivityService,
    private router: Router,
    private notify: NotificationService
  ) {
    this.countModel = {
      totalCountTitle: 'Total Activities',
      showAllCount: true,
      color: 'grey',
    } as CountModel;
  }

  ngOnInit(): void {
    this.getAllActivityList();
  }

  getAllActivityList() {
    this.service.getTodoList().subscribe({
      next: (activities) => {
        this.activityList = activities;
        this.countModel.totalCount = activities.length;
        this.countModel.completedCount = activities.filter(
          (activity) => activity.isCompleted
        ).length;
        this.countModel.incompleteCount = activities.filter(
          (activity) => !activity.isCompleted
        ).length;
        this.applyFilter();
      },
      error: (err) => {
        this.notify.error(`${err.statusText}: please retry again`);
      },
    });
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
        this.countModel.totalCount = this.filterList.length;
        this.countModel.showAllCount = false;
        this.countModel.totalCountTitle = 'Total Completed';
        this.countModel.color = 'green';
        break;
      case 'Incomplete':
        this.filterList = this.activityList.filter(
          (activity) => !activity.isCompleted
        );
        this.countModel.totalCount = this.filterList.length;
        this.countModel.showAllCount = false;
        this.countModel.totalCountTitle = 'Total Incomplete';
        this.countModel.color = 'orange';
        break;
      default:
        this.filterList = this.activityList;
        this.countModel.totalCount = this.filterList.length;
        this.countModel.showAllCount = true;
        this.countModel.totalCountTitle = 'Total Activities';
        this.countModel.color = 'grey';
    }
  }

  addActivity() {
    this.router.navigate(['/add-activity']);
  }
  editactivity(activity: ActivityList) {
    this.router.navigate(['/update-activity', activity.id]);
  }
  deleteactivity(activity: ActivityList) {
    this.isDeleteModalVisible = true;
    this.selectedActivity = activity;
  }
  completeActivity(activity: ActivityList) {
    this.isCompleteModalVisivle = true;
    this.selectedActivity = activity;
  }
  showLoadPanel(event: boolean) {
    this.isLoadingVisible = event;
  }
  refreshList(event: boolean) {
    if (event) {
      this.getAllActivityList();
    }
  }
}
