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
    const errors = {
      incorrectSourceType: 'Source must be an object.',
      noSource: 'Source has not been set.',
      noTranslation: 'Translation does not exist.',
    };

    if (!source) {
      throw new Error(errors.noSource);
    }

    if (typeof source !== 'object') {
      throw new Error(errors.incorrectSourceType);
    }

    const translationFromSource = translationPath
      .split('.')
      .reduce((previousValue, key) => {
        if (typeof previousValue === 'string') {
          throw new Error(errors.noTranslation);
        }

        const value = previousValue[key];

        if (!value) {
          throw new Error(errors.noTranslation);
        }

        return value;
      }, source as TranslateSourceValue);

    if (typeof translationFromSource !== 'string') {
      throw new Error(errors.noTranslation);
    }

    return renderString(translationFromSource, variables, options);
  };
}
