import { appConfig } from "./config/appConfig.js";

import { logger } from "./utils/logger.js";
import { getErrorMessage } from "./utils/errorUtils.js";

logger.info(
    "Logger Test successful", {
        project: "weather MCP Server",
    }
);

const message = getErrorMessage(new Error("Example test error message"));

logger.debug("Error utility test successful", {
    message,
});
