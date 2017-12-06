angular.module('starter', ['ionic', 'starter.controllers'])

    .run(function ($ionicPlatform, $rootScope, $state, $ionicHistory, $ionicPopup) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });

        // inicializar produtos
        $rootScope.produtos = produtosLoja;
        $rootScope.sessao = sessao;

        // evento para voltar para o inicio
        $rootScope.$on('logout', function () {
            setTimeout(function(){
                $ionicHistory.nextViewOptions({
                    disableBack: true,
                    historyRoot: true
                });
                $state.go('app.produtos')
                .then(function(res) {
                    $ionicHistory.clearCache();
                    $ionicHistory.clearHistory();
                    $ionicHistory.nextViewOptions({
                        disableBack: false,
                        historyRoot: false
                    });
                }, function(err){
                    console.log(err);
                });
            });
        });
        
        // mensagens popup
        $rootScope.$on('alerta', function (event, mensagem) {
            $ionicPopup.alert({
                title: 'Alerta!',
                template: mensagem || ''
            });
        });

        // verificar sessao
        $rootScope.sessao.verificarSessao();
        $rootScope.$broadcast('logout');
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })
            .state('app.search', {
                url: '/search',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/search.html'
                    }
                }
            })
            .state('app.pedidos', {
                url: '/pedidos',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/browse.html'
                    }
                }
            })
            .state('app.carrinho', {
                url: '/carrinho',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/carrinho.html',
                        controller: 'CarrinhoCtrl'
                    }
                }
            })
            .state('app.produtos', {
                url: '/produtos',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/produtos.html',
                        controller: 'ProdutosCtrl'
                    }
                }
            })
            .state('app.produto', {
                url: '/produtos/:idProduto',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/produto.html',
                        controller: 'ProdutoCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/produtos');
    });
