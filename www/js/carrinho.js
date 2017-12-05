var Carrinho = function(dados) {
    this.id = dados.id || null;
    this.produtos = dados.produtos || [];
    this.dono = dados.usuario;
}

Carrinho.prototype.calcularValor = function() {
    var valorTotal = 0;
    var produtos = this.produtos;
    for (var i = 0; i < produtos.length; i++) {
        var produto = produtos[i];
        valorTotal += produto.preco;
    }
    return valorTotal;
}

Carrinho.prototype.addProduto = function(produto) {
    console.log(produto);
}