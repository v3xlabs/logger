import { createLogger } from "@lvksh/logger";
import chalk from "chalk";

const log = createLogger(
    {
        http: chalk.gray`[HTTP]`,
        data: {
            label: chalk.yellowBright`[DB]`,
            newLine: chalk.yellowBright.bold`┣━`,
            newLineEnd: chalk.yellow.bold`┗━`,
        },
        error: {
            label: chalk.bgRed.white`[ERROR]`,
            newLine: chalk.red.bold`┣━`,
            newLineEnd: chalk.red.bold`┗━`,
        },
    },
    { padding: "PREPEND", divider: chalk.greenBright` -> ` },
);

log.http("Serving /hello");
log.data("Fetching user 01", "with extra info", "hello");

log.error("BIG ERROR OOF ASTLEY WAS HERE", "hello", "world");