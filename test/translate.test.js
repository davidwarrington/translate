import translate from '../src/translate';

window.translations = {
    add_to_cart: 'Add to Cart',
    product: {
        price: '£{{ money }}',
        sale: {
            on_sale: 'On Sale',
        },
    },
    collection: {
        pagination: {
            page_x_of_y: 'Page {{ current }} of {{ total }}'
        }
    }
};

describe(translate, () => {
    it('Throws an error if translation does not exist', () => {
        expect(() => translate('products')).toThrow('Translation does not exist.');
    });

    it('Throws an error if it does not resolve to a string', () => {
        expect(() => translate('product')).toThrow('Translation does not exist.');
    });

    it.each`
        key                       | expectedResult
        ${'add_to_cart'}          | ${'Add to Cart'}
        ${'product.sale.on_sale'} | ${'On Sale'}
    `(`Translates $key to $expectedResult`, ({ key, expectedResult }) => {
        expect(translate(key)).toBe(expectedResult);
    });

    it.each`
        key                                    | variables                    | expectedResult
        ${'product.price'}                     | ${{ money: 12 }}             | ${'£12'}
        ${'collection.pagination.page_x_of_y'} | ${{ current: 2, total: 16 }} | ${'Page 2 of 16'}
    `(`Translates $key to $expectedResult when provided with $variables`, ({ key, variables, expectedResult }) => {
        expect(translate(key, variables)).toBe(expectedResult);
    });
});
