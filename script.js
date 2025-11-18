// =============================
// QUESTIONS 2 → 10 (comme avant)
// =============================
const questions = [
  {
    id: 2,
    fr: "Quel est votre niveau d’enthousiasme aujourd’hui ?",
    jp: "今日のやる気はどのくらいですか？",
    options: [
      { fr: "Faible", jp: "低い" },
      { fr: "Moyen", jp: "普通" },
      { fr: "Élevé", jp: "高い" }
    ]
  },
  {
    id: 3,
    fr: "Aimez-vous apprendre de nouvelles langues ?",
    jp: "新しい言語を学ぶことが好きですか？",
    options: [
      { fr: "Oui", jp: "はい" },
      { fr: "Non", jp: "いいえ" },
      { fr: "Un peu", jp: "少し" }
    ]
  },

  // … ajoute jusqu'à question 10
];

// =============================
// CREATION AUTOMATIQUE DES QUESTIONS 2 → 10
// =============================
const container = document.querySelector(".questions-wrapper");

questions.forEach(q => {
  const div = document.createElement("div");
  div.className = "question";
  div.id = "question-" + q.id;

  const p = document.createElement("p");
  p.setAttribute("data-fr", q.fr);
  p.setAttribute("data-jp", q.jp);
  p.textContent = q.fr;
  div.appendChild(p);

  q.options.forEach((opt, index) => {
    const label = document.createElement("label");
    label.classList.add("inline-option");

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "question_" + q.id;
    input.value = index;

    const span = document.createElement("span");
    span.setAttribute("data-fr", opt.fr);
    span.setAttribute("data-jp", opt.jp);
    span.textContent = opt.fr;

    label.appendChild(input);
    label.appendChild(span);
    div.appendChild(label);
  });

  container.appendChild(div);
});

// =============================
// CHANGEMENT DE LANGUE
// =============================
const langSelect = document.getElementById("lang");

langSelect.addEventListener("change", () => {
  const lang = langSelect.value;
  document.querySelectorAll("[data-fr]").forEach(el => {
    el.textContent = el.getAttribute("data-" + lang);
  });
});

// =============================
// SLIDER AGE
// =============================
const ageSlider = document.getElementById("ageSlider");
const ageValue = document.getElementById("ageValue");
const ageInput = document.getElementById("ageInput");

ageSlider.addEventListener("input", () => {
  ageValue.textContent = ageSlider.value;
  ageInput.value = ageSlider.value;
});

ageInput.addEventListener("input", () => {
  ageSlider.value = ageInput.value;
  ageValue.textContent = ageInput.value;
});

// =============================
// ENVOI DANS FIREBASE
// =============================
document.getElementById("quizForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const answers = {};

  // AGE
  answers.ageSlider = parseInt(ageSlider.value);
  answers.ageExact = parseInt(ageInput.value);

  // QUESTIONS 2 → 10
  questions.forEach(q => {
    const val = document.querySelector(`input[name="question_${q.id}"]:checked`);
    answers["question_" + q.id] = val ? val.value : null;
  });

  // ===== ENVOI FIREBASE =====
  const db = firebase.firestore();
  await db.collection("responses").add(answers);

  document.getElementById("result").textContent = "Réponse envoyée !";
});
