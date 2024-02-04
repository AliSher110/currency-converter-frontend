import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyService } from './currency.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class AppComponent {
  currencies: any[] = [];
  currencyCodes: string[] = [];
  amount1: number = 1;
  amount2: number | null = 1;
  selectedFromCurrency: string = 'EUR';
  selectedToCurrency: string = 'USD';
  convertedValue: number | null = null;
  loading: boolean = false;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.getCurrencies();
    this.getCurrencyRate();
  }

  async getCurrencies(): Promise<void> {
    this.loading = true;
    (await this.currencyService.getAllCurrencies()).subscribe(
      (data) => {
        this.currencies = data.data;
        this.currencyCodes = Object.keys(this.currencies);
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching currencies', error);
        this.loading = false;
      }
    );
  }
  async getCurrencyRate(): Promise<void> {
    this.loading = true;
    (
      await this.currencyService.getCurrencyRate(
        this.selectedFromCurrency,
        this.selectedToCurrency
      )
    ).subscribe(
      (data) => {
        this.convertedValue = data.data[this.selectedToCurrency];
        this.convertCurrencies();
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching currency rate', error);
        this.loading = false;
      }
    );
  }

  convertCurrencies(): void {
    this.amount2 = this.convertedValue && this.amount1 * this.convertedValue;
  }
}
