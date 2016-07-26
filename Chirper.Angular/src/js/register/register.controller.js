(function() {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['authService', '$state', 'toastr'];

    /* @ngInject */
    function RegisterController(authService, $state, toastr) {
        var vm = this;

        vm.register = function() {
            authService.register(vm.registration)
                .then(
                    function(response) {
                        toastr.success('Registration succeeded!');

                        $state.go('login');
                    },
                    function(error) {
                        toastr.error(error);
                    }
                );
        }

        vm.confirmPass = function() {
            var pass = document.getElementById("topPass").value;
            var confPass = document.getElementById("btmPass").value;
            if (pass != confPass) {
                alert('Wrong confirm password !');
            } else {
                alert('passwords match');
            }
        };
    }
})();
