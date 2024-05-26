import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() set selectedActivity(ret: ActivityList) {
    if (ret) {
      this._activity = ret;
    }
  }
  @Input() isCompleteModalVisible: boolean = true;
  @Output() isCompleteModalVisibleChange = new EventEmitter<boolean>();
  @Output() submitEvent = new EventEmitter<boolean>();
  @Output() isLoadingVisible = new EventEmitter<boolean>();
  modalPopupConfig!: ModalConfirm;
  _activity!: ActivityList;
  constructor(
    private service: ActivityService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.configureModal();
  }

  configureModal() {
    this.modalPopupConfig = {
      height: '30%',
      width: '35%',
      title: `Complete ${this._activity.name}`,
      message: 'This action is not reversible!',
      labelClose: 'Cancel',
      labelSubmit: 'Complete',
      eventButtonColor: 'green',
    };
  }

  completeActivity(data: ActivityList) {
    data.isCompleted = true;
    this.isLoadingVisible.emit(true);
    this.service.updateActivity(data).subscribe({
      next: () => {
        this.isCompleteModalVisible = false;
        this.isCompleteModalVisibleChange.emit(this.isCompleteModalVisible);
        this.notify.success('Activity marked as complete successfully');
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
      this.isCompleteModalVisibleChange.emit(this.isCompleteModalVisible);
    }, 250);
  }
}
