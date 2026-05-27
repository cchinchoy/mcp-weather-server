import { appConfig } from "../config/appConfig.js";

import type { CurrentWeatherApiResponse, CurrentWeatherResult, GeocodingApiResponse, GeocodingLocation } from "../types/weatherTypes.js";

async function geocodeCity(city: string): Promise<GeocodingLocation> {
    const url = `${appConfig.geocodingApiBaseUrl}/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Geocoding API request failed with status`+
            `${response.status}: ${response.statusText}`);
    }

    const data = (await response.json()) as GeocodingApiResponse;

    const location = data.results?.[0];

    if (!location){
        throw new Error(`No geocoding results found for city: ${city}`);
    }

    return{
        name: location.name,
        country: location.country,
        latitude: location.latitude,
        longitude: location.longitude,
        timezone: location.timezone,
    };
}

export async function getCurrentWEather(city:string): Promise<CurrentWeatherResult> {
    const location = await geocodeCity(city);

    const url = 
        `${appConfig.weatherApiBaseUrl}/forecast?`+
        `latitude=${location.latitude}`+
        `&longitude=${location.longitude}`+
        `&current=temperature_2m, apparent_temperature, relative_humidity_2m, wind_speed_10m, wind_direction_10m,weather_code, is_day`+
        `&timezone=auto`;
        
        const response = await fetch(url);

        if(!response.ok){
            throw new Error(`Weather API request failed with status`+
                `${response.status}: ${response.statusText}`
            );
        }

        const data = (await response.json()) as CurrentWeatherApiResponse;

        return {
            location,
            temperature: data.current.temperature_2m,
            apparentTemperature: data.current.apparent_temperature,
            relativeHumidity: data.current.relative_humidity_2m,
            windSpeed: data.current.wind_speed_10m,
            windDirection: data.current.wind_direction_10m,
            weatherCode: data.current.weather_code,
            isDay: data.current.is_day === 1,
            time: data.current.time,
        };
}