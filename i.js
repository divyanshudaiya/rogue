(function(){
		
'use strict';

	angular.module('f',[])
	.controller('NarrowItDownController',NarrowItDownController)
	.service('MenuSearchService',MenuSearchService)
	.directive('foundItems',foundItems);

	function foundItems(){
		var ddo={
			templateUrl:"items.html",
			scope:{
				onRemove:'&'
			}
		};
		return ddo;
	}

	function MenuSearchService(){
		var server=this;
		server.getMatchedMenuItems=function (searchTerm){

			var response=$http({
				method:'GET',
				url:"https://davids-restaurant.herokuapp.com/menu_items.json"
			});

			var promise=response;
			promise.then(function(response){
			
				server.data=response.data;
				console.log(server.data);
				server.filteredData=[];
				for (var i = server.data.length - 1; i >= 0; i--) {
					var regex = new RegExp(',', 'g');
					var x=x.replace(regex," "); 
					x=server.data[i].description.split(" ");
					var regex = new RegExp(',', 'g');
					for (var j = x.length - 1; j >= 0; j--) {
						if(searchTerm===x[j]){
							server.filteredData.push(server.data[i]);
							break;
						}
					}
				}
				if(server.filteredData.length===0){
					 throw new Error("Nothing Found");
	    		}
	    		else{
				return server.filteredData
				}
			}).
			catch(function (error) {
		    	console.log("Something went terribly wrong.");
  			});
			
    	};
    	server.removeItem=function(index){
    		server.filteredData.splice(index, 1);
    		return server.filteredData;
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
			shop.items =MenuSearchService.removeItem(index);
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
