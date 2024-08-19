import { Component, OnInit } from '@angular/core';
import { ControlModel, BankDetails } from '../../models/control.model';
import { ControlController } from 'src/app/services/control.controller';
import { BankDetailsController } from 'src/app/services/bank-details.controller';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {
  controlData: ControlModel;
  errorMessage: string = '';
  v_pan_validated: string = 'N';

  constructor(private controlService: ControlController, private bankDetailsService: BankDetailsController) {
    this.controlData = new ControlModel();
  }

  ngOnInit(): void {
    this.controlData.currentDate = new Date().toLocaleDateString();
    this.controlData.userInfo = 'User Information'; // This should be fetched from a service
  }

  handlePanCardVerificationStatus(status: string): void {
    if (status === 'N') {
      this.errorMessage = 'PAN Card received but not verified. Please raise the FRAR again.';
    } else {
      this.errorMessage = '';
    }
  }

  saveBankDetails(): void {
    const bankDetails: BankDetails = {
      policy_ref: this.controlData.policyRef,
      contract_id: this.controlData.contractId,
      partner_id: this.controlData.partnerId,
      account_no: this.controlData.accountNo,
      coll_branch: this.controlData.branch,
      ifsc_code: this.controlData.ifscCode,
      acc_holder_name: this.controlData.accountHolderName,
      bank_name: this.controlData.bankName,
      payee_relation: this.controlData.payeeRelation,
      micr: this.controlData.micr,
      time_stamp: new Date(),
      userid: this.controlData.userId,
      pay_mode: this.controlData.paymentMode,
      acc_tpp_relation: this.controlData.accountTppRelation,
      rrb_bank_account: this.controlData.rrbBankAccount,
      ip_rel_with_pp: this.controlData.relationshipWithPolicyProposer
    };

    this.bankDetailsService.saveBankDetails(bankDetails).subscribe(
      response => {
        console.log('Bank details saved successfully:', response);
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = 'An error occurred while saving bank details: ' + error.message;
      }
    );
  }

  validatePanCard(): void {
    if (!this.controlData.panCardNumber) {
      this.errorMessage = 'Please enter a PAN card number.';
      return;
    }
    if (this.controlData.panCardNumber.length !== 10) {
      this.errorMessage = 'PAN card number must be exactly 10 characters long.';
      return;
    }
    const panCardRegex = /^[A-Z]{3}[C,P,H,F,A,T,B,L,J,G][A-Z][0-9]{4}[A-Z]$/;
    if (!panCardRegex.test(this.controlData.panCardNumber.toUpperCase())) {
      this.errorMessage = 'Invalid PAN card number format.';
      return;
    }
    this.controlService.validatePanCard(this.controlData.panCardNumber, this.controlData.partnerType, this.controlData.firstName + ' ' + this.controlData.middleName + ' ' + this.controlData.lastName, this.controlData.dateOfBirth).subscribe(
      response => this.handleValidationResponse(response),
      (error: HttpErrorResponse) => {
        this.errorMessage = 'An error occurred during PAN card validation: ' + error.message;
      }
    );
  }

  handleValidationResponse(response: any): void {
    if (response.valid) {
      this.errorMessage = 'PAN card validated successfully.';
    } else {
      this.errorMessage = 'PAN card validation failed: ' + response.message;
    }
  }

  closeForm(): void {
    window.close();
  }

  exit(): void {
    this.closeForm();
  }

  handlePanCardNotReceivedFlagChange(event: Event): void {
    const flag = (event.target as HTMLInputElement).checked;
    this.controlData.updateReasonDropdown(flag);
    this.validateReasonSelection();
  }

  validateReasonSelection(): void {
    if (this.controlData.panCardNotReceivedFlag && !this.controlData.selectedReason) {
      this.errorMessage = 'Please select a reason from the dropdown list.';
    } else {
      this.errorMessage = '';
    }
  }

  onCheckboxChange(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.togglePanCardFields(isChecked);
    if (isChecked) {
      this.clearPanCardFields();
    }
  }

  clearPanCardFields(): void {
    this.controlData.panCardNumber = '';
    this.controlData.firstName = '';
    this.controlData.middleName = '';
    this.controlData.lastName = '';
    this.controlData.status = '';
  }

  togglePanCardFields(isChecked: boolean): void {
    if (isChecked) {
      this.controlData.PH_NO_PAN_LOV = '';
    }
    this.controlData.isPanCardNotAvailable = isChecked;
  }

  onPreviousPolicyPanDetailsClick(): void {
    if (this.controlData.checkIfParamListExists('Param1')) {
      this.controlData.destroyParamList('Param1');
    }
    this.controlData.createParamList('Param1');
    this.controlData.addParamToList('Param1', 'PAR_PH_PART_ID', this.controlData.ph_part_id);
    this.controlData.addParamToList('Param1', 'PAR_PAN_CARD_NO', this.controlData.PAN_CARD);
    this.controlData.addParamToList('Param1', 'PAR_MODULE', 'BBU');
    this.controlData.addParamToList('Param1', 'PAR_PAN_PH_NAME', this.controlData.PH_NAME);
    this.controlData.addParamToList('Param1', 'PAR_PAN_PH_DOB', this.controlData.ph_dob);
    this.controlData.callForm('AZBJ_OLD_POLICY_DTLS', 'Param1');
    this.v_pan_validated = 'Y';
  }

  onPanCardInputChange(event: Event): void {
    const input = (event.target as HTMLInputElement).value.toUpperCase();
    if (input.length > 10) {
      this.errorMessage = 'PAN Card number cannot exceed 10 characters';
      return;
    }
    this.controlData.panCardNumber = input;
    this.controlService.fetchPersonalDetails(input).subscribe(details => {
      this.controlData.firstName = details.firstName;
      this.controlData.middleName = details.middleName;
      this.controlData.lastName = details.lastName;
      this.controlData.dateOfBirth = details.dateOfBirth;
    });
    this.controlService.checkPreviousPolicies(input).subscribe(hasPreviousPolicies => {
      if (hasPreviousPolicies) {
        this.errorMessage = 'Please check PAN No found in previous policies';
        this.controlData.previousPolicyCheck = true;
      } else {
        this.errorMessage = '';
        this.controlData.previousPolicyCheck = false;
      }
    });
  }
}
