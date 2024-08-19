export class ProposalDetailsModel {
  proposalNumber: string;
  lifeAssuredName: string;
  applicationNumber: string;
  policyHolderName: string;
  comments: string;
  referToSupervisor: string;
  v_proposal_form_flg: string;
  v_tele_video_check: string;
  contractId: string;
  taxId: string;
  dateOfBirth: string;
  sex: string;
  firstName: string;
  middleName: string;
  surname: string;
  receivedFlag: string;
  documents: Document[];

  constructor(
    proposalNumber: string,
    lifeAssuredName: string,
    applicationNumber: string,
    policyHolderName: string,
    comments: string,
    referToSupervisor: string = 'N',
    v_proposal_form_flg: string,
    v_tele_video_check: string,
    contractId: string,
    taxId: string,
    dateOfBirth: string,
    sex: string,
    firstName: string,
    middleName: string,
    surname: string,
    receivedFlag: string,
    documents: Document[]
  ) {
    this.proposalNumber = proposalNumber;
    this.lifeAssuredName = lifeAssuredName;
    this.applicationNumber = applicationNumber;
    this.policyHolderName = policyHolderName;
    this.comments = comments;
    this.referToSupervisor = referToSupervisor;
    this.v_proposal_form_flg = v_proposal_form_flg;
    this.v_tele_video_check = v_tele_video_check;
    this.contractId = contractId;
    this.taxId = taxId;
    this.dateOfBirth = dateOfBirth;
    this.sex = sex;
    this.firstName = firstName;
    this.middleName = middleName;
    this.surname = surname;
    this.receivedFlag = receivedFlag;
    this.documents = documents;
  }

  getTeleVideoCheckStatus(): string {
    return this.v_tele_video_check;
  }

  getComments(): string {
    return this.comments;
  }

  setComments(newComments: string): void {
    if (newComments.length <= 1000) {
      this.comments = newComments;
    } else {
      throw new Error('Comments cannot exceed 1000 characters');
    }
  }

  formatDateOfBirth(): string {
    const [year, month, day] = this.dateOfBirth.split('-');
    return `${day}-${month}-${year}`;
  }

  toJSON(): string {
    return JSON.stringify({
      proposalNumber: this.proposalNumber,
      lifeAssuredName: this.lifeAssuredName,
      applicationNumber: this.applicationNumber,
      policyHolderName: this.policyHolderName,
      comments: this.comments,
      referToSupervisor: this.referToSupervisor,
      v_proposal_form_flg: this.v_proposal_form_flg,
      v_tele_video_check: this.v_tele_video_check,
      contractId: this.contractId,
      taxId: this.taxId,
      dateOfBirth: this.formatDateOfBirth(),
      sex: this.sex,
      firstName: this.firstName,
      middleName: this.middleName,
      surname: this.surname,
      receivedFlag: this.receivedFlag,
      documents: this.documents
    });
  }
}

export class Document {
  docType: string;
  docName: string;
  docStatus: string;

  constructor(docType: string, docName: string, docStatus: string) {
    this.docType = docType;
    this.docName = docName;
    this.docStatus = docStatus;
  }
}