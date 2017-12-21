function Vetor(x, y,z) {
    this.x = x;
    this.y = y;
    this.z = z;

  this.norma = function() {
    var n = this.produtoEscalar(this);
    var ret = Math.sqrt(n);
    return ret;
  };

  this.getCosseno = function(v) {
    var cos = (v.produtoEscalar(this))/(this.norma()*v.norma());
    return cos;
  };

  this.normalizar = function() {
    var sum = (this.x*this.x + this.y*this.y + this.z*this.z);
    if(!sum) return;
    var normal = Math.sqrt(sum);
    this.x/=normal;
    this.y/=normal;
    this.z/=normal;
  };
  
  this.produtoEscalar = function(v) {
    return (this.x*v.x + this.y*v.y + this.z*v.z);
  };

  this.produtoVetorial = function(v) {
    var x = this.y*v.z - this.z*v.y;
    var y = this.z*v.x - this.x*v.z;
    var z = this.x*v.y - this.y*v.x;
    return new Vetor(x, y, z);
  };

  this.multiplicar = function(k) {
    return new Vetor(this.x*k, this.y*k, this.z*k);
  };

  this.projecaoOrtogonal = function(v) {
    var k = (v.produtoEscalar(this))/(this.produtoEscalar(this));
    var r = new Vetor(this.x, this.y, this.z);
    r = r.multiplicar(k);
    return r;
  };
  
  this.add = function(v) {
    return new Vetor(this.x+v.x, this.y+v.y, this.z+v.z);
  };

  this.sub = function(v) {
    return new Vetor(this.x-v.x, this.y-v.y, this.z-v.z);
  };
  
  this.gramSchmidt = function(v) {
    return this.sub(v.projecaoOrtogonal(this));
  };
  
  this.clone = function () {
    return new Vetor(this.x, this.y, this.z);
  };
}