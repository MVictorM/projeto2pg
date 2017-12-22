function Vetor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;

    //normaliza o vetor
    this.normalizar = function () {
        var soma = (this.x * this.x + this.y * this.y + this.z * this.z);
        if (!soma) {
            return;
        }
        //calcula a normal
        var normal = Math.sqrt(soma);
        //aplica a normal nos pontos
        this.x /= normal;
        this.y /= normal;
        this.z /= normal;
    };

    //produto escalar
    this.produtoEscalar = function (v) {
        return (this.x * v.x + this.y * v.y + this.z * v.z);
    };

    //produto vetorial
    this.produtoVetorial = function (v) {
        var x = this.y * v.z - this.z * v.y;
        var y = this.z * v.x - this.x * v.z;
        var z = this.x * v.y - this.y * v.x;
        return new Vetor(x, y, z);
    };

    //multiplicacao por constante
    this.multiplicar = function (k) {
        return new Vetor(this.x * k, this.y * k, this.z * k);
    };

    //projecao ortogonal do vetor
    this.projecaoOrtogonal = function (v) {
        var k = (v.produtoEscalar(this)) / (this.produtoEscalar(this));
        var r = new Vetor(this.x, this.y, this.z);
        r = r.multiplicar(k);
        return r;
    };

    this.adicionar = function (v) {
        return new Vetor(this.x + v.x, this.y + v.y, this.z + v.z);
    };

    this.subtrair = function (v) {
        return new Vetor(this.x - v.x, this.y - v.y, this.z - v.z);
    };

    //ortogonalizacao no processo de Gram-Schmidt
    this.ortogGramSchimidt = function (v) {
        return this.subtrair(v.projecaoOrtogonal(this));
    };

    //cria uma copia do vetor
    this.copiar = function () {
        return new Vetor(this.x, this.y, this.z);
    };
}