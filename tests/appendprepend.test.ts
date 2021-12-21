import { createLogger, Logger } from '../src';
const logFn = jest.fn();

describe('Prepend vs Append vs None', () => {
    let loggerPrepend: Logger<'short' | 'longer' | 'custom_short'>;
    let loggerAppend: Logger<'short' | 'longer' | 'custom_short'>;
    let loggerNone: Logger<'short' | 'longer' | 'custom_short'>;

    beforeAll(() => {
        loggerPrepend = createLogger(
            {
                short: 'SHORT',
                longer: 'LONGER',
                custom_short: {
                    label: 'SHORT',
                    paddingChar: '-',
                },
            },
            { padding: 'PREPEND', color: false },
            logFn
        );
        loggerAppend = createLogger(
            {
                short: 'SHORT',
                longer: 'LONGER',
                custom_short: {
                    label: 'SHORT',
                    paddingChar: '-',
                },
            },
            { padding: 'APPEND', color: false },
            logFn
        );
        loggerNone = createLogger(
            {
                short: 'SHORT',
                longer: 'LONGER',
                custom_short: {
                    label: 'SHORT',
                    paddingChar: '-',
                },
            },
            { padding: 'NONE', color: false },
            logFn
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const helloMessage = 'Hello world';

    it('should prepend short', () => {
        loggerPrepend.short(helloMessage);
        expect(logFn).toBeCalledWith(' SHORT Hello world');
    });
    it('should append short', () => {
        loggerAppend.short(helloMessage);
        expect(logFn).toBeCalledWith('SHORT  Hello world');
    });
    it('should none short', () => {
        loggerNone.short(helloMessage);
        expect(logFn).toBeCalledWith('SHORT Hello world');
    });
    it('should prepend short', () => {
        loggerPrepend.short(helloMessage);
        expect(logFn).toBeCalledWith(' SHORT Hello world');
    });
    it('should append short', () => {
        loggerAppend.short(helloMessage);
        expect(logFn).toBeCalledWith('SHORT  Hello world');
    });
    it('should none short', () => {
        loggerNone.short(helloMessage);
        expect(logFn).toBeCalledWith('SHORT Hello world');
    });
    it('should prepend custom padding short', () => {
        loggerPrepend.custom_short(helloMessage);
        expect(logFn).toBeCalledWith('-SHORT Hello world');
    });
    it('should append custom padding short', () => {
        loggerAppend.custom_short(helloMessage);
        expect(logFn).toBeCalledWith('SHORT- Hello world');
    });
    it('should none custom padding short', () => {
        loggerNone.custom_short(helloMessage);
        expect(logFn).toBeCalledWith('SHORT Hello world');
    });
});
