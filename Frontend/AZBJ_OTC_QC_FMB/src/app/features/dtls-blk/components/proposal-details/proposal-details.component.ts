import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProposalDetailsModel } from '../../models/proposal-details.model';
import { ImageDetailsComponent } from '../../../image-det/components/image-details/image-details.component';
import { ApplicationService } from '../../../services/application.service';
import { CommentsController } from 'Backend/AZBJ_OTC_QC_FMB/my-spring-boot-app/src/main/java/com/example/controller/CommentsController.java';

@Component({
  selector: 'app-proposal-details',
  templateUrl: './proposal-details.component.html',
  styleUrls: ['./proposal-details.component.css']
})
export class ProposalDetailsComponent implements OnInit {
  proposalDetails: ProposalDetailsModel;
  isStackedCanvasVisible: boolean = false;

  constructor(private router: Router, private imageDetailsComponent: ImageDetailsComponent, private http: HttpClient, private applicationService: ApplicationService, private commentsController: CommentsController) {
    // Initialize with default values
    this.proposalDetails = new ProposalDetailsModel('', '', '', '', '', 'N');
  }

  ngOnInit(): void {
    // Fetch the proposal details data (mock data for now)
    this.proposalDetails = new ProposalDetailsModel(
      '123456',
      'John Doe',
      '78910',
      'Jane Doe',
      'This is a sample comment.',
      'N'
    );
  }

  onSubmit(): void {
    // Handle the submit action for the proposal details form
    console.log('Submit button clicked');
  }

  onExit(): void {
    // Handle the exit action for the proposal details form
    this.router.navigate(['/']); // Navigate to the home or another appropriate route
    console.log('Exit button clicked');
  }

  onViewAllDocuments(): void {
    // Handle the action to view all documents related to the proposal
    console.log('View All Documents button clicked');
    this.viewAllDocuments();
  }

  onProposalForm(): void {
    // Handle the action to view the proposal form
    console.log('Proposal Form button clicked');
    this.proposalDetails.v_proposal_form_flg = 'Y';
    const url = this.azbj_encrypt_dms_link('NB', 'UW_VIEW_ALL', this.proposalDetails.applicationNumber);
    if (url) {
      window.open(url, '_blank');
    } else {
      console.error('Error: Unable to generate URL');
      alert('There is an issue with the URL');
    }
  }

  onExitButtonClick(): void {
    this.hideCurrentView();
    this.navigateToCommentsSection();
    this.fetchMostRecentComment(this.proposalDetails.contractId, this.proposalDetails.eventNo);
  }

  private azbj_encrypt_dms_link(param1: string, param2: string, applicationNumber: string): string | null {
    // Mock implementation of the URL generation function
    if (applicationNumber) {
      return `https://example.com/document?param1=${param1}&param2=${param2}&app=${applicationNumber}`;
    }
    return null;
  }

  validateTeleVideoMerApproved(): void {
    try {
      const status = this.proposalDetails.getTeleVideoCheckStatus();
      if (status === 'N') {
        alert('Please verify the document before selecting Yes or No option');
        this.proposalDetails.teleVideoMerApproved = '';
      }
    } catch (error) {
      console.error('Error during validation:', error);
      alert(`An error occurred: ${error.message}`);
    }
  }

  handleTeleVideoMerApprovedSelection(event: Event): void {
    this.validateTeleVideoMerApproved();
  }

  private viewAllDocuments(): void {
    const applicationNumber = this.proposalDetails.applicationNumber;
    const tempDir = `C:\temp\${applicationNumber}`;
    const fs = require('fs');

    try {
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }
      this.imageDetailsComponent.copyAndOpenImages(applicationNumber);
    } catch (error) {
      console.error('Error while creating directory or copying images:', error);
      alert(`An error occurred: ${error.message}`);
    }
  }

  onDblClick(event: MouseEvent): void {
    this.isStackedCanvasVisible = true;
  }

  downloadKycDocuments(): void {
    this.proposalDetails.receivedFlag = 'Y';
    const applicationNumber = this.proposalDetails.applicationNumber;
    const proposalNumber = this.proposalDetails.proposalNumber;

    this.http.get(`/api/kyc/getContractId/${proposalNumber}`).subscribe((contractId: string) => {
      this.http.get(`/api/kyc/getPersonalDetails/${contractId}`).subscribe((personalDetails: any) => {
        if (personalDetails) {
          const formattedDob = new Date(personalDetails.dateOfBirth).toLocaleDateString('en-GB');
          const jsonPayload = {
            taxId: personalDetails.taxId,
            dateOfBirth: formattedDob,
            sex: personalDetails.sex,
            firstName: personalDetails.firstName,
            middleName: personalDetails.middleName,
            surname: personalDetails.surname
          };

          this.http.post('/api/kyc/sendDetails', jsonPayload).subscribe((response: any) => {
            alert(`Response: ${response.message}`);
          }, error => {
            console.error('Error during HTTP POST request:', error);
            alert('An error occurred while sending the details.');
          });
        } else {
          alert('No personal details found.');
        }
      }, error => {
        console.error('Error fetching personal details:', error);
        alert('An error occurred while fetching personal details.');
      });
    }, error => {
      console.error('Error fetching contract ID:', error);
      alert('An error occurred while fetching contract ID.');
    });
  }

  onSubmitClick(): void {
    const applicationNumber = this.proposalDetails.applicationNumber;
    this.applicationService.getApplicationDetails(applicationNumber).subscribe(applicationDetails => {
      if (applicationDetails.receivedFlag === 'N') {
        alert('Please download KYC documents before proceeding.');
        return;
      }

      this.applicationService.validateDocuments(applicationDetails).subscribe(validationResult => {
        if (!validationResult.isValid) {
          alert('Some required documents are missing. Please check and try again.');
          return;
        }

        this.applicationService.updateApplicationStatus(applicationNumber, 'COMPLETED').subscribe(() => {
          alert('Application submitted successfully.');
        }, error => {
          console.error('Error updating application status:', error);
          alert('An error occurred while updating the application status.');
        });
      }, error => {
        console.error('Error validating documents:', error);
        alert('An error occurred while validating the documents.');
      });
    }, error => {
      console.error('Error retrieving application details:', error);
      alert('An error occurred while retrieving the application details.');
    });
  }

  private hideCurrentView(): void {
    this.isStackedCanvasVisible = false;
  }

  private navigateToCommentsSection(): void {
    this.router.navigate(['/comments-section']);
  }

  private fetchMostRecentComment(contractId: string, eventNo: number): void {
    this.commentsController.getMostRecentComment(contractId, eventNo).subscribe(comment => {
      if (comment) {
        this.proposalDetails.comments = comment;
      } else {
        this.proposalDetails.comments = null;
      }
    }, error => {
      console.error('Error fetching the most recent comment:', error);
      this.proposalDetails.comments = null;
    });
  }
}
