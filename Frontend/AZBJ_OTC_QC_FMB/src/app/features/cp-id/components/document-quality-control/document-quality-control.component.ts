import { Component, OnInit } from '@angular/core';
import { DocumentQualityControlModel } from '../../models/document-quality-control.model';

@Component({
  selector: 'app-document-quality-control',
  templateUrl: './document-quality-control.component.html',
  styleUrls: ['./document-quality-control.component.css']
})
export class DocumentQualityControlComponent implements OnInit {
  records: DocumentQualityControlModel[] = [];
  docReceivedOptions: string[] = ['Option 1', 'Option 2'];

  ngOnInit(): void {
    this.fetchRecords();
  }

  fetchRecords(): DocumentQualityControlModel[] {
    // Mock data for demonstration purposes
    this.records = [
      { documentName: 'Document 1', docReceived: 'Option 1', documentType: 'Type 1', amlDocumentType: 'AML Type 1', proofType: 'Proof 1', reqCode: 'Req 1' },
      { documentName: 'Document 2', docReceived: 'Option 2', documentType: 'Type 2', amlDocumentType: 'AML Type 2', proofType: 'Proof 2', reqCode: 'Req 2' },
      { documentName: 'Document 3', docReceived: 'Option 1', documentType: 'Type 3', amlDocumentType: 'AML Type 3', proofType: 'Proof 3', reqCode: 'Req 3' },
      { documentName: 'Document 4', docReceived: 'Option 2', documentType: 'Type 4', amlDocumentType: 'AML Type 4', proofType: 'Proof 4', reqCode: 'Req 4' },
      { documentName: 'Document 5', docReceived: 'Option 1', documentType: 'Type 5', amlDocumentType: 'AML Type 5', proofType: 'Proof 5', reqCode: 'Req 5' },
      { documentName: 'Document 6', docReceived: 'Option 2', documentType: 'Type 6', amlDocumentType: 'AML Type 6', proofType: 'Proof 6', reqCode: 'Req 6' }
    ];
    return this.records;
  }

  onDocReceivedChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;
    console.log('Doc Received changed to:', selectedValue);
  }
}
