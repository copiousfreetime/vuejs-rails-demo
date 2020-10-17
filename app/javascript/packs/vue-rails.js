// The above code uses Vue without the compiler, which means you cannot
// use Vue to target elements in your existing html templates. You would
// need to always use single file components.
// To be able to target elements in your existing html/erb templates,
// comment out the above code and uncomment the below
// Add <%= javascript_pack_tag 'hello_vue' %> to your layout
// Then add this markup to your html template:
//
// <div id='hello'>
//   {{message}}
//   <app></app>
// </div>


import Vue from 'vue/dist/vue.esm'
import { ALL_COMPONENTS } from '../components'

var VueRailsUJS = {
  COMPONENT_NAME_ATTR: 'data-vue-component',
  ID_ATTR: 'id',
  PROPS_ATTR: 'data-vue-props',

  findDOMNodes: function(searchSelector) {
    const classNameAttr = VueRailsUJS.COMPONENT_NAME_ATTR

    var selector, parent;

    switch (typeof searchSelector) {
      case 'undefined':
        selector = '[' + classNameAttr + ']';
        parent = document;
        break;
      case 'object':
        selector = '[' + classNameAttr + ']';
        parent = searchSelector;
        break;
      case 'string':
        selector = searchSelector + '[' + classNameAttr + '], ' +
                   searchSelector + ' [' + classNameAttr + ']';
        parent = document;
        break
      default:
        break;
    }

    return parent.querySelectorAll(selector);
  },

  mountComponents: function(searchSelector) {
    console.log("[vue-rails] " + ` searching for components to mount`)
    const ujs = VueRailsUJS
    const nodes = ujs.findDOMNodes(searchSelector);

    for (var i = 0; i < nodes.length; ++i) {
      var node = nodes[i];
      console.log("[vue-rails] : ", node)
      var componentName = node.getAttribute(ujs.COMPONENT_NAME_ATTR);
      var componentId = node.getAttribute(ujs.ID_ATTR);
      var propsJson = node.getAttribute(ujs.PROPS_ATTR);
      var props = propsJson && JSON.parse(propsJson);

      if (console && console.log) {
        console.log("[vue-rails] " + ` rendering ${componentName}[${componentId}]`)
      }

      const element = document.createElement(componentName)
      element.setAttribute('id', componentId)
      for (const [key, value] of Object.entries(props)) {
        element.setAttribute(key, JSON.stringify(value))
      }
      node.appendChild(element)

      const v = new Vue({
        el: '#' + componentId,
        components: ALL_COMPONENTS,
      })
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  VueRailsUJS.mountComponents()
})


