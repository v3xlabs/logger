import chalk from "chalk";
import { createLogger, Logger, shimLog } from "../src";
const logFn = jest.fn();

describe("Shim Log", () => {
    let logger: Logger<"foo" | "bar">;

    beforeAll(() => {
        logger = createLogger(
            {
                foo: {
                    label: '[FOO]',
                },
                bar: {
                    label: chalk.redBright`[BAR]`,
                },
            },
            { padding: "PREPEND", color: false },
            logFn
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should shim", () => {
        shimLog(logger, 'foo');
        logger.foo("This is using it directly");
        console.log("This is using it shimmed");
        expect(logFn).toBeCalledTimes(2);
        expect(logFn).toBeCalledWith(
            `[FOO] This is using it directly`
        );
        expect(logFn).toBeCalledWith(
            `[FOO] This is using it shimmed`
        );
    });
});