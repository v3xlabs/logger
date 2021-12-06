const { createLogger } = require("../lib/index.js")
const chalk = require("chalk");

const log = createLogger(
    {
        ok: {label: chalk.greenBright`[OK]`,newLine: '| ', newLineEnd: '\\-'},
        debug: chalk.magentaBright`[DEBUG]`,
        info: {
            label: chalk.cyan`[INFO]`,
            newLine: chalk.cyan`⮡`,
            newLineEnd: chalk.cyan`⮡`,
        },
        veryBigNetworkError: chalk.bgRed.white.bold`[NETWORK]`,
    },
    { padding: "PREPEND"},
    console.log
);

log.ok("This is the best logging", "library", "you");
log.info("will probably");
log.debug("ever use");
log.veryBigNetworkError`Never Gonna Give You Up!`;
log.debug("in", "your", "life", "you\'re", "welcome");
log.info("item 1", "item 2", "item 3", "item 4", "item 5");
