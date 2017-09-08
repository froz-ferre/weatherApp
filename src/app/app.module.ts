import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ForecastComponent } from './forecast/forecast.component';
import { CurrentComponent } from './current/current.component';

import { weatherRouting } from './weather.routing';
import { WeatherService } from './weather.service';
import { ResolveLocationService } from './resolve-location.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ForecastComponent,
    CurrentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    weatherRouting,
    ReactiveFormsModule
  ],
  providers: [WeatherService, ResolveLocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
