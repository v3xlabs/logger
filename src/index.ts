import { inspect } from 'node:util';

import { stripAnsi as _stripAnsi } from './ansi';

export const stripAnsi = _stripAnsi;

export type LogMethodInput =
    | string
    | number
    | boolean
    | object
    | null
    | undefined;

export type LogMethod<K extends string> = (
    ...input: LogMethodInput[]
) => Logger<K>;

export type Logger<K extends string> = {
    [a in K]: LogMethod<K>;
};

export type RuntimeOrValue<K> = (() => K) | K;

export type PadType = 'PREPEND' | 'APPEND' | 'NONE';

export type SharedConfig = {
    /**
     * The character to be used when a line needs to be broken
     * This overrides any value set by the logger
     * @default "├-"
     */
    newLine?: string;
    /**
     * The character to be used when the last line needs to be broken
     * This overrides any value set by the logger
     * @default "└-"
     */
    newLineEnd?: string;
    /**
     * The divider between the label and the payload
     * This overrides any value set by the logger
     * @default " "
     */
    divider?: string;
    /**
     * The character used to pad
     * @default " "
     */
    paddingChar?: string;
};

export type LogConfig<M extends string> = SharedConfig & {
    /**
     * Wether to add spacing in front or behind the specified label
     * @default "PREPEND"
     */
    padding: PadType;
    /**
     * Util.inspect color highlighting
     * @default true
     */
    color: boolean;
    /**
     * List of tags to be ignored
     * @default [] (empty array)
     * @example ['debug'] (ignores all debug messages)
     */
    exclude: RuntimeOrValue<string[]>;
    /**
     * List of tags to only log
     * If defined overrides `exclude`
     * @default undefined
     * @example ['error', 'important', 'success'] (only logs error, important, and success)
     */
    filter: RuntimeOrValue<string[] | undefined>;

    /**
     * A list of functions to handle input pre processing
     * @default []
     * @example [(in) => in]
     */
    preProcessors?: ((input: LogMethodInput[], method: { name: M } & MethodConfig, logger: LogConfig<M>) => LogMethodInput[])[];

    /**
     * A list of functions to handle input post processing
     * @default []
     * @example [(lines) => lines]
     */
    postProcessors?: ((lines: string[], method: { name: M } & MethodConfig, logger: LogConfig<M>) => string[])[];
};

/**
 * Dynamically generated label.
 * complexity: O(n)
 */
export type RuntimeLabel = {
    /**
     * Label length to be reserved for calculated answer
     */
    length: number;
    /**
     * Executed on log, value returned becomes label
     */
    calculate: () => string;
};

/**
 * Pre generated label.
 * complexity: O(1)
 */
export type StaticLabel = string;

export type MethodConfig = SharedConfig & {
    /**
     * The label used to prefix log messages.
     * Used for organization and sorting purposes.
     * May contain ansi color codes!
     */
    label: StaticLabel | RuntimeLabel;
    /**
     * An array of tags to be used for filtering
     * @default ['default']
     * @example ['default', 'debug']
     */
    tags?: string[];
};

export type GenericLogFunction = (...input: unknown[]) => any;

export type MethodList<A extends string> = { [k in A]: string | MethodConfig };

export const resolveRuntimeOrValue = <K>(rov: RuntimeOrValue<K>) => {
    return (typeof rov === 'function' ? (rov as Function)() : rov) as K;
};

export const pad = (
    text: string,
    length: number,
    paddingStrategy: PadType,
    paddingChar: string
) => {
    if (paddingStrategy === 'NONE') return text;

    const calculatedPadding = paddingChar.repeat(
        ''.padStart(length - stripAnsi(text).length, ' ').length
    );

    if (paddingStrategy === 'APPEND') return text + calculatedPadding;

    if (paddingStrategy === 'PREPEND') return calculatedPadding + text;
};

/**
 * @name createLogger
 * Creates a logger with the specified methods and config
 * Able to output to a logging function
 * @param methods Config of logging methods
 * @param [config] Logger-wide configuration
 * @param [func=console.log] Custom logging function
 */
