🔐 Gerador de Senhas

Site simples para gerar senhas fortes, fortalecer uma senha sugerida e testar a força de qualquer senha. Feito com HTML, CSS e JavaScript puro, sem bibliotecas, e tudo roda direto no navegador.

🔗 Demo: https://aliciavazherculano.github.io/gerador-de-senhas/

✨ Funcionalidades
Gerar do zero: escolha o tamanho (8 a 32) e os tipos de caractere (maiúsculas, minúsculas, números e símbolos)
Fortalecer minha senha: digite uma senha base e o site a deixa mais difícil, mantendo ela reconhecível
Medidor de força: barra colorida (fraca, média, forte) com dicas para melhorar
Botão de copiar para a área de transferência
Layout responsivo com tema lilás escuro

🛠️ Tecnologias
HTML5
CSS3 (variáveis CSS, flexbox, transições)
JavaScript (ES6+)

🔒 Segurança
Aleatoriedade segura: as senhas usam crypto.getRandomValues() em vez de Math.random(). O Math.random() é previsível e não deve ser usado para senhas; o crypto usa o gerador criptográfico do próprio sistema.
Sem viés: o sorteio descarta valores que favoreceriam alguns caracteres, para que todos tenham a mesma chance de sair.
Tudo local: nenhuma senha é enviada para a internet nem guardada em lugar nenhum. Tudo acontece no seu navegador.

⚖️ Fortalecer vs. gerar do zero

Uma senha fortalecida a partir de uma base é mais fraca que uma totalmente aleatória, porque quem conhece a base tem um ponto de partida, e trocas como a → @ já são conhecidas por quem ataca senhas. O que realmente protege é o comprimento e a parte aleatória que o site acrescenta. Por isso, para contas importantes, prefira o modo "Do zero" com tamanho de 16 caracteres ou mais.

🚀 Como rodar
Baixe ou clone o repositório:
bash
   git clone https://github.com/aliciavazherculano/gerador-de-senhas.git
Abra o arquivo index.html no navegador. Não precisa instalar nada.
📁 Estrutura

gerador-de-senhas/
├── index.html   # estrutura da página
├── style.css    # visual
└── script.js    # lógica do gerador e do medidor

👩‍💻 Autora Alícia, estudante de Engenharia de Software, com interesse em back-end e segurança da informação.

GitHub: @aliciavazherculano
