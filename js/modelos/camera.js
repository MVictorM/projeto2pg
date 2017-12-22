function Camera(c, vetorN, vetorV, d, hx, hy) {
    //parametros passados
    this.c = c;
    this.n = vetorN;
    this.v = vetorV;
    this.d = d;
    this.hx = hx;
    this.hy = hy;
    this.alfa = [];

    this.calcularAlfa = function () {
        this.n.normalizar();
        this.v = this.v.ortogGramSchimidt(this.n);
        this.v.normalizar();
        var u = this.n.produtoVetorial(this.v);
        this.alfa.push([u.x, u.y, u.z]);
        this.alfa.push([this.v.x, this.v.y, this.v.z]);
        this.alfa.push([this.n.x, this.n.y, this.n.z]);
    };
    //dado o ponto, retornar o ponto de vista
    this.retornarPontoVista = function (p) {
        //clona p
        var a = p.copiar();
        //subtrai c (camera) de a
        var b = a.subtrair(this.c);
        return b.multiplicacaoMatriz(this.alfa);
    };

    this.retornarPontoTela = function (p) {
        var x = (this.d / this.hx) * (p.x / p.z);
        var y = (this.d / this.hy) * (p.y / p.z);
        var a = new Ponto(x, y);
        //retorna o ponto com as coordenadas de tela
        var resultado = new Ponto(((a.x + 1) * (largura / 2)), ((1 - a.y) * (altura / 2)));
        resultado.x = Math.round(resultado.x);
        resultado.y = Math.round(resultado.y);
        resultado.normal = p.normal.copiar();
        return resultado;
    };

}