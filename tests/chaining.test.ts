import chalk from 'chalk';

import { createLogger, Logger } from '../src';

const logFunction = jest.fn();

describe('Call Chaining', () => {
    let logger: Logger<'ok'>;

    beforeAll(() => {
        logger = createLogger(
            {
                ok: {
                    label: chalk.greenBright`[OK]`,
                    newLine: '| ',
                    newLineEnd: '\\-',
                },
            },
            { padding: 'PREPEND', color: false },
            logFunction
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should log twice', () => {
        logger
            .ok(
                'This is the best logging library',
                'It\'s not even a question',
                'It even supports multi\nline logs'
            )
            .ok('This should also be called, btw.');
        expect(logFunction).toBeCalledWith(
            `${chalk.greenBright('[OK]')} This is the best logging library\n` +
                '  |  It\'s not even a question\n' +
                '  |  It even supports multi\n' +
                '  \\- line logs'
        );
        expect(logFunction).toBeCalledWith(
            `${chalk.greenBright('[OK]')} This should also be called, btw.`
        );
    });

    it('should also log twice', () => {
        logger
            .ok(
                'This is the best logging library',
                'It\'s not even a question',
                'It even supports multi\nline logs'
            );
        logger.ok('This should also be called, btw.');
        expect(logFunction).toBeCalledWith(
            `${chalk.greenBright('[OK]')} This is the best logging library\n` +
                '  |  It\'s not even a question\n' +
                '  |  It even supports multi\n' +
                '  \\- line logs'
        );
        expect(logFunction).toBeCalledWith(
            `${chalk.greenBright('[OK]')} This should also be called, btw.`
        );
    });
});
