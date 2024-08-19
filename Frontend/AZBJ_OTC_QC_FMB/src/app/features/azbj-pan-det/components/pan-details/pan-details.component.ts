import { Component, OnInit } from '@angular/core';
import { PanDetailsModel } from '../../models/pan-details.model';

@Component({
  selector: 'app-pan-details',
  templateUrl: './pan-details.component.html',
  styleUrls: ['./pan-details.component.css']
})
export class PanDetailsComponent implements OnInit {
  panDetails: PanDetailsModel = new PanDetailsModel();

  constructor() {}

  ngOnInit(): void {
    // Initialize the component and set up the data structure for the PAN details
    this.panDetails = {
      panNumber: '',
      panStatus: '',
      nameMatch: '',
      dobMatch: '',
      seedingFlag: ''
    };
  }

  savePanDetails(): void {
    // Save the PAN details to the database or perform any other necessary actions
    console.log('PAN Details saved:', this.panDetails);
    // Add your logic to save the details to the database or any other storage
  }
}
