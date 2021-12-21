import chalk from 'chalk';

import { createLogger, Logger } from '../src';

const logFn = jest.fn();

describe('Custom divider', () => {
    let logger: Logger<'foo' | 'bar'>;

    beforeAll(() => {
        logger = createLogger(
            {
                foo: {
                    label: chalk.greenBright`[FOO]`,
                    newLine: '| ',
                    newLineEnd: '\\-',
                },
                bar: {
                    label: chalk.redBright`[BAR]`,
                    newLine: '| ',
                    newLineEnd: '\\-',
                    divider: ' | ',
                },
            },
            { padding: 'PREPEND', color: false },
            logFn
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should use default divider', () => {
        logger.foo('This is a cool logging library');
        expect(logFn).toBeCalledWith(
            `${chalk.greenBright('[FOO]')} This is a cool logging library`
        );
    });

    it('should use custom divider', () => {
        logger.bar('This is even cooler');
        expect(logFn).toBeCalledWith(
            `${chalk.redBright('[BAR]')} | This is even cooler`
        );
    });
});
