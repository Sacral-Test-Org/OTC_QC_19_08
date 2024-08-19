export class UwCommentsModel {
  eventNo: number;
  contractId: string;
  policyNo: string;
  userId: string;
  commentDate: Date;
  comments: string;
  flag: string;

  constructor(eventNo: number, contractId: string, policyNo: string, userId: string, commentDate: Date, comments: string, flag: string) {
    this.eventNo = eventNo;
    this.contractId = contractId;
    this.policyNo = policyNo;
    this.userId = userId;
    this.commentDate = commentDate;
    this.comments = comments;
    this.flag = flag;
  }
}