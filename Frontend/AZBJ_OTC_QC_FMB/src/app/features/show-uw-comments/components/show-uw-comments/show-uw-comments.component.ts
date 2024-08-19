import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShowUwCommentsModel } from '../../models/show-uw-comments.model';
import { MatDialog } from '@angular/material/dialog';
import { AddCommentsComponent } from '../add-comments/add-comments.component';
import { CommentsService } from '../../services/comments.service';
import { Comment } from '../../models/show-uw-comments.model';

@Component({
  selector: 'app-show-uw-comments',
  templateUrl: './show-uw-comments.component.html',
  styleUrls: ['./show-uw-comments.component.css']
})
export class ShowUwCommentsComponent implements OnInit {
  comments: Comment[] = [];
  contractId: string;
  userId: string;
  profileControlValue: string;

  constructor(
    private showUwCommentsModel: ShowUwCommentsModel,
    private router: Router,
    private dialog: MatDialog,
    private commentsService: CommentsService
  ) {}

  ngOnInit(): void {
    this.contractId = 'currentContractId'; // Replace with actual logic to get contract ID
    this.userId = 'currentUserId'; // Replace with actual logic to get user ID
    this.profileControlValue = '1'; // Replace with actual logic to get profile control value
    this.fetchComments();
  }

  fetchComments(): void {
    this.commentsService.getComments(this.userId, this.profileControlValue).subscribe((comments: Comment[]) => {
      this.comments = comments;
      this.navigateToCommentsSection();
    });
  }

  onRefreshButtonClick(): void {
    this.comments = [];
    this.fetchComments();
  }

  onDoubleClick(): void {
    const dialogRef = this.dialog.open(AddCommentsComponent, {
      width: '300px',
      height: '250px',
      data: { comments: this.comments }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateComments(result);
      }
    });
  }

  updateComments(newComments: Comment[]): void {
    this.comments = newComments;
  }

  addComments(): void {
    localStorage.setItem('contractId', this.contractId);
    localStorage.setItem('userId', this.userId);

    this.router.navigate(['/add-comments']);
  }

  navigateToCommentsSection(): void {
    if (this.comments.length > 0) {
      // Logic to navigate to the comments section and display the first record
      const firstCommentElement = document.getElementById('comment-' + this.comments[0].id);
      if (firstCommentElement) {
        firstCommentElement.scrollIntoView();
      }
    }
  }
}