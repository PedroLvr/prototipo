var Usuario = function(dados){
    this.id = dados.id || null;
    this.nome = dados.nome || "";
    this.email = dados.email || "";
    this.endereco = dados.endereco || "";
    this.senha = dados.senha || "";
    this.carrinho = null;
    this.pedidos = [];
    this.favoritos = [];
};

Usuario.prototype.addFavorito = function(produto) {
    var favoritos = this.favoritos;
    for (var index = 0; index < favoritos.length; index++) {
        if(favoritos[index].id === produto.id) {
            jaExiste = true;
            break;
        }
    }

    if(!jaExiste) {
        this.favoritos.push(produto);
    }
}

Usuario.prototype.rmFavorito = function(produto) {
    var favoritos = this.favoritos;
    var index = -1;
    for (var i = 0; i < favoritos.length; i++) {
        if(favoritos[i].id === produto.id) {
            index = i;
            break;
        }
    }

    if(index >= 0) {
        favoritos.splice(index, 1);
    }
}

Usuario.cadastrar = function(dados) {
    var usuario = new Usuario(dados);
    var usuarios = JSON.parse(window.localStorage.getItem('usuarios'));
    if(!usuarios || usuarios.length === 0) {
        usuarios = [usuario];
        window.localStorage.setItem('usuarios', JSON.stringify(usuarios));
    } else {
        for (var i = 0; i < usuarios.length; i++) {
            var u = usuarios[i];
            if(u.email === usuario.email) {
                return false;
            } else {
                usuarios.push(usuario);
                window.localStorage.setItem('usuarios', JSON.stringify(usuarios));
                return true;
            }
        }
    }
}

Usuario.login = function(email, senha) {
    var usuarios = JSON.parse(window.localStorage.getItem('usuarios'));
    if(usuarios && usuarios.length > 0) {
        for (var i = 0; i < usuarios.length; i++) {
            var u = usuarios[i];
            if(u.email === email && u.senha === senha) return new Usuario(u);
        }
    }
    return false;
}