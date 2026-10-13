
const campoSenha = document.getElementById("senha");
const sliderTamanho = document.getElementById("tamanho");
const valorTamanho = document.getElementById("valor-tamanho");
const botaoGerar = document.getElementById("gerar");
const botaoCopiar = document.getElementById("copiar");
const mensagem = document.getElementById("mensagem");


const abas = document.querySelectorAll(".aba");
const areaBase = document.getElementById("area-base");
const areaOpcoes = document.getElementById("opcoes");
const campoBase = document.getElementById("senha-base");
const rotuloTamanho = document.getElementById("rotulo-tamanho");
let modo = "zero"; // "zero" ou "base"

const chkMaiusculas = document.getElementById("maiusculas");
const chkMinusculas = document.getElementById("minusculas");
const chkNumeros = document.getElementById("numeros");
const chkSimbolos = document.getElementById("simbolos");


const MAIUSCULAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const MINUSCULAS = "abcdefghijklmnopqrstuvwxyz";
const NUMEROS = "0123456789";
const SIMBOLOS = "!@#$%^&*()-_=+[]{};:,.<>?";

function numeroAleatorioSeguro(max) {
  const limite = Math.floor(4294967296 / max) * max; // evita viés
  const buffer = new Uint32Array(1);
  do {
    crypto.getRandomValues(buffer);
  } while (buffer[0] >= limite);
  return buffer[0] % max;
}

function caractereAleatorio(conjunto) {
  return conjunto[numeroAleatorioSeguro(conjunto.length)];
}

// ===== 4. GERAR A SENHA =====
function gerarSenha() {
  const tamanho = Number(sliderTamanho.value);

  // Monta a lista de conjuntos que o usuário marcou
  const conjuntos = [];
  if (chkMaiusculas.checked) conjuntos.push(MAIUSCULAS);
  if (chkMinusculas.checked) conjuntos.push(MINUSCULAS);
  if (chkNumeros.checked) conjuntos.push(NUMEROS);
  if (chkSimbolos.checked) conjuntos.push(SIMBOLOS);

  if (conjuntos.length === 0) {
    mostrarMensagem("Marque pelo menos uma opção!", true);
    return;
  }

  const todos = conjuntos.join("");
  const senha = [];


  conjuntos.forEach((conjunto) => senha.push(caractereAleatorio(conjunto)));


  while (senha.length < tamanho) {
    senha.push(caractereAleatorio(todos));
  }

 
  for (let i = senha.length - 1; i > 0; i--) {
    const j = numeroAleatorioSeguro(i + 1);
    [senha[i], senha[j]] = [senha[j], senha[i]];
  }

  campoSenha.value = senha.join("");
  mostrarMensagem("");
}


function mostrarMensagem(texto, erro = false) {
  mensagem.textContent = texto;
  mensagem.style.color = erro ? "var(--fraca)" : "var(--forte)";
}

async function copiarSenha() {
  if (!campoSenha.value) {
    mostrarMensagem("Gere uma senha primeiro!", true);
    return;
  }
  try {
    await navigator.clipboard.writeText(campoSenha.value);
    mostrarMensagem("Senha copiada! ✅");
  } catch {
    mostrarMensagem("Não consegui copiar :(", true);
  }
}


const TROCAS = {
  a: ["@", "4"],
  e: ["3"],
  i: ["1", "!"],
  o: ["0"],
  s: ["$", "5"],
  t: ["7"],
  l: ["1"],
  b: ["8"],
  g: ["9"],
};

