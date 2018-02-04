(function () {
    'use strict';
    angular.module('App').controller('ItemsCtrl', ItemsCtrl);


    ItemsCtrl.$inject = ['$scope', 'itemsClientSvc', 'pagerItem','ngDialog'];

    function ItemsCtrl($scope, itemsClientSvc, pagerItem, ngDialog) {
        $scope.itemName = "";
        $scope.itemadd = "";
        $scope.itemType = "";
      
        $scope.EditItem = function (id) {
            ngDialog.open({
                template: 'app/Items/EditItemDialog.html', controller: 'test', preCloseCallback: function () {
                    setTimeout(function () {
                        itemsClientSvc.getById(id.Id).then(function (data) {
                            pagerItem.editItem(data.data);
                        });
                        $scope.items = pagerItem.getPageItems($scope.currentPageNum());
                    }, 200);
                }, className: 'ngdialog-theme-default', data: id
            });
        };
        $scope.DeleteItem = function (id) {
            itemsClientSvc.DeleteItem(id).then(function (data) {
                pagerItem.removeItem(id);
                
                $scope.items = pagerItem.getPageItems($scope.currentPageNum());
                
                $scope.paginationList = pagerItem.getPaginationList();

            });
           
        };

        $scope.PAste = function () {
            $scope.itemType = "mobile";
            $scope.itemName = "IPhone";
        };
        $scope.addItem = function () {

            var obj = { Name: $scope.itemName, Type: $scope.itemType };
            $scope.itemType = "";
            $scope.itemName = "";
            itemsClientSvc.PostItem(obj).then(function (data) {
                pagerItem.addNewItem(data.data);
                $scope.items = pagerItem.getPageItems($scope.currentPageNum());
                $scope.paginationList = pagerItem.getPaginationList();
            });
        };

      
        activate();

        function activate() {
            itemsClientSvc.getAll().then(function (data) {
              
                pagerItem.setItems(data.data);

                $scope.items = pagerItem.getPageItems();
                $scope.paginationList = pagerItem.getPaginationList();
            });
               

        };
        $scope.showPage = function (page) {
            $scope.items = pagerItem.getPageItems(page);
            $scope.paginationList = pagerItem.getPaginationList();
        };
        $scope.currentPageNum = function () {
            return pagerItem.getCurrentPageNum();
        };
       
    }
})();