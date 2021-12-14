import { inspect } from "util";

const ansi = new RegExp(
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)|(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))",
    "g"
);

export const stripAnsi = (input: string) => input.replace(ansi, "");

export type LogMethod = (
    ...input: (string | object | object[] | unknown)[]
) => void;

export type Logger<K extends string> = {
    [a in K]: LogMethod;
};

export type PadType = "PREPEND" | "APPEND" | "NONE";

export type LogConfig = {
    padding: PadType;
    paddingChar: string;
    divider: string;
    newLine: string;
    newLineEnd: string;
    color: boolean;
};

export type MethodConfig = {
    label: string;
    newLine?: string;
    newLineEnd?: string;
    divider?: string;
    paddingChar?: string;
};

const pad = (
    text: string,
    length: number,
    paddingStrategy: PadType,
    paddingChar: string
) => {
    if (paddingStrategy === "NONE") return text;

    const calculatedPadding = "".padStart(
        length - stripAnsi(text).length,
        paddingChar
    );

    if (paddingStrategy === "APPEND") return text + calculatedPadding;
    if (paddingStrategy === "PREPEND") return calculatedPadding + text;
};

export const createLogger = <A extends string>(
    methods: { [k in A]: string | MethodConfig },
    config: Partial<LogConfig> = {},
    func = console.log
) => {
    // Fill default values incase not overriden by arg
    const completeConfig: LogConfig = {
        ...{
            divider: " ",
            newLine: "├-",
            newLineEnd: "└-",
            padding: "PREPEND",
            paddingChar: " ",
            color: true,
        },
        ...config,
    };

    // Infer the default method config
    const inferredMethodConfig: MethodConfig = {
        label: "-",
        newLine: completeConfig.newLine,
        newLineEnd: completeConfig.newLineEnd,
        divider: completeConfig.divider,
        paddingChar: completeConfig.paddingChar
    };

    // Convert all string methods to MethodConfig
    const completeMethods: { [k in A]: Required<MethodConfig> } = Object.assign(
        {},
        ...(Object.keys(methods) as A[]).map((a) => {
            if (typeof methods[a] == "string") {
                // Return an inferred MethodConfig
                return {
                    [a]: {
                        ...inferredMethodConfig,
                        ...{
                            label: methods[a],
                        },
                    },
                };
            }

            // Return the MethodConfig that was provided
            return {
                [a]: {
                    ...inferredMethodConfig,
                    ...(methods[a] as MethodConfig),
                },
            };
        })
    );

    // Calculate the max length
    const maxLength = Math.max(
        ...Object.values(completeMethods).map(
            (a) => stripAnsi((a as Required<MethodConfig>).label).length
        )
    );

    return Object.assign(
        {},
        ...Object.keys(completeMethods).map((methodHandle) => {
            const method = completeMethods[methodHandle as A];

            const [paddedText, newLinePadding, newLineEndPadding] = [
                pad(method.label, maxLength, completeConfig.padding, method.paddingChar),
                pad(method.newLine, maxLength, completeConfig.padding, method.paddingChar),
                pad(method.newLineEnd, maxLength, completeConfig.padding, method.paddingChar),
            ];

            return {
                [methodHandle]: (...s: unknown[]) => {
                    func(
                        s
                            .map((value) => {
                                if (typeof value !== "string") {
                                    value = inspect(
                                        value,
                                        false,
                                        3,
                                        completeConfig.color
                                    );
                                }
                                return value;
                            })
                            .join("\n")
                            .split("\n")
                            .map(
                                (value, index, array) =>
                                    (index == 0
                                        ? paddedText + method.divider
                                        : (array.length - 1 == index
                                              ? newLineEndPadding
                                              : newLinePadding) +
                                          method.divider) + value
                            )
                            .join("\n")
                    );
                },
            };
        })
    ) as Logger<A>;
};
