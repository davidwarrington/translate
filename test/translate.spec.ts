import { describe, expect, it } from 'vitest';

import translations from './fixtures/translations';
import { translate } from '../src/translate';

const translator = translate(translations);

describe('translate', () => {
  describe('Errors', () => {
    it('Throws an error if not provided with translations to use', () => {
      expect(() => translate()('add_to_cart')).toThrow(
        'Source has not been set.'
      );
    });

    it('Throws an error if not translation registry is not an object', () => {
      expect(() => translate('translations')('add_to_cart')).toThrow(
        'Source must be an object.'
      );
    });

    it('Throws an error if translation does not exist', () => {
      expect(() => translator('products')).toThrow(
        'Translation does not exist.'
      );
    });

    it('Throws an error if it does not resolve to a string', () => {
      expect(() => translator('product')).toThrow(
        'Translation does not exist.'
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
