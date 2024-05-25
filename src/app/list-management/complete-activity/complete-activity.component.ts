import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityList } from 'src/app/models/todo-model';
import { ActivityService } from 'src/app/service/activity.service';
import { ModalConfirm } from 'src/app/shared/models/popup-modal';
import { NotificationService } from 'src/app/shared/service/notification.service';

@Component({
  selector: 'app-complete-activity',
  templateUrl: './complete-activity.component.html',
  styleUrls: ['./complete-activity.component.scss'],
})
export class CompleteActivityComponent implements OnInit {
  userId!: number;
  isPopupVisible: boolean = true;
  isLoadingVisible: boolean = false;
  modalPopupConfig!: ModalConfirm;
  selectedActivity!: ActivityList;

  constructor(
    private service: ActivityService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notify: NotificationService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.userId = +params['id'];
    });
  }

  ngOnInit(): void {
    this.isPopupVisible = true;
    this.getActivityById(this.userId);
  }

  getActivityById(id: number) {
    this.service.getTodoListById(id).subscribe({
      next: (res: ActivityList) => {
        this.selectedActivity = res;
      },
      error: (err) => {
        this.notify.error(err.statusText);
      },
      complete: () => {
        this.modalPopupConfig = {
          height: '30%',
          width: '35%',
          title: `Complete ${this.selectedActivity.name}`,
          message: 'This action is not reversible!',
          labelClose: 'Cancel',
          labelSubmit: 'Complete',
          eventButtonColor: 'green',
        };
      },
    });
  }

  completeActivity(data: ActivityList) {
    data.isCompleted = true;
    this.isLoadingVisible = true;
    this.service.updateActivity(data).subscribe({
      next: () => {
        setTimeout(() => {
          this.isLoadingVisible = false;
          this.router.navigate(['/manage-todo-list']);
        }, 300);
        this.notify.success('Activity marked as complete successfully');
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
