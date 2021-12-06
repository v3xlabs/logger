import stripAnsi from "strip-ansi";
import { merge } from "./lib/merge";
import { LogConfig, LogFunction, MethodConfig } from "./types";

export const createLogger = <A extends string>(
    methods: { [k in A as string]: string | MethodConfig },
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
        },
        ...config,
    };

    // Infer the default method config
    const inferredMethodConfig: MethodConfig = {
        label: "-",
        newLine: completeConfig.newLine,
        newLineEnd: completeConfig.newLineEnd,
    };

    // Convert all string methods to MethodConfig
    const completeMethods: { [k in A as string]: Required<MethodConfig> } =
        merge(
            Object.keys(methods).map((a) => {
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
        ...Object.values(completeMethods).map((a) => stripAnsi(a.label).length)
    );

    return merge(Object.keys(completeMethods).map((a) => {
            const method = completeMethods[a];
            const padding = "".padStart(
                maxLength - stripAnsi(method.label).length,
                " "
            );
            const calcPadding = "".padStart(
                maxLength - stripAnsi(method.newLine).length
            );
            const paddedPre =
                completeConfig.padding == "PREPEND"
                    ? calcPadding + method.newLine
                    : method.newLine + calcPadding;
            const calcPaddingEnd = "".padStart(
                maxLength - stripAnsi(method.newLine).length
            );
            const paddedPreEnd =
                completeConfig.padding == "PREPEND"
                    ? calcPaddingEnd + method.newLineEnd
                    : method.newLineEnd + calcPaddingEnd;

            const paddedText =
                completeConfig.padding == "PREPEND"
                    ? padding + method.label
                    : method.label + padding;

            return {
                [a]: (...s: unknown[]) => {
                    s.forEach((v, i, a) => {
                        func(
                            (i == 0
                                ? paddedText + completeConfig.divider
                                : (a.length - 1 == i
                                      ? paddedPreEnd
                                      : paddedPre) + completeConfig.divider) + v
                        );
                    });
                },
            };
        })
    ) as LogFunction<A>;
};
