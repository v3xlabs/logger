import { createLogger } from "../lib/index.js";
import chalk from "chalk";

(async () => {
    const log = createLogger(
        {
            ok: chalk.greenBright`[OK]`,
            debug: chalk.magentaBright`[DEBUG]`,
            info: {
                label: chalk.cyan`[INFO]`,
                newLine: chalk.cyan`⮡`,
                newLineEnd: chalk.cyan`⮡`,
            },
            veryBigNetworkError: chalk.bgRed.white.bold`[NETWORK]`,
        },
        { padding: "PREPEND", newLine: '| ', newLineEnd: '\\-'},
        console.log
    );

    log.ok("this is ok");
    log.info("this is info");
    log.debug("this is debug");
    log.veryBigNetworkError`Error 404 at -> Thing`;
    log.debug("item 1", "item 2", "item 3", "item 4", "item 5");
    log.info("item 1", "item 2", "item 3", "item 4", "item 5");
})();
