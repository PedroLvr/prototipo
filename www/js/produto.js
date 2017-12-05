var Produto = function(dados) {
    this.id = dados.id || null;
    this.nome = dados.nome || "";
    this.descricao = dados.descricao || "";
    this.preco = dados.preco || 0;
    this.img = dados.img || "";
    this.categoria = dados.categoria || "";
}

// produtos da loja
var produtosLoja = [
    new Produto({ id: 1, nome: 'Notebook', preco: 4000, descricao: 'Lorem ipsum ajksl; ioiuysdf ahjsdhf kjasios dhjf asldja dhfjdk', img: '', categoria: 'eq' }),
    new Produto({ id: 2, nome: 'Smartphone', preco: 1200, descricao: '', img: '', categoria: 'eq' }),
    new Produto({ id: 3, nome: 'Monitor', preco: 1000, descricao: '', img: '', categoria: 'eq' }),
    new Produto({ id: 4, nome: 'Relógio', preco: 150, descricao: '', img: '', categoria: 'eq' }),
    new Produto({ id: 5, nome: 'Cadeira Gamer', preco: 870, descricao: '', img: '', categoria: 'eq' }),
    new Produto({ id: 6, nome: 'Placa de Vídeo', preco: 1200, descricao: '', img: '', categoria: 'eq' }),
    new Produto({ id: 7, nome: 'Teclado', preco: 130, descricao: '', img: '', categoria: 'perif' }),
    new Produto({ id: 8, nome: 'Mouse', preco: 95, descricao: '', img: '', categoria: 'perif' }),
    new Produto({ id: 9, nome: 'Mochila', preco: 100, descricao: '', img: '', categoria: 'asses' }),
    new Produto({ id: 10, nome: 'PS4', preco: 1800, descricao: '', img: '', categoria: 'cons' }),
    new Produto({ id: 11, nome: 'XBOX ONE', preco: 1600, descricao: '', img: '', categoria: 'cons' })
];