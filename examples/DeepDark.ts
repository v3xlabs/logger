import { createLogger } from "@lvksh/logger";
import chalk from "chalk";


const log = createLogger(
    {
        http: chalk.gray`[HTTP]`,
        data: {
            label: chalk.black`\{` + chalk.yellowBright`DB` + chalk.black`\}`,
            newLine: chalk.yellowBright.bold`┣━`,
            newLineEnd: chalk.yellow.bold`┗━`,
        },
        error: {
            label: "[" + chalk.bgRed.white`ERROR` + "]",
            paddingChar: chalk.red.bold`━`,
            divider: chalk.red.bold`|`,
            newLine: chalk.red.bold`┣━`,
            newLineEnd: chalk.red.bold`┗━`,
        },
        debug: {
            label: chalk.magenta.bold`(DEBUG)`,
            paddingChar: chalk.magenta.bold`~`,
            divider: chalk.magenta.bold`?`,
            newLine: chalk.magenta.bold`|`,
            newLineEnd: chalk.magenta.bold`\\`,
        },
        info: {
            label: "[" + chalk.blue`INFO` + "]",
            paddingChar: chalk.blue`:`,
            divider: chalk.blue.bold`>`,
            newLine: chalk.blue.bold`┣━`,
            newLineEnd: chalk.blue.bold`┗━`,
        },
        test: {
            label: chalk.white`<TEST>:` + new Date().toLocaleTimeString().replace(/(AM|PM)/, "",).trim(),
            paddingChar: "-",
            divider: chalk.white.bold`|`,
            newLine: chalk.white.bold`┣━`,
            newLineEnd: chalk.white.bold`┗━`,
        },
    },
    { padding: "APPEND", divider: chalk.greenBright`>`, paddingChar: ":" },
);

log.http("Serving /hello");
log.data("Fetching user 01", "with extra info", "hello");
log.info("Succesful connection", "Continuing cycle", "Cycle complete")
log.test("Test log", "Testing Now...", "Testing succesful");
log.debug("This log is here", "Here", "And here...")
log.error("BIG ERROR OOF ASTLEY WAS HERE", "hello", "world");