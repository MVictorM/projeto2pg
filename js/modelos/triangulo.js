function Triangulo(ponto1, ponto2, ponto3) {
    this.p1 = ponto1;
    this.p2 = ponto2;
    this.p3 = ponto3;
    this.normal = new Vetor(0, 0, 0);

    //ordena os pontos de acordo com as coordenadas
    this.ordenar = function () {
        if(this.p1.y > this.p2.y) {
          var aux = this.p1.copiar();
          this.p1 = this.p2;
          this.p2 = aux;
        }
        if(this.p2.y > this.p3.y) {
          var aux = this.p2.copiar();
          this.p2 = this.p3;
          this.p3 = aux;
        }
        if(this.p1.y > this.p2.y) {
          var aux = this.p1.copiar();
          this.p1 = this.p2;
          this.p2 = aux;
        }
    };
    //calcula a normal do triangulo
    this.calcularNormal = function() {
        var v2v1 = new Vetor(this.p2.x - this.p1.x, this.p2.y - this.p1.y, this.p2.z - this.p1.z);
        var v3v1 = new Vetor(this.p3.x - this.p1.x, this.p3.y - this.p1.y, this.p3.z - this.p1.z);
        this.normal = v2v1.produtoVetorial(v3v1);
        this.normal.normalizar();
    };

    this.retornaVetorBaricentrico = function(cb) {
        var a = this.p1.normal.copiar();
        var b = this.p2.normal.copiar();
        var c = this.p3.normal.copiar();
        a = a.multiplicar(cb.alfa);
        b = b.multiplicar(cb.beta);
        c = c.multiplicar(cb.gama);
        a = a.adicionar(b);
        a = a.adicionar(c);
        return new Vetor(a.x, a.y, a.z);
    };

    //ponto coordenadas baricentricas
    this.retornaPto3dimBaricentrico = function(cb) {
        var a = this.p1.copiar();
        var b = this.p2.copiar();
        var g = this.p3.copiar();
        a = a.multiplicar(cb.alfa);
        b = b.multiplicar(cb.beta);
        g = g.multiplicar(cb.gama);
        return new Ponto(a.x+b.x+g.x, a.y+b.y+g.y, a.z+b.z+g.z);
    };
}