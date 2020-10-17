component structure

app/javascript/components/books/index.vue
                               /index.
                               /index.css
                               /gql/items.gql
                                   /dropdown.gql

controller
  render_component('name', props:, gql_to_load: %w[ index dropdown ])


* add in data, models, and graphql backend to do fetching of data


def render_component
  - locates path of component
  - for eachof the gl in the direcotry that are part of the gql to load, it
    executes them


