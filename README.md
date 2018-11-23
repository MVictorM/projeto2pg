# projeto2pg
Implementar o método de visualização de objetos triangulados, através do algoritmo de conversão por varredura, com métodos de interpolação de Phong, com a visibilidade garantida pelo algoritmo do “z-buffer”.
## Descrição
O usuário, através de arquivos-texto ou interface gráfica, entra com dados do objeto (triangulado, com lista dos vértices e da conectividade, que determina os triângulos,
de um arquivo-texto), atributos do objeto (k a , k d e k s , pontos flutuantes entre 0 e 1, η, ponto flutuante positivo e O d , tripla de pontos flutuantes entre 0 e 1,), atributos da cena (I a , I L ,
triplas de ponto flutuante entre 0 e 255, P L , tripla de ponto flutuante) e os atributos da câmera virtual (C, N e V, triplas de pontos flutuantes, d, h x , e h y , pontos flutuantes
positivos). Se desejado, o usuário pode entrar com uma imagem (JPEG) a ser aplicada à parede. O usuário deve entrar com um fator de escala para ajustar o tamanho da textura na
parede (que será um quadrado). O seu sistema inicialmente pinta a tela inteira de uma cor de base, (R,G,B), dada pelo usuário. O sistema então deve preparar a câmera,
ortogonalizando V e gerando U, e depois os normalizando, fazer a mudança de coordenadas para o sistema de vista de todos os vértices do objeto e da posição da fonte de luz P L , gerar
as normais dos triângulos e gerar as normais dos vértices (como recomendado em sala de aula). Deve gerar também a BB, “bounding box”. A parede corresponderá a uma das faces
da BB, orientada verticalmente, afastada de um certo fator do centroide do objeto, mantendo o paralelismo; o fator também é dado pelo usuário. Para cada triângulo,
calculam-se as projeções dos seus vértices e inicia-se assim a sua conversão por varredura. Para cada pixel (x, y scan ), calculam-se suas coordenadas baricêntricas com relação aos
vértices projetados, e multiplicam-se essas coordenadas pelos correspondentes vértices do triângulo 3D original para se obter uma aproximação para o ponto 3D original
correspondente ao pixel atual. Após uma consulta ao z-buffer, se for o caso, calcula-se uma aproximação para a normal do ponto utilizando-se mesmas coordenadas baricêntricas
multiplicadas pelas normais dos respectivos vértices originais. Calculam-se também os demais vetores (L, V e R) e os substitui na equação do modelo de iluminação de Phong
produzindo a cor do pixel atual. O quadrado da parede que receberá a textura é para ser feito com dois triângulos, e assim podem fazer parte da lista de triângulos do objeto. Só que
o seu O d é para ser substituído pela cor do pixel correspondente da imagem JPEG, que pode ser acessado com coordenadas baricêntricas (a própria imagem também é vista como
composta de dois triângulos, para que o pixel do triângulo da parede possua as mesmas coordenadas baricêntricas do pixel correspondente na imagem). A equação de iluminação é
igual a menos dessa troca de O d .

## Observação
Faltaram algumas especificações.  Feito apenas a parte geral de desenhar na tela os objetos

## Demonstração
Acesse o [link](https://mvictorm.github.io/projeto2pg/) e envie as [entradas](https://github.com/MVictorM/projeto2pg/tree/master/entradas) referentes ao objeto
