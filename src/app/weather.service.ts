import { Http, Response } from '@angular/http';
import { CurrentWeather } from './current-weather';
import { Injectable } from '@angular/core';

import 'rxjs/Rx';

@Injectable()
export class WeatherService {
  myWeather: CurrentWeather;
  location
  constructor(private http:Http) { }

  localWeather(){
    return new Promise ((res, rej) => {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.location = pos.coords;
        const lat = this.location.latitude;
        const lon = this.location.longitude;
        return this.http.get(`api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f9da9c9467cf32f6fa2dca8b636ac6c6`)
        .map((response:Response) => response.json()).toPromise().then((data) => {
            this.myWeather = new CurrentWeather(data.name,
                                                data.main.temp,
                                                data.weather[0].icon,
                                                data.weather[0].description,
                                                data.main.temp_max,
                                                data.main.temp_min);
            res(this.myWeather);
          }
        )
      })
    })
  }
}
