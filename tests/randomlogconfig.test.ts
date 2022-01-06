import chalk from 'chalk';

import { createLogger, Logger } from '../src';

const logFunction = jest.fn<void, [string]>();

describe('Random Config', () => {
    let logger: Logger<'foo' | 'bar'>;

    beforeAll(() => {
        logger = createLogger(
            [
                {
                    foo: {
                        label: '[FOO]',
                        newLine: '| ',
                        newLineEnd: '\\-',
                    },
                    bar: {
                        label: '[BAR]',
                        newLine: '| ',
                        newLineEnd: '\\-',
                        divider: ' | ',
                    },
                },
                {
                    foo: {
                        label: 'FOO',
                        newLine: '| ',
                        newLineEnd: '\\-',
                    },
                    bar: {
                        label: 'BAR',
                        newLine: '| ',
                        newLineEnd: '\\-',
                        divider: ' | ',
                    },
                },
            ],
            { padding: 'PREPEND', color: false },
            logFunction
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should accept random configs', () => {
        logger.foo('This is a cool logging library');
        expect(
            logFunction.mock.calls.some(a => a.includes(
                'FOO This is a cool logging library'
            )) ||
            logFunction.mock.calls.some(a => a.includes(
                '[FOO] This is a cool logging library',
            ))
        ).toBeTruthy();
    });
});
