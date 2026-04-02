// Extracts all translatable strings from quiz JSON files
// Run: node extract-for-translate.js
// Output: translate-source.txt (one line per string, with keys)
// After translating, save as translate-es.txt / translate-de.txt and run import-translations.js

const fs = require('fs');
const quizzes = ['animals', 'hp', 'peculiar', 'food', 'mythical'];
const lines = [];

for (const qid of quizzes) {
  const data = JSON.parse(fs.readFileSync(`data/${qid}.json`, 'utf8'));

  // Meta i18n
  if (data.meta?.i18n?.en) {
    for (const [k, v] of Object.entries(data.meta.i18n.en)) {
      lines.push(`${qid}|meta|${k}|${v}`);
    }
  }

  // Results (animals array)
  data.animals.forEach((a, i) => {
    const en = a.i18n.en;
    lines.push(`${qid}|result|${a.id}|name|${en.name}`);
    lines.push(`${qid}|result|${a.id}|desc|${en.description}`);
    en.traits.forEach((t, ti) => {
      lines.push(`${qid}|result|${a.id}|trait${ti}|${t}`);
    });
  });

  // Questions
  data.questions.forEach((q, qi) => {
    lines.push(`${qid}|question|${q.id}|text|${q.i18n.en.text}`);
    q.options.forEach(o => {
      lines.push(`${qid}|option|${o.id}|label|${o.i18n.en.label}`);
    });
  });
}

fs.writeFileSync('translate-source.txt', lines.join('\n'), 'utf8');
console.log(`Done! ${lines.length} lines written to translate-source.txt`);
console.log('');
console.log('Next steps:');
console.log('1. Open translate-source.txt');
console.log('2. Copy ONLY the text after the last | on each line');
console.log('   (or copy the whole file — the import script will handle it)');
console.log('3. Paste into Google Translate (EN → ES), save result as translate-es.txt');
console.log('4. Paste into Google Translate (EN → DE), save result as translate-de.txt');
console.log('5. Run: node import-translations.js');
