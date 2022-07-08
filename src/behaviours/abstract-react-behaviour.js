import React from 'react';
import ReactDOM from 'react-dom';
import { AbstractDataAttributeBehaviour } from './abstract-data-attribute-behaviour';

export class AbstractReactBehaviour extends AbstractDataAttributeBehaviour {
  attrNames = {
    container: 'data-component',
    props: 'data-props',
  };

  getComponentMap() {
    throw 'getComponentMap not defined. Please ensure the getComponentMap is defined within the abstractReactBehavior extension. This method must return a json object.';
  }

  getContainerSelector() {
    return '[' + this.attrNames.container + ']';
  }

  initContainer(container) {
    let type = container.getAttribute(this.attrNames.container);
    if (!type) return;
    if (!this.getComponentMap()[type]) return;

    try {
      let propsJson = container.getAttribute(this.attrNames.props);
      let props = propsJson ? JSON.parse(propsJson) : {};

      ReactDOM.render(
        React.createElement(this.getComponentMap()[type], props),
        container
      );
    } catch (e) {
      console.log('Could not initialise ' + type + ' React component: ' + e); // @ignore
    }
  }
}
