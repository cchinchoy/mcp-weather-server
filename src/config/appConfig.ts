import "dotenv/config";

function getRequiredEnv(name:string): string {
    const value = process.env[name];

    if(!value){
        throw new Error (
            `Missing required environment variable: ${name}`
        );
    }

    return value;
}

export const appConfig = {
    nodeEnv: process.env.NODE_ENV ?? "development",

    weatherApiBaseUrl: getRequiredEnv("WEATHER_API_BASE_URL"),

    geocodingApiBaseUrl: getRequiredEnv("GEOCODING_API_BASE_URL"),
};

