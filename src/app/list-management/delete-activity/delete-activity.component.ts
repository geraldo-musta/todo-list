import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() set selectedActivity(ret: ActivityList) {
    if (ret) {
      this._activity = ret;
    }
  }
  @Input() isDeleteModalVisible!: boolean;
  @Output() isDeleteModalVisibleChange = new EventEmitter<boolean>();
  @Output() submitEvent = new EventEmitter<boolean>();
  @Output() isLoadingVisible = new EventEmitter<boolean>();
  userId!: number;
  _activity!: ActivityList;
  modalPopupConfig!: ModalConfirm;
  constructor(
    private service: ActivityService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.userId = this._activity.id;
    this.configureModal();
  }

  configureModal() {
    this.modalPopupConfig = {
      height: '30%',
      width: '40%',
      title: `Delete ${this._activity.name}`,
      message: `Are you sure you want to delete activity ${this._activity.name}`,
      labelClose: 'Cancel',
      labelSubmit: 'Delete',
      eventButtonColor: 'red',
    };
  }

  deleteActivity(id: number) {
    this.isLoadingVisible.emit(true);
    this.service.deleteActivity(id).subscribe({
      next: () => {
        this.isDeleteModalVisibleChange.emit(this.isDeleteModalVisible);
        this.notify.success('Activity deleted successfully');
      },
      error: (err) => {
        this.notify.error(err.statusText);
      },
      complete: () => {
        this.isLoadingVisible.emit(false);
        this.submitEvent.emit(true);
      },
    });
  }

  goBack() {
    setTimeout(() => {
      this.isDeleteModalVisibleChange.emit(this.isDeleteModalVisible);
    }, 250);
  }
}
