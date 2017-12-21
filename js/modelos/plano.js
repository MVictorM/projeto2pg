function Plano(p1, p2, p3, s){
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.s = s;
    this.normal = this.calcularNormal();
    this.d = this.calcularD();
  
    this.calcularNormal = function(){
    var v1 = new Vetor(this.p2.x - this.p1.x, this.p2.y - this.p1.y, this.p2.z - this.p1.z);
    var v2 = new Vetor(this.p3.x - this.p1.x, this.p3.y - this.p1.y, this.p3.z - this.p1.z);
    return v1.produtoVetorial(v2);
  };
  
  this.calcularD = function(){
    var normal = this.calcularNormal();
    var x = normal.x*this.p1.x;
    var y = normal.y*this.p1.y;
    var z = normal.z*this.p1.z;
    var d = x + y + z;
    return d;
  };

  this.calcularSinal = function(ponto){
    var saida = -1;
    var aux = (this.normal.x*ponto.x) + (this.normal.y*ponto.y) + (this.normal.z*ponto.z) - this.d;
    if(aux > 0) saida = 1;
    return saida;
  };
}