angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $rootScope, $state, $ionicModal) {
        // CARRINHO
        $scope.carrinho = function() {
            $state.go('app.carrinho');
        }

        // PEDIDOS
        $scope.peiddos = function() {
            $state.go('app.pedidos');
        }

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
                sessao.login(new Usuario(usuario));
                $scope.sair();
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
                console.log("Cadastro realizado com sucesso!");
                $scope.dados = {};
                this.sair();
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

        // LOGOUT
        $scope.logout = function() {
            sessao.logout();
            $rootScope.$broadcast('logout');
        }
    })

    .controller('ProdutosCtrl', function ($scope, $rootScope) {
        $scope.produtos = $rootScope.produtos;
    })

    .controller('ProdutoCtrl', function ($scope, $rootScope, $stateParams, $ionicModal) {
        // FILTRAR PRODUTO
        var idProduto = $stateParams.idProduto;
        var produtos = $rootScope.produtos;
        for (var i = 0; i < produtos.length; i++) {
            var p = produtos[i];
            if(p.id === +idProduto) {
                $scope.produto = p;
                break;
            }
        }

        // LOGAR
        $scope.dados = {};
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
                sessao.login(new Usuario(usuario));
            } else {
                console.log("Usuário ou senha incorretos!");
            }
        };
        $scope.sair = function () {
            $scope.loginModal.hide();
        };

        // ADICIONAR AO CARRINHO
        $scope.addCarrinho = function(produto) {
            if(sessao.logado) {
                var resultado = sessao.usuario.addCarrinho(produto);
                if(resultado) {
                    console.log("Produto adicionado com sucesso!");
                } else {
                    console.log("Produto já está adicionado!");
                }
            } else {
                console.log("Você precisa estar logado para adicionar ao carrinho!");
                $scope.login();
            }

            console.log(sessao.usuario)
        }
    })
    
    .controller('CarrinhoCtrl', function ($scope, $rootScope) {
        $scope.calcularTotal = function(produtos) {
            var total = 0;
            for (var i = 0; i < produtos.length; i++) {
                var produto = produtos[i];
                total += produto.preco;
            }
            return total;
        }

        if(sessao.logado) {
            $scope.carrinho = sessao.usuario.carrinho;
            var produtos = $scope.carrinho;
            $scope.valorTotal = $scope.calcularTotal(produtos);
        }

        $scope.rmCarrinho = function(produto) {
            var resultado = sessao.usuario.rmCarrinho(produto);
            if(resultado) {
                console.log("Produto removido com sucesso!");
                $scope.carrinho = sessao.usuario.carrinho;
                var produtos = $scope.carrinho;
                $scope.valorTotal = $scope.calcularTotal(produtos);
            } else {
                console.log("Produto não encontrado no carrinho!");
            }
        }
    });
