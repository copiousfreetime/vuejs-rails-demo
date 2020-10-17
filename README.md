# README

This is a test of how to do an integration of vuejs with rails in a similar
manner to what react-rails does.

## Protocol

Rails creates a `div` with 3 attributes:

  * data-vue-id - a unique id so that multiple components on the same page can be addressed separately
  * data-vue-component - the registered Vue component name
  * data-vue-props - the hash of props jsonified

This is all done in the `vue_component` application helper

  * https://github.com/copiousfreetime/vuejs-rails-demo/blob/main/app/helpers/application_helper.rb#L9

On the javascript / webpack side, there is a pack named [`vue-rails`](https://github.com/copiousfreetime/vuejs-rails-demo/blob/main/app/javascript/packs/vue-rails.js) - this needs
to be [referenced in the
layout](https://github.com/copiousfreetime/vuejs-rails-demo/blob/main/app/views/layouts/application.html.erb#L10)
and it will load watch the pages as they load and look for html divs that have
`data-vue-id` attributes.

When those divs are found - for each one:

  * creates an instance of the component that is registered with Vue with the value at`data-vue-component`
  * deserializes the json in `data-vue-props` and passes that to the component
  * then creates a Vue instance that attaches to the div that has all the `data-vue-` attributes
  * and appends the component instance as a child of the Vue instance.

## Convention

The big convention that makes this work is the directory layout of the Vue components. The
rule is:

* all components are within the [webpack source
    directory](https://github.com/copiousfreetime/vuejs-rails-demo/tree/main/app/javascript) - which is where they
    woudl all go anyway.
* each component is its own directory with a top level 'index.js' file.
* They are imported and [aggregated in a top level structure](https://github.com/copiousfreetime/vuejs-rails-demo/blob/main/app/javascript/components.js)
    so the are all available dynamically in the vue-rails pack to [dynamically
    access
    them](https://github.com/copiousfreetime/vuejs-rails-demo/blob/main/app/javascript/packs/vue-rails.js#L39)

## Test it out

```
git clone git@github.com:copiousfreetime/vuejs-rails-demo.git
cd vuejs-rails-demo
# change to ruby 2.7.1 according to your rbenv / chruby / etc
bundle install 
bundle exec rails db:create
bundle exec rails yarn install
bundle exec rails s
```

