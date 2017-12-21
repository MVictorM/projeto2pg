function Triangulo(ponto1, ponto2, ponto3) {
    this.p1 = ponto1;
    this.p2 = ponto2;
    this.p3 = ponto3;
    this.normal = new Vetor(0, 0, 0);

    this.ordenar = function () {
        if(this.p1.y > this.p2.y) {
          var aux = this.p1.clone();
          this.p1 = this.p2;
          this.p2 = aux;
        }
        if(this.p2.y > this.p3.y) {
          var aux = this.p2.clone();
          this.p2 = this.p3;
          this.p3 = aux;
        }
        if(this.p1.y > this.p2.y) {
          var aux = this.p1.clone();
          this.p1 = this.p2;
          this.p2 = aux;
        }
    };

    this.calcularNormal = function() {
        var v2v1 = new Vetor(this.p2.x - this.p1.x, this.p2.y - this.p1.y, this.p2.z - this.p1.z);
        var v3v1 = new Vetor(this.p3.x - this.p1.x, this.p3.y - this.p1.y, this.p3.z - this.p1.z);
        this.normal = v2v1.produtoVetorial(v3v1);
        this.normal.normalizar();
    };

    this.getTrianguloTela = function(camera) {
        return new Triangulo(this.p1.getPontoTela(camera),
                             this.p2.getPontoTela(camera),
                             this.p3.getPontoTela(camera));
    };
    
    this.getPonto3DBaricentrico = function(cb) {
        var a = this.p1.clone();
        var b = this.p2.clone();
        var g = this.p3.clone();
        a = a.multiplicar(cb.alfa);
        b = b.multiplicar(cb.beta);
        g = g.multiplicar(cb.gama);
        return new Ponto(a.x+b.x+g.x, a.y+b.y+g.y, a.z+b.z+g.z);
    };
    
    this.getVetorBaricentrico = function(cb) {
        var a = this.p1.normal.clone();
        var b = this.p2.normal.clone();
        var g = this.p3.normal.clone();
        a = a.multiplicar(cb.alfa);
        b = b.multiplicar(cb.beta);
        g = g.multiplicar(cb.gama);
        a = a.add(b);
        a = a.add(g);
        return new Vetor(a.x, a.y, a.z);
    };

}