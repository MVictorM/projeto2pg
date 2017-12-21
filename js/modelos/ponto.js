function Ponto(x,y,z) {
    this.x = x;
    this.y = y;
    this.normal = new Vetor(0, 0, 0);

    this.z = undefined;
    if (z != undefined) {
        this.z = z;
    }
    
    this.sub = function(p) {
        if (this.z == undefined) {
            return new Ponto(this.x - p.x, this.y - p.y);    
        }

        return new Ponto(this.x - p.x, this.y - p.y, this.z - p.z);
    };

    this.add = function(p) {
        if (this.z == undefined) {
            return new Ponto(this.x + p.x, this.y + p.y);    
        }

        return new Ponto(this.x + p.x, this.y + p.y, this.z + p.z);
    };
    
    this.multiplicarMatrix = function(matrix) {
        var x = this.x*matrix[0][0] + this.y*matrix[0][1] + this.z*matrix[0][2];
        var y = this.x*matrix[1][0] + this.y*matrix[1][1] + this.z*matrix[1][2];
        var z = this.x*matrix[2][0] + this.y*matrix[2][1] + this.z*matrix[2][2];
        return new Ponto(x, y, z);
    };

    this.getPontoVista = function(camera) {
        var a = this.clone();
        var b = a.sub(camera.c);
        var r = b.multiplicarMatrix(camera.alfa);
        return r;
    };
    
    this.getPontoTela = function(camera) {
        var x = (camera.d/camera.hx)*(this.x/this.z);
        var y = (camera.d/camera.hy)*(this.y/this.z);
        var a = new Ponto(x, y);
        var r = new Ponto(((a.x + 1) * (largura / 2)), ((1 - a.y) * (altura / 2)));
        r.x = Math.round(r.x);
        r.y = Math.round(r.y);
        r.normal = this.normal.clone();
        return r;
    };
    
    this.multiplicar = function(k) {
        return new Ponto(this.x*k, this.y*k, this.z*k);
    };
    
    this.clone = function() {
        if (this.z == undefined){
            return new Ponto(this.x, this.y);    
        }
        
        return new Ponto(this.x, this.y, this.z);
    };

}