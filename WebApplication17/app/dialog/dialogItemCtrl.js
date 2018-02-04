(function () {
    'use strict';
    angular
        .module('App')
        .controller('test', testCtrl);

    testCtrl.$inject = ['$scope','itemsClientSvc'];
    function testCtrl($scope, itemsClientSvc) {
        $scope.Name = $scope.ngDialogData.Name;
        $scope.Type = $scope.ngDialogData.Type;
        $scope.Id = $scope.ngDialogData.Id;

        $scope.Save = function () {
            
            itemsClientSvc.EditItem({ Id: $scope.Id, Name: $scope.Name, Type: $scope.Type }).then(function () {
                console.log('success')
            });
            $scope.closeThisDialog();
        }
        activate();

        function activate() { }
    }
})();