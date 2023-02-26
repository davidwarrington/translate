import { describe, expect, it } from 'vitest';

import translations from './fixtures/translations';
import { translate } from '../src/translate';

const translator = translate(translations);

describe('translate', () => {
  describe('Errors', () => {
    it('Throws an error if first subpath does not exist', () => {
      expect(() => translator('products')).toThrow(
        /^"products" is not a valid translation path\.$/
      );
    });

    it('Throws an error if any subpath does not exist', () => {
      expect(() => translator('collection.filters.filter_name')).toThrow(
        /^"collection.filters.filter_name" is not a valid translation path\.$/
      );
    });

    it('Throws an error if path does not resolve to a string', () => {
      expect(() => translator('product')).toThrow(
        /^"product" is not a valid translation path\.$/
      );
    });
  });

  describe('Translations', () => {
    it.each`
      key                       | expectedResult
      ${'add_to_cart'}          | ${'Add to Cart'}
      ${'product.sale.on_sale'} | ${'On Sale'}
    `(`Translates $key to $expectedResult`, ({ key, expectedResult }) => {
      expect(translator(key)).toBe(expectedResult);
    });

    it.each`
      key                                    | variables                          | expectedResult
      ${'product.price'}                     | ${{ money: 12 }}                   | ${'£12'}
      ${'collection.pagination.page_x_of_y'} | ${{ current: 2, total: 16 }}       | ${'Page 2 of 16'}
      ${'checkout.invalid_delivery_method'}  | ${{ method: 'Next Day Delivery' }} | ${'Next Day Delivery is not a valid delivery method'}
    `(
      `Translates $key to $expectedResult when provided with $variables`,
      ({ key, variables, expectedResult }) => {
        expect(translator(key, variables)).toBe(expectedResult);
      }
    );

    it('Supports alternative delimiters', () => {
      expect(
        translate(translations, {
          delimiters: [['<<-', '->>']],
        })('checkout.percent_discount', { percent: 12 })
      ).toBe('12% off');
    });
  });
});
