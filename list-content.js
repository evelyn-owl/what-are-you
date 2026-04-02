const fs = require('fs');
const quizzes = ['animals', 'hp', 'peculiar', 'food', 'mythical'];
const names = { animals: 'Тварини', hp: 'Гаррі Поттер', peculiar: 'Дім дивних дітей', food: 'Страви', mythical: 'Казкові істоти' };

let questions = '';
let heroes = '';

for (const id of quizzes) {
  const data = JSON.parse(fs.readFileSync(`data/${id}.json`, 'utf8'));
  const title = names[id];

  questions += `\n=== ${title} (${data.questions.length} питань) ===\n`;
  data.questions.forEach((q, i) => {
    questions += `[${id}:q${i + 1}] ${q.i18n.ua.text}\n`;
    q.options.forEach((o, j) => {
      questions += `   ${String.fromCharCode(97 + j)}) ${o.i18n.ua.label}\n`;
    });
  });

  heroes += `\n=== ${title} (${data.animals.length} результатів) ===\n`;
  data.animals.forEach((a, i) => {
    heroes += `[${id}:h${i + 1}] ${a.emoji} ${a.i18n.ua.name} — ${a.i18n.ua.traits.join(', ')}\n`;
    heroes += `   ${a.i18n.ua.description}\n`;
  });
}

fs.writeFileSync('questions.txt', questions.trimStart(), 'utf8');
fs.writeFileSync('heroes.txt', heroes.trimStart(), 'utf8');
console.log('Done! questions.txt + heroes.txt');
