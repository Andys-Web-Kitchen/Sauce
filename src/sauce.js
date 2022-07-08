import LazyLoad from 'vanilla-lazyload';
import AbstractReactBehaviour from './behaviours/abstract-react-behaviour';

export default class Sauce {
  env = null;
  initialized = false;

  constructor(config, enviroment = 'prod') {
    // Set enviroment from global
    this.env = enviroment;
    this.config = config;
    this.init(config);

    window.app = this; //register as global window attribute so methods can be accessed from the console.

    //Loaded app if document has loaded, if not register event to load app once document has loaded.
    document.readyState !== 'loading'
      ? window.app.load()
      : document.addEventListener('DOMContentLoaded', window.app.load);
  }

  registerBehaviors = config => {
    let defaults = {};
    config = Object.assign(defaults, config);

    window.dataAttrBehaviours = config;
  };

  registerReactComponents = config => {
    let defaults = {};
    config = Object.assign(defaults, config);

    class ReactBehaviour extends AbstractReactBehaviour {
      getComponentMap = () => config;
    }

    if (!window.dataAttrBehaviours) window.dataAttrBehaviours = {};
    window.dataAttrBehaviours.ReactBehaviour = new ReactBehaviour();
  };

  registerLazyLoad = config => {
    let defaults = {
      elements_selector: '.lazyload',
      class_loading: 'lazyload--loading',
      class_loaded: 'lazyload--loaded',
      skip_invisible: false,
    };

    config = Object.assign(defaults, config);
    window.lazy = new LazyLoad(config);
  };

  // registerServiceWorker = config => {
  //     let defaults = { scriptURL: '/build/'+this.env+'/sw.js'};
  //     config = Object.assign(defaults, config);

  //     if ('serviceWorker' in navigator) {
  //        navigator.serviceWorker.register(config.scriptURL).then(registration => {
  //            if(this.env === 'dev')  console.log('SW registered: ', registration);

  //            Notification.requestPermission(function(status) {
  //                console.log('Notification permission status:', status);
  //            });

  //        }).catch(registrationError => {
  //             console.log('SW registration failed: ', registrationError);
  //        });
  //     }
  // };

  loadDataAttrBehaviours = behaviours => {
    for (let key in behaviours) {
      behaviours[key].init();
    }

    if (this.env === 'dev') console.log('Loaded JS behaviours', behaviours);
  };

  init = config => {
    const defaults = {
      enableReact: true,
      // enableServiceWorker: false,
      enableLazyLoad: false,
      behaviours: {},
      components: {},
      lazyLoad: {},
      serviceWorker: {},
    };

    this.config = Object.assign(defaults, config);

    if (this.env === 'dev') console.log('Initializing Sauce', this.config);

    if (!this.initialized) {
      this.registerBehaviors(this.config.behaviours);

      if (this.config.enableReact)
        this.registerReactComponents(this.config.components);
      // if (this.config.enableServiceWorker) this.registerServiceWorker(this.config.serviceWorker);
      if (this.config.enableLazyLoad)
        this.registerLazyLoad(this.config.lazyLoad);

      this.initialized = true;
    }
  };

  load = () => {
    this.loadDataAttrBehaviours(window.dataAttrBehaviours);
    if (this.config.enableLazyLoad) window.lazy.update();
    if (this.env === 'dev') console.log('Sauce Loaded!');
  };
}
