import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { CurrentWeather } from './current-weather';
import { Forecast } from './forecast'

import 'rxjs/Rx';

@Injectable()
export class WeatherService {
  myWeather: CurrentWeather;
  location;
  constructor(private http:Http) { }

  localWeather(){
    return new Promise ((res, rej) => {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.location = pos.coords;
        const lat = this.location.latitude;
        const lon = this.location.longitude;
        return this.http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f9da9c9467cf32f6fa2dca8b636ac6c6&units=metric`)
                            .map((response:Response) => response.json())
                            .toPromise()
                            .then((data) => {
                                  this.myWeather = new CurrentWeather(data.name,                                                
                                  data.main.temp,
                                  data.weather[0].icon,
                                  data.weather[0].description,
                                  data.main.temp_min,
                                  data.main.temp_max);
            res(this.myWeather);
          }
        )
      })
    })
  }

  cityWeather(city:string){
    return this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f9da9c9467cf32f6fa2dca8b636ac6c6&units=metric`)
                        .map((responce:Response) => responce.json());
  }

  forecast(city:string){
    return this.http.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=f9da9c9467cf32f6fa2dca8b636ac6c6&units=metric`)
                        .map((responce:Response) => responce.json());
  }

}
