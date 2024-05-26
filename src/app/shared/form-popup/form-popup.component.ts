import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalConfirm } from '../models/popup-modal';

@Component({
  selector: 'app-form-popup',
  templateUrl: './form-popup.component.html',
  styleUrls: ['./form-popup.component.scss'],
})
export class FormPopupComponent {
  @Input() modalConfig!: ModalConfirm;
  @Input() visible = false;
  @Output() confirm = new EventEmitter();
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() cancel = new EventEmitter();
  
  onSaveClick() {
    this.confirm.emit();
    this.close();
  }
  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.cancel.emit();
  }
}
