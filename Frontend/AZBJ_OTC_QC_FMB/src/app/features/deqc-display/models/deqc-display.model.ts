export class DeqcDisplayModel {
  applicationId: string;
  partnerId: string;
  applicationName: string;
  partnerName: string;
  status: string;
  checkbox: string;
  applicationNumber: string; // New field for generating document URL
  ch: string; // New field to check if marked as 'Y'

  constructor(
    applicationId: string,
    partnerId: string,
    applicationName: string,
    partnerName: string,
    status: string,
    checkbox: string = 'N',
    applicationNumber: string,
    ch: string
  ) {
    this.applicationId = applicationId;
    this.partnerId = partnerId;
    this.applicationName = applicationName;
    this.partnerName = partnerName;
    this.status = status;
    this.checkbox = checkbox;
    this.applicationNumber = applicationNumber;
    this.ch = ch;
  }

  toggleCheckbox(): void {
    this.checkbox = this.checkbox === 'N' ? 'Y' : 'N';
  }
}