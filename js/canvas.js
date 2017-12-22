function calculaCoordenadasBaricentricas(x, y, index) {
    var i, j;
    var coordsSistema =
        [
            [triangulos2D[index].p1.x, triangulos2D[index].p2.x, triangulos2D[index].p3.x, x],
            [triangulos2D[index].p1.y, triangulos2D[index].p2.y, triangulos2D[index].p3.y, y],
            [1, 1, 1, 1]
        ];
    var result = [0, 0, 0];
    var coef_1_e_0, coef_2_e_0, coef_2_e_1;
    coef_1_e_0 = -1.0 * coordsSistema[1][0] / coordsSistema[0][0];
    coef_2_e_0 = -1.0 * coordsSistema[2][0] / coordsSistema[0][0];
    for (j = 0; j < 4; j++) {
        coordsSistema[1][j] += coef_1_e_0 * coordsSistema[0][j];
        coordsSistema[2][j] += coef_2_e_0 * coordsSistema[0][j];
    }
    coef_2_e_1 = -1.0 * coordsSistema[2][1] / coordsSistema [1][1];
    for (j = 1; j < 4; j++) {
        coordsSistema[2][j] += coef_2_e_1 * coordsSistema[1][j];
    }
    result[2] = (coordsSistema[2][3]) / coordsSistema[2][2];
    result[1] = (coordsSistema[1][3] - (result[2] * coordsSistema[1][2])) / coordsSistema[1][1];
    result[0] = (coordsSistema[0][3] - (result[2] * coordsSistema[0][2]) - (result[1] * coordsSistema[0][1])) / coordsSistema[0][0];
    var alfa, beta, gama;
    alfa = result[0];
    beta = result[1];
    gama = result[2];
    var r = {
        alfa: 1.0 - (beta + gama),
        beta: beta,
        gama: gama
    };
    return r;
}

function pintarPixel(x, y, cor) {
    var str = "rgb(" + cor.x + ", " + cor.y + ", " + cor.z + ")";
    ctx.fillStyle = str;
    ctx.fillRect(x, y, 1, 1);
}

function avaliarPonto(x, y, index) {
    var cb = calculaCoordenadasBaricentricas(x, y, index); //coordenadas baricentricas
    var pl = triangulos3D[index].retornaPto3dimBaricentrico(cb); //posicao da luz
    var vetorN, vetorV, vetorL, vetorR, cor;
    if (pl.z < zBuffer[y][x]) {
        zBuffer[y][x] = pl.z;
        vetorN = triangulos3D[index].retornaVetorBaricentrico(cb);
        vetorN.normalizar();

        vetorV = new Vetor((-1) * pl.x, (-1) * pl.y, (-1) * pl.z);
        vetorV.normalizar();

        var c = camera.retornarPontoVista(iluminacao.pl);
        c = iluminacao.pl.subtrair(pl);
        var vetorL = new Vetor(c.x, c.y, c.z);
        vetorL.normalizar();

        if (vetorV.produtoEscalar(vetorN) < 0) {
            vetorN.x *= -1;
            vetorN.y *= -1;
            vetorN.z *= -1;
        }
        if (vetorN.produtoEscalar(vetorL) < 0) {
            // nao possui componentes difusa nem especular.
            cor = iluminacao.retornarCor(vetorL, null, vetorV, null, pl, camera);
        } else {
            var k = 2 * vetorN.produtoEscalar(vetorL);
            var a = vetorN.copiar();
            a = a.multiplicar(k);
            vetorR = a.subtrair(vetorL);
            if (vetorR.produtoEscalar(vetorV) < 0) {
                // nao possui componente especular.
                cor = iluminacao.retornarCor(vetorL, vetorN, vetorV, null, pl, camera);
            } else {
                cor = iluminacao.retornarCor(vetorL, vetorN, vetorV, vetorR, pl, camera);
            }
        }
        pintarPixel(x, y, cor);
    }
}

// varre os triangulos superior ou inferior dependendo do parâmetro tipo
function varrerTriangulo(t, indice, tipo) {
    var inversoInclinacao1, inversoInclinacao2 = null;
    if (tipo === "superior") {
        minX = t.p1.x;
        maxX = t.p1.x;
        //calcula a inclinacao
        inversoInclinacao1 = (t.p2.x - t.p1.x) / (t.p2.y - t.p1.y);
        inversoInclinacao2 = (t.p3.x - t.p1.x) / (t.p3.y - t.p1.y);

        for (var y = t.p1.y; y <= t.p2.y; y++) {
            //pega a parte inteira de max e min, atribui o inicio e fim
            var inicio = Math.trunc(minX);
            var fim = Math.trunc(maxX);
            if (inicio > fim) {
                var aux = inicio;
                inicio = fim;
                fim = aux;
            }
            for (var x = inicio; x <= fim; x++) {
                if ((x >= 0 && x < largura) && (y >= 0 && y < altura)) {
                    avaliarPonto(x, y, indice);
                }
            }
            minX += inversoInclinacao1;
            maxX += inversoInclinacao2;
        }

    } else if (tipo === "inferior") {
        inversoInclinacao1 = (t.p3.x - t.p1.x) / (t.p3.y - t.p1.y);
        inversoInclinacao2 = (t.p3.x - t.p2.x) / (t.p3.y - t.p2.y);
        minX = t.p3.x;
        maxX = t.p3.x;

        for (var y = t.p3.y; y > t.p1.y; y--) {
            var inicio = Math.trunc(minX);
            var fim = Math.trunc(maxX);
            if (inicio > fim) {
                var aux = inicio;
                inicio = fim;
                fim = aux;
            }
            for (var x = inicio; x <= fim; x++) {
                if ((x >= 0 && x < largura) && (y >= 0 && y < altura)) {
                    avaliarPonto(x, y, indice);
                }
            }
            minX -= inversoInclinacao1;
            maxX -= inversoInclinacao2;
        }
    }
}

function desenharObjeto() {
    for (var i = 0; i < triangulos2D.length; i++) {
        //inicializa triangulo 2d
        var t = new Triangulo(triangulos2D[i].p1, triangulos2D[i].p2, triangulos2D[i].p3);
        t.ordenar();
        if (t.p2.y === t.p3.y) {
            varrerTriangulo(t, i, "superior");
        } else if (t.p1.y === t.p2.y) {
            varrerTriangulo(t, i, "inferior");
        } else {
            // divide o triangulo em 2
            var x = (t.p1.x + ((t.p2.y - t.p1.y) / (t.p3.y - t.p1.y)) * (t.p3.x - t.p1.x));
            var p4 = new Ponto(x, t.p2.y);
            var trianguloSuperior = new Triangulo(t.p1, t.p2, p4);
            var trianguloInferior = new Triangulo(t.p2, p4, t.p3);
            //varre triangulo superior
            varrerTriangulo(trianguloSuperior, i, "superior");
            //varre triangulo inferior
            varrerTriangulo(trianguloInferior, i, "inferior");
        }
    }
}
