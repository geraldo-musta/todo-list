import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityList } from 'src/app/models/todo-model';
import { ActivityService } from 'src/app/service/activity.service';
import { ModalConfirm } from 'src/app/shared/models/popup-modal';
import { NotificationService } from 'src/app/shared/service/notification.service';

@Component({
  selector: 'app-delete-activity',
  templateUrl: './delete-activity.component.html',
  styleUrls: ['./delete-activity.component.scss'],
})
export class DeleteActivityComponent implements OnInit {
  userId!: number;
  isDeletePopupVisible: boolean = true;
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
    this.isDeletePopupVisible = true;
    this.getActivityById(this.userId);
  }

  getActivityById(id: number) {
    this.service.getTodoListById(id).subscribe({
      next: (res: ActivityList) => {
        this.selectedActivity = res;
      },
      error: () => {},
      complete: () => {
        this.modalPopupConfig = {
          height: '30%',
          width: '40%',
          title: `Delete ${this.selectedActivity.name}`,
          message: `Are you sure you want to delete activity ${this.selectedActivity.name}`,
          labelClose: 'Cancel',
          labelSubmit: 'Delete',
          eventButtonColor: 'red',
        };
      },
    });
  }

  deleteActivity(id: number) {
    this.isLoadingVisible = true;
    this.service.deleteActivity(id).subscribe({
      next: () => {
        setTimeout(() => {
          this.isLoadingVisible = false;
          this.router.navigate(['/manage-todo-list']);
        }, 1000);
        this.notify.success('Activity deleted successfully');
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
