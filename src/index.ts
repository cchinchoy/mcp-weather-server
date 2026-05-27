import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"

import { currentWeatherSchema } from "./schemas/weatherSchemas.js";
import { getCurrentWEather } from "./services/weatherService.js";
import { logger } from "./utils/logger.js";
import { getErrorMessage } from "./utils/errorUtils.js";


const server  = new McpServer({
    name: "weather-mcp-server",
    version: "1.0.0",
});

logger.info("Starting Weather MCP Server...", {version: "1.0.0"});


server.registerTool(
    "get_current_weather",
    {
        description: "Get the current weather for a city.",
        inputSchema: currentWeatherSchema,

    },

    async ({city}) => {
        try {
            const result = await getCurrentWEather(city);

            logger.info("Successfully retrieved weather data", {city, resolvedLocation: result.location.name, country: result.location.country, temperature: result.temperature});

            return {
                content: [
                    {
                        type: "text",
                        text:
                            `Current Weather \n`+
                            `Location: ${result.location.name}, ${result.location.country}\n`+
                            `Temperature: ${result.temperature}°C\n`+
                            `Feels like: ${result.apparentTemperature}°C\n`+
                            `Humidity: ${result.relativeHumidity}%\n`+
                            `Wind: ${result.windSpeed} km/h\n`+
                            `Wind direction ${result.windDirection}°\n`+
                            `Weather code: ${result.weatherCode}\n`+
                            `Daytime: ${result.isDay ? "Yes" : "No"}\n`+
                            `Time: ${result.time}\n`,
                    },
                ],

                structuredContent: {
                    success: true,
                    ...result,
                },
            };
        } catch (error){
            const message = getErrorMessage(error);

            logger.error("Current Weather lookup failed",{city, error: message});

            return {
                isError: true,
                content: [
                    {
                        type: "text",
                        text: `Current weather lookup failed: ${message}`,
                    },
                ],

                structuredContent:{
                    success: false,
                    error: message,
                },
            };
        }
    }
);

const transport = new StdioServerTransport();

await server.connect(transport);

logger.info("Weather MCP Server is ready to receive requests.");
