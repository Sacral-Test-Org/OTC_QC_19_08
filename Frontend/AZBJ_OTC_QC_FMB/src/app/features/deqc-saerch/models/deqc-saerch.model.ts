export class DeqcSaerchModel {
  fromDate: string;
  toDate: string;
  applicationNumber: string;
  partnerType: string;
  status: string;
  rejectionReason: string;
  statusOptions: string[];
  partnerTypeOptions: string[];

  constructor(
    fromDate: string = '',
    toDate: string = '',
    applicationNumber: string = '',
    partnerType: string = '',
    status: string = '',
    rejectionReason: string = ''
  ) {
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.applicationNumber = applicationNumber;
    this.partnerType = partnerType;
    this.status = status;
    this.rejectionReason = rejectionReason;
    this.statusOptions = ['OPTION1', 'OPTION2', 'OPTION3', 'OPTION4'];
    this.partnerTypeOptions = ['Type1', 'Type2', 'Type3'];
  }
}