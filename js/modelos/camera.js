function Camera(c, vetorN, vetorV, d, hx, hy) {
    this.c = c;
    this.n = vetorN;
    this.v = vetorV;
    this.d = d;
    this.hx = hx;
    this.hy = hy;
    this.alfa = [];
    genAlfa();


  this.genAlfa = function() {
    this.n.normalizar();
    this.v = this.v.gramSchmidt(this.n);
    this.v.normalizar();
    var u = this.n.produtoVetorial(this.v);
    this.alfa.push([u.x, u.y, u.z]);
    this.alfa.push([this.v.x, this.v.y, this.v.z]);
    this.alfa.push([this.n.x, this.n.y, this.n.z]);
  };

  this.getPontoVista = function(p) {
    var a = p.clone();
    var b = a.sub(this.c);
    var r = b.multiplicarMatrix(this.alfa);
    return r;
  };

  this.getPontoTela = function(p) {
    var x = (this.d/this.hx)*(p.x/p.z);
    var y = (this.d/this.hy)*(p.y/p.z);
    var a = new Ponto(x, y);
    var r = new Ponto(((a.x + 1) * (largura / 2)), ((1 - a.y) * (altura / 2)));
    r.x = Math.round(r.x);
    r.y = Math.round(r.y);
    r.normal = p.normal.clone();
    return r;
  };

}