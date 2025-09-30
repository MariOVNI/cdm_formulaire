const form = document.getElementById("quizForm");
const resultDiv = document.getElementById("result");
const langSelect = document.getElementById("lang");
const questionsContainer = document.querySelector(".questions-wrapper");

// 🔹 Tableau de 10 questions avec choix FR / JP
const questionsData = [
  {
    fr: "1. Quel age avez-vous ?",
    jp: "1. 年齢はなんですか？",
    options: [
      { fr: "Rouge", jp: "赤" },
      { fr: "Bleu", jp: "青" },
      { fr: "Vert", jp: "緑" }
    ]
  },
  {
    fr: "2. Combient de fois jouez-vous au jeux de société en 1ans ?",
    jp: "2. 一年にボードゲームは何回しますか？",
    options: [
      { fr: "Moins de 1fois", jp: "猫" },
      { fr: "Entre 12 à 24 fois", jp: "犬" },
      { fr: "Plus de 1fois", jp: "鳥" }
    ]
  },
  {
    fr: "3. Quel est ton sport favori ?",
    jp: "3. ボードゲームをするとしたら、オンラインと対面どちらを選びますか？",
    options: [
      { fr: "Football", jp: "サッカー" },
      { fr: "Basketball", jp: "バスケットボール" },
      { fr: "Tennis", jp: "テニス" }
    ]
  },
  {
    fr: "4. Quelle saison préfères-tu ?",
    jp: "4. 好きな季節は何ですか？",
    options: [
      { fr: "Printemps", jp: "春" },
      { fr: "Été", jp: "夏" },
      { fr: "Hiver", jp: "冬" }
    ]
  },
  {
    fr: "5. Quel est ton fruit préféré ?",
    jp: "5. 好きな果物は何ですか？",
    options: [
      { fr: "Pomme", jp: "りんご" },
      { fr: "Banane", jp: "バナナ" },
      { fr: "Raisin", jp: "ぶどう" }
    ]
  },
  {
    fr: "6. Quel genre de musique écoutes-tu ?",
    jp: "6. よく聴く音楽のジャンルは？",
    options: [
      { fr: "Pop", jp: "ポップ" },
      { fr: "Rock", jp: "ロック" },
      { fr: "Classique", jp: "クラシック" }
    ]
  },
  {
    fr: "7. Quelle boisson aimes-tu le plus ?",
    jp: "7. 好きな飲み物は何ですか？",
    options: [
      { fr: "Eau", jp: "水" },
      { fr: "Thé", jp: "お茶" },
      { fr: "Café", jp: "コーヒー" }
    ]
  },
  {
    fr: "8. Quel moyen de transport préfères-tu ?",
    jp: "8. 好きな交通手段は？",
    options: [
      { fr: "Voiture", jp: "車" },
      { fr: "Train", jp: "電車" },
      { fr: "Vélo", jp: "自転車" }
    ]
  },
  {
    fr: "9. Quelle matière scolaire aimes-tu ?",
    jp: "9. 好きな教科は？",
    options: [
      { fr: "Mathématiques", jp: "数学" },
      { fr: "Histoire", jp: "歴史" },
      { fr: "Sciences", jp: "科学" }
    ]
  },
  {
    fr: "10. Quelle destination de voyage préfères-tu ?",
    jp: "10. 行きたい旅行先は？",
    options: [
      { fr: "Mer", jp: "海" },
      { fr: "Montagne", jp: "山" },
      { fr: "Ville", jp: "都市" }
    ]
  }
];

// 🔹 Générer le formulaire à partir du tableau
questionsData.forEach((q, index) => {
  const div = document.createElement("div");
  div.classList.add("question");
  let html = `<p data-fr="${q.fr}" data-jp="${q.jp}">${q.fr}</p>`;
  
  q.options.forEach(opt => {
    html += `
      <label class="inline-option">
        <input type="radio" name="q${index+1}" value="${opt.fr}" data-fr="${opt.fr}" data-jp="${opt.jp}"> ${opt.fr}
      </label>
    `;
  });

  div.innerHTML = html;
  questionsContainer.appendChild(div);
});

// 🔹 Ajouter question "Autres"
const autresDiv = document.createElement("div");
autresDiv.classList.add("question");
autresDiv.innerHTML = `
  <p data-fr="11. Autres :" data-jp="11. その他 :">11. Autres :</p>
  <textarea id="others" placeholder="Écrivez ici..." data-fr="Écrivez ici..." data-jp="ここに書いてください..."></textarea>
`;
questionsContainer.appendChild(autresDiv);

// 🔹 Stockage votes
let votes = {};
questionsData.forEach((q, i) => {
  votes[`q${i+1}`] = {};
  q.options.forEach(opt => {
    votes[`q${i+1}`][opt.fr] = 0;
  });
});

// 🔹 Fonction pour changer de langue
function updateLanguage() {
  const lang = langSelect.value;
  document.querySelectorAll("[data-fr]").forEach(el => {
    if (el.tagName === "P" || el.tagName === "BUTTON") {
      el.textContent = el.getAttribute(`data-${lang}`);
    } else if (el.tagName === "LABEL") {
      el.childNodes[1].textContent = " " + el.getAttribute(`data-${lang}`);
    } else if (el.tagName === "TEXTAREA") {
      el.placeholder = el.getAttribute(`data-${lang}`);
    }
  });
}
updateLanguage();
langSelect.addEventListener("change", updateLanguage);

// 🔹 Soumission du formulaire
form.addEventListener("submit", function(e) {
  e.preventDefault();
  let answers = {};
  for (let i = 1; i <= questionsData.length; i++) {
    const radios = form[`q${i}`];
    if (!radios.value) {
      resultDiv.textContent = langSelect.value === "fr" ? 
        "Veuillez répondre à toutes les questions." : "すべての質問に答えてください。";
      resultDiv.style.color = "red";
      return;
    }
    answers[`q${i}`] = radios.value;
    votes[`q${i}`][radios.value]++;
  }
  answers["autres"] = document.getElementById("others").value;

  // Affichage JSON et votes
  let display = "Réponses soumises :\n" + JSON.stringify(answers, null, 2) + "\n\n";
  display += "Votes totaux :\n" + JSON.stringify(votes, null, 2);
  resultDiv.innerHTML = `<pre>${display}</pre>`;
  resultDiv.style.color = "green";

  form.reset();
});

