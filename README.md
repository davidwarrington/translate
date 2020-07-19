# translate.js

A library for translating strings with JS. translate.js is designed to work with Shopify translations, but is not tied to the Shopify environment.

## Usage

Create a variable with your translation registry applied to the library, it can then be called with strings that match the JSON structure of the registry:
```js
import translate from 'translate.js';

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
import translate from 'translate.js';

const translator = translate(window.translations);

translator('add_to_cart');
```
