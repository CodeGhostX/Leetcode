import { createLogger, format, transports } from "winston";
const { combine, timestamp, colorize, prettyPrint } = format;

const logger = createLogger({
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    prettyPrint(),
    colorize({ all: true })
  ),
  transports: [new transports.Console()],
});

export default logger;
