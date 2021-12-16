import { createLogger } from "@lvksh/logger";
import chalk from "chalk";
""

const log = createLogger(
    {
        server: chalk.gray`[SERVER]`,
        client: {
            label: "{" + chalk.yellowBright`\{CLIENT\}` + "}",
            newLine: chalk.yellowBright.bold`┣━`,
            newLineEnd: chalk.yellow.bold`┗━`,
        },
        middleware: {
            label: "=[" + chalk.bgBlue.white`MIDDLE` + "]=",
            paddingChar: chalk.red.bold`━`,
            divider: chalk.red.bold`|`,
            newLine: chalk.red.bold`┣━`,
            newLineEnd: chalk.red.bold`┗━`,
        },
        services: {
            label: chalk.magenta.bold`(SERVICES)`,
            paddingChar: chalk.magenta.bold`~`,
            divider: chalk.magenta.bold`?`,
            newLine: chalk.magenta.bold`|`,
            newLineEnd: chalk.magenta.bold`\\`,
        },
        error:{
            label: "ERROR!",
        }
    },
    { padding: "APPEND", divider: chalk.greenBright`>`, paddingChar: ":" },
);

log.server("Serving /hello");
log.client("Fetching user 01", "with extra info", "hello");
log.middleware("Succesful connection", "Continuing cycle", "Cycle complete")
log.services("Test log", "Testing Now...", "Testing succesful");
log.error("BIG ERROR OOF ASTLEY WAS HERE", "hello", "world");