import chalk from 'chalk';

import { createLogger, Logger, shimLog } from '../src';

const logFunction = jest.fn();

describe('Objects & Arrays', () => {
    let logger: Logger<'ok'>;

    beforeAll(() => {
        logger = createLogger(
            {
                ok: 'OK',
            },
            { color: false },
            logFunction
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('can log objects', () => {
        logger.ok({ hello: 'world' });
        expect(logFunction).toBeCalledWith('OK { hello: \'world\' }');
    });

    it('can log arrays', () => {
        logger.ok(['hello', 'world']);
        expect(logFunction).toBeCalledWith('OK [ \'hello\', \'world\' ]');
    });
});
