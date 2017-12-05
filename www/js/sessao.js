var sessao = {
    logado: false,
    usuario: null,
    login: function(usuario) {
        this.logado = true;
        this.usuario = usuario;
        window.localStorage.setItem('usuarioLogado', usuario.email);
    },
    logout: function() {
        this.logado = false;
        this.usuario = null;
        window.localStorage.setItem('usuarioLogado', null);
    },
    verificarSessao: function() {
        var usuarioLogado = window.localStorage.getItem('usuarioLogado');
        if(usuarioLogado) {
            var usuario = Usuario.procurar(usuarioLogado);
            if(usuario) this.login(usuario);
        }
    }
};