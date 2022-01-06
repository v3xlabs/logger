import chalk from 'chalk';

import { createLogger, Logger, shimLog } from '../src';
const logFunction = jest.fn();

describe('Shim Log', () => {
    let logger: Logger<'foo' | 'bar'>;

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
            { padding: 'PREPEND', color: false },
            logFunction
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should shim', () => {
        shimLog(logger, 'foo');
        logger.foo('This is using it directly');
        console.log('This is using it shimmed');
        expect(logFunction).toBeCalledTimes(2);
        expect(logFunction).toBeCalledWith('[FOO] This is using it directly');
        expect(logFunction).toBeCalledWith('[FOO] This is using it shimmed');
    });
});