export const createLogger = <A extends string>(
    methods: MethodList<A> | MethodList<A>[],
    config: Partial<LogConfig<A>> = {},
    outputFunctions: GenericLogFunction | GenericLogFunction[] = console.log
) => {
    const functions: GenericLogFunction[] = Array.isArray(outputFunctions)
        ? outputFunctions
        : [outputFunctions];

    // If methods is a MethodList, use it, otherwise grab a random instance
    const finalMethods: MethodList<A> = Array.isArray(methods)
        ? methods[Math.floor(Math.random() * methods.length)]
        : methods;

    // Fill default values incase not overridden by arg
    const completeConfig: Required<LogConfig<A>> = {
        divider: ' ',
        newLine: '├-',
        newLineEnd: '└-',
        padding: 'PREPEND',
        paddingChar: ' ',
        color: true,
        exclude: [],
        filter: undefined,
        preProcessors: [],
        postProcessors: [],
        ...config,
    };

    // Infer the default method config
    const inferredMethodConfig: MethodConfig = {
        label: '-',
        newLine: completeConfig.newLine,
        newLineEnd: completeConfig.newLineEnd,
        divider: completeConfig.divider,
        paddingChar: completeConfig.paddingChar,
        tags: ['default'],
    };

    // Convert all string methods to MethodConfig
    const completeMethods: { [k in A]: Required<MethodConfig> } = Object.assign(
        {},
        ...(Object.keys(finalMethods) as A[]).map((a) => {
            if (typeof finalMethods[a] == 'string') {
                // Return an inferred MethodConfig
                return {
                    [a]: {
                        ...inferredMethodConfig,
                        label: finalMethods[a],
                    },
                };
            }

            // Return the MethodConfig that was provided
            return {
                [a]: {
                    ...inferredMethodConfig,
                    ...(finalMethods[a] as MethodConfig),
                },
            };
        })
    );

    // Calculate the max length
    const maxLength = Math.max(
        ...(Object.values(completeMethods) as Required<MethodConfig>[]).map(
            (a) =>
                typeof a.label === 'string'
                    ? stripAnsi(a.label).length
                    : a.label.length
        )
    );

    const logger = {};

    return Object.assign(
        logger,
        ...Object.keys(completeMethods).map((methodHandle) => {
            const method = completeMethods[methodHandle as A];

            const [paddedText, newLinePadding, newLineEndPadding] = [
                typeof method.label === 'string'
                    ? pad(
                        method.label,
                        maxLength,
                        completeConfig.padding,
                        method.paddingChar
                    )
                    : '',
                pad(
                    method.newLine,
                    maxLength,
                    completeConfig.padding,
                    method.paddingChar
                ),
                pad(
                    method.newLineEnd,
                    maxLength,
                    completeConfig.padding,
                    method.paddingChar
                ),
            ];

            return {
                [methodHandle]: (...s: LogMethodInput[]) => {
                    const filter = resolveRuntimeOrValue(completeConfig.filter);
                    const exclude = resolveRuntimeOrValue(
                        completeConfig.exclude
                    );

                    // Decide wether this should be filtered or not
                    if (
                        filter && filter !== undefined
                            ? !method.tags.some((r) =>
                                (filter as string[]).includes(r)
                            )
                            : method.tags.some((r) => exclude.includes(r))
                    )
                        return;

                    let inputs = s;

                    for (const processor of completeConfig.preProcessors) {
                        inputs = processor(inputs, { name: methodHandle as A, ...method }, completeConfig);
                    }

                    // Generate the value we should output
                    const lines = inputs
                        .map((value) => {
                            if (typeof value !== 'string') {
                                value = inspect(
                                    value,
                                    false,
                                    3,
                                    completeConfig.color
                                );
                            }

                            return value;
                        })
                        .join('\n')
                        .split('\n')
                        .map(
                            (value, index, array) =>
                                (index == 0
                                    ? (typeof method.label === 'string'
                                        ? paddedText
                                        : pad(
                                            method.label.calculate(),
                                            maxLength,
                                            completeConfig.padding,
                                            method.paddingChar
                                        )) + method.divider
                                    : (array.length - 1 == index
                                        ? newLineEndPadding
                                        : newLinePadding) + method.divider) +
                                value
                        );

                    let parsedLines = lines;

                    for (const processor of completeConfig.postProcessors) {
                        parsedLines = processor(parsedLines, { name: methodHandle as A, ...method }, completeConfig);
                    }

                    const value = parsedLines.join('\n');

                    // Run each of the final functions
                    for (const a of functions) a(value);

                    return logger;
                },
            };
        })
    ) as Logger<A>;
};

export const shimLog = <A extends string>(logger: Logger<A>, logName: A) => {
    Object.defineProperty(console, 'log', {
        value: logger[logName],
    });
};
