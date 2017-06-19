(function () {
"use strict";

angular.module('common')
.service('SearchService', SearchService);


SearchService.$inject = ['$http'];
function SearchService($http) {
  var service = this;

  service.data="";
  service.getItem=function(){
      return service.data;
  }

  service.checkLink=function(categoryShortname){
      categoryShortname=categoryShortname.toUpperCase();
      var response=$http({
        method:'GET',
        url:"https://divyanshudaiyangjs.herokuapp.com/menu_items/"+categoryShortname+".json"
        // data:{
        //  "category" : categoryShortname
        // }
        })
        .then(function(response){
            service.data=response.data;
            console.log(service.data);
            return 1;
            }
        .catch(error){
            return 0;
          };
        );

      return response;
      
    }
}

})();
