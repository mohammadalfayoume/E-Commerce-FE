import { Component, OnInit, inject, signal } from '@angular/core';
import { UtcDatePipe } from '../../shared/pipes/utc-date.pipe';
import { TransactionsService } from '../../core/transactions/services/transactions.service';
import { UserTransactionDto } from '../../core/transactions/models/transaction.models';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [UtcDatePipe],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss',
})
export class TransactionsComponent implements OnInit {
  private readonly transactionsService = inject(TransactionsService);

  readonly transactions = signal<UserTransactionDto[]>([]);
  readonly isLoading = signal(true);
  readonly errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.transactionsService.getTransactions().subscribe({
      next: (data) => {
        this.transactions.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.description ?? 'Failed to load transactions.');
        this.isLoading.set(false);
      },
    });
  }
}
