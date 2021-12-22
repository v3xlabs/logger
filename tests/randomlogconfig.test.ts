import chalk from 'chalk';

import { createLogger, Logger } from '../src';

const logFn = jest.fn<void, [string]>();

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
            logFn
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should accept random configs', () => {
        logger.foo('This is a cool logging library');
        expect(
            logFn.mock.calls.some(a => a.includes(
                'FOO This is a cool logging library'
            )) ||
            logFn.mock.calls.some(a => a.includes(
                '[FOO] This is a cool logging library',
            ))
        ).toBeTruthy();
    });
});
