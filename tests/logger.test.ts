import chalk from "chalk";
import { createLogger } from "../src";
import { LogFunction } from "../src/types"

const logFn = jest.fn();

describe("Basic Logging", () => {
    let logger: LogFunction<"debug" | "info" | "ok" | "neterr">;
    
    beforeAll(() => {
        logger = createLogger({
            ok: {
                label: chalk.greenBright`[OK]`,
                newLine: '| ',
                newLineEnd: `\\-`
            },
            info: {
                label: chalk.cyan`[INFO]`,
                newLine: chalk.cyan`⮡`,
                newLineEnd: chalk.cyan`⮡`
            },
            debug: chalk.magentaBright`[DEBUG]`,
            neterr: chalk.bgRed.white.bold`[NETWORK]`
        }, { padding: "PREPEND" }, logFn);
    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should log ok", () => {
        logger.ok("This is the best logging library", "It's not even a question", "It even supports multi\nline logs");
        expect(logFn).toBeCalledWith(
            `     ${chalk.greenBright`[OK]`} This is the best logging library\n` +
            "       |  It's not even a question\n" +
            "       |  It even supports multi\n" +
            "       \\- line logs"
        )
        // expect(consoleLog.mock.calls).toEqual([
        //     [`     ${chalk.greenBright`[OK]`} This is the best logging library`],
        //     [`       |  It's not even a question`],
        //     [`       |  It even supports multi`],
        //     [`       \\- line logs`]
        // ])
    });
})