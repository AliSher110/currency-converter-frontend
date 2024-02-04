// src/app/currency.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private apiUrl = 'http://localhost:4100';

  constructor(private http: HttpClient) {}

  async getAllCurrencies(): Promise<Observable<any>> {
    return await this.http.get(`${this.apiUrl}/getCurrencies`);
  }
  async getCurrencyRate(
    base_currency: string,
    currencies: string
  ): Promise<Observable<any>> {
    // Create HttpParams object and set the parameters
    const params = new HttpParams()
      .set('base_currency', base_currency)
      .set('currencies', currencies);

    // Use the params in the get request
    return await this.http.get(`${this.apiUrl}/getRates`, { params });
  }
}
