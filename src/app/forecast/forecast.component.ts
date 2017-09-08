import { validate } from 'codelyzer/walkerFactory/walkerFn';
import { CurrentWeather } from '../current-weather';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import 'rxjs/Rx';

import { WeatherService } from '../weather.service';
import { Forecast } from '../forecast';
import { ChartModule, Chart } from 'angular-highcharts';


@Component({
  selector: 'wa-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  constructor(private ws: WeatherService) { }

  forecastForm: FormGroup;
  cityForecast: Forecast[] = [];
  chart: Chart;

  ngOnInit() {
    this.forecastForm = new FormGroup({
      forecastCity: new FormControl('')
    })
    
  }

  onSubmit(){
    
    this.cityForecast.splice(0, this.cityForecast.length);
    this.ws.forecast(this.forecastForm.value.forecastCity).subscribe(
      (data) => {
        console.log(data);
        for(let i = 3; i < data.list.length; i+= 8 ){
          const temporary = new Forecast(data.city.name + ', ' + data.city.country,
                                         data.list[i].dt_txt,
                                         data.list[i].weather[0].icon,
                                         data.list[i].main.temp,
                                         data.list[i].weather[0].description,
                                         data.list[i].main.pressure,
                                         data.list[i].clouds.all,
                                         data.list[i].wind.speed)
          this.cityForecast.push(temporary);
        }
        this.chart = new Chart({
          chart: {
            type: 'column'
          },
          title: {
             text: 'Weather in '+this.cityForecast[0].city+' for 5 days'
          },
          subtitle: {
            text: this.cityForecast[0].description+
            ', pressure: '+this.cityForecast[0].pressure+
            ', clouds: '+this.cityForecast[0].clouds+
            '%, wind speed: '+this.cityForecast[0].windSpeed+'m/s'
          },
          xAxis: {
            categories: [
              this.cityForecast[0].day,
              this.cityForecast[1].day,
              this.cityForecast[2].day,
              this.cityForecast[3].day,
              this.cityForecast[4].day,
            ]
          },
          yAxis: {
            title: {
              text: 'Celsius'
            }
        },
          credits: {
            enabled: false
          },
          series: [{
            name: this.cityForecast[0].city,
            data: [
              +this.cityForecast[0].temp,
              +this.cityForecast[1].temp,
              +this.cityForecast[2].temp,
              +this.cityForecast[3].temp,
              +this.cityForecast[4].temp,
            ]
          }]        
        });
        
      }
    )
  }

}
