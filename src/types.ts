export type LogFunc = (input: string | object | object[] | unknown) => void;

export type LogFunction<K extends string> = {
    [a in K]: LogFunc;
};

export type PadType = "PREPEND" | "APPEND";

export type LogConfig = {
    padding: PadType;
    divider: string;
    newLine: string;
    newLineEnd: string;
};

export type MethodConfig = {
    label: string;
    newLine?: string;
    newLineEnd?: string;
};