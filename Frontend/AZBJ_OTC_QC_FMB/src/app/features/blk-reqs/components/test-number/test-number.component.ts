import { Component, OnInit } from '@angular/core';
import { TestNumber } from '../../models/test-number.model';

@Component({
  selector: 'app-test-number',
  templateUrl: './test-number.component.html',
  styleUrls: ['./test-number.component.css']
})
export class TestNumberComponent implements OnInit {
  testNumber: TestNumber = { testNumber: '1234567890' }; // Example test number

  constructor() { }

  ngOnInit(): void {
    // Initialization logic if needed
  }
}
