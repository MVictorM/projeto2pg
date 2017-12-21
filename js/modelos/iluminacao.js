function Iluminacao(pl, ka, ia, kd, od, ks, il, n) {
    this.pl = pl;
    this.originalPl = pl;
    this.ka = ka;
    this.ia = ia;
    this.kd = kd;
    this.od = od;
    this.ks = ks;
    this.il = il;
    this.n = n;

  this.getCor = function(L, N, V, R, p) {
    var a;
    var l = this.ia.clone();
    l = l.multiplicar(this.ka); // Ia * Ka
    if(N != null) {
      var pe_nl = N.produtoEscalar(L); // <N, L>
      a = new Vetor(this.od.x*this.il.x, this.od.y*this.il.y, this.od.z*this.il.z);
      a = a.multiplicar(this.kd*pe_nl); 
      l = new Vetor(l.x+a.x, l.y+a.y, l.z+a.z); 
    }
    if(R != null) {
      var pe_rv = R.produtoEscalar(V); // <R, V>
      var aux = pe_rv;
      for (var i = 0; i < this.n; i++) pe_rv *= aux; // n é a cte de rugosidade | <R, V> ^n
      a = this.il.clone(); // vetor Il
      a = a.multiplicar(this.ks*pe_rv); // Ks * <R, V>^n * Il
      l = l.add(a); // l + Ks * <R, V>^n * Il
    }
    l.x = Math.round(l.x);
    l.y = Math.round(l.y);
    l.z = Math.round(l.z);
    l.x = Math.min(l.x,255);
    l.y = Math.min(l.y,255);
    l.z = Math.min(l.z,255);
    return l;
  };

}