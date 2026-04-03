const fs = require('fs');
const quizzes = ['animals', 'hp', 'peculiar', 'food', 'mythical'];
const names = { animals: 'Тварини', hp: 'Гаррі Поттер', peculiar: 'Дім дивних дітей', food: 'Страви', mythical: 'Казкові істоти' };

// WIKI mapping — same as in index.html
const WIKI = {"lion":"Lion","fox":"Red_fox","wolf":"Wolf","owl":"Owl","dolphin":"Common_bottlenose_dolphin","eagle":"Bald_eagle","bear":"Brown_bear","cat":"Cat","dog":"Dog","elephant":"African_bush_elephant","cheetah":"Cheetah","penguin":"Emperor_penguin","octopus":"Octopus","butterfly":"Monarch_butterfly","parrot":"Macaw","turtle":"Sea_turtle","horse":"Horse","peacock":"Indian_peafowl","rabbit":"European_rabbit","tiger":"Tiger","monkey":"Mandrill","flamingo":"Flamingo","shark":"Great_white_shark","deer":"White-tailed_deer","crow":"Carrion_crow","otter":"Sea_otter","snow_leopard":"Snow_leopard","panda":"Giant_panda","chameleon":"Chameleon","hedgehog":"Hedgehog","swan":"Swan","koala":"Koala","harry":"Harry_Potter_(character)","hermione":"Hermione_Granger","ron":"Ron_Weasley","luna":"Luna_Lovegood","neville":"Neville_Longbottom","dumbledore":"Albus_Dumbledore","snape":"Severus_Snape","draco":"Draco_Malfoy","ginny":"Ginny_Weasley","fred_george":"Fred_and_George_Weasley","hagrid":"Rubeus_Hagrid","mcgonagall":"Minerva_McGonagall","sirius":"Sirius_Black","lupin":"Remus_Lupin","tonks":"Nymphadora_Tonks","dobby":"Dobby_(Harry_Potter)","cedric":"Cedric_Diggory","bellatrix":"Bellatrix_Lestrange","voldemort":"Lord_Voldemort","moody":"Alastor_Moody","molly_weasley":"Molly_Weasley","arthur_weasley":"Arthur_Weasley","borshch":"Borscht","pizza":"Pizza","sushi":"Sushi","varenyky":"Varenyky","ramen":"Ramen","steak":"Steak","croissant":"Croissant","tacos":"Taco","pad_thai":"Pad_thai","cheesecake":"Cheesecake","hummus":"Hummus","pho":"Pho","paella":"Paella","curry":"Curry","gelato":"Gelato","burger":"Hamburger","dim_sum":"Dim_sum","pancakes":"Pancake","ceviche":"Ceviche","shawarma":"Shawarma","fondue":"Fondue","matcha":"Matcha","dragon":"Dragon","phoenix":"Phoenix_(mythology)","unicorn":"Unicorn","griffin":"Griffin","mermaid":"Mermaid","werewolf":"Werewolf","fairy":"Fairy","kraken":"Kraken","centaur":"Centaur","hydra":"Lernaean_Hydra","sphinx":"Sphinx","pegasus":"Pegasus","elf":"Elf_(mythology)","basilisk":"Basilisk","yeti":"Yeti","chimera":"Chimera_(mythology)","minotaur":"Minotaur","selkie":"Selkie","djinn":"Jinn","valkyrie":"Valkyrie","kitsune":"Kitsune","golem":"Golem"};
const PECULIAR_PHOTOS = {"jacob":"teenager boy adventure portrait","emma":"girl fire portrait fantasy","olive":"girl floating balloons portrait","enoch":"boy dark mysterious portrait","miss_peregrine":"woman elegant birds portrait","bronwyn":"strong girl portrait","millard":"invisible person silhouette art","horace":"elegant boy vintage hat portrait"};
const DIRECT_PHOTOS = {
  "tonks":"https://static.wikia.nocookie.net/characters/images/0/0c/Nymphadora.jpg/revision/latest?cb=20250724110734",
  "dobby":"https://static.wikia.nocookie.net/harrypotter/images/8/82/Dobby.jpg/revision/latest?cb=20230712061949",
  "moody":"https://upload.wikimedia.org/wikipedia/uk/d/d0/%D0%90%D0%BB%D0%B0%D1%81%D1%82%D0%BE%D1%80_%D0%9C%D1%83%D0%B4%D1%96.jpg",
  "cedric":"https://static.wikia.nocookie.net/harrypotter/images/9/90/Cedric_Diggory_Profile.png/revision/latest/scale-to-width-down/1000?cb=20161123045136",
  "arthur_weasley":"https://static.wikia.nocookie.net/harrypotter/images/0/02/Arthur_Weasley_profile.jpg/revision/latest/scale-to-width-down/1000?cb=20150828155118",
  "molly_weasley":"https://static.wikia.nocookie.net/harrypotter/images/3/3c/Molly_Weasley_Deathly_Hallows.jpg/revision/latest/scale-to-width-down/1000?cb=20150828155116",
  "emma":"https://image.tmdb.org/t/p/original/4ti7dwgxDgRftoUqLEizfWGvqGY.jpg",
  "enoch":"https://image.tmdb.org/t/p/original/gHzMQAJPtrY7uvVbOllzIteA8sv.jpg",
  "horace":"https://image.tmdb.org/t/p/original/9Wl3sq4CeKNBQSZ8oUn8ghA2hod.jpg",
  "peculiar_twins":"https://image.tmdb.org/t/p/original/awtv1HPEZ2e4eB9xUn2RBSyuzwd.jpg",
  "millard":"https://image.tmdb.org/t/p/original/vSRCjZA81jYJeZip1Ayfj3AtMKA.jpg",
  "fiona":"https://image.tmdb.org/t/p/original/4odAtoIOmI3psqqekYXdg6P1e3I.jpg",
  "bronwyn":"https://image.tmdb.org/t/p/original/7dX4nSvatpSpiRbR1Jzosk5Pk2F.jpg",
  "claire":"https://image.tmdb.org/t/p/original/gajDqExAwVfOn4UbyNpk9nMJ3CX.jpg",
  "jacob":"https://image.tmdb.org/t/p/original/urvL2wvNVSfeX3dxggS6TCxzJiR.jpg",
  "miss_peregrine":"https://image.tmdb.org/t/p/original/rGzpPCTc9pQfVBsGUejM3LHxpiB.jpg",
  "olive":"https://image.tmdb.org/t/p/original/jdPyOhfpRVDjxw1lgzwXaHK02ua.jpg",
  "hugh":"https://static.wikia.nocookie.net/enfants-particuliers/images/c/cf/Hugh_Apiston.jpg/revision/latest?cb=20230901141842&path-prefix=fr",
  "abe":"https://media.themoviedb.org/t/p/w400/ept9urkuhPbGndVXkERw39R9oid.jpg",
  "victor":"https://static.wikia.nocookie.net/timburton/images/d/d3/Victor_Bruntley.jpg/revision/latest?cb=20230120171137"
};

