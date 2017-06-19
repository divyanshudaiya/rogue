(function(){
	
'use strict';

angular.module('MenuApp',['ui.router']);

angular.module('MenuApp')
.service('MenuSearchService',MenuSearchService);


MenuSearchService.$inject = ["$http"];
function MenuSearchService($http){
	var service = this;

  service.data="";
  service.getItem=function(){
      return service.data;
  };

  service.checkLink=function(categoryShortname){
      categoryShortname=categoryShortname.toUpperCase();
      var response=$http({
        method:'GET',
        url:"https://divyanshudaiyangjs.herokuapp.com/menu_items/"+categoryShortname+".json"
        })
        ;

      return response;
      
    };
    service.assign=function(input){
    	service.data=input;
    };
}



angular.module('MenuApp')
.config(RoutesConfig)
.controller('itemController',itemController)
.controller('categoriesController',categoriesController);


RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/home');
		$stateProvider
		.state('home',{
				url:'/',
				template:''	
			}
		)
		.state('categorie',{
				url:"/categories",
				template: 
				'      <p style="{text-align:center;}">Sign in form</p>'+
				'      <form name=\'regForm\' novalidate>'+
				''+
				'        <input type="text" name="username" placeholder="Name"'+
				'          ng-model="catList.user.username"'+
				'          required'+
				'          minlength="1"'+
				'          ng-maxlength="20">'+
				'          '+
				'          <br><span'+
				'            ng-if="(regForm.username.$error.minlength || regForm.username.$error.required) && regForm.username.$touched">'+
				'            Name must be at least 1 character long'+
				'          </span>'+
				'          <span ng-if="regForm.username.$error.maxlength && regForm.username.$touched">'+
				'            Name must not be longer than 20 characters'+
				'          </span>'+
				'          <br>'+
				''+
				'        <input type="text" name="usersurname" placeholder="Surname"'+
				'          ng-model="catList.user.usersurname"'+
				'          required'+
				'          minlength="1"'+
				'          ng-maxlength="20">'+
				'          '+
				'          <br><span'+
				'            ng-if="(regForm.usersurname.$error.minlength || regForm.usersurname.$error.required) && regForm.username.$touched">'+
				'            surname must be at least 1 character long'+
				'          </span>'+
				'          <span ng-if="regForm.usersurname.$error.maxlength && regForm.usersurname.$touched">'+
				'            surname must not be longer than 20 characters'+
				'          </span>'+
				'          <br>'+
				''+
				'        <input type="email" name="email" placeholder="Email"'+
				'          ng-model="catList.user.email"'+
				'          required>'+
				'         <br> <span ng-if="regForm.email.$invalid && regForm.email.$touched">'+
				'            Must be a valid email address'+
				'          </span>'+
				'          <br>'+
				''+      
				  		'<input type="text" name="phone" placeholder="Phone ###-###-####"'+
				'          ng-model="catList.user.phone"'+
				'          pattern="&#x28;&#x5C;&#x64;&#x7B;&#x33;&#x7D;&#x29;&#x2D;&#x28;&#x5C;&#x64;&#x7B;&#x33;&#x7D;&#x29;&#x2D;&#x28;&#x5C;&#x64;&#x7B;&#x34;&#x7D;&#x29;">'+
				'          <br><span ng-if="regForm.phone.$invalid && regForm.phone.$touched">'+
				'            Phone must be in the format ###-###-####.'+
				'          </span>'+
				'          <br>'+
				'        <input type="text" name="short_name" placeholder="short_name"'+
				'        ng-model="catList.user.short_name" '+
				'        ng-change="catList.assign(catList.user.short_name)"'+
				'         required>'+
				'        <br><span ng-if="regForm.short_name.$touched || catList.valid">'+
				'          {{catList.error}}'+
				'        </span>'+
				'        <br>'+
				''+
				'        <button style="{text-align:center;float:clear;}"'+
				'          ng-disabled="regForm.$invalid || catList.valid"'+
				'          ng-click="catList.reassign()">Submit</button>'+
				''+
				'          <br><div style="margin-top: 10px;">'+
				'            Form valid? {{ regForm.$valid && !catList.valid}}'+
				'          </div>'+
				'      </form>'
				
				,
			//	controller: 'categoriesController',
				}
		 )
		.state('itemi',{
				url:"/items",
								
				template:'<div ng-if="catList.total">'+
				'{{ catList.user.username }}<br>'+
				'{{ catList.user.email }}<br>'+
				'{{ catList.user.short_name }}<br>'+
				'<br><img src="images/menu/{{catList.value.category_short_name}}/{{catList.value.category_short_name}}.jpg" />'+
				'{{ catList.value.name }}<br>'+
				'{{ catList.value.description }}<br>'+
				''+
				'</div>'+
				'<div ng-if="!catList.total">please <a ui-sref="categorie">sign in</a> </div>',
					

				}
		 )
		;
}

itemController.$inject=['MenuSearchService'];
function itemController(MenuSearchService){
	var items=this;
	items.value='';
	items.assign=function(){
		items.value= MenuSearchService.getItem();
		return items.value;
	};
};

categoriesController.$inject=['MenuSearchService','$q'];
function categoriesController(MenuSearchService,$q){
	var items=this;
	items.value='';
	items.valid=1;
	items.error='';
	items.test="adasdasda";
	items.total=0;
	//items.count=0;
	items.assign=function(categoryShortname){
		console.log("hre");
		var promise= MenuSearchService.checkLink(categoryShortname);
		promise.
		then(
			function(response){
				items.value=response.data;
				items.valid=0;
				items.error='';
			},function(response){
				items.valid=1;
				items.error="please enter valid short name";
			}
		);	
	};
	items.reassign=function(){
		console.log("hre123");
		console.log(items.value);
		items.total=1;
		if(items.valid===0){
			MenuSearchService.assign(items.value);
		};
	};
}


	

// angular.module('MenuApp')

// .component('categories',{
	

// template: '<fieldset>'+
// '      <legend>Registration</legend>'+
// '      <form name=\'regForm\' novalidate>'+
// ''+
// '        <input type="text" name="username" placeholder="Pick a username"'+
// '          ng-model="$ctrl.user.username"'+
// '          required'+
// '          minlength="4"'+
// '          ng-maxlength="10">'+
// '          {{ $ctrl.user.username }}'+
// '          <span'+
// '            ng-if="(regForm.username.$error.minlength || regForm.username.$error.required) && regForm.username.$touched">'+
// '            Username must be at least 4 characters long'+
// '          </span>'+
// '          <span ng-if="regForm.username.$error.maxlength && regForm.username.$touched">'+
// '            Username must not be longer than 10 characters'+
// '          </span>'+
// '          <br>'+
// ''+
// '        <input type="email" name="email" placeholder="Email"'+
// '          ng-model="$ctrl.user.email"'+
// '          required>'+
// '          <span ng-if="regForm.email.$invalid && regForm.email.$touched">'+
// '            Must be a valid email address: handle@domain format'+
// '          </span>'+
// '          <br>'+
// ''+
// '        <input type="text" name="short_name" placeholder="short_name"'+
// '        ng-model="$ctrl.user.short_name" '+
// '        ng-change="$ctrl.assign($ctrl.user.short_name)"'+
// '        ng-blur="$ctrl.assign($ctrl.user.short_name)" required>'+
// '        <span ng-if="regForm.short_name.$touched && !$ctrl.count">'+
// '          Phone must be in the format ###-###-####.'+
// '        </span>'+
// '        <br>'+
// ''+
// '        <button'+
// '          ng-disabled="regForm.$invalid && !$ctrl.valid"'+
// '          ng-click="$ctrl.reassign()">Submit</button>'+
// ''+
// '          <div style="margin-top: 10px;">'+
// '            Form valid? {{ regForm.$valid }}'+
// '          </div>'+
// '      </form>'+
// '    </fieldset>'
	


// });	


// angular.module('MenuApp')
// .component('items',{
// 	template:'<ul><li ng-repeat="itemt in $ctrl.items">'+
// 			'{{ itemt.short_name }}  {{ itemt.name }}</br><p style="font-size:0.8em; color:yellow;">{{itemt.description}}</p></li></ul>',
// 	bindings:{
// 		items:'<'
// 	}
// });
})();