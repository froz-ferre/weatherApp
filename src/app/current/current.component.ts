import { NgForm } from '@angular/forms/src/directives';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../weather.service';
import { Component, OnInit } from '@angular/core';
import { CurrentWeather } from '../current-weather';

import 'rxjs/Rx';

@Component({
  selector: 'wa-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {
  myWeather:CurrentWeather;
  constructor(private ws:WeatherService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data:{myWeather:CurrentWeather}) => {
        this.myWeather = data.myWeather;
      }
    )
  }

  onSubmit(weatherForm:NgForm) {
    this.ws.cityWeather(weatherForm.value.city).subscribe(
      (data) => {
        this.myWeather = new CurrentWeather(data.name,                                                
                                            data.main.temp,
                                            data.weather[0].icon,
                                            data.weather[0].description,
                                            data.main.temp_min,
                                            data.main.temp_max);
        console.log(data);
      }
    )
  }
}