const withPhotos = process.argv.includes('--photos');

async function fetchPhoto(id, quizId) {
  try {
    if (DIRECT_PHOTOS[id]) return DIRECT_PHOTOS[id];
    if (quizId === 'peculiar') {
      const q = PECULIAR_PHOTOS[id] || id;
      const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(q)}&prop=pageimages&piprop=thumbnail&pithumbsize=400&format=json&origin=*&gsrlimit=1`);
      const data = await res.json();
      const pages = Object.values(data?.query?.pages || {});
      return pages[0]?.thumbnail?.source || null;
    }
    const wiki = WIKI[id];
    if (!wiki) return null;
    const wikiName = wiki.replace(/_/g, ' ').replace(/\(.*\)/, '').trim().toLowerCase();
    const wikiLangs = ['en', 'uk', 'de', 'es', 'fr', 'ru', 'ja'];
    for (const wl of wikiLangs) {
      try {
        const res = await fetch(`https://${wl}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wiki)}`);
        if (!res.ok) continue;
        const data = await res.json();
        const title = (data?.title || '').toLowerCase();
        if (!title.includes(wikiName.split(' ')[0])) continue;
        const src = data?.thumbnail?.source;
        if (src) return src.replace(/\/\d+px-/, '/400px-');
      } catch {}
    }
    return null;
  } catch { return null; }
}

