(function () {
    'use strict';

    angular.module('App').factory('pagerItem', function ($sce) {
        var currentPage = 0;
        var itemsPerPage = 4;
        var items = [];

        return {
            setItems: function (newItems) {
                items = newItems;
            },
            removeItem: function (id) {
                var num = 0;
                for (var i = 0; i < items.length; i++) {
                    if (items[i].Id === id) {
                        num = i;
                        break;
                    }
                }
                items.splice(num, 1);
            },
            addNewItem: function (newItem) {
                items.push(newItem);
            },
            setItesmPerPage: function (newPerPage) {
                itemsPerPage = newPerPage;
            },
            getPageItems: function (num) {
               
                num = angular.isUndefined(num) ? 0 : num;
                if (num === -1) {
                    num = currentPage;
                }

                
                var first = itemsPerPage * num;
                console.log('first -' + first + ' items-' + items.length);
                if (first === items.length) {
                    num--;
                    first = itemsPerPage * num;
                }


                var last = first + itemsPerPage;
                currentPage = num;
               
                last = last > items.length ? (items.length) : last;
                var returnItems = items.slice(first, last);
               
                    return returnItems;
           
            },
            getTotalPagesNum: function () {
                return Math.ceil(items.length / itemsPerPage);
            },
            getPaginationList: function () {
                var pagesNum = this.getTotalPagesNum();
                if (pagesNum < 1) {
                    return false;
                }
                var paginationList = [];
                paginationList.push({
                    name: $sce.trustAsHtml('1'),
                    link: 0
                });
                if (pagesNum === 1) {
                    return paginationList;
                }
                if (pagesNum <= 4) {
                    for (var i = 1; i < pagesNum-1; i++) {
                        var name = i + 1;
                        paginationList.push({
                            name: $sce.trustAsHtml(String(name)),
                            link: i
                        });
                    }
                }
                else {
                    if (currentPage > 2) {
                        paginationList.push({
                            name: $sce.trustAsHtml('...'),
                            link: -1
                        });
                    }
                    var maxval = currentPage + 2;
                    var minval = currentPage - 1;
                    if (maxval === 2) {
                        maxval++;
                    }
                    else if (maxval >= pagesNum) {
                        maxval = pagesNum - 1;
                        minval = pagesNum - 3;
                    }
                    for (var j = minval; j < maxval; j++) {
                        var name1 = j + 1;
                        if (j > 0) {
                            paginationList.push({
                                name: $sce.trustAsHtml(String(name1)),
                                link: j
                            });
                        }
                    }
                    if (currentPage + 1 !== pagesNum - 1 && currentPage <pagesNum-3) {
                        paginationList.push({
                            name: $sce.trustAsHtml(String('...')),
                            link: -1
                        });
                    }
                }
                    paginationList.push({
                        name: $sce.trustAsHtml(String(pagesNum)),
                        link: pagesNum-1
                    });
                return paginationList;
            },
            getCurrentPageNum: function () {
                return currentPage;
            },
            editItem: function (item) {
                
                console.log(item);
                for (var i = 0; i < items.length; i++) {
                    if (items[i].Id === item.Id) {
                        items[i].Name = item.Name;
                        items[i].Type = item.Type;

                        break;
                    }
                }
            },
            setItemsPerPage: function (count) {
                itemsPerPage = count;
            }
           


           
        };

    });

})();
