angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
        // LOGAR
        $ionicModal.fromTemplateUrl('templates/logar.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.loginModal = modal;
        });
        $scope.login = function () {
            $scope.loginModal.show();
        };
        $scope.logar = function (dados) {
            var usuario = Usuario.login(dados.email, dados.senha);
            if(usuario) {
                console.log("Login realizado com sucesso!");
                var u = new Usuario(usuario);
                console.log(u);
                sessao.login(new Usuario(usuario));
            } else {
                console.log("Usuário ou senha incorretos!");
            }
        };

        // CADASTRAR
        $ionicModal.fromTemplateUrl('templates/cadastrar.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.cadModal = modal;
        });
        $scope.cadastro = function () {
            $scope.cadModal.show();
        };
        $scope.cadastrar = function (dados) {
            var resultado = Usuario.cadastrar(dados);
            if(resultado) {
                $scope.dados = {};
            } else {
                console.log("Email já cadastrado!");
            }
        };

        // LOGIN E CADASTRO
        $scope.dados = {};
        $scope.sair = function () {
            $scope.loginModal.hide();
            $scope.cadModal.hide();
        };
    })

    .controller('ProdutosCtrl', function ($scope, $rootScope) {
        $scope.produtos = $rootScope.produtos;
        console.log($scope.produtos)
    })

    .controller('ProdutoCtrl', function ($scope, $stateParams) {
    });
