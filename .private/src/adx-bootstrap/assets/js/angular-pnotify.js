(function(){'use strict';

angular.module('jlareau.pnotify', [])

	.provider('$pnotify', function() {
		var settings = {
			styling: 'bootstrap3'
		};

		var stacks = {};
		var defaultStack = false;

		var initHash = function(stackName) {
			var hash = angular.copy(settings);

			if ((stackName || (stackName = defaultStack)) && stackName in stacks) {
				hash.stack = stacks[stackName].stack;

				if (stacks[stackName].addclass) {
					hash.addclass = 'addclass' in hash
                          ? hash.addclass + ' ' + stacks[stackName].addclass
                          : stacks[stackName].addclass;
				}
			}

			return hash;
		};

		this.setDefaults = function(defaults) {
			settings = defaults;
			return this;
		};

		this.setStack = function(name, addclass, stack) {
			if (angular.isObject(addclass)) {
				stack = addclass;
				addclass = false;
			}

			stacks[name] = {
				stack: stack,
				addclass: addclass
			};

			return this;
		};

		this.setDefaultStack = function(name) {
			defaultStack = name;

			return this;
		};

		this.$get = function() {
			return {

				/* ========== SETTINGS RELATED METHODS =============*/

				getSettings: function() {
					return settings;
				},

				/* ============== NOTIFICATION METHODS ==============*/

				notice: function(content, title, stack) {
  				if ( angular.isObject(title) ) {
    				stack = title;
    				title = null;
  				}

					var hash = initHash(stack);
					hash.type = 'notice';
					hash.title = title;
					hash.text = content;
					return this.notify(hash);
				},

				info: function(content, title, stack) {
  				if ( angular.isObject(title) ) {
    				stack = title;
    				title = null;
  				}

					var hash = initHash(stack);
					hash.type = 'info';
					hash.title = title;
					hash.text = content;
					return this.notify(hash);
				},

				success: function(content, title, stack) {
  				if ( angular.isObject(title) ) {
    				stack = title;
    				title = null;
  				}

					var hash = initHash(stack);
					hash.type = 'success';
					hash.title = title;
					hash.text = content;
					return this.notify(hash);
				},

				error: function(content, title, stack) {
  				if ( angular.isObject(title) ) {
    				stack = title;
    				title = null;
  				}

					var hash = initHash(stack);
					hash.type = 'error';
					hash.title = title;
					hash.text = content;
					return this.notify(hash);
				},

				notifyWithDefaults: function(options, stack) {
					var defaults = initHash(stack);
					var combined = angular.extend(defaults, options);
					return this.notify(combined);
				},

				notify: function(hash) {
					return new PNotify(hash);
				},

        removeNotifications: function() {
          return PNotify.removeAll();
        }

			};
		};
	});

})();
