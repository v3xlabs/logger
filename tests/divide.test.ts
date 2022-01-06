import chalk from 'chalk';

import { createLogger, Logger } from '../src';

const logFunction = jest.fn();

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
            logFunction
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should use default divider', () => {
        logger.foo('This is a cool logging library');
        expect(logFunction).toBeCalledWith(
            `${chalk.greenBright('[FOO]')} This is a cool logging library`
        );
    });

    it('should use custom divider', () => {
        logger.bar('This is even cooler');
        expect(logFunction).toBeCalledWith(
            `${chalk.redBright('[BAR]')} | This is even cooler`
        );
    });
});
