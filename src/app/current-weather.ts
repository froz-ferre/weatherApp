export class CurrentWeather {
    constructor(public cityName:string,
                public temp: string,
                public icon: string,
                public weatherType: string,
                public minTemp: string,
                public maxTemp: string){}
}
