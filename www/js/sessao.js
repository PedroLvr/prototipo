var sessao = {
    logado: false,
    usuario: null,
    login: function(usuario) {
        this.logado = true;
        this.usuario = usuario;
        window.localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    },
    logout: function() {
        this.logado = false;
        this.usuario = null;
        window.localStorage.setItem('usuarioLogado', null);
    },
    recuperar: function(usuario) {
        this.login(usuario);
    }
};