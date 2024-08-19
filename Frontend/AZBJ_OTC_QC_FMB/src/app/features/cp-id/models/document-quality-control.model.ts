export class DocumentQualityControlModel {
  documentName: string; // max length 100 characters
  docReceived: string; // predefined list of two options
  documentType: string; // max length 100 characters
  amlDocumentType: string; // max length 100 characters
  proofType: string; // max length 200 characters
  reqCode: string; // max length 200 characters
  options: string[]; // dropdown list options

  constructor(
    documentName: string,
    docReceived: string,
    documentType: string,
    amlDocumentType: string,
    proofType: string,
    reqCode: string,
    options: string[]
  ) {
    this.documentName = documentName;
    this.docReceived = docReceived;
    this.documentType = documentType;
    this.amlDocumentType = amlDocumentType;
    this.proofType = proofType;
    this.reqCode = reqCode;
    this.options = options;
  }

  addOption(option: string): void {
    this.options.push(option);
  }

  updateOption(index: number, newOption: string): void {
    if (index >= 0 && index < this.options.length) {
      this.options[index] = newOption;
    }
  }
}
