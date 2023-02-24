# @davidwarrington/translate

translate allows strings nested inside JSON to be retrieved from a source object and rendered with variables. It is designed to provide a consistent method for using translation strings within JS bundles and to replicate the Shopify Liquid `t` filter in Vue components. It is not tied to the Shopify environment, or to the browser.

In the example below, `'cart.empty_warning'` would resolve to "Your cart is empty".

```js
const translator = translate({
  add_to_cart: 'Add to Cart',
  cart: {
    empty_warning: 'Your cart is empty',
  },
});

translator('cart.empty_warning');
```

## Installation

Install using yarn:

```bash
pnpm add @davidwarrington/translate
# or with yarn
yarn add @davidwarrington/translate
# or with npm
npm install @davidwarrington/translate
```

## Usage

Create a variable with your translation registry applied to the library, it can then be called with strings that match the JSON structure of the registry:

```js
import { translate } from '@davidwarrington/translate';

const translations = {
  add_to_cart: 'Add to Cart',
  product: {
    price: '£{{ money }}',
    sale: {
      on_sale: 'On Sale',
    },
  },
  collection: {
    pagination: {
      page_x_of_y: 'Page {{ current }} of {{ total }}',
    },
  },
  checkout: {
    invalid_delivery_method: '{{ method }} is not a valid delivery method',
  },
};

const translator = translate(translations);

translator('add_to_cart');
translator('product.sale.on_sale');
translator('collection.pagination.page_x_of_y', { current: 2, total: 16 });
```

### Usage in Shopify

To handle your Shopify translations, add them to the window object, like so:

```liquid
{% comment %}
  theme.liquid
{% endcomment %}

<script>
window.translations = {
  add_to_cart: {{ 'add_to_cart' | t | json }},
  product: {
    price: {{ 'product.price' | t | json }},
    sale: {
      on_sale: {{ 'product.sale.on_sale' | t | json }},
    },
  },
  collection: {
    pagination: {
      page_x_of_y: {{ 'collection.pagination.page_x_of_y' | t | json }},
    },
  },
  checkout: {
    invalid_delivery_method: {{ 'checkout.invalid_delivery_method' | t | json }},
  },
};
</script>
```

Then use `window.translations` as your registry:

```js
import { translate } from '@davidwarrington/translate';

const translator = translate(window.translations);

translator('add_to_cart');
```

### Using custom delimiters

By default translate will replace `{{` & `}}` and `%{` & `}` delimiter pairs in your translations, as those are transformed by Shopify Liquid. If you wish to use alternatives they can be passed in via `options`.

```js
translate(translations, { delimiters: [['<--', '-->']] });
```

### Rendering individual strings

If for any reason it doesn't make sense to create a translations object; for example, you only need to transform a single string once, you can import the `renderString` utility instead, and use it like so:

```js
import { renderString } from '@davidwarrington/translate';

renderString('Results for: {{ search_terms }}', {
  search_terms: 'Skateboard Deck',
});
```

You can replace the default delimiters with the third argument too.

```js
renderString(
  'Contact us via email (<<- email ->>), social media or by phone (@[phone])',
  { email: 'support@shop.com' },
  {
    delimiters: [
      ['<<- ', ' ->>'],
      ['@[', ']'],
    ],
  }
);
```

### Registering translate as a Vue filter

`translate` can be used as a Vue filter in order to mimic how it's written in Liquid. To do so, try this:

```js
import Vue from 'vue';
import { translate } from '@davidwarrington/translate';

Vue.filter('t', translate(window.translations));
```

Then you can use it in your Vue templates like so:

```html
<template>
  <p>{{ 'product.money' | t({ money: 12 }) }}</p>

  <button>{{ 'add_to_cart' | t }}</button>
</template>
```
