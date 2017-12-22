function Iluminacao(pl, ka, ia, kd, od, ks, il, n) {
    //parametros iluminacao
    this.pl = pl;
    this.originalPl = pl;
    this.ka = ka;
    this.ia = ia;
    this.kd = kd;
    this.od = od;
    this.ks = ks;
    this.il = il;
    this.n = n;

    this.retornarCor = function (L, N, V, R, p) {
        var a;
        var l = this.ia.copiar();
        // Ia * Ka
        l = l.multiplicar(this.ka);
        if (N != null) {
            //produto escalar n e l <N, L>
            var pe_nl = N.produtoEscalar(L);
            //variavel l é o vetor da soma
            a = new Vetor(this.od.x * this.il.x, this.od.y * this.il.y, this.od.z * this.il.z);
            a = a.multiplicar(this.kd * pe_nl);
            l = new Vetor(l.x + a.x, l.y + a.y, l.z + a.z);
        }
        if (R != null) {
            //produto escalar de r e v <R, V>
            var prodEsc_rv = R.produtoEscalar(V);
            //variavel auxiliar igual ao produto escalar
            var aux = prodEsc_rv;
            // o n é a constante de rugosidade <R, V> ^ n
            for (var i = 0; i < this.n; i++) prodEsc_rv *= aux;
            a = this.il.copiar(); // vetor Il
            // Ks * <R, V>^n * Il
            a = a.multiplicar(this.ks * prodEsc_rv);
            // l + Ks * <R, V>^n * Il
            l = l.adicionar(a);
        }
        //pega apenas o valor inteiro
        l.x = Math.round(l.x);
        l.y = Math.round(l.y);
        l.z = Math.round(l.z);
        //maximo de 255, se for menor, atribui o valor de x, se nao atribui 255
        l.x = Math.min(l.x, 255);
        l.y = Math.min(l.y, 255);
        l.z = Math.min(l.z, 255);
        return l;
    };
}