const photoCache = {};

async function main() {
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
    for (let i = 0; i < data.animals.length; i++) {
      const a = data.animals[i];
      let photoLine = '';
      if (withPhotos) {
        const url = await fetchPhoto(a.id, id);
        photoCache[`${id}:${a.id}`] = url;
        photoLine = url ? `\n   Фото: ${url}` : '\n   Фото: (не знайдено)';
        process.stdout.write('.');
      }
      heroes += `[${id}:h${i + 1}] ${a.emoji} ${a.i18n.ua.name} — ${a.i18n.ua.traits.join(', ')}${photoLine}\n`;
      heroes += `   ${a.i18n.ua.description}\n`;
    }
  }

  fs.writeFileSync('questions.txt', questions.trimStart(), 'utf8');
  fs.writeFileSync('heroes.txt', heroes.trimStart(), 'utf8');

  // Generate HTML preview
  if (withPhotos) {
    let html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Heroes Preview</title>
<style>
body{font-family:sans-serif;background:#0a0818;color:#ede8ff;max-width:900px;margin:0 auto;padding:20px;}
h2{color:#f0c060;border-bottom:1px solid #333;padding-bottom:8px;margin-top:40px;}
.hero{display:flex;gap:16px;align-items:flex-start;padding:12px 0;border-bottom:1px solid #1e1540;}
.hero img{width:100px;height:100px;object-fit:cover;object-position:top;border-radius:50%;border:2px solid #f0c060;flex-shrink:0;background:#1e1540;}
.hero .no-photo{width:100px;height:100px;border-radius:50%;border:2px solid #333;display:flex;align-items:center;justify-content:center;font-size:40px;flex-shrink:0;background:#1e1540;}
.hero-info{flex:1;}
.hero-id{font-size:11px;color:#8a7fb0;font-family:monospace;}
.hero-name{font-size:18px;font-weight:bold;color:#f0c060;margin:2px 0;}
.hero-traits{font-size:12px;color:#a78bfa;}
.hero-desc{font-size:13px;color:#8a7fb0;margin-top:4px;line-height:1.5;}
</style></head><body><h1>🔮 Heroes Preview</h1>\n`;

    for (const id of quizzes) {
      const data = JSON.parse(fs.readFileSync(`data/${id}.json`, 'utf8'));
      const title = names[id];
      html += `<h2>${title} (${data.animals.length})</h2>\n`;
      for (let i = 0; i < data.animals.length; i++) {
        const a = data.animals[i];
        const url = photoCache[`${id}:${a.id}`] || null;
        const imgTag = url
          ? `<img src="${url}" alt="${a.i18n.ua.name}" loading="lazy">`
          : `<div class="no-photo">${a.emoji}</div>`;
        html += `<div class="hero">
  ${imgTag}
  <div class="hero-info">
    <div class="hero-id">[${id}:h${i+1}] ${a.id}</div>
    <div class="hero-name">${a.emoji} ${a.i18n.ua.name}</div>
    <div class="hero-traits">${a.i18n.ua.traits.join(' · ')}</div>
    <div class="hero-desc">${a.i18n.ua.description}</div>
  </div>
</div>\n`;
      }
    }
    html += '</body></html>';
    fs.writeFileSync('heroes.html', html, 'utf8');
    console.log('');
    console.log('Done! questions.txt + heroes.txt + heroes.html');
  } else {
    console.log('Done! questions.txt + heroes.txt');
    console.log('Run with --photos to generate heroes.html with images');
  }
}

main();
