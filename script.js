/* -------------------- Données des questions -------------------- */
const questionsData = [
  { fr:"1. Quel est votre âge ?", jp:"1. 年齢は？",
    options:[
      { fr:"Moins de 18 ans", jp:"18歳未満" },
      { fr:"Entre 18 et 30 ans", jp:"18歳から30歳" },
      { fr:"Plus de 30 ans", jp:"30歳以上" }
    ]
  },
  { fr:"2.  ?", jp:"2. 性別を教えてください。",
    options:[
      { fr:"", jp:"男性" },
      { fr:"", jp:"女性" },
      { fr:"", jp:"その他" }
    ]
  },
  { fr:"3.  ?", jp:"3. ボードゲームをするときは誰としますか？",
    options:[
      { fr:"", jp:"知り合いと" },
      { fr:"", jp:"一人で" },
      { fr:"", jp:"誰でも" }
    ]
  },
  { fr:"4.  ?", jp:"4. ボードゲームは頻繁に遊びますか？",
    options:[
      { fr:"", jp:"毎週１回以上" },
      { fr:"", jp:"毎月３回以下" },
      { fr:"", jp:"毎年５回以下" }
    ]
  },
  { fr:"5.  ?", jp:"5. どのようなボードゲームの方が好きですか？",
    options:[
      { fr:"", jp:"競技型ゲーム" },
      { fr:"", jp:"協力的ゲーム" },
      { fr:"", jp:"どちらでもいい" }
    ]
  },
  { fr:"6.  ?", jp:"6. ボードゲームからなにかを学んだことはありますか？",
    options:[
      { fr:"", jp:"ある" },
      { fr:"", jp:"ない" },
      { fr:"", jp:"わからない" }
    ]
  },
  { fr:"7.  ?", jp:"7. 遊ぶとしたらどっちですか？",
    options:[
      { fr:"", jp:"オンラインボードゲーム" },
      { fr:"", jp:"アナログボードゲーム" },
      { fr:"", jp:"どっちでもいい" }
    ]
  },
  { fr:"8.  ?", jp:"8. ボードゲームは教育に使えると思いますか？",
    options:[
      { fr:"", jp:"使える" },
      { fr:"", jp:"使えない" },
      { fr:"", jp:"わからない" }
    ]
  },
  { fr:"9.  ?", jp:"9. ボードゲームはオンライン化すると思いますか？",
    options:[
      { fr:"", jp:"オンライン化する" },
      { fr:"", jp:"アナログボードゲームが中心" },
      { fr:"", jp:"共存する" }
    ]
  },
  { fr:"10.  ?", jp:"10. ボードゲームで「自由に自分のやりたいようにプレイすること」と「みんなで協力したりルールを守ること」のどちらを重視しますか？",
    options:[
      { fr:"", jp:"自由にプレイすることを重視する" },
      { fr:"", jp:"みんなで協力したりルールを守ることを重視する" },
      { fr:"", jp:"両方バランスよく重視する" }
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




