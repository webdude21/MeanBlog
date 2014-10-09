'use strict';
meanBlog.factory('errorHandler', function(notifier, $location) {
    return {
        processError: function(serverError) {
            if (serverError['error_description']) {
                notifier.error(serverError['error_description']);
            }

            if (serverError['reason']) {
                notifier.error(serverError['reason']);
                $location.path("/not-found");
            }

            if (serverError.modelState) {
                var modelStateErrors = serverError.modelState;
                for(var propertyName in modelStateErrors) {
                    var errorMessages = modelStateErrors[propertyName];
                    var trimmedName = propertyName.substr(propertyName.indexOf('.') + 1);
                    for(var i = 0; i < errorMessages.length; i++) {
                        var currentError = errorMessages[i];
                        notifier.error(trimmedName + ' - ' + currentError);
                    }
                }
            }
        }
    }
});