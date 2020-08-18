import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-board-value',
  templateUrl: './board-value.component.html',
  styleUrls: ['./board-value.component.scss']
})
export class BoardValueComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<BoardValueComponent>,) { }

  ngOnInit() {
    this.form = this.fb.group({
      row: [null, [Validators.min(1), Validators.max(20)],],
      column: [null, [Validators.min(1), Validators.max(20)]],
    })
  }

  submit() {
    const controls = this.form.controls;
    if (this.form.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this.dialogRef.close(this.form.value)
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.form.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }
}
