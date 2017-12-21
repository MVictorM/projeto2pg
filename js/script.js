//Ações abrir e fechar menu
function openNav() {
    jQuery('#menuLat')[0].style.width = "20%";
}
function closeNav() {
    jQuery('#menuLat')[0].style.width = "0%";
}

//inicializa variáveis que serão preenchidas a partir da leitura dos arquivos
var camera, iluminacao, centroide, plano, zBuffer;
var pontos3DMundo, triangulos3D, triangulos2D, triangulosRef = [];

//realiza as operacoes ao submeter os arquivos
jQuery( "#submit" ).click(function() {
    if(validarEnvioArquivos()) {
        parametrosCamera();
        parametrosIluminacao();
        parametrosObjeto();
    }
});

function validarEnvioArquivos() {
    if (jQuery('#camera').get(0).files.length === 0 ||
        jQuery('#objeto').get(0).files.length === 0 ||
        jQuery('#iluminacao').get(0).files.length === 0) {
        return false
    }

    return true
}

function parametrosCamera() {
    var file = jQuery('#camera').get(0).files[0]; //pega o arquivo de camera
    var reader = new FileReader();
    reader.onload = function(){ //le as linhas
        var lines = this.result.split('\n');
        for(var line = 0; line < lines.length; line++){
            lines[line] = lines[line].split(" ");
        }

        var c = new Ponto(lines[0][0],lines[0][1], lines[0][2]); //C - Posicao da camera em coordenadas de mundo
        var vetorN = new Vetor(lines[1][0],lines[1][1], lines[1][2]); //Vetor N
        var vetorV = new Vetor(lines[2][0],lines[2][1], lines[2][2]); //Vetor N
        var dhxhy = lines[3];
        var d = dhxhy[0];
        var hx = dhxhy[1];
        var hy = dhxhy[2];
        camera = new Camera(c,vetorN,vetorV,d,hx,hy);
    };

    reader.readAsText(file);
}

function parametrosIluminacao() {
    var file = jQuery('#iluminacao').get(0).files[0]; //pega o arquivo de iluminacao
    var reader = new FileReader();
    reader.onload = function(){ //le as linhas
        var lines = this.result.split('\n');
        for(var line = 0; line < lines.length; line++){
            lines[line] = lines[line].split(" ");
        }

        var pl = new Ponto(lines[0][0], lines[0][1], lines[0][2]); //Posicao da luz em coordenadas de mundo
        var ka = lines[1][0]; //reflexao ambiental
        var ia = new Vetor(lines[2][0], lines[2][1], lines[2][2]); //vetor cor ambiental
        var kd = lines[3][0]; //constante difusa
        var od = new Vetor(lines[4][0], lines[4][1], lines[4][2]); //vetor difuso
        var ks = lines[5]; //parte especular
        var il = new Vetor(lines[6][0], lines[6][1], lines[6][2]); //cor da fonte de luz
        var n =  lines[7]; //constante de rugosidade
        
        iluminacao = new Iluminacao(pl,ja,ia,kd,od,ks,il,n);
    };

    reader.readAsText(file);
}

function parametrosObjeto() {
    var file = jQuery('#objeto').get(0).files[0]; //pega o arquivo de objeto
    var reader = new FileReader();
    
    reader.onload = function(){ //le as linhas
        var lines = this.result.split('\n');
        var ponto = [];
        var triangulo = [];
        var qtdPontos = parseInt(lines[0].split(' ')[0]);
        var qtdTriangulos = parseInt(lines[0].split(' ')[1]);
        var finalArquivo = 1 + qtdPontos + qtdTriangulos;
        
        for(var line = 1; line < qtdPontos; line++){
            var linhaPonto = lines[line].split(" ");
            var ponto = new Ponto(linhaPonto[0], linhaPonto[1], linhaPonto[2]);
            pontos3DMundo.push(ponto);
        }
        
        for(var line = qtdPontos+1; line < finalArquivo; line++){
            var linhaTriangulo = lines[line].split(" ");
            var ponto1 = pontos3DMundo[linhaTriangulo[0]-1];
            var ponto2 = pontos3DMundo[linhaTriangulo[1]-1];
            var ponto3 = pontos3DMundo[linhaTriangulo[2]-1];
            var triangulo = new Triangulo(ponto1, ponto2, ponto3);
            triangulos3D.push(triangulo);
        }
    };
 
    reader.readAsText(file);
}