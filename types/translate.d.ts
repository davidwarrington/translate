type TranslateOptions = {
    delimiters?: [string, string][];
};

type TranslateSource = {
    [key: string]: TranslateSource | string;
};

type TranslateVariable = {
    [key: string]: any;
};

export declare function renderString(
    renderTarget: string,
    variables: TranslateVariable,
    options?: TranslateOptions
): string;

export declare function translate(
    source: TranslateSource,
    options?: TranslateOptions
): (translationPath: string, variables?: TranslateVariable) => string;
