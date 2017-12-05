angular.module('starter', ['ionic', 'starter.controllers'])

    .run(function ($ionicPlatform, $rootScope) {
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
            .state('app.browse', {
                url: '/browse',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/browse.html'
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
