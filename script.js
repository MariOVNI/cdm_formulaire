/* -------------------- Données des questions -------------------- */
const questionsData = [
  { fr:"1. Quel est votre âge ?", jp:"1. 年齢は？",
    options:[
      { fr:"Moins de 18 ans", jp:"18歳未満" },
      { fr:"Entre 18 et 30 ans", jp:"18歳から30歳" },
      { fr:"Plus de 30 ans", jp:"30歳以上" }
    ]
  },
  { fr:"2. Quelle est votre couleur préférée ?", jp:"2. 好きな色は？",
    options:[
      { fr:"Rouge", jp:"赤" },
      { fr:"Bleu", jp:"青" },
      { fr:"Vert", jp:"緑" }
    ]
  },
  { fr:"3. Quel animal préférez-vous ?", jp:"3. 好きな動物は？",
    options:[
      { fr:"Chat", jp:"猫" },
      { fr:"Chien", jp:"犬" },
      { fr:"Oiseau", jp:"鳥" }
    ]
  },
  { fr:"4. Quel est votre sport favori ?", jp:"4. 好きなスポーツは？",
    options:[
      { fr:"Football", jp:"サッカー" },
      { fr:"Basketball", jp:"バスケットボール" },
      { fr:"Tennis", jp:"テニス" }
    ]
  },
  { fr:"5. Quel genre de musique écoutez-vous ?", jp:"5. 好きな音楽は？",
    options:[
      { fr:"Classique", jp:"クラシック" },
      { fr:"Pop", jp:"ポップ" },
      { fr:"Rock", jp:"ロック" }
    ]
  },
  { fr:"6. Préférez-vous la mer ou la montagne ?", jp:"6. 海と山どちらが好きですか？",
    options:[
      { fr:"Mer", jp:"海" },
      { fr:"Montagne", jp:"山" },
      { fr:"Les deux", jp:"両方" }
    ]
  },
  { fr:"7. Quel type de film aimez-vous ?", jp:"7. 好きな映画のジャンルは？",
    options:[
      { fr:"Action", jp:"アクション" },
      { fr:"Comédie", jp:"コメディ" },
      { fr:"Drame", jp:"ドラマ" }
    ]
  },
  { fr:"8. Quelle saison préférez-vous ?", jp:"8. 好きな季節は？",
    options:[
      { fr:"Printemps", jp:"春" },
      { fr:"Été", jp:"夏" },
      { fr:"Hiver", jp:"冬" }
    ]
  },
  { fr:"9. Aimez-vous cuisiner ?", jp:"9. 料理は好きですか？",
    options:[
      { fr:"Oui", jp:"はい" },
      { fr:"Non", jp:"いいえ" },
      { fr:"Parfois", jp:"時々" }
    ]
  },
  { fr:"10. Utilisez-vous souvent Internet ?", jp:"10. インターネットをよく使いますか？",
    options:[
      { fr:"Oui, tous les jours", jp:"はい、毎日" },
      { fr:"Rarement", jp:"たまに" },
      { fr:"Jamais", jp:"全く使わない" }
    ]
  }
];

/* -------------------- DOM -------------------- */
const langSelect = document.getElementById('lang');
const questionsContainer = document.querySelector('.questions-wrapper');
const form = document.getElementById('quizForm');
const resultDiv = document.getElementById('result');

/* -------------------- Génération du formulaire -------------------- */
function generateQuestions() {
  questionsContainer.innerHTML = '';

  questionsData.forEach((q, idx) => {
    const div = document.createElement('div');
    div.className = 'question';

    // Question
    const p = document.createElement('p');
    p.setAttribute('data-fr', q.fr);
    p.setAttribute('data-jp', q.jp);
    p.textContent = q.fr;
    div.appendChild(p);

    // Options
    q.options.forEach(opt => {
      const label = document.createElement('label');
      label.className = 'inline-option';

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `q${idx+1}`;
      input.value = opt.fr;

      const span = document.createElement('span');
      span.className = 'option-text';
      span.setAttribute('data-fr', opt.fr);
      span.setAttribute('data-jp', opt.jp);
      span.textContent = opt.fr;

      label.appendChild(input);
      label.appendChild(span);
      div.appendChild(label);
    });

    questionsContainer.appendChild(div);
  });

  // Question "Autres"
  const autresDiv = document.createElement('div');
  autresDiv.className = 'question';
  const pAutres = document.createElement('p');
  pAutres.setAttribute('data-fr','Autres :');
  pAutres.setAttribute('data-jp','その他：');
  pAutres.textContent = 'Autres :';

  const textarea = document.createElement('textarea');
  textarea.id = 'others';
  textarea.setAttribute('data-fr','Écrivez ici...');
  textarea.setAttribute('data-jp','ここに書いてください...');
  textarea.placeholder = textarea.getAttribute('data-fr');

  autresDiv.appendChild(pAutres);
  autresDiv.appendChild(textarea);
  questionsContainer.appendChild(autresDiv);
}

/* -------------------- Changement de langue -------------------- */
function updateLanguage() {
  const lang = langSelect.value;

  document.querySelectorAll('.question p').forEach(p => {
    p.textContent = p.getAttribute(`data-${lang}`);
  });

  document.querySelectorAll('.option-text').forEach(span => {
    span.textContent = span.getAttribute(`data-${lang}`);
  });

  const textarea = document.getElementById('others');
  if (textarea) {
    textarea.placeholder = textarea.getAttribute(`data-${lang}`);
  }

  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = btn.getAttribute(`data-${lang}`);

  const title = document.getElementById('form-title');
  title.textContent = title.getAttribute(`data-${lang}`);
}

/* -------------------- Initialisation -------------------- */
generateQuestions();
updateLanguage();
langSelect.addEventListener('change', updateLanguage);

/* -------------------- Soumission -------------------- */
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const answers = {};

  for (let i = 0; i < questionsData.length; i++) {
    const selected = form.querySelector(`input[name="q${i+1}"]:checked`);
    if (!selected) {
      resultDiv.textContent = (langSelect.value === 'fr')
        ? "Veuillez répondre à toutes les questions."
        : "すべての質問に答えてください。";
      resultDiv.style.color = 'red';
      return;
    }
    answers[`q${i+1}`] = selected.value;
  }
  answers.autres = document.getElementById('others').value || "";

  resultDiv.textContent = JSON.stringify(answers, null, 2);
  resultDiv.style.color = 'green';

  form.reset();
});



