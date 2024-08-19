import { Component, OnInit } from '@angular/core';
import { UwCommentsModel } from '../../models/uw-comments.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommentsService } from 'src/app/services/comments.service';
import { ngxLogger } from 'ngx-logger';

@Component({
  selector: 'app-uw-comments',
  templateUrl: './uw-comments.component.html',
  styleUrls: ['./uw-comments.component.css']
})
export class UwCommentsComponent implements OnInit {
  comment: string = '';
  comments: UwCommentsModel[] = [];
  addCommentEnabled: boolean = false;

  constructor(private authService: AuthService, private commentsService: CommentsService, private logger: ngxLogger) {}

  ngOnInit(): void {
    // Initialize the component and load the initial comment if any.
    this.loadInitialComment();
  }

  loadInitialComment(): void {
    // Logic to load the initial comment if any.
    // For now, we will assume there is no initial comment.
  }

  async addComment(): Promise<void> {
    try {
      const username = this.authService.getCurrentUsername();
      const contractId = 'someContractId'; // This should be dynamically set based on the context
      const policyNo = 'somePolicyNo'; // This should be dynamically set based on the context

      if (this.comment.trim().length > 0) {
        const eventNo = await this.commentsService.getNextEventNumber(contractId);
        const newComment = new UwCommentsModel(eventNo, contractId, policyNo, username, new Date(), this.comment, 'Y');
        await this.commentsService.saveComment(newComment);
        this.comment = '';
        this.logger.info('Comment has been saved successfully.');
        this.commentsService.refreshCommentsBlock();
      } else {
        this.comment = '';
      }
    } catch (error) {
      this.logger.error('Error while adding comment:', error);
    }
  }

  exitComments(): void {
    // Logic to exit the comments section.
    // For now, we will just clear the comments.
    this.comments = [];
  }

  toggleCommentsField(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.addCommentEnabled = checkbox.checked;
  }
}
