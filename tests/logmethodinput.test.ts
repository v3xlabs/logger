import chalk from 'chalk';

import { createLogger, Logger, shimLog } from '../src';

const logFunction = jest.fn();

describe('Capable of logging multi-values', () => {
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

    it('should log ok', () => {
        logger.ok(
            'This is the best logging library',
            5,
            true,
            [ 'list' ],
            { object: 'yes' }
        );
        expect(logFunction).toBeCalledWith(
            `${chalk.greenBright('[OK]')} This is the best logging library\n` +
            '  |  5\n' +
            '  |  true\n' +
            '  |  [ \'list\' ]\n' +
            '  \\- { object: \'yes\' }'
        );
    });
});
