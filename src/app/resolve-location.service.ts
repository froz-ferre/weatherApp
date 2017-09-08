import { retry } from 'rxjs/operator/retry';
import { Resolve } from '@angular/router';
import { WeatherService } from './weather.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ResolveLocationService implements Resolve<any> {

  constructor(private ws:WeatherService) { }

  resolve(){
    return this.ws.localWeather();
  }
}
