export class Forecast {
    constructor(public city: string,
                public day: string,
                public icon: string,
                public temp: string,
                public description: string,
                public pressure: string,
                public clouds: string,
                public windSpeed: string,) {}
}
