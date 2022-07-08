```javascript

import { Sauce } from "@andys-webkitchen/sauce";

const config = {
    enableReact: true,
    enableLazyLoad: false,
    behaviours: {},
    components: {},
    lazyLoad: {},
};
const APP_ENVIROMENT = 'prod'; // prod || dev

new Sauce(config, APP_ENVIROMENT);

```