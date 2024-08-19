export class ControlModel {
  currentDate: string;
  userInfo: string;
  productId: string;
  contractId: string;
  addressEdited: boolean;
  firstName: string;
  middleName: string;
  lastName: string;
  panStatus: string;
  panCardVerification: string;
  panCardNumber: string;
  partnerType: string;
  panCardNotAvailable: boolean;
  rrbBankAccount: boolean;
  dateOfBirth: string;
  reasonDropdown: string[];
  selectedReason: string | null;
  PH_NO_PAN_LOV: string;
  v_pan_validated: string;
  previousPolicyCheck: boolean;

  // New fields for bank details
  policy_ref: string;
  partner_id: string;
  account_no: string;
  coll_branch: string;
  ifsc_code: string;
  acc_holder_name: string;
  bank_name: string;
  payee_relation: string;
  micr: string;
  time_stamp: Date;
  userid: string;
  pay_mode: string;
  acc_tpp_relation: string;
  rrb_bank_account: string;
  ip_rel_with_pp: string;

  constructor(
    currentDate: string,
    userInfo: string,
    productId: string,
    contractId: string,
    addressEdited: boolean,
    firstName: string,
    middleName: string,
    lastName: string,
    panStatus: string,
    panCardVerification: string,
    panCardNumber: string,
    partnerType: string,
    panCardNotAvailable: boolean,
    rrbBankAccount: boolean,
    dateOfBirth: string,
    reasonDropdown: string[],
    PH_NO_PAN_LOV: string,
    policy_ref: string,
    partner_id: string,
    account_no: string,
    coll_branch: string,
    ifsc_code: string,
    acc_holder_name: string,
    bank_name: string,
    payee_relation: string,
    micr: string,
    time_stamp: Date,
    userid: string,
    pay_mode: string,
    acc_tpp_relation: string,
    rrb_bank_account: string,
    ip_rel_with_pp: string
  ) {
    this.currentDate = currentDate;
    this.userInfo = userInfo;
    this.productId = productId;
    this.contractId = contractId;
    this.addressEdited = addressEdited;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.panStatus = panStatus;
    this.panCardVerification = panCardVerification;
    this.panCardNumber = panCardNumber;
    this.partnerType = partnerType;
    this.panCardNotAvailable = panCardNotAvailable;
    this.rrbBankAccount = rrbBankAccount;
    this.dateOfBirth = dateOfBirth;
    this.reasonDropdown = reasonDropdown;
    this.selectedReason = null;
    this.PH_NO_PAN_LOV = PH_NO_PAN_LOV;
    this.v_pan_validated = 'N';
    this.previousPolicyCheck = false;

    // Initialize new fields
    this.policy_ref = policy_ref;
    this.partner_id = partner_id;
    this.account_no = account_no;
    this.coll_branch = coll_branch;
    this.ifsc_code = ifsc_code;
    this.acc_holder_name = acc_holder_name;
    this.bank_name = bank_name;
    this.payee_relation = payee_relation;
    this.micr = micr;
    this.time_stamp = time_stamp;
    this.userid = userid;
    this.pay_mode = pay_mode;
    this.acc_tpp_relation = acc_tpp_relation;
    this.rrb_bank_account = rrb_bank_account;
    this.ip_rel_with_pp = ip_rel_with_pp;
  }

  updateReasonDropdown(flag: boolean): void {
    if (flag) {
      this.reasonDropdown = ['Reason 1', 'Reason 2', 'Reason 3'];
    } else {
      this.reasonDropdown = [];
      this.selectedReason = null;
    }
  }

  togglePanCardFields(isPanCardNotAvailable: boolean): void {
    this.panCardNotAvailable = isPanCardNotAvailable;
    if (isPanCardNotAvailable) {
      this.PH_NO_PAN_LOV = '';
      this.panCardNumber = '';
      this.firstName = '';
      this.middleName = '';
      this.lastName = '';
      this.panStatus = '';
    } else {
      this.PH_NO_PAN_LOV = '';
    }
  }

  checkIfParamListExists(paramName: string): boolean {
    // Logic to check if a parameter list with the given name exists
    // This is a placeholder implementation
    return false;
  }

  destroyParamList(paramName: string): void {
    // Logic to destroy the parameter list with the given name if it exists
    // This is a placeholder implementation
  }

  createParamList(paramName: string): void {
    // Logic to create a new parameter list with the given name
    // This is a placeholder implementation
  }

  addParamToList(paramName: string, paramValue: any): void {
    // Logic to add a parameter to the specified parameter list
    // This is a placeholder implementation
  }

  callForm(formName: string, paramList: string): void {
    // Logic to call the specified form with the given parameter list
    // This is a placeholder implementation
  }

  handlePreviousPolicyPanDetails(ph_part_id: string, ph_dob: string, PAN_CARD: string, PH_NAME: string): void {
    const paramName = 'Param1';

    if (this.checkIfParamListExists(paramName)) {
      this.destroyParamList(paramName);
    }

    this.createParamList(paramName);
    this.addParamToList('PAR_PH_PART_ID', ph_part_id);
    this.addParamToList('PAR_PAN_CARD_NO', PAN_CARD);
    this.addParamToList('PAR_MODULE', 'BBU');
    this.addParamToList('PAR_PAN_PH_NAME', PH_NAME);
    this.addParamToList('PAR_PAN_PH_DOB', ph_dob);

    this.callForm('AZBJ_OLD_POLICY_DTLS', paramName);

    this.v_pan_validated = 'Y';
  }

  validatePanCardDetails(): string {
    if (!this.panCardNumber) {
      return 'Please enter a PAN card number.';
    }

    if (this.panCardNumber.length !== 10) {
      return 'PAN card number must be exactly 10 characters long.';
    }

    const panCardRegex = /^[A-Z]{3}[C,P,H,F,A,T,B,L,J,G][A-Z][0-9]{4}[A-Z]$/;
    if (!panCardRegex.test(this.panCardNumber.toUpperCase())) {
      return 'Invalid PAN card number format.';
    }

    if (!this.partnerType) {
      return 'Please select a partner type.';
    }

    if (!this.firstName || !this.dateOfBirth) {
      return 'Please enter the name and date of birth as per the PAN card.';
    }

    // Call external procedure to validate PAN card details
    // Placeholder for actual external call
    const isValid = true; // Assume the external call returns true for valid PAN

    if (isValid) {
      this.logPanCardValidation();
      return 'PAN card details are valid.';
    } else {
      return 'PAN card details are invalid.';
    }
  }

  logPanCardValidation(): void {
    // Placeholder for logging logic
    console.log(`Logging PAN validation: ${this.panCardNumber}, ${this.firstName}, ${this.dateOfBirth}`);
  }
}
