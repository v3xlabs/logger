import chalk from 'chalk';

import { createLogger, Logger, shimLog } from '../src';

const logFn = jest.fn();

describe('Objects & Arrays', () => {
    let logger: Logger<'ok'>;

    beforeAll(() => {
        logger = createLogger(
            {
                ok: 'OK',
            },
            { color: false },
            logFn
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('can log objects', () => {
        logger.ok({ hello: 'world' });
        expect(logFn).toBeCalledWith('OK { hello: \'world\' }');
    });

    it('can log arrays', () => {
        logger.ok(['hello', 'world']);
        expect(logFn).toBeCalledWith('OK [ \'hello\', \'world\' ]');
    });
});
