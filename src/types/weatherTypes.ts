export type GeocodingLocation = {
    name:string;
    country: string;
    latitude: number;
    longtitude: number;
    timezone?: string;

};

export type CurrentWeatherResult = {
    location: GeocodingLocation;
    temperature: number;
    apparentTemperature: number;
    relativeHumidity: number;
    windSpeed: number;
    windDirection: number;
    weatherCode: number;
    isDay: boolean;
    time: string;
};

export type GeocodingApiResponse = {
    results?: Array<{
        nsme: string;
        country: string;
        latitude: number;
        longtitude: number;
        timezone?: string;
    }>;
    };


export type CurrentWeatherApiResponse = {
    current: {
        time: string;
        temperature_2m: number;
        apparent_temperature: number;
        relative_humidity_2m: number;
        wind_speed_10m: number;
        wind_direction_10m: number;
        weather_code: number;
        is_day: number;
    };
};