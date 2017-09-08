import { CurrentWeather } from '../current-weather';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import 'rxjs/Rx';

import { WeatherService } from '../weather.service';
import { Forecast } from '../forecast';

@Component({
  selector: 'wa-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  constructor(private ws: WeatherService) { }

  forecastForm: FormGroup;
  cityForecast: Forecast[] = [];

  ngOnInit() {
    this.forecastForm = new FormGroup({
      forecastCity: new FormControl('Dnipropetrovsk')
    })
  }

  onSubmit(){
    this.cityForecast.splice(0, this.cityForecast.length);
    this.ws.forecast(this.forecastForm.value.forecastCity).subscribe(
      (data) => {
        for(let i = 3; i < data.list.length; i+= 8 ){
          const temporary = new Forecast(data.list[i].dt_txt,
                                        data.list[i].weather[0].icon,
                                         data.list[i].main.temp)
          this.cityForecast.push(temporary);
        }
        console.log(this.cityForecast);
      }
    )
  }

}
