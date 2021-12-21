import { createLogger, Logger } from "../src";

describe("Default values", () => {
    let consoleLog: jest.SpyInstance;
    let logger: Logger<"default">;

    beforeAll(() => {
        consoleLog = jest.spyOn(console, "log").mockImplementation(() => { });
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

