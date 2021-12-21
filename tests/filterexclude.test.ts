import chalk from 'chalk';

import { createLogger, Logger } from '../src';

const logFn = jest.fn();
const neverLogFn = jest.fn();

describe('Filter & Exclude', () => {
    let logger: Logger<'info' | 'error' | 'debug'>;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should log default', () => {
        logger = createLogger(
            {
                info: {
                    label: chalk.greenBright`[OK]`, 
                },
                error: {
                    label: chalk.redBright`[ERROR]`,
                    tags: ['prod'],
                },
                debug: {
                    label: chalk.blueBright`[DEBUG]`,
                    tags: ['debug'],
                }
            },
            { padding: 'PREPEND', color: false},
            logFn
        );

        logger.info('info');
        expect(logFn).toBeCalledWith(
            `   ${chalk.greenBright('[OK]')} info`
        );
    });

    it('should exclude debug', () => {
        logger = createLogger(
            {
                info: {
                    label: chalk.greenBright`[OK]`, 
                },
                error: {
                    label: chalk.redBright`[ERROR]`,
                    tags: ['prod'],
                },
                debug: {
                    label: chalk.blueBright`[DEBUG]`,
                    tags: ['debug'],
                }
            },
            { padding: 'PREPEND', color: false, exclude: ['debug'] },
            logFn
        );

        logger.debug('debug');
        expect(neverLogFn).not.toBeCalled();
    });

    it('should only show prod tag', () => {
        logger = createLogger(
            {
                info: {
                    label: chalk.greenBright`[OK]`, 
                },
                error: {
                    label: chalk.redBright`[ERROR]`,
                    tags: ['prod'],
                },
                debug: {
                    label: chalk.blueBright`[DEBUG]`,
                    tags: ['debug'],
                }
            },
            { padding: 'PREPEND', color: false, filter: ['prod'] },
            logFn
        );

        logger.info('info');
        expect(neverLogFn).not.toBeCalled();

        logger.error('error');
        expect(logFn).toBeCalledWith(
            `${chalk.redBright('[ERROR]')} error`
        );
    });
});