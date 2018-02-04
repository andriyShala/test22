(function () {
    'use strict';
    angular.module('App').controller('ItemsStatisticsCtrl', ItemsStatisticsCtrl);

    ItemsStatisticsCtrl.$inject = ['$scope', 'itemsClientSvc','pagerStaticItem'];
    function ItemsStatisticsCtrl($scope, itemsClientSvc, pagerStaticItem) {
        function dataItemsToStatistic(data) {

            console.log(data);
            var uniqueItemsType = [];
            var uniqueItems = [];
            for (var i = 0; i < data.length; i++) {
                if (uniqueItemsType.indexOf(data[i].Type) === -1) {
                    uniqueItemsType.push(data[i].Type);
                }
            }
            console.log(uniqueItemsType);
            angular.forEach(uniqueItemsType, function (val, i) {
                var ThisCt = 0;
                angular.forEach(data, function (val2, i2) {
                    if (val === val2.Type) {
                        ThisCt++;
                    };
                });
                uniqueItems.push({ Type: val, Count: ThisCt });

            });
            return uniqueItems;

        };
        $scope.showPage = function (page) {
            $scope.itemsStats = pagerStaticItem.getPageItems(page);
            $scope.paginationList = pagerStaticItem.getPaginationList();
        };
        $scope.currentPageNum = function () {
            return pagerStaticItem.getCurrentPageNum();
        };
        activate();

        function activate() {
            itemsClientSvc.getAll().then(function (data) {
               
                pagerStaticItem.setItems(dataItemsToStatistic(data.data));
                $scope.itemsStats = pagerStaticItem.getPageItems();
                $scope.paginationList = pagerStaticItem.getPaginationList();

            });


        };
    }
})();