'use strict';
meanBlog.factory('errorHandlerHttpInterceptor', ['$q', 'errorHandler', function($q, errorHandler) {
    return {
        'responseError': function(serverError) {
            errorHandler.processError(serverError.data);
            return $q.reject(serverError);
        }
    }
}]);