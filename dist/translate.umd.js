!function(r,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(r=r||self).translate=t()}(this,(function(){"use strict";function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r})(t)}function t(r,t){return function(r){if(Array.isArray(r))return r}(r)||function(r,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(r)))return;var n=[],e=!0,o=!1,i=void 0;try{for(var u,c=r[Symbol.iterator]();!(e=(u=c.next()).done)&&(n.push(u.value),!t||n.length!==t);e=!0);}catch(r){o=!0,i=r}finally{try{e||null==c.return||c.return()}finally{if(o)throw i}}return n}(r,t)||function(r,t){if(!r)return;if("string"==typeof r)return n(r,t);var e=Object.prototype.toString.call(r).slice(8,-1);"Object"===e&&r.constructor&&(e=r.constructor.name);if("Map"===e||"Set"===e)return Array.from(r);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return n(r,t)}(r,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function n(r,t){(null==t||t>r.length)&&(t=r.length);for(var n=0,e=new Array(t);n<t;n++)e[n]=r[n];return e}return function(n){return function(e){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i={incorrectSourceType:"Source must be an object.",noSource:"Source has not been set.",noTranslation:"Translation does not exist."};if(!n)throw new Error(i.noSource);if("object"!==r(n))throw new Error(i.incorrectSourceType);var u=e.split(".").reduce((function(r,t){if(!r[t])throw new Error(i.noTranslation);return r[t]}),n);if("string"!=typeof u)throw new Error(i.noTranslation);var c=Object.entries(o).reduce((function(r,n){var e=t(n,2),o=e[0],i=e[1];return r.replace(new RegExp("({{\\s*".concat(o,"\\s*}}|%{").concat(o,"})"),"g"),i)}),u);return c}}}));