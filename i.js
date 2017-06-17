(function(){
		
'use strict';

	angular.module('f',[])
	.controller('NarrowItDownController',NarrowItDownController)
	.service('MenuSearchService',MenuSearchService)
	.directive('foundItems',foundItems).constant("ApiBasePath", "https://davids-restaurant.herokuapp.com");;

	function foundItems(){
		var ddo={
			templateUrl:"items.html",
			scope:{
				onRemove:'&'
			}
		};
		return ddo;
		}
	MenuSearchService.$inject = ["$http", "ApiBasePath"];
	  function MenuSearchService($http, ApiBasePath) {
	    var service = this;



	    service.getMatchedMenuItems = function(searchTerm) {
	      return $http({
		method: "GET",
		url: (ApiBasePath + "/menu_items.json")
	      })
		.then(function(response){
		  var menuItems = response.data;
		  console.log(response.data)
		      var foundItems = filterOnDescription(menuItems.menu_items, searchTerm);
			
		  return foundItems;
		});
	    };


	    function filterOnDescription(list, searchTerm) {
	      var newList = [];

	      for(var i = 0; i < list.length; i++) {
		if(list[i].description.indexOf(searchTerm) > 0) {
		  newList.push(list[i]);
		}
	      }

	      return newList;
	    }
	  }

	NarrowItDownController.$inject = ['MenuSearchService','$scope'];
	

	function NarrowItDownController(MenuSearchService,$scope){
		
		var shop=this;
		$scope.customStyle={};
		shop.items=[];
		shop.searchTerm="";
		shop.MenuSearch=function(searchTerm){
			try{
				shop.items=MenuSearchService.getMatchedMenuItems(searchTerm);
				
			}
			catch(error){
				shop.errorMessage = error.message;
			}
		}
		shop.removeItem=function(index){
			shop.items.splice(index, 1);
		}
		shop.count=shop.items.length;
		// shop.menuLoaded=function(index){
		// 		listman.itsbought(index);
		// 		if (shop.toBuy.length==0){
		// 			$scope.customStyle.style={"background-color":"green"};
		// 		}
		// 		else if (shop.count%2 == 0) {
		// 			$scope.customStyle.style={"background-color":"ff0066"};
		// 			shop.count++;
		// 		}
		// 		else{
		// 			$scope.customStyle.style={"background-color":"purple"};
		// 			shop.count++;
		// 		}
		// };
	};
	
	
})();
