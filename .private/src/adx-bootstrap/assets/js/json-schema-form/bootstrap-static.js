/* bootstrap-static.js | Static text type for schema form bootstrap decorator. */

angular.module('schemaForm')
  .run(function($templateCache) {
    $templateCache.put('decorators/bootstrap/static.html', "<div class='form-group'> <label class='control-label' ng-show='showTitle()'>{{form.title}}</label> <p class='form-control-static' sf-field-model>{{$$value$$}}</p> <div class='help-block'>{{ hasError() && errorMessage(schemaError()) || form.description }}</div> </div>");
  })
  .config(function(schemaFormProvider,  schemaFormDecoratorsProvider, sfPathProvider) {
    schemaFormProvider.defaults.string.unshift(function(name, schema, options) {
      if ( schema.type == 'label' ) {
        var form = schemaFormProvider.stdFormObj(name, schema, options);

        form.key = options.path;
        form.type = 'label';

        options.lookup[sfPathProvider.stringify(options.path)] = form;

        return form;
      }
    });

    // Add to the bootstrap directive
    schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'label', 'decorators/bootstrap/static.html');
    schemaFormDecoratorsProvider.createDirective('label', 'decorators/bootstrap/static.html');
  });
