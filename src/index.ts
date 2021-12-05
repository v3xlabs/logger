import stripAnsi from 'strip-ansi';

type LogFunc = (input: string | object | object[] | unknown) => void;

type LogFunction<K extends string> = {
    [a in K]: LogFunc;
};

type PadType = 'PREPEND' | 'APPEND';

export const createLogger = <A extends string>(methods: {[k in A]: string}, padding: PadType = 'PREPEND', divider = '|', func = console.log) => {
    const maxLength = Math.max(...(Object.values(methods) as string[]).map(a=>stripAnsi(a).length));

    return Object.assign({}, ...Object.keys(methods).map(a => {
        const text = (methods as {[k: string]: string})[a];
        const padding = ''.padStart(maxLength-stripAnsi(text).length, ' ');
        const paddedText = padding == 'PREPEND' ? padding + text : text + padding;

        return {[a]: (s: unknown) => {
            func(paddedText, divider, s);
        }};
    })) as LogFunction<A>;
};