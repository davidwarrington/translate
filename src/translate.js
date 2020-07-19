const translate = source => (translationPath, variables = {}) => {
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
        .reduce((filteredSource, key) => {
            if (!filteredSource[key]) {
                throw new Error(errors.noTranslation);
            }

            return filteredSource[key];
        }, source);

    if (typeof translationFromSource !== 'string') {
        throw new Error(errors.noTranslation);
    }

    const transformedTranslation = Object.entries(variables).reduce(
        (translation, [key, value]) =>
            translation.replace(
                new RegExp(`({{\\s*${key}\\s*}}|%{${key}})`, 'g'),
                value
            ),
        translationFromSource
    );

    return transformedTranslation;
};

export default translate;
