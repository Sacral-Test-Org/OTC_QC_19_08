export class AccountDetailsModel {
  accountHolderName: string;
  bankName: string;
  branchName: string;
  micrCode: string;
  ifscCode: string;
  relationshipType: string;
  tppFlag: boolean;
  bypassBankDetails: boolean;
  accountType: string;
  accountNumber: string;

  constructor(
    accountHolderName: string,
    bankName: string,
    branchName: string,
    micrCode: string,
    ifscCode: string,
    relationshipType: string,
    tppFlag: boolean,
    bypassBankDetails: boolean,
    accountType: string,
    accountNumber: string
  ) {
    this.accountHolderName = accountHolderName.toUpperCase();
    this.bankName = bankName.toUpperCase();
    this.branchName = branchName.toUpperCase();
    this.micrCode = micrCode.toUpperCase();
    this.ifscCode = ifscCode.toUpperCase();
    this.relationshipType = relationshipType;
    this.tppFlag = tppFlag;
    this.bypassBankDetails = bypassBankDetails;
    this.accountType = accountType;
    this.accountNumber = accountNumber.toUpperCase();
  }
}

export class RelationshipTypeModel {
  relationshipType: string;

  constructor(relationshipType: string) {
    this.relationshipType = relationshipType;
  }
}