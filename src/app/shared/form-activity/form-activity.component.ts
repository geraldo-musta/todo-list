import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivityList } from 'src/app/models/todo-model';

@Component({
  selector: 'app-form-activity',
  templateUrl: './form-activity.component.html',
  styleUrls: ['./form-activity.component.scss'],
})
export class FormActivityComponent implements OnInit {
  @Input() title: string = '';
  @Input() eventButtonText: string = 'Save';
  @Input() selectedActivity!: ActivityList;
  @Input() showFormID: boolean = false;
  @Output() confirm = new EventEmitter<ActivityList>();
  @Output() cancel = new EventEmitter();
  activityForm!: FormGroup;

  constructor(private formBulider: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.insertValues();
  }

  initializeForm(): void {
    this.activityForm = this.formBulider.group({
      id: [null, Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      isCompleted: [false],
    });
  }

  insertValues() {
    if (this.selectedActivity) {
      this.activityForm.patchValue({
        id: this.selectedActivity.id,
        name: this.selectedActivity.name,
        description: this.selectedActivity.description,
        priority: this.selectedActivity.priority,
        isCompleted: this.selectedActivity.isCompleted,
      });
    }
  }

  onSaveClick() {
    if (this.activityForm.valid) {
      this.confirm.emit(this.activityForm.value);
    }
  }

  onClose() {
    this.cancel.emit();
  }
}
