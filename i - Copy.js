(function(){
		
'use strict';

	angular.module('f',[])
	.controller('NarrowItDownController',NarrowItDownController)
	.service('MenuSearchService',MenuSearchService)
	
	MenuSearchService.$inject = ["$http"];
    function MenuSearchService($http) {
		var server=this;
		server.getMatchedMenuItems=function (searchTerm){

			var response=$http({
				method:'GET',
				url:"https://davids-restaurant.herokuapp.com/menu_items.json"
			}).then(function(response){
				var data=response.data.menu_items;
				var filteredData=[];
				for (var i = 0; i < data.length; i++) {
					if(data[i].description.indexOf(searchTerm)>0){
						filteredData.push(data[i]);
					}
				}
				
				return filteredData;
				}
			);

			return response;
    	};
    	
    }
		
	NarrowItDownController.$inject = ['MenuSearchService','$scope'];
	

	function NarrowItDownController(MenuSearchService,$scope){
		
		var shop=this;
		$scope.customStyle={};
		shop.items=[]
		shop.searchTerm="";
		shop.errorLog='';
		shop.MenuSearch=function(){                 
			//console.log(shop.searchTerm);
			if(shop.searchTerm){
				
				var promise=MenuSearchService.getMatchedMenuItems(shop.searchTerm);
				promise.then(function(result){

					if(result.length>0){
						shop.items=result;
					}
					else{
						shop.errorLog="Nothing Found";
					}
				});
			}
			
			else{
				 shop.errorLog="Nothing Found";
			}
			//console.log(shop.items);	
		};
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