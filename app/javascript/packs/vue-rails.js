
import Vue from 'vue/dist/vue.esm'
import { ALL_COMPONENTS } from '../components'

var VueRailsUJS = {
  COMPONENT_NAME_ATTR: 'data-vue-component',
  VUE_ID_ATTR: 'data-vue-id',
  PROPS_ATTR: 'data-vue-props',

  COMPONENTS: ALL_COMPONENTS,

  // Find all the nodes in the document that have `data-vue-id` attributes
  //
  findDOMNodes: function() {
    const classNameAttr = VueRailsUJS.VUE_ID_ATTR;
    var parent = document;
    var selector = `[${classNameAttr}]`;
    return parent.querySelectorAll(selector);
  },

  // For each of the nodes in the document that come from findDOMNodes
  //
  //  - create an instance of that vue component an initialize it with the props
  //    from data-vue-props
  //  - mount that instance - which won't do anything
  //  - create a Vue instance attached to the "data" node and append the
  //    component to it
  //
  mountComponents: function() {
    const ujs = VueRailsUJS
    const nodes = ujs.findDOMNodes();

    for (const node of nodes) {
      var componentName = node.getAttribute(ujs.COMPONENT_NAME_ATTR);
      var componentId = node.getAttribute(ujs.VUE_ID_ATTR);
      var propsJson = node.getAttribute(ujs.PROPS_ATTR);
      var props = propsJson && JSON.parse(propsJson);

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


