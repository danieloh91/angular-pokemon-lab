console.log('app.js loaded!');

// $(document).ready(function(){
//   $('')
// });





angular
      .module("pokeApp", [])
      .controller("pokemonController", pokemonController);

pokemonController.$inject=['$http'];

function pokemonController ($http) {
  var vm = this;

  vm.newPoke = {};

  $http({
    method: 'GET',
    url: 'https://super-crud.herokuapp.com/pokemon'
  }).then(function successCallback(response) {
    vm.pokemon = response.data.pokemon;
  }, function errorCallback(response) {
    console.log('There was an error getting the data', response);
  });

  vm.createPoke = function () {
    $http({
      method: 'POST',
      url: 'https://super-crud.herokuapp.com/pokemon',
      data: vm.newPoke
    }).then(function successCallback(response) {
      vm.pokemon.push(response.data);
      vm.pokeForm.$setPristine();
      vm.pokeForm.$setUntouched();
      console.log(response.data);
    }, function errorCallback(response) {
      console.log('There was an error posting the data', response);
    });
  };

  vm.editPoke = function (poke) {
    $http({
      method: 'PUT',
      url: 'https://super-crud.herokuapp.com/pokemon/' + poke._id,
      data: poke
    }).then(function successCallback(json) {
      console.log('edited!');
      vm.pokemon.push(json.data);
    }, function errorCallback(response) {
      console.log('There was an error deleting the data', response);
    });
  };

  vm.deletePoke = function (poke) {
    $http({
      method: 'DELETE',
      url: 'https://super-crud.herokuapp.com/pokemon/' + poke._id,
      data: poke
    }).then(function successCallback(json) {
      var index = vm.pokemon.indexOf(poke);
      vm.pokemon.splice(index, 1);
    }, function errorCallback(response) {
      console.log('There was an error deleting the data', response);
    });
  };

}
