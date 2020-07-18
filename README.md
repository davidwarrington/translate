# translate.js

A plugin for using Shopify translations within JavaScript.

## Usage

Add the translations you wish to use to `window.translations`:
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

Import the library and call `translate` with strings that match the JSON structure of `window.translations`:
```js
import translate from 'translate.js';

translate('add_to_cart');
translate('product.sale.on_sale');
```

You can also pass variables into the function like so:
```js
import translate from 'translate.js';

translate('collection.pagination.page_x_of_y', { current: 2, total: 16 });
```
