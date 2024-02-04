// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { CurrencyService } from './currency.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CommonModule, HttpClientModule, FormsModule],
  providers: [CurrencyService],
  bootstrap: [AppComponent],
})
export class AppModule {}
