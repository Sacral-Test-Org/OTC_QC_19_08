export class PanDetailsModel {
  panNumber: string;
  panStatus: string;
  nameMatch: string;
  dobMatch: string;
  seedingFlag: string;

  constructor(
    panNumber: string = '',
    panStatus: string = '',
    nameMatch: string = '',
    dobMatch: string = '',
    seedingFlag: string = ''
  ) {
    this.panNumber = panNumber;
    this.panStatus = panStatus;
    this.nameMatch = nameMatch;
    this.dobMatch = dobMatch;
    this.seedingFlag = seedingFlag;
  }
}