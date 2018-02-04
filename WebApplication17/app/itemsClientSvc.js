(function () {
    'use strict';

    angular.module('App').factory('itemsClientSvc', function ($http) {
        var urlBase = 'http://localhost:3309/api';
        function getById(id) {
           return $http.get(urlBase + '/items/' + id);
        }
        function getAll() {
            return $http.get(urlBase + '/items');
        };
       function PostItem(item) {
            return $http({
                method: 'POST',
                url: urlBase + '/items',
                data: JSON.stringify(item)
            });
        };
        function DeleteItem(id) {
            return $http.delete(urlBase + '/items/' + id);
        }
        function EditItem(item) {
            return $http({
                method: 'PUT',
                url: urlBase + '/items',
                data: JSON.stringify(item)
            })
        }
        return {
            PostItem: PostItem,
            getAll: getAll,
            DeleteItem: DeleteItem,
            EditItem: EditItem,
            getById: getById
        };
        
    });
    
})();
