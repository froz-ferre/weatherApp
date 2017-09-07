import { ResolveLocationService } from './resolve-location.service';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CurrentComponent } from './current/current.component';
import { ForecastComponent } from './forecast/forecast.component';


const WEATHER_ROUTER:Routes = [
    {path: '', component: CurrentComponent, resolve:{myWeather:ResolveLocationService}},
    {path: 'forecast', component: ForecastComponent}
] 
export const weatherRouting:ModuleWithProviders = RouterModule.forRoot(WEATHER_ROUTER)