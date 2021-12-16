import chalk from "chalk";
import { createLogger, Logger } from "../src";

const logFn = jest.fn();

describe("Basic Logging", () => {
    let logger: Logger<"ok">;

    beforeAll(() => {
        logger = createLogger(
            {
                ok: {
                    label: chalk.greenBright`[OK]`,
                    newLine: "| ",
                    newLineEnd: `\\-`,
                },
            },
            { padding: "PREPEND", color: false },
            logFn
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should log ok", () => {
        logger.ok(
            "This is the best logging library",
            "It's not even a question",
            "It even supports multi\nline logs"
        );
        expect(logFn).toBeCalledWith(
            `${chalk.greenBright`[OK]`} This is the best logging library\n` +
                "  |  It's not even a question\n" +
                "  |  It even supports multi\n" +
                "  \\- line logs"
        );
    });
});

describe("Objects & Arrays", () => {
    let logger: Logger<"ok">;

    beforeAll(() => {
        logger = createLogger(
            {
                ok: "OK",
            },
            { color: false },
            logFn
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("can log objects", () => {
        logger.ok({ hello: "world" });
        expect(logFn).toBeCalledWith("OK { hello: 'world' }");
    });

    it("can log arrays", () => {
        logger.ok(["hello", "world"]);
        expect(logFn).toBeCalledWith("OK [ 'hello', 'world' ]");
    });
});

describe("Prepend vs Append vs None", () => {
    let loggerPrepend: Logger<"short" | "longer" | "custom_short">;
    let loggerAppend: Logger<"short" | "longer" | "custom_short">;
    let loggerNone: Logger<"short" | "longer" | "custom_short">;

    beforeAll(() => {
        loggerPrepend = createLogger(
            {
                short: "SHORT",
                longer: "LONGER",
                custom_short: {
                    label: "SHORT",
                    paddingChar: "-",
                },
            },
            { padding: "PREPEND", color: false },
            logFn
        );
        loggerAppend = createLogger(
            {
                short: "SHORT",
                longer: "LONGER",
                custom_short: {
                    label: "SHORT",
                    paddingChar: "-",
                },
            },
            { padding: "APPEND", color: false },
            logFn
        );
        loggerNone = createLogger(
            {
                short: "SHORT",
                longer: "LONGER",
                custom_short: {
                    label: "SHORT",
                    paddingChar: "-",
                },
            },
            { padding: "NONE", color: false },
            logFn
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should prepend short", () => {
        loggerPrepend.short("Hello world");
        expect(logFn).toBeCalledWith(" SHORT Hello world");
    });
    it("should append short", () => {
        loggerAppend.short("Hello world");
        expect(logFn).toBeCalledWith("SHORT  Hello world");
    });
    it("should none short", () => {
        loggerNone.short("Hello world");
        expect(logFn).toBeCalledWith("SHORT Hello world");
    });
    it("should prepend short", () => {
        loggerPrepend.short("Hello world");
        expect(logFn).toBeCalledWith(" SHORT Hello world");
    });
    it("should append short", () => {
        loggerAppend.short("Hello world");
        expect(logFn).toBeCalledWith("SHORT  Hello world");
    });
    it("should none short", () => {
        loggerNone.short("Hello world");
        expect(logFn).toBeCalledWith("SHORT Hello world");
    });
    it("should prepend custom padding short", () => {
        loggerPrepend.custom_short("Hello world");
        expect(logFn).toBeCalledWith("-SHORT Hello world");
    });
    it("should append custom padding short", () => {
        loggerAppend.custom_short("Hello world");
        expect(logFn).toBeCalledWith("SHORT- Hello world");
    });
    it("should none custom padding short", () => {
        loggerNone.custom_short("Hello world");
        expect(logFn).toBeCalledWith("SHORT Hello world");
    });
});

describe("Multiline Wrapping", () => {
    let logger: Logger<"plaintext" | "oneline" | "twoline">;

    beforeAll(() => {
        logger = createLogger(
            {
                plaintext: "OK",
                oneline: { label: "OK", newLine: "!" },
                twoline: { label: "OK", newLine: "!", newLineEnd: "!" },
            },
            {},
            logFn
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should log plaintext", () => {
        logger.plaintext("Line 1", "Line 2", "Line 3");
        expect(logFn).toBeCalledWith(
            "OK Line 1\n" + "├- Line 2\n" + "└- Line 3"
        );
    });
    it("should log oneline", () => {
        logger.oneline("Line 1", "Line 2", "Line 3");
        expect(logFn).toBeCalledWith(
            "OK Line 1\n" + " ! Line 2\n" + "└- Line 3"
        );
    });
    it("should log twoline", () => {
        logger.twoline("Line 1", "Line 2", "Line 3");
        expect(logFn).toBeCalledWith(
            "OK Line 1\n" + " ! Line 2\n" + " ! Line 3"
        );
    });
});

describe("Default values", () => {
    let consoleLog: jest.SpyInstance;
    let logger: Logger<"default">;

    beforeAll(() => {
        consoleLog = jest.spyOn(console, "log").mockImplementation(() => {});
        logger = createLogger({
            default: "OK",
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should log", () => {
        logger.default("Hello world");
        expect(consoleLog).toBeCalledWith("OK Hello world");
    });
});

describe("Custom divider", () => {
    let logger: Logger<"foo" | "bar">;

    beforeAll(() => {
        logger = createLogger(
            {
                foo: {
                    label: chalk.greenBright`[FOO]`,
                    newLine: "| ",
                    newLineEnd: `\\-`,
                },
                bar: {
                    label: chalk.redBright`[BAR]`,
                    newLine: "| ",
                    newLineEnd: `\\-`,
                    divider: " | ",
                },
            },
            { padding: "PREPEND", color: false },
            logFn
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should use default divider", () => {
        logger.foo("This is a cool logging library");
        expect(logFn).toBeCalledWith(
            `${chalk.greenBright`[FOO]`} This is a cool logging library`
        );
    });

    it("should use custom divider", () => {
        logger.bar("This is even cooler");
        expect(logFn).toBeCalledWith(
            `${chalk.redBright`[BAR]`} | This is even cooler`
        );
    });
});

describe("Runtime Label", () => {
    let logger: Logger<"foo" | "bar">;

    beforeAll(() => {
        logger = createLogger(
            {
                foo: {
                    label: {
                        length: 10,
                        calculate: () => {
                            return chalk.greenBright(
                                "[" +
                                    new Date("apr 20 1889")
                                        .toTimeString()
                                        .substring(0, 8) +
                                    "]"
                            );
                        },
                    },
                    newLine: "| ",
                    newLineEnd: `\\-`,
                },
                bar: {
                    label: chalk.redBright`[BAR]`,
                    newLine: "| ",
                    newLineEnd: `\\-`,
                    divider: " | ",
                },
            },
            { padding: "PREPEND", color: false },
            logFn
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should use default divider", () => {
        logger.foo("This is a cool logging library");
        expect(logFn).toBeCalledWith(
            `${chalk.greenBright`[00:00:00]`} This is a cool logging library`
        );
    });

    it("should use custom divider", () => {
        logger.bar("This is even cooler");
        expect(logFn).toBeCalledWith(
            `     ${chalk.redBright`[BAR]`} | This is even cooler`
        );
    });
});
