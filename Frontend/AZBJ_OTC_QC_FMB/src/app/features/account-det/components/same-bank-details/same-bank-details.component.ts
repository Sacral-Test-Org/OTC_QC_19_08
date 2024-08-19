import { Component } from '@angular/core';
import { SameBankDetailsModel } from '../../models/same-bank-details.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-same-bank-details',
  templateUrl: './same-bank-details.component.html',
  styleUrls: ['./same-bank-details.component.css']
})
export class SameBankDetailsComponent {
  sameBankDetailsForm: FormGroup;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.sameBankDetailsForm = this.fb.group({
      accountNumber: ['', Validators.required],
      ifscCode: ['', Validators.required],
      bankName: [''],
      branchName: ['']
    });
  }

  openSameBankDetailsForm() {
    if (this.sameBankDetailsForm.valid) {
      const sameBankDetails: SameBankDetailsModel = {
        accountNumber: this.sameBankDetailsForm.get('accountNumber')?.value,
        ifscCode: this.sameBankDetailsForm.get('ifscCode')?.value,
        bankName: 'Sample Bank', // This should be fetched from a service
        branchName: 'Sample Branch' // This should be fetched from a service
      };
      // Logic to open the form with same bank details
      console.log('Same Bank Details:', sameBankDetails);
    } else {
      this.snackBar.open('Please enter both the account number and IFSC code.', 'Close', {
        duration: 3000,
      });
    }
  }
}
