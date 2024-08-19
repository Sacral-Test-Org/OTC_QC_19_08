import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AccountDetailsModel } from '../../models/account-details.model';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  accountDetailsForm: FormGroup;
  pennyDropStatus: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.accountDetailsForm = this.fb.group({
      accountHolderName: ['', [Validators.required, Validators.pattern('[A-Z ]*')]],
      bankName: ['', [Validators.required, Validators.pattern('[A-Z ]*')]],
      branchName: ['', [Validators.required, Validators.pattern('[A-Z ]*')]],
      micrCode: ['', [Validators.required, Validators.pattern('[A-Z0-9]*')]],
      ifscCode: ['', [Validators.required, Validators.pattern('[A-Z0-9]*')]],
      relationshipType: ['', Validators.required],
      tppFlag: [false],
      bypassBankDetails: [false],
      accountType: ['', Validators.required],
      accountNumber: ['', [Validators.required, Validators.pattern('[A-Z0-9]*')]]
    });
  }

  ngOnInit(): void {
    this.accountDetailsForm.get('bypassBankDetails')?.valueChanges.subscribe((checked: boolean) => {
      this.onBypassBankDetailsChange(checked);
    });
  }

  onBypassBankDetailsChange(checked: boolean): void {
    const controls = [
      'accountHolderName',
      'bankName',
      'branchName',
      'micrCode',
      'ifscCode',
      'relationshipType',
      'accountNumber'
    ];
    controls.forEach(control => {
      if (checked) {
        this.accountDetailsForm.get(control)?.disable();
      } else {
        this.accountDetailsForm.get(control)?.enable();
      }
    });
  }

  onSubmit(): void {
    if (this.accountDetailsForm.valid) {
      const accountDetails: AccountDetailsModel = this.accountDetailsForm.value;
      this.saveAccountDetails(accountDetails);
    }
  }

  saveAccountDetails(accountDetails: AccountDetailsModel): void {
    this.http.post('/api/account-details', accountDetails).subscribe(
      (response: any) => {
        this.pennyDropStatus = response.pennyDropStatus ? 'Penny drop successful' : 'Penny drop failed';
      },
      (error) => {
        console.error('Error saving account details', error);
      }
    );
  }

  fetchBankDetailsByIFSC(ifscCode: string): void {
    this.http.get(`/api/bank-details/${ifscCode}`).subscribe(
      (response: any) => {
        this.accountDetailsForm.patchValue({
          bankName: response.bankName,
          branchName: response.branchName,
          micrCode: response.micrCode
        });
      },
      (error) => {
        console.error('Error fetching bank details', error);
        this.accountDetailsForm.patchValue({
          bankName: '',
          branchName: '',
          micrCode: ''
        });
      }
    );
  }

  copyBankDetails(): void {
    const bankDetails = {
      bankName: this.accountDetailsForm.get('bankName')?.value,
      branchName: this.accountDetailsForm.get('branchName')?.value,
      micrCode: this.accountDetailsForm.get('micrCode')?.value,
      ifscCode: this.accountDetailsForm.get('ifscCode')?.value
    };
    this.accountDetailsForm.patchValue(bankDetails);
  }

  onAccountTypeChange(event: Event): void {
    const selectedAccountType = (event.target as HTMLSelectElement).value;
    const uppercaseAccountType = this.convertToUpperCase(selectedAccountType);
    this.accountDetailsForm.patchValue({ accountType: uppercaseAccountType });
    const ifscCode = this.accountDetailsForm.get('ifscCode')?.value;
    if (ifscCode) {
      this.fetchBankDetails(ifscCode);
    }
  }

  convertToUpperCase(selectedAccountType: string): string {
    return selectedAccountType.toUpperCase();
  }

  handleIfscCodeInput(ifscCode: string): void {
    if (ifscCode) {
      this.fetchBankDetails(ifscCode);
    }
  }

  fetchBankDetails(ifscCode: string): void {
    this.http.get(`/api/bank-details/${ifscCode}`).subscribe(
      (response: any) => {
        this.accountDetailsForm.patchValue({
          bankName: response.bankName,
          branchName: response.branchName,
          micrCode: response.micrCode
        });
      },
      (error) => {
        console.error('Error fetching bank details', error);
        this.accountDetailsForm.patchValue({
          bankName: '',
          branchName: '',
          micrCode: ''
        });
      }
    );
  }
}
