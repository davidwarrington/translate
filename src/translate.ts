interface TranslateOptions {
  delimiters?: [string, string][];
}

type TranslateSourceValue = TranslateSource | string;

interface TranslateSource {
  [key: string]: TranslateSourceValue;
}

type TranslateVariables = Record<string, unknown>;

/**
 * @note Credit to Pedro Figueiredo for the original type - [Source](https://dev.to/pffigueiredo/typescript-utility-keyof-nested-object-2pa3).
 * This implementation has been modified slightly to require that the translation path is complete, e.g `a.b` is not valid if `a.b.c` is.
 */
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

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

export function translate<T extends TranslateSource>(
  source: T,
  options?: TranslateOptions
) {
  return function (
    translationPath: NestedKeyOf<T>,
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
