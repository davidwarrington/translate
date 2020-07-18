function translate(translationPath, variables = {}) {
    const dictionary = window.translations;
    const errorMessage = 'Translation does not exist.';

    const translationFromDictionary = translationPath.split('.').reduce((acc, curr) => {
        if (!acc[curr]) {
            throw new Error(errorMessage);
        }

        return acc[curr];
    }, dictionary);

    if (typeof translationFromDictionary !== 'string') {
        throw new Error(errorMessage);
    }

    const transformedTranslation = Object.entries(variables)
        .reduce(
            (translation, [key, value]) => translation.replace(
                new RegExp(`({{ ?${key} ?}}|%{ ?${key} ?})`),
                value
            ),
            translationFromDictionary
        );

    return transformedTranslation;
}

export default translate;
