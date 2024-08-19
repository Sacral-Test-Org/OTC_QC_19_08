import { Component, OnInit } from '@angular/core';
import { DeqcDisplayModel } from '../../models/deqc-display.model';
import { QcEditButtonController } from 'Backend/AZBJ_OTC_QC_FMB/my-spring-boot-app/src/main/java/com/example/controller/QcEditButtonController.java';
import { DocumentController } from 'Backend/AZBJ_OTC_QC_FMB/my-spring-boot-app/src/main/java/com/example/controller/DocumentController.java';
import { RejectService } from 'Backend/AZBJ_OTC_QC_FMB/my-spring-boot-app/src/main/java/com/example/service/RejectService.java';
import { RejectDao } from 'Backend/AZBJ_OTC_QC_FMB/my-spring-boot-app/src/main/java/com/example/dao/RejectDao.java';

@Component({
  selector: 'app-deqc-display',
  templateUrl: './deqc-display.component.html',
  styleUrls: ['./deqc-display.component.css']
})
export class DeqcDisplayComponent implements OnInit {
  displayData: DeqcDisplayModel[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  linksaveEnabled: boolean = false;
  viewDocsEnabled: boolean = false;
  uploadDocsEnabled: boolean = false;
  qcEnabled: boolean = false;
  rejectEnabled: boolean = false;
  selectedCase: DeqcDisplayModel | null = null;

  constructor(private qcEditButtonController: QcEditButtonController, private documentController: DocumentController, private rejectService: RejectService, private rejectDao: RejectDao) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    // Mock data fetching logic
    this.displayData = [
      // Add mock data here
    ];
  }

  onCheckboxChange(event: Event, item: DeqcDisplayModel): void {
    const checkbox = event.target as HTMLInputElement;
    item.checkboxValue = checkbox.checked ? 'Y' : 'N';
    this.updateActionButtons();
  }

  updateActionButtons(): void {
    const checkedItems = this.displayData.filter(item => item.checkboxValue === 'Y');
    const anyChecked = checkedItems.length > 0;
    this.linksaveEnabled = anyChecked;
    this.viewDocsEnabled = anyChecked;
    this.uploadDocsEnabled = !anyChecked;
    this.qcEnabled = anyChecked;
    this.rejectEnabled = anyChecked;
  }

  get paginatedData(): DeqcDisplayModel[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.displayData.slice(startIndex, startIndex + this.pageSize);
  }

  nextPage(): void {
    if ((this.currentPage * this.pageSize) < this.displayData.length) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  navigateToDisplayScreen(): void {
    const selectedCases = this.displayData.filter(item => item.checkboxValue === 'Y');
    if (selectedCases.length !== 1) {
      alert('Please select exactly one case.');
      return;
    }
    this.selectedCase = selectedCases[0];
    this.qcEditButtonController.fetchCaseDetails(this.selectedCase.applicationNumber).subscribe(caseDetails => {
      this.qcEditButtonController.checkCaseStatus(caseDetails).subscribe(status => {
        if (status === 'CRITERIA_MET') {
          // Prepare parameters and call another form to continue the process
          alert('Criteria met. Proceeding to the next form.');
        } else {
          alert('The case does not meet the criteria.');
        }
      });
    });
  }

  displaySearchResults(applicationDetails: DeqcDisplayModel[]): void {
    // Clear any previous data
    this.displayData = [];

    // Display the application details
    applicationDetails.forEach(detail => {
      const documentStatus = this.determineDocumentStatus(detail);
      this.displayData.push({ ...detail, documentStatus });
    });
  }

  determineDocumentStatus(detail: DeqcDisplayModel): string {
    const requiredDocs = ['BI', 'PF', 'RP', 'M017', 'M202'];
    const presentDocs = requiredDocs.filter(doc => detail.documents.includes(doc));

    if (presentDocs.length === requiredDocs.length) {
      return 'Documents Received';
    } else if (presentDocs.length > 0) {
      return 'Documents Not Received';
    } else {
      return 'All Documents Pending';
    }
  }

  onViewDocumentsButtonClick(): void {
    this.documentController.countSelectedRecords().subscribe(count => {
      if (count > 1) {
        alert('Only one case should be selected for viewing documents.');
      } else if (count === 1) {
        const selectedCase = this.displayData.find(item => item.checkboxValue === 'Y');
        if (selectedCase) {
          this.documentController.generateDocumentURL(selectedCase.applicationNumber).subscribe(url => {
            if (url) {
              window.open(url, '_blank');
            } else {
              alert('Invalid URL. Please check the URL.');
            }
          });
        }
      }
    });
  }

  navigateToDeqcDisplaySection(): void {
    // Logic to navigate to the 'DEQC_DISPLAY' section and check the last record
  }

  processRecords(): void {
    const totalRecords = this.displayData.length;
    let rejectedCount = 0;
    const rejectedApplications: string[] = [];

    for (const record of this.displayData) {
      if (record.ch === 'Y') {
        if (!record.reasonLink || record.commentCount === 0) {
          alert('Please enter comments for application number: ' + record.applicationNumber);
          return;
        }

        this.rejectService.autoRejectRecord(record.applicationNumber).subscribe(() => {
          this.rejectDao.retrieveContractId(record.applicationNumber).subscribe(contractId => {
            if (record.reasonLink) {
              this.rejectDao.generateEventNumber(contractId).subscribe(eventNumber => {
                this.rejectDao.insertComment(eventNumber, contractId, record.proposalNo, record.reasonLink).subscribe(() => {
                  rejectedCount++;
                  rejectedApplications.push(record.applicationNumber);
                  if (rejectedCount === totalRecords) {
                    alert('Total records rejected: ' + rejectedCount + '\nRejected application numbers: ' + rejectedApplications.join(', '));
                  }
                });
              });
            }
          });
        }, error => {
          alert('Error rejecting record for application number: ' + record.applicationNumber + '\nError details: ' + error.message);
        });
      }
    }
  }
}
