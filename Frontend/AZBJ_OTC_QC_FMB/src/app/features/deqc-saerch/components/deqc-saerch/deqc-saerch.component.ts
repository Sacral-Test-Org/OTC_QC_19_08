import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DeqcSaerchModel } from '../../models/deqc-saerch.model';
import { DateValidationService } from '../../services/date-validation.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { ApplicationDetails } from '../../models/application-details.model';
import { DeqcDisplayComponent } from '../../deqc-display/components/deqc-display/deqc-display.component';

@Component({
  selector: 'app-deqc-saerch',
  templateUrl: './deqc-saerch.component.html',
  styleUrls: ['./deqc-saerch.component.css']
})
export class DeqcSaerchComponent implements OnInit {
  searchForm: FormGroup;
  deqcSaerchModel: DeqcSaerchModel = new DeqcSaerchModel();
  isReasonLinkVisible: boolean = false;
  partnerTypes: string[] = [];
  errorMessage: string = '';
  counter: number = 0;
  @ViewChild('reasonLinkField') reasonLinkField!: ElementRef;
  @ViewChild('searchButton') searchButton!: ElementRef;

  constructor(
    private fb: FormBuilder, 
    private dateValidationService: DateValidationService, 
    private http: HttpClient, 
    private router: Router,
    private searchService: SearchService
  ) {
    this.searchForm = this.fb.group({
      startDate: [''],
      endDate: [''],
      applicationNumber: [''],
      partnerType: [''],
      status: [''],
      rejectionReason: [''],
      reasonLink: ['']
    });
  }

  ngOnInit(): void {
    this.searchForm.reset();
    this.partnerTypes = this.getPartnerTypes();
    this.populatePartnerTypes();
  }

  getPartnerTypes(): string[] {
    return [
      'Partner Type 1', 'Partner Type 2', 'Partner Type 3', 'Partner Type 4', 'Partner Type 5',
      'Partner Type 6', 'Partner Type 7', 'Partner Type 8', 'Partner Type 9', 'Partner Type 10',
      'Partner Type 11', 'Partner Type 12', 'Partner Type 13', 'Partner Type 14', 'Partner Type 15'
    ];
  }

  populatePartnerTypes(): void {
    this.partnerTypes = ['Partner Type 1', 'Partner Type 2', 'Partner Type 3'];
  }

  validatePartnerType(): void {
    const partnerType = this.searchForm.get('partnerType')?.value;
    if (!partnerType) {
      alert('please enter partner');
    }
  }

  onSearchButtonClick(): void {
    const searchCriteria = this.searchForm.value;
    this.searchService.searchApplications(searchCriteria).subscribe(
      (applicationDetails: ApplicationDetails[]) => {
        this.router.navigate(['/display'], { state: { data: applicationDetails } });
      },
      (error) => {
        this.errorMessage = 'No data matches the search criteria.';
      }
    );
  }

  onClearButtonClick(): void {
    this.searchForm.reset({
      startDate: '',
      endDate: '',
      applicationNumber: '',
      partnerType: '',
      status: '',
      rejectionReason: '',
      reasonLink: ''
    });
  }

  onSave(): void {
    const formData = this.searchForm.value;
    if (!formData.reasonLink || this.counter <= 0) {
      alert('Please enter comments in the Reason Link field.');
      return;
    }

    this.http.post('/api/save-button', formData).subscribe(
      (response: any) => {
        if (response.success) {
          alert('Data saved successfully.');
          this.router.navigate(['/search']);
        } else {
          alert('Error saving data: ' + response.message);
        }
      },
      (error) => {
        alert('Error saving data: ' + error.message);
      }
    );
  }

  onViewDocs(): void {
    console.log('View Docs');
  }

  onUploadDocs(): void {
    console.log('Upload Docs');
  }

  onEdit(): void {
    console.log('Edit Record');
  }

  onAddComments(): void {
    console.log('Add Comments');
  }

  onReject(): void {
    console.log('Reject Record');
  }

  onConfirmRejection(): void {
    const rejectionReason = this.searchForm.get('rejectionReason')?.value;
    console.log('Confirm Rejection with reason:', rejectionReason);
  }

  onUwCommentsButtonClick(): void {
    this.isReasonLinkVisible = true;
    this.navigateToReasonLinkField();
  }

  navigateToReasonLinkField(): void {
    setTimeout(() => {
      this.reasonLinkField.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.reasonLinkField.nativeElement.focus();
    }, 0);
  }

  openUploadForms(): void {
    console.log('Opening document upload form and offline upload form');
  }

  onToDateChange(event: Event): void {
    const fromDate = this.searchForm.get('startDate')?.value;
    const toDate = (event.target as HTMLInputElement).value;
    this.dateValidationService.validateDates(fromDate, toDate).subscribe(result => {
      if (result.isValid) {
        this.updateSearchFunctionality(true);
        this.errorMessage = '';
      } else {
        this.updateSearchFunctionality(false);
        this.displayErrorMessage(result.message);
      }
    });
  }

  updateSearchFunctionality(isValid: boolean): void {
    this.searchButton.nativeElement.disabled = !isValid;
  }

  displayErrorMessage(message: string): void {
    this.errorMessage = message;
  }

  okButtonClickHandler(): void {
    const reasonLink = this.searchForm.get('reasonLink')?.value;
    const status = this.searchForm.get('status')?.value;

    if (!reasonLink) {
      alert('Please enter comments in the Reason Link field.');
      return;
    }

    this.counter++;
    console.log(`OK button pressed ${this.counter} times.`);

    switch (status) {
      case 'R':
        this.handleStatusReject();
        break;
      case 'LS':
        this.handleStatusLinkSave();
        break;
      case 'QC':
        this.handleStatusQC();
        break;
      default:
        this.handleOtherStatus(reasonLink);
        break;
    }
  }

  handleStatusReject(): void {
    console.log('Status: REJECT');
    this.router.navigate(['/reject']);
  }

  handleStatusLinkSave(): void {
    console.log('Status: LINK/SAVE');
    this.router.navigate(['/linksave']);
  }

  handleStatusQC(): void {
    console.log('Status: PROPOSAL_INVOKED');
    this.router.navigate(['/qc']);
  }

  handleOtherStatus(reasonLink: string): void {
    const applicationNumber = this.searchForm.get('applicationNumber')?.value;
    this.http.post('/api/ok-button', { reasonLink, applicationNumber }).subscribe(response => {
      console.log('Response from backend:', response);
    });
  }

  onQcEditButtonClick(): void {
    const selectedCases = this.getSelectedCases();
    if (selectedCases.length > 1) {
      alert('Please select only one case.');
      return;
    }
    if (selectedCases.length === 1) {
      this.navigateToDisplayScreen(selectedCases[0]);
    }
  }

  getSelectedCases(): any[] {
    // Logic to get selected cases from the form or table
    return [];
  }

  navigateToDisplayScreen(selectedCase: any): void {
    // Logic to navigate to the display screen with the selected case details
    console.log('Navigating to display screen with case:', selectedCase);
  }

  onRejectButtonClick(): void {
    this.navigateToDeqcDisplay();
  }

  navigateToDeqcDisplay(): void {
    const deqcDisplayComponent = new DeqcDisplayComponent();
    deqcDisplayComponent.processRecords();
  }
}