function fortalecerSenha() {
  const base = campoBase.value.trim();
  if (!base) {
    mostrarMensagem("Digite uma senha base primeiro!", true);
    return;
  }

  const tamanhoMinimo = Number(sliderTamanho.value);

  
  const senha = [...base].map((letra) => {
    const trocas = TROCAS[letra.toLowerCase()];
    if (trocas && numeroAleatorioSeguro(3) === 0) {
      return caractereAleatorio(trocas); // a -> @ ou 4, e -> 3...
    }
    return letra;
  });

  
  if (!senha.some((c) => MAIUSCULAS.includes(c))) {
    const i = senha.findIndex((c) => MINUSCULAS.includes(c));
    if (i !== -1) senha[i] = senha[i].toUpperCase();
  }

  
  const todos = MAIUSCULAS + MINUSCULAS + NUMEROS + SIMBOLOS;
  [MAIUSCULAS, MINUSCULAS, NUMEROS, SIMBOLOS].forEach((conjunto) => {
    const jaTem = senha.some((c) => conjunto.includes(c));
    if (!jaTem) senha.push(caractereAleatorio(conjunto));
  });
  while (senha.length < tamanhoMinimo) {
    senha.push(caractereAleatorio(todos));
  }

  campoSenha.value = senha.join("");
  mostrarMensagem("");
}

function trocarModo(novoModo) {
  modo = novoModo;
  const ehBase = modo === "base";

  areaBase.hidden = !ehBase;
  areaOpcoes.hidden = ehBase;
  rotuloTamanho.textContent = ehBase ? "Tamanho mínimo" : "Tamanho";
  botaoGerar.textContent = ehBase ? "Fortalecer minha senha" : "Gerar senha";

  abas.forEach((aba) => {
    aba.classList.toggle("ativa", aba.dataset.modo === modo);
  });

  campoSenha.value = "";
  mostrarMensagem("");
  if (!ehBase) gerarSenha();
}


sliderTamanho.addEventListener("input", () => {
  valorTamanho.textContent = sliderTamanho.value;
});
botaoGerar.addEventListener("click", () => {
  if (modo === "base") fortalecerSenha();
  else gerarSenha();
});
abas.forEach((aba) => {
  aba.addEventListener("click", () => trocarModo(aba.dataset.modo));
});
botaoCopiar.addEventListener("click", copiarSenha);


const campoTeste = document.getElementById("senha-teste");
const barraForca = document.getElementById("barra-forca");
const textoForca = document.getElementById("texto-forca");
const listaDicas = document.getElementById("dicas");

function avaliarSenha(senha) {
  let pontos = 0;
  const dicas = [];

  if (senha.length >= 8) pontos++;
  else dicas.push("Use pelo menos 8 caracteres.");

  if (senha.length >= 12) pontos++;
  else dicas.push("Senhas com 12+ caracteres são bem mais seguras.");

  if (/[A-Z]/.test(senha) && /[a-z]/.test(senha)) pontos++;
  else dicas.push("Misture letras maiúsculas e minúsculas.");

  if (/[0-9]/.test(senha)) pontos++;
  else dicas.push("Adicione números.");

  if (/[^A-Za-z0-9]/.test(senha)) pontos++;
  else dicas.push("Adicione símbolos como ! @ # $.");

  if (/(.)\1\1/.test(senha)) {
    pontos--;
    dicas.push("Evite repetir o mesmo caractere várias vezes seguidas.");
  }

  return { pontos: Math.max(0, pontos), dicas };
}

function atualizarMedidor() {
  const senha = campoTeste.value;

  if (!senha) {
    barraForca.style.width = "0";
    textoForca.textContent = "Digite algo acima";
    listaDicas.innerHTML = "";
    return;
  }

  const { pontos, dicas } = avaliarSenha(senha);

  let nome, cor;
  if (pontos <= 2) {
    nome = "Fraca";
    cor = "var(--fraca)";
  } else if (pontos <= 4) {
    nome = "Média";
    cor = "var(--media)";
  } else {
    nome = "Forte";
    cor = "var(--forte)";
  }

  barraForca.style.width = (pontos / 5) * 100 + "%";
  barraForca.style.background = cor;
  textoForca.textContent = "Força: " + nome;

  listaDicas.innerHTML = "";
  dicas.forEach((dica) => {
    const li = document.createElement("li");
    li.textContent = dica;
    listaDicas.appendChild(li);
  });
}

campoTeste.addEventListener("input", atualizarMedidor);


gerarSenha();