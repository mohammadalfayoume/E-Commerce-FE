import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'utcDate', standalone: true })
export class UtcDatePipe implements PipeTransform {
  private readonly datePipe = new DatePipe('en-US');

  transform(value: string | null | undefined, format = 'medium'): string | null {
    if (!value) return null;
    // Append 'Z' if missing so the string is unambiguously UTC,
    // then DatePipe converts it to the browser's local timezone.
    const utc = value.endsWith('Z') ? value : `${value}Z`;
    return this.datePipe.transform(utc, format);
  }
}
