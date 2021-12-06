import stripAnsi from "strip-ansi";

type LogFunc = (input: string | object | object[] | unknown) => void;

type LogFunction<K extends string> = {
    [a in K]: LogFunc;
};

type PadType = "PREPEND" | "APPEND";

type LogConfig = {
    padding: PadType;
    divider: string;
    newLine: string;
    newLineEnd: string;
};

type MethodConfig = {
    label: string;
    newLine?: string;
    newLineEnd?: string;
};

export const createLogger = <A extends string>(
    methods: { [k in A as string]: string | MethodConfig },
    config: Partial<LogConfig> = {},
    func = console.log
) => {
    // Fill default values incase not overriden by arg
    const _config: LogConfig = {
        ...{
            divider: " ",
            newLine: "├-",
            newLineEnd: "└-",
            padding: "PREPEND",
        },
        ...config,
    };

    // Infer the default method config
    const defaultMethodConfig: MethodConfig = {
        label: "-",
        newLine: _config.newLine,
        newLineEnd: _config.newLineEnd,
    };

    // Convert all string methods to MethodConfig
    const _methods: { [k in A as string]: Required<MethodConfig> } =
        Object.assign(
            {},
            ...Object.keys(methods).map((a) => {
                if (typeof methods[a] == "string") {
                    // Return an inferred MethodConfig
                    return {
                        [a]: {
                            ...defaultMethodConfig,
                            ...{
                                label: methods[a],
                            },
                        },
                    };
                }

                // Return the MethodConfig that was provided
                return {
                    [a]: {
                        ...defaultMethodConfig,
                        ...(methods[a] as MethodConfig),
                    },
                };
            })
        );

    const maxLength = Math.max(
        ...Object.values(_methods).map((a) => stripAnsi(a.label).length)
    );

    return Object.assign(
        {},
        ...Object.keys(_methods).map((a) => {
            const method = _methods[a];
            const padding = "".padStart(
                maxLength - stripAnsi(method.label).length,
                " "
            );
            const calcPadding = "".padStart(
                maxLength - stripAnsi(method.newLine).length
            );
            const paddedPre =
                _config.padding == "PREPEND"
                    ? calcPadding + method.newLine
                    : method.newLine + calcPadding;
            const calcPaddingEnd = "".padStart(
                maxLength - stripAnsi(method.newLine).length
            );
            const paddedPreEnd =
                _config.padding == "PREPEND"
                    ? calcPaddingEnd + method.newLineEnd
                    : method.newLineEnd + calcPaddingEnd;

            const paddedText =
                _config.padding == "PREPEND"
                    ? padding + method.label
                    : method.label + padding;

            return {
                [a]: (...s: unknown[]) => {
                    s.forEach((v, i, a) => {
                        func(
                            (i == 0
                                ? paddedText + _config.divider
                                : (a.length - 1 == i
                                      ? paddedPreEnd
                                      : paddedPre) + _config.divider) + v
                        );
                    });
                },
            };
        })
    ) as LogFunction<A>;
};
