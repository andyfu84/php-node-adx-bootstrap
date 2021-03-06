/* bootstrap-thumbnail.js | Thumbnail image for schema form bootstrap decorator. */

angular.module('schemaForm')
  .run(function($templateCache) {
    $templateCache.put('decorators/bootstrap/thumbnail.html', "<div class=\"form-group\"> <label class=\"control-label\" ng-class=\"{\'sr-only\': !showTitle()}\">{{form.title}}</label> <div class=\"thumbnail\"> <img sf-field-model=\"ng-file-src\" ng-file-basepath=\"{{ form.thumbnail.basepath }}\" width=\"100%\" \/> </div> <div class=\"help-block\">{{ hasError() && errorMessage(schemaError()) || form.description }}</div> </div>");
  })
  .config(function (schemaFormProvider,  schemaFormDecoratorsProvider, sfPathProvider, sfBuilderProvider) {
    schemaFormProvider.defaults.string.unshift(function(name, schema, options) {
      if ( schema.type == 'thumbnail' ) {
        var form = schemaFormProvider.stdFormObj(name, schema, options);

        form.key = options.path;
        form.type = 'thumbnail';

        options.lookup[sfPathProvider.stringify(options.path)] = form;

        return form;
      }
    });

    // Add to the bootstrap directive
    schemaFormDecoratorsProvider.defineAddOn(
      'bootstrapDecorator',
      'thumbnail',
      'decorators/bootstrap/thumbnail.html',
      sfBuilderProvider.stdBuilders
    );
  })
  .directive('ngFileSrc', function() {
    function link(scope, element, attr) {
      if ( element[0].tagName.toLowerCase() == 'img' ) {
        scope.$watch('ngFileSrc', function(value) {
          if ( value instanceof FileList ) {
            value = value[0];
          }

          if ( value instanceof File ) {
            var reader = new FileReader();

            reader.onload = function(event) {
              element.attr('src', event.target.result);
            };

            reader.readAsDataURL(value);
          }
          else if ( value ) {
            if ( !/^\w+\:\/\//.test(value) ) {
              value = scope.ngFileBasepath + value;
            }

            value+= (value.indexOf('?') > -1? '&': '?') + Date.now();

            element.attr('src', value);
          }
        });
      }
    }

    return { restrict: 'A'
           , link: link
           , transclude: true
           , scope:
             { ngFileSrc: '='
             , ngFileBasepath: '@'
             }
           };
  });
