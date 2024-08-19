import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddCommentsModel } from '../../models/add-comments.model';

@Component({
  selector: 'app-add-comments',
  templateUrl: './add-comments.component.html',
  styleUrls: ['./add-comments.component.css']
})
export class AddCommentsComponent implements OnInit {
  commentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddCommentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddCommentsModel
  ) {
    this.commentForm = this.fb.group({
      comment: [data.comments, [Validators.required, Validators.maxLength(1000)]]
    });
  }

  ngOnInit(): void {
    // Initialize the component and load the current comments into the textarea.
  }

  saveComments(): void {
    if (this.commentForm.valid) {
      const updatedComments = this.commentForm.get('comment')?.value;
      this.dialogRef.close(updatedComments);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}