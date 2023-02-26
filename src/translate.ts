interface TranslateOptions {
  delimiters?: [string, string][];
}

type TranslateSourceValue = TranslateSource | string;

interface TranslateSource {
  [key: string]: TranslateSourceValue;
}

type TranslateVariables = Record<string, unknown>;

export function renderString(
  renderTarget: string,
  variables: TranslateVariables,
  {
    delimiters = [
      ['{{\\s*', '\\s*}}'],
      ['%{', '}'],
    ],
  }: TranslateOptions = {}
) {
  return Object.entries(variables).reduce((translation, [key, value]) => {
    const replacePattern = delimiters
      .map(([start, end]) => {
        return `${start}${key}${end}`;
      })
      .join('|');

    const replaceValue = typeof value === 'function' ? value() : value;

    return translation.replace(new RegExp(replacePattern, 'g'), replaceValue);
  }, renderTarget);
}

export function translate(source: TranslateSource, options?: TranslateOptions) {
  return function (
    translationPath: string,
    variables: TranslateVariables = {}
  ) {
    const NO_TRANSLATION_ERROR =
      '"{{ path }}" is not a valid translation path.';

    const translationFromSource = translationPath
      .split('.')
      .reduce((previousValue, key) => {
        if (
          typeof previousValue === 'string' ||
          typeof previousValue === 'undefined'
        ) {
          throw new Error(
            renderString(NO_TRANSLATION_ERROR, { path: translationPath })
          );
        }

        return previousValue[key];
      }, source as TranslateSourceValue);

    if (typeof translationFromSource !== 'string') {
      throw new Error(
        renderString(NO_TRANSLATION_ERROR, { path: translationPath })
      );
    }

    return renderString(translationFromSource, variables, options);
  };
}