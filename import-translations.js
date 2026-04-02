// Imports translations from translate-es.txt and translate-de.txt back into JSON files
// Run: node import-translations.js
//
// Expected format: each file must have the same number of lines as translate-source.txt
// Each line is: key|key|key|key|TRANSLATED TEXT
// OR just the translated text (one per line, same order as source)

const fs = require('fs');

const sourceLines = fs.readFileSync('translate-source.txt', 'utf8').trim().split('\n');

function loadTranslation(filename) {
  const raw = fs.readFileSync(filename, 'utf8').trim().split('\n');
  if (raw.length !== sourceLines.length) {
    console.error(`ERROR: ${filename} has ${raw.length} lines, expected ${sourceLines.length}`);
    process.exit(1);
  }
  // If lines have | separators matching source format, extract last part
  // Otherwise treat entire line as translation
  return raw.map((line, i) => {
    const sourceParts = sourceLines[i].split('|');
    const lineParts = line.split('|');
    // If the line has the same key structure, take the last part
    if (lineParts.length === sourceParts.length) {
      return lineParts[lineParts.length - 1].trim();
    }
    // Otherwise treat the whole line as the translation
    return line.trim();
  });
}

const langs = {};
if (fs.existsSync('translate-es.txt')) {
  langs.es = loadTranslation('translate-es.txt');
  console.log('Loaded Spanish translations');
}
if (fs.existsSync('translate-de.txt')) {
  langs.de = loadTranslation('translate-de.txt');
  console.log('Loaded German translations');
}

if (Object.keys(langs).length === 0) {
  console.error('No translation files found! Create translate-es.txt and/or translate-de.txt');
  process.exit(1);
}

// Load all quiz data
const quizzes = ['animals', 'hp', 'peculiar', 'food', 'mythical'];
const quizData = {};
for (const qid of quizzes) {
  quizData[qid] = JSON.parse(fs.readFileSync(`data/${qid}.json`, 'utf8'));
}

// Apply translations
sourceLines.forEach((srcLine, idx) => {
  const parts = srcLine.split('|');
  const qid = parts[0];
  const type = parts[1];
  const data = quizData[qid];

  for (const [lang, translations] of Object.entries(langs)) {
    const translated = translations[idx];
    if (!translated) continue;

    if (type === 'meta') {
      const key = parts[2];
      if (!data.meta.i18n[lang]) data.meta.i18n[lang] = {};
      data.meta.i18n[lang][key] = translated;
    }
    else if (type === 'result') {
      const id = parts[2];
      const field = parts[3];
      const animal = data.animals.find(a => a.id === id);
      if (!animal) continue;
      if (!animal.i18n[lang]) animal.i18n[lang] = { name: '', description: '', traits: [] };
      if (field === 'name') animal.i18n[lang].name = translated;
      else if (field === 'desc') animal.i18n[lang].description = translated;
      else if (field.startsWith('trait')) {
        const ti = parseInt(field.replace('trait', ''));
        animal.i18n[lang].traits[ti] = translated;
      }
    }
    else if (type === 'question') {
      const id = parts[2];
      const q = data.questions.find(q => q.id === id);
      if (!q) continue;
      if (!q.i18n[lang]) q.i18n[lang] = {};
      q.i18n[lang].text = translated;
    }
    else if (type === 'option') {
      const id = parts[2];
      for (const q of data.questions) {
        const opt = q.options.find(o => o.id === id);
        if (opt) {
          if (!opt.i18n[lang]) opt.i18n[lang] = {};
          opt.i18n[lang].label = translated;
          break;
        }
      }
    }
  }
});

// Save
for (const qid of quizzes) {
  fs.writeFileSync(`data/${qid}.json`, JSON.stringify(quizData[qid], null, 2), 'utf8');
}

console.log('Done! All translations imported.');
console.log('Run "node list-content.js" to regenerate text files.');
