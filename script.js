const questions = [
  { topic:"CONCEITO", text:"O que é uma subconsulta SQL?", options:["Uma consulta executada dentro de outra consulta.","Um comando utilizado exclusivamente para excluir tabelas.","Uma forma de criar um banco de dados.","Um comando utilizado apenas para atualizar dados."], answer:0, explanation:"Uma subconsulta é uma consulta SQL inserida dentro de outra consulta, fornecendo dados para a consulta principal." },
  { topic:"IN", text:"Qual é a principal finalidade do operador IN?", options:["Ordenar os registros por data.","Verificar se um valor pertence a um conjunto de valores.","Excluir registros duplicados.","Somar os valores de uma coluna."], answer:1, explanation:"IN verifica se um valor corresponde a algum valor de uma lista ou ao resultado de uma subconsulta." },
  { topic:"NOT IN", text:"Qual consulta retorna os clientes cujos IDs não aparecem na tabela Pedidos?", code:"A) SELECT * FROM Clientes WHERE id_cliente IN (SELECT id_cliente FROM Pedidos);\\nB) SELECT * FROM Clientes WHERE id_cliente = NULL;\\nC) SELECT * FROM Clientes WHERE id_cliente NOT IN (SELECT id_cliente FROM Pedidos);\\nD) SELECT id_cliente FROM Pedidos;", options:["Alternativa A","Alternativa B","Alternativa C","Alternativa D"], answer:2, explanation:"NOT IN seleciona valores que não pertencem ao conjunto retornado pela subconsulta. Atenção: valores NULL no conjunto podem afetar o resultado." },
  { topic:"EXISTS", text:"O que o operador EXISTS verifica?", options:["Se uma tabela possui exatamente dez registros.","Se uma consulta retorna pelo menos uma linha.","Se todos os campos estão preenchidos.","Se existe um índice na tabela."], answer:1, explanation:"EXISTS é verdadeiro quando a subconsulta retorna pelo menos uma linha." },
  { topic:"NOT EXISTS", text:"Qual é uma utilização adequada do operador NOT EXISTS?", options:["Encontrar todos os pedidos realizados.","Somar o valor de todos os pedidos.","Encontrar clientes para os quais não existe nenhum pedido relacionado.","Alterar o nome dos clientes cadastrados."], answer:2, explanation:"NOT EXISTS permite localizar registros para os quais a subconsulta não encontra nenhuma linha correspondente." },
  { topic:"ANÁLISE DE CÓDIGO", text:"O que a consulta abaixo retorna?", code:"SELECT nome\\nFROM Produtos p\\nWHERE EXISTS (\\n  SELECT 1\\n  FROM Itens_Pedido i\\n  WHERE i.id_produto = p.id_produto\\n);", options:["Todos os produtos cadastrados, vendidos ou não.","Apenas os produtos que aparecem em pelo menos um item de pedido.","Apenas os produtos sem estoque.","Todos os pedidos que não possuem produtos."], answer:1, explanation:"A subconsulta procura itens que correspondam ao produto da consulta externa. EXISTS seleciona produtos que possuem correspondência." },
  { topic:"COMPARAÇÃO", text:"Qual alternativa diferencia corretamente IN de EXISTS?", options:["IN verifica pertencimento a um conjunto; EXISTS verifica se a subconsulta retorna linhas.","IN só funciona com números; EXISTS só funciona com textos.","São operadores usados exclusivamente com DELETE.","EXISTS sempre retorna todos os registros da tabela consultada."], answer:0, explanation:"IN verifica se um valor pertence a um conjunto. EXISTS verifica a existência de linhas na subconsulta." },
  { topic:"DESAFIO", text:"Qual consulta identifica os produtos que nunca foram vendidos?", code:"Considere Produtos e Itens_Pedido relacionados por id_produto.", options:["SELECT * FROM Produtos WHERE EXISTS (SELECT 1 FROM Itens_Pedido);","SELECT * FROM Produtos WHERE id_produto IN (SELECT id_produto FROM Itens_Pedido);","SELECT * FROM Produtos p WHERE NOT EXISTS (SELECT 1 FROM Itens_Pedido i WHERE i.id_produto = p.id_produto);","SELECT * FROM Itens_Pedido WHERE quantidade > 0;"], answer:2, explanation:"NOT EXISTS seleciona produtos para os quais não há item de pedido correspondente." },
  { topic:"INNER JOIN", text:"Qual é a principal finalidade do INNER JOIN?", options:["Retornar todos os registros da primeira tabela, mesmo sem correspondência.","Retornar apenas registros que possuem correspondência entre as tabelas relacionadas.","Excluir registros que aparecem nas duas tabelas.","Agrupar registros e calcular somas."], answer:1, explanation:"INNER JOIN retorna as linhas em que a condição de relacionamento encontra correspondência nas duas tabelas." },
  { topic:"INNER JOIN × LEFT JOIN", text:"Qual é a principal diferença entre INNER JOIN e LEFT JOIN?", options:["INNER JOIN mantém todas as linhas da tabela à esquerda; LEFT JOIN retorna apenas correspondências.","Os dois comandos sempre retornam exatamente os mesmos resultados.","INNER JOIN retorna correspondências; LEFT JOIN mantém todas as linhas da tabela à esquerda, mesmo sem correspondência.","LEFT JOIN só funciona sem chaves estrangeiras."], answer:2, explanation:"LEFT JOIN mantém todas as linhas da tabela à esquerda. Quando não há correspondência à direita, as colunas dessa tabela ficam NULL." },
  { topic:"CONSULTA COM JOIN", text:"Qual consulta mostra nome e data dos pedidos, exibindo somente clientes que possuem pedidos?", code:"Tabelas: Clientes(id_cliente, nome) e Pedidos(id_cliente, data_pedido).", options:["SELECT c.nome, p.data_pedido FROM Clientes c INNER JOIN Pedidos p ON c.id_cliente = p.id_cliente;","SELECT c.nome, p.data_pedido FROM Clientes c LEFT JOIN Pedidos p ON c.id_cliente = p.id_cliente;","SELECT nome, data_pedido FROM Clientes;","DELETE FROM Clientes;"], answer:0, explanation:"INNER JOIN mostra somente clientes com pedidos correspondentes." },
  { topic:"LEFT JOIN", text:"Uma empresa quer listar todos os clientes, inclusive aqueles que nunca compraram. Qual recurso deve utilizar?", options:["INNER JOIN","GROUP BY","LEFT JOIN","HAVING"], answer:2, explanation:"LEFT JOIN preserva todos os clientes da tabela à esquerda, mesmo quando não há pedido correspondente." },
  { topic:"NULL E LEFT JOIN", text:"Observe a consulta. Se um cliente nunca fez pedido, o que aparece em id_pedido?", code:"SELECT c.nome, p.id_pedido\\nFROM Clientes c\\nLEFT JOIN Pedidos p\\n  ON c.id_cliente = p.id_cliente;", options:["O valor zero obrigatoriamente.","O identificador do primeiro pedido.","O cliente será omitido.","NULL."], answer:3, explanation:"Como não existe pedido correspondente, as colunas da tabela Pedidos aparecem como NULL." },
  { topic:"DESAFIO JOIN", text:"Qual consulta identifica apenas os clientes que nunca realizaram pedidos?", code:"Tabelas: Clientes e Pedidos, relacionadas por id_cliente.", options:["SELECT c.nome FROM Clientes c INNER JOIN Pedidos p ON c.id_cliente = p.id_cliente;","SELECT c.nome FROM Clientes c LEFT JOIN Pedidos p ON c.id_cliente = p.id_cliente WHERE p.id_pedido IS NULL;","SELECT c.nome FROM Clientes c LEFT JOIN Pedidos p ON c.id_cliente = p.id_cliente;","SELECT nome FROM Clientes WHERE id_cliente IS NULL;"], answer:1, explanation:"LEFT JOIN mantém todos os clientes e WHERE p.id_pedido IS NULL filtra os que não têm pedido correspondente." }
];

