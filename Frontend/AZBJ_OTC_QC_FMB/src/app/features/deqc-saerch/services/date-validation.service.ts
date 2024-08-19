import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ValidationResult } from '../../shared/models/validation-result.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DateValidationService {
  private apiUrl = `${environment.apiUrl}/date-validation`;

  constructor(private http: HttpClient) {}

  validateDates(fromDate: string, toDate: string): Observable<ValidationResult> {
    const params = { fromDate, toDate };
    return this.http.get<ValidationResult>(`${this.apiUrl}/validate`, { params });
  }
}