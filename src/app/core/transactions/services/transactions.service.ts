import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UserTransactionDto } from '../models/transaction.models';

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/UserTransactions`;

  getTransactions(): Observable<UserTransactionDto[]> {
    return this.http.get<UserTransactionDto[]>(this.apiUrl);
  }
}
