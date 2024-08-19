export class SameBankDetailsModel {
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  branchName: string;

  constructor(accountNumber: string, ifscCode: string, bankName: string, branchName: string) {
    this.accountNumber = accountNumber;
    this.ifscCode = ifscCode;
    this.bankName = bankName;
    this.branchName = branchName;
  }
}