const startForm = document.querySelector("#start-form");
const intro = document.querySelector("#intro-screen");
const quiz = document.querySelector("#quiz-screen");
const results = document.querySelector("#results-screen");
const counter = document.querySelector("#question-counter");
const progress = document.querySelector("#progress-fill");
const topic = document.querySelector("#question-topic");
const questionText = document.querySelector("#question-text");
const codeBlock = document.querySelector("#question-code");
const answersEl = document.querySelector("#answers");
const feedback = document.querySelector("#feedback");
const nextBtn = document.querySelector("#next-btn");
let index = 0, score = 0, selected = null, locked = false, history = [], studentName = "", studentClass = "", showingFeedback = false;

startForm.addEventListener("submit", event => {
  event.preventDefault();
  studentName = document.querySelector("#student-name").value.trim();
  studentClass = document.querySelector("#student-class").value.trim();
  if (!studentName) return;
  intro.classList.add("hidden");
  quiz.classList.remove("hidden");
  renderQuestion();
});

function renderQuestion() {
  selected = null; locked = false; showingFeedback = false;
  const q = questions[index];
  counter.textContent = `QUESTÃO ${index + 1} DE ${questions.length}`;
  document.querySelector("#live-score").textContent = score;
  progress.style.width = `${((index + 1) / questions.length) * 100}%`;
  topic.textContent = q.topic;
  questionText.textContent = q.text;
  if (q.code) {
    codeBlock.classList.remove("hidden");
    codeBlock.querySelector("code").textContent = q.code.replace(/\\n/g, "\n");
  } else codeBlock.classList.add("hidden");
  answersEl.innerHTML = "";
  feedback.className = "feedback hidden";
  q.options.forEach((option, i) => {
    const button = document.createElement("button");
    button.className = "answer-option";
    button.type = "button";
    const letter = document.createElement("span");
    letter.className = "answer-letter";
    letter.textContent = String.fromCharCode(65 + i);
    const label = document.createElement("span");
    label.textContent = option;
    button.append(letter, label);
    button.addEventListener("click", () => chooseAnswer(i));
    answersEl.appendChild(button);
  });
  nextBtn.disabled = true;
  nextBtn.innerHTML = index === questions.length - 1 ? 'Ver resultado <span>→</span>' : 'Confirmar resposta <span>→</span>';
}
function chooseAnswer(i) {
  if (locked) return;
  selected = i;
  [...answersEl.children].forEach((el, n) => el.classList.toggle("selected", n === i));
  nextBtn.disabled = false;
}
nextBtn.addEventListener("click", () => {
  if (showingFeedback) {
    showingFeedback = false;
    if (index < questions.length - 1) { index++; renderQuestion(); }
    else showResults();
    return;
  }
  if (selected === null || locked) return;
  locked = true;
  const q = questions[index];
  const correct = selected === q.answer;
  if (correct) score++;
  history[index] = { selected, correct };
  [...answersEl.children].forEach((el, i) => {
    el.disabled = true;
    if (i === q.answer) el.classList.add("correct");
    if (i === selected && !correct) el.classList.add("incorrect");
  });
  feedback.className = `feedback ${correct ? "" : "wrong"}`;
  feedback.textContent = `${correct ? "Resposta correta!" : "Não foi dessa vez."} ${q.explanation}`;
  document.querySelector("#live-score").textContent = score;
  showingFeedback = true;
  nextBtn.textContent = index === questions.length - 1 ? "Conferir resultado →" : "Próxima questão →";
});
function showResults() {
  quiz.classList.add("hidden");
  results.classList.remove("hidden");
  const pct = Math.round(score / questions.length * 100);
  document.querySelector("#result-heading").textContent = pct >= 85 ? "Excelente trabalho!" : pct >= 60 ? "Bom trabalho!" : "Hora de praticar mais!";
  document.querySelector("#result-summary").textContent = `${studentName}${studentClass ? ` • ${studentClass}` : ""}, você concluiu o desafio. Confira seu desempenho e revise as explicações.`;
  document.querySelector("#final-score").textContent = `${score * 10}`;
  document.querySelector("#final-correct").textContent = `${score}/${questions.length}`;
  document.querySelector("#final-percent").textContent = `${pct}%`;
  document.querySelector("#review-list").classList.add("hidden");
  document.querySelector("#review-btn").textContent = "Revisar respostas";
}
document.querySelector("#review-btn").addEventListener("click", () => {
  const list = document.querySelector("#review-list");
  if (!list.classList.contains("hidden")) { list.classList.add("hidden"); return; }
  list.innerHTML = "";
  questions.forEach((q, i) => {
    const item = document.createElement("div");
    item.className = "review-item";
    const title = document.createElement("strong");
    title.textContent = `${i + 1}. ${q.text}`;
    const result = document.createElement("div");
    result.className = history[i]?.correct ? "right" : "wrong";
    result.textContent = `${history[i]?.correct ? "Acertou" : "Errou"} • Resposta correta: ${String.fromCharCode(65 + q.answer)}. ${q.options[q.answer]}`;
    const exp = document.createElement("div");
    exp.textContent = q.explanation;
    item.append(title, result, exp);
    list.appendChild(item);
  });
  list.classList.remove("hidden");
  document.querySelector("#review-btn").textContent = "Ocultar revisão";
});
document.querySelector("#export-pdf-btn").addEventListener("click", () => {
  // Gera um relatório com identificação, pontuação e respostas comentadas usando o recurso "Salvar como PDF" do navegador.
  const reviewList = document.querySelector("#review-list");
  const wasHidden = reviewList.classList.contains("hidden");
  reviewList.classList.remove("hidden");
  window.print();
  if (wasHidden) reviewList.classList.add("hidden");
});

document.querySelector("#restart-btn").addEventListener("click", () => {
  index = 0; score = 0; selected = null; locked = false; showingFeedback = false; history = [];
  results.classList.add("hidden"); intro.classList.remove("hidden");
  document.querySelector("#student-name").value = studentName;
  document.querySelector("#student-class").value = studentClass;
});
