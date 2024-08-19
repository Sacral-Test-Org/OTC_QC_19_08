export class TestNumber {
  testNumber: string;

  constructor(testNumber: string) {
    if (testNumber.length > 100) {
      throw new Error('Test number cannot exceed 100 characters');
    }
    this.testNumber = testNumber;
  }
}
