import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImageDetails } from '../../models/image-details.model';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as fs from 'fs';
import * as path from 'path';
import { shell } from 'electron';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css']
})
export class ImageDetailsComponent implements OnInit {
  imageDetails: ImageDetails[] = [];
  displayedImageDetails: ImageDetails[] = [];
  currentIndex: number = 0;

  @ViewChild('proposalNoField') proposalNoField!: ElementRef;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    // Mock data for demonstration
    this.imageDetails = [
      { imagePath: 'path1', proposalNumber: '123', applicationNumber: '456', imageType: 'type1', scanTime: 'time1', imageSize: 100, numberOfPages: '10' },
      { imagePath: 'path2', proposalNumber: '124', applicationNumber: '457', imageType: 'type2', scanTime: 'time2', imageSize: 200, numberOfPages: '20' },
      { imagePath: 'path3', proposalNumber: '125', applicationNumber: '458', imageType: 'type3', scanTime: 'time3', imageSize: 300, numberOfPages: '30' },
      { imagePath: 'path4', proposalNumber: '126', applicationNumber: '459', imageType: 'type4', scanTime: 'time4', imageSize: 400, numberOfPages: '40' },
      { imagePath: 'path5', proposalNumber: '127', applicationNumber: '460', imageType: 'type5', scanTime: 'time5', imageSize: 500, numberOfPages: '50' },
      { imagePath: 'path6', proposalNumber: '128', applicationNumber: '461', imageType: 'type6', scanTime: 'time6', imageSize: 600, numberOfPages: '60' }
    ];
    this.updateDisplayedImageDetails();
  }

  updateDisplayedImageDetails(): void {
    this.displayedImageDetails = this.imageDetails.slice(this.currentIndex, this.currentIndex + 5);
  }

  viewImage(): void {
    // Logic to view an image
    console.log('View Image clicked');
  }

  hideImage(): void {
    // Logic to hide an image and move focus to proposal_no field
    console.log('Hide Image clicked');
    this.proposalNoField.nativeElement.focus();
  }

  copyAndOpenImages(applicationNumber: string): void {
    const targetDir = path.join('C:', 'temp', applicationNumber);

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    this.imageDetails.forEach(imageDetail => {
      if (imageDetail.applicationNumber === applicationNumber && imageDetail.imagePath) {
        const targetPath = path.join(targetDir, path.basename(imageDetail.imagePath));

        this.http.get(imageDetail.imagePath, { responseType: 'blob' }).pipe(
          catchError(err => {
            console.error('Error fetching image:', err);
            return of(null);
          })
        ).subscribe(blob => {
          if (blob) {
            const reader = new FileReader();
            reader.onload = () => {
              fs.writeFileSync(targetPath, Buffer.from(reader.result as ArrayBuffer));
              if (imageDetail.imagePath.endsWith('.pdf')) {
                shell.openPath(targetPath);
              } else {
                shell.openPath(targetPath);
              }
            };
            reader.readAsArrayBuffer(blob);
          }
        });
      }
    });
  }
}
