import { describe, it, expect } from 'vitest';

import translations from './fixtures/translations';
import { renderString } from '../src/main';

describe('renderString', () => {
  it.each`
    string                                            | variables                    | expectedResult
    ${translations.add_to_cart}                       | ${{}}                        | ${'Add to Cart'}
    ${translations.product.price}                     | ${{ money: 12.99 }}          | ${'£12.99'}
    ${translations.collection.pagination.page_x_of_y} | ${{ current: 2, total: 16 }} | ${'Page 2 of 16'}
  `(
    'Transforms $string to $expectedResult when given $variables',
    ({ string, variables, expectedResult }) => {
      expect(renderString(string, variables)).toBe(expectedResult);
    }
  );

  it('Supports alternative delimiters', () => {
    expect(
      renderString(
        translations.orders.x_of_y_items,
        { x: 1, y: 3 },
        {
          delimiters: [
            ['<=', '=>'],
            ['<-', '->'],
          ],
        }
      )
    ).toBe('1 of 3 items');
  });
});
