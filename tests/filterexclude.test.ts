import chalk from 'chalk';

import { createLogger, Logger } from '../src';

const logFunction = jest.fn();
const neverLogFunction = jest.fn();

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
            logFunction
        );

        logger.info('info');
        expect(logFunction).toBeCalledWith(
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
            logFunction
        );

        logger.debug('debug');
        expect(neverLogFunction).not.toBeCalled();
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
            logFunction
        );

        logger.info('info');
        expect(neverLogFunction).not.toBeCalled();

        logger.error('error');
        expect(logFunction).toBeCalledWith(
            `${chalk.redBright('[ERROR]')} error`
        );
    });
});

describe('Runtime Filter & Exclude', () => {
    let logger: Logger<'info' | 'error' | 'debug'>;

    afterEach(() => {
        jest.clearAllMocks();
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
            { padding: 'PREPEND', color: false, exclude: () => ['debug'] },
            logFunction
        );

        logger.debug('debug');
        expect(neverLogFunction).not.toBeCalled();
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
            { padding: 'PREPEND', color: false, filter: () => ['prod'] },
            logFunction
        );

        logger.info('info');
        expect(neverLogFunction).not.toBeCalled();

        logger.error('error');
        expect(logFunction).toBeCalledWith(
            `${chalk.redBright('[ERROR]')} error`
        );
    });
});