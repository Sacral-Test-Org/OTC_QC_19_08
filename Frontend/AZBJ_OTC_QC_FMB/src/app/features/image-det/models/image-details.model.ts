export class ImageDetails {
  imagePath: string;
  proposalNumber: string;
  applicationNumber: string;
  imageType: string;
  scanTime: string;
  imageSize: number;
  numberOfPages: string;

  constructor(
    imagePath: string,
    proposalNumber: string,
    applicationNumber: string,
    imageType: string,
    scanTime: string,
    imageSize: number,
    numberOfPages: string
  ) {
    this.imagePath = imagePath;
    this.proposalNumber = proposalNumber;
    this.applicationNumber = applicationNumber;
    this.imageType = imageType;
    this.scanTime = scanTime;
    this.imageSize = imageSize;
    this.numberOfPages = numberOfPages;
  }
}