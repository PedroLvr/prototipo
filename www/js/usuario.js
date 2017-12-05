var Usuario = function(dados){
    this.id = dados.id || null;
    this.nome = dados.nome || "";
    this.email = dados.email || "";
    this.endereco = dados.endereco || "";
    this.senha = dados.senha || "";
    this.carrinho = dados.carrinho || [];
    this.pedidos = dados.pedidos || [];
};

Usuario.prototype.addCarrinho = function(produto) {
    var adicionados = this.carrinho;
    var jaExiste = false;
    for (var i = 0; i < adicionados.length; i++) {
        var p = adicionados[i];
        if(p.id === produto.id) {
            jaExiste = true;
            break;
        }
    }

    if(!jaExiste) {
        adicionados.push(produto);
        Usuario.alterar(this);
        return true;
    }
    
    return false;
}

Usuario.prototype.rmCarrinho = function(produto) {
    var adicionados = this.carrinho;
    var index = -1;
    for (var i = 0; i < adicionados.length; i++) {
        var p = adicionados[i];
        if(p.id === produto.id) {
            index = i;
            break;
        }
    }

    if(index > -1) {
        adicionados.splice(index, 1);
        Usuario.alterar(this);
        return true;
    }

    return false;
}

Usuario.cadastrar = function(dados) {
    var usuario = new Usuario(dados);
    var usuarios = JSON.parse(window.localStorage.getItem('usuarios'));
    if(!usuarios || usuarios.length === 0) {
        usuarios = [usuario];
        window.localStorage.setItem('usuarios', JSON.stringify(usuarios));
        return true;
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

Usuario.procurar = function(email) {
    var usuarios = JSON.parse(window.localStorage.getItem('usuarios'));
    for (var i = 0; i < usuarios.length; i++) {
        var usuario = usuarios[i];
        if(usuario.email === email) {
            console.log(usuario);
            return new Usuario(usuario)
        }
    }
    return null;
}

Usuario.alterar = function(usuario) {
    var usuarios = JSON.parse(window.localStorage.getItem('usuarios'));
    var index = -1;
    for (var i = 0; i < usuarios.length; i++) {
        var u = usuarios[i];
        if(u.email === usuario.email) {
            index = i;
            break;
        }
    }

    if(index > -1) {
        console.log(usuarios);
        usuarios[index] = usuario;
        window.localStorage.setItem('usuarios', JSON.stringify(usuarios));
        return true;
    }

    return false;
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