console.log('app.js loaded!');

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
      console.log(response.data);
    }, function errorCallback(response) {
      console.log('There was an error posting the data', response);
    });
  };

  vm.deletePoke = function () {
    
  };

}
