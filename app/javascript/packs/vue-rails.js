
import Vue from 'vue/dist/vue.esm'
import { ALL_COMPONENTS } from '../components'

var VueRailsUJS = {
  COMPONENT_NAME_ATTR: 'data-vue-component',
  VUE_ID_ATTR: 'data-vue-id',
  PROPS_ATTR: 'data-vue-props',

  COMPONENTS: ALL_COMPONENTS,

  findDOMNodes: function() {
    const classNameAttr = VueRailsUJS.VUE_ID_ATTR;
    var parent = document;
    var selector = `[${classNameAttr}]`;
    return parent.querySelectorAll(selector);
  },

  mountComponents: function() {
    console.log("[vue-rails] " + ` searching for components to mount`)
    const ujs = VueRailsUJS
    const nodes = ujs.findDOMNodes();

    for (var i = 0; i < nodes.length; ++i) {
      var node = nodes[i];
      console.log("[vue-rails] : ", node)
      var componentName = node.getAttribute(ujs.COMPONENT_NAME_ATTR);
      var componentId = node.getAttribute(ujs.VUE_ID_ATTR);
      var propsJson = node.getAttribute(ujs.PROPS_ATTR);
      var props = propsJson && JSON.parse(propsJson);

      if (console && console.log) {
        console.log("[vue-rails] " + ` rendering ${componentName}[${componentId}]`)
      }

      const ComponentClass = Vue.component(componentName, ujs.COMPONENTS[componentName])
      const instance = new ComponentClass({propsData: props})
      instance.$mount()

      const v = new Vue({
        el: `[${ujs.VUE_ID_ATTR}=${componentId}]`,
        components: ujs.COMPONENTS,
      })
      v.$el.appendChild(instance.$el)
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  VueRailsUJS.mountComponents()
})


