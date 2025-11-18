/* -------------------- Données des questions -------------------- */
// =============================
// DONNÉES DES QUESTIONS 2 → 10
// =============================
const questionsData = [
  { fr:"1. Quel âge avez-vous ?", jp:"1. 年齢は？",
  { fr:"2. Quel est votre genre ?", jp:"2. 性別を教えてください。",
    options:[
      { fr:"Moins de 18 ans", jp:"18歳未満" },
      { fr:"Entre 18 et 30 ans", jp:"18歳から30歳" },
      { fr:"Plus de 30 ans", jp:"30歳以上" }
      { fr:"Homme", jp:"男性" },
      { fr:"Femme", jp:"女性" },
      { fr:"Autre", jp:"その他" }
    ]
  },
  { fr:"2.  ?", jp:"2. 性別を教えてください。",
  { fr:"3. Vous jouez aux jeux de société avec qui ?", jp:"3. ボードゲームをするときは誰としますか？",
    options:[
      { fr:"", jp:"男性" },
      { fr:"", jp:"女性" },
      { fr:"", jp:"その他" }
      { fr:"Avec des connaissances", jp:"知り合いと" },
      { fr:"Seul(e)", jp:"一人で" },
      { fr:"Avec n’importe qui", jp:"誰とでも" }
    ]
  },
  { fr:"3.  ?", jp:"3. ボードゲームをするときは誰としますか？",
  { fr:"4. Vous jouez souvent aux jeux de société ?", jp:"4. ボードゲームは頻繁に遊びますか？",
    options:[
      { fr:"", jp:"知り合いと" },
      { fr:"", jp:"一人で" },
      { fr:"", jp:"誰とでも" }
      { fr:"1 fois par semaine ou plus", jp:"毎週１回以上" },
      { fr:"3 fois par mois ou moins", jp:"毎月３回以下" },
      { fr:"5 fois par an ou moins", jp:"毎年５回以下" }
    ]
  },
  { fr:"4.  ?", jp:"4. ボードゲームは頻繁に遊びますか？",
  { fr:"5. Quel type de jeux préférez-vous ?", jp:"5. どのようなボードゲームの方が好きですか？",
    options:[
      { fr:"", jp:"毎週１回以上" },
      { fr:"", jp:"毎月３回以下" },
      { fr:"", jp:"毎年５回以下" }
      { fr:"Jeux compétitifs", jp:"競技型ゲーム" },
      { fr:"Jeux coopératifs", jp:"協力型ゲーム" },
      { fr:"Peu importe", jp:"どちらでもいい" }
    ]
  },
  { fr:"5.  ?", jp:"5. どのようなボードゲームの方が好きですか？",
  { fr:"6. Avez-vous déjà appris quelque chose grâce à un jeu de société ?", jp:"6. ボードゲームからなにかを学んだことはありますか？",
    options:[
      { fr:"", jp:"競技型ゲーム" },
      { fr:"", jp:"協力型ゲーム" },
      { fr:"", jp:"どちらでもいい" }
      { fr:"Oui", jp:"ある" },
      { fr:"Non", jp:"ない" },
      { fr:"Je ne sais pas", jp:"わからない" }
    ]
  },
  { fr:"6.  ?", jp:"6. ボードゲームからなにかを学んだことはありますか？",
  { fr:"7. Vous préférez jouer à quel type ?", jp:"7. 遊ぶとしたらどっちですか？",
    options:[
      { fr:"", jp:"ある" },
      { fr:"", jp:"ない" },
      { fr:"", jp:"わからない" }
      { fr:"Jeux en ligne", jp:"オンラインボードゲーム" },
      { fr:"Jeux analogiques", jp:"アナログボードゲーム" },
      { fr:"Les deux", jp:"どちらでもいい" }
    ]
  },
  { fr:"7.  ?", jp:"7. 遊ぶとしたらどっちですか？",
  { fr:"8. Pensez-vous que les jeux peuvent être utilisés pour l’éducation ?", jp:"8. ボードゲームは教育に使えると思いますか？",
    options:[
      { fr:"", jp:"オンラインボードゲーム" },
      { fr:"", jp:"アナログボードゲーム" },
      { fr:"", jp:"どちらでもいい" }
      { fr:"Oui", jp:"使える" },
      { fr:"Non", jp:"使えない" },
      { fr:"Je ne sais pas", jp:"わからない" }
    ]
  },
  { fr:"8.  ?", jp:"8. ボードゲームは教育に使えると思いますか？",
  { fr:"9. Tous les jeux vont-ils devenir numériques ?", jp:"9. 全てのボードゲームはオンライン化すると思いますか？",
    options:[
      { fr:"", jp:"使える" },
      { fr:"", jp:"使えない" },
      { fr:"", jp:"わからない" }
      { fr:"Oui", jp:"はい、オンライン化する" },
      { fr:"Non", jp:"いいえ、アナログボードゲームが中心" },
      { fr:"Coexisteront", jp:"共存する" }
    ]
  },
  { fr:"9.  ?", jp:"9. 全てのボードゲームはオンライン化すると思いますか？",
  { fr:"10. Vous privilégiez quoi ?", jp:"10. 自由にプレイすること vs ルールを守って協力すること",
    options:[
      { fr:"", jp:"はい、オンライン化する" },
      { fr:"", jp:"いいえ、アナログボードゲームが中心" },
      { fr:"", jp:"共存する" }
    ]
  },
  { fr:"10.  ?", jp:"10. ボードゲームで「自由に自分のやりたいようにプレイすること」と「みんなで協力したりルールを守ること」のどちらを重視しますか？",
    options:[
      { fr:"", jp:"自由にプレイすることを重視する" },
      { fr:"", jp:"みんなで協力することを重視する" },
      { fr:"", jp:"両方バランスよく重視する" }
      { fr:"La liberté de jouer comme je veux", jp:"自由にプレイすることを重視する" },
      { fr:"La coopération et le respect des règles", jp:"みんなで協力することを重視する" },
      { fr:"Équilibre entre les deux", jp:"両方バランスよく重視する" }
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
// =============================
// CREATION AUTOMATIQUE DES Q2 → Q10
// =============================
const container = document.querySelector(".questions-wrapper");

// On ignore la question 1 car elle est déjà dans le HTML
questionsData.forEach((q, index) => {
  const number = index + 2;

  const div = document.createElement("div");
  div.className = "question";
  div.id = "question-" + number;

  const p = document.createElement("p");
  p.setAttribute("data-fr", q.fr);
  p.setAttribute("data-jp", q.jp);
  p.textContent = q.fr;
  div.appendChild(p);

  q.options.forEach((opt, idx) => {
    const label = document.createElement("label");
    label.classList.add("inline-option");

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "question_" + number;
    input.value = idx;

    const span = document.createElement("span");
    span.setAttribute("data-fr", opt.fr);
    span.setAttribute("data-jp", opt.jp);
    span.textContent = opt.fr;

    label.appendChild(input);
    label.appendChild(span);
    div.appendChild(label);
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
  container.appendChild(div);
});

  document.querySelectorAll('.question p').forEach(p => {
    p.textContent = p.getAttribute(`data-${lang}`);
  });
// =============================
// CHANGEMENT DE LANGUE
// =============================
const langSelect = document.getElementById("lang");

  document.querySelectorAll('.option-text').forEach(span => {
    span.textContent = span.getAttribute(`data-${lang}`);
langSelect.addEventListener("change", () => {
  const lang = langSelect.value;
  document.querySelectorAll("[data-fr]").forEach(el => {
    el.textContent = el.getAttribute("data-" + lang);
  });
});

  const textarea = document.getElementById('others');
  if (textarea) {
    textarea.placeholder = textarea.getAttribute(`data-${lang}`);
  }

  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = btn.getAttribute(`data-${lang}`);
// =============================
// SLIDER AGE ↔ INPUT NUMBER
// =============================
const ageSlider  = document.getElementById("ageSlider");
const ageValue   = document.getElementById("ageValue");
const ageInput   = document.getElementById("ageInput");

  const title = document.getElementById('form-title');
  title.textContent = title.getAttribute(`data-${lang}`);
}
ageSlider.addEventListener("input", () => {
  ageValue.textContent = ageSlider.value;
  ageInput.value = ageSlider.value;
});

/* -------------------- Initialisation -------------------- */
generateQuestions();
updateLanguage();
langSelect.addEventListener('change', updateLanguage);
ageInput.addEventListener("input", () => {
  ageSlider.value = ageInput.value;
  ageValue.textContent = ageInput.value;
});

/* -------------------- Soumission -------------------- */
form.addEventListener('submit', function(e) {
// =============================
// ENVOI DES RÉPONSES
// (Firebase si activé)
// =============================
document.getElementById("quizForm").addEventListener("submit", async (e) => {
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
  const answers = {};

  // AGE
  answers.ageSlider = parseInt(ageSlider.value);
  answers.ageExact  = parseInt(ageInput.value);

  // Q2-A10
  questionsData.forEach((q, i) => {
    const number = i + 2;
    const val = document.querySelector(`input[name="question_${number}"]:checked`);
    answers["question_" + number] = val ? parseInt(val.value) : null;
  });

  console.log("Réponses collectées :", answers);

  // Si Firebase est activé :
  /*
  const db = firebase.firestore();
  await db.collection("responses").add(answers);
  */

  alert("Réponses envoyées !");
});
