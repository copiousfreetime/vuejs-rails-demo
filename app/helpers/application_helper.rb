module ApplicationHelper

  # Create a <div> that has the following attributes
  #
  # data-vue-id - this is a uniq id of this particular component
  # data-vue-component - the name of this component registered in vue
  # data-vue-props - the hash of props to pass to the component
  #
  def vue_component(name:, props: {}, options:{camelize_props: true})
    if options.fetch(:camelize_props, true) then
      props = camelize_props(props)
    end

    html_options = options.reverse_merge(:data => {})

    html_options[:data].tap do |data|
      data[:vue_id] = "vue-#{SecureRandom.uuid}"
      data[:vue_component] = name
      data[:vue_props] = (props.is_a?(String) ? props : props.to_json)
    end

    html_tag = html_options[:tag] || :div

    html_options.except!(:tag, :prerender, :camelize_props)

    content_tag(html_tag, '', html_options)
  end

  # From React.camelize_props
  # Recursively camelize `props`, returning a new Hash
  # @param props [Object] If it's a Hash or Array, it will be recursed. Otherwise it will be returned.
  # @return [Hash] a new hash whose keys are camelized strings
  def camelize_props(props)
    case props
    when Hash
      props.each_with_object({}) do |(key, value), new_props|
        new_key = key.to_s.camelize(:lower)
        new_value = camelize_props(value)
        new_props[new_key] = new_value
      end
    when Array
      props.map { |item| camelize_props(item) }
    else
      props
    end
  end
end
