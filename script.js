document.addEventListener("DOMContentLoaded", () => {

  // =============================
  // CONFIGURATION FIREBASE
  // =============================
  const firebaseConfig = {
    apiKey: "TA_CLE_API",
    authDomain: "TON_PROJET.firebaseapp.com",
    projectId: "TON_PROJET",
    storageBucket: "TON_PROJET.appspot.com",
    messagingSenderId: "xxx",
    appId: "xxx"
  };
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  // =============================
  // QUESTIONS 2 → 10
  // =============================
  const questionsData = [
    { fr:"2. Quel est votre genre ?", jp:"2. 性別を教えてください。",
      options:[{fr:"Homme",jp:"男性"},{fr:"Femme",jp:"女性"},{fr:"Autre",jp:"その他"}] },
    { fr:"3. Vous jouez aux jeux de société avec qui ?", jp:"3. ボードゲームをするときは誰としますか？",
      options:[{fr:"Avec des connaissances",jp:"知り合いと"},{fr:"Seul(e)",jp:"一人で"},{fr:"Avec n’importe qui",jp:"誰とでも"}] },
    { fr:"4. Vous jouez souvent aux jeux de société ?", jp:"4. ボードゲームは頻繁に遊びますか？",
      options:[{fr:"1 fois par semaine ou plus",jp:"毎週１回以上"},{fr:"3 fois par mois ou moins",jp:"毎月３回以下"},{fr:"5 fois par an ou moins",jp:"毎年５回以下"}] },
    { fr:"5. Quel type de jeux préférez-vous ?", jp:"5. どのようなボードゲームの方が好きですか？",
      options:[{fr:"Jeux compétitifs",jp:"競技型ゲーム"},{fr:"Jeux coopératifs",jp:"協力型ゲーム"},{fr:"Peu importe",jp:"どちらでもいい"}] },
    { fr:"6. Avez-vous déjà appris quelque chose grâce à un jeu de société ?", jp:"6. ボードゲームからなにかを学んだことはありますか？",
      options:[{fr:"Oui",jp:"ある"},{fr:"Non",jp:"ない"},{fr:"Je ne sais pas",jp:"わからない"}] },
    { fr:"7. Vous préférez jouer à quel type ?", jp:"7. 遊ぶとしたらどっちですか？",
      options:[{fr:"Jeux en ligne",jp:"オンラインボードゲーム"},{fr:"Jeux analogiques",jp:"アナログボードゲーム"},{fr:"Les deux",jp:"どちらでもいい"}] },
    { fr:"8. Pensez-vous que les jeux peuvent être utilisés pour l’éducation ?", jp:"8. ボードゲームは教育に使えると思いますか？",
      options:[{fr:"Oui",jp:"使える"},{fr:"Non",jp:"使えない"},{fr:"Je ne sais pas",jp:"わからない"}] },
    { fr:"9. Tous les jeux vont-ils devenir numériques ?", jp:"9. 全てのボードゲームはオンライン化すると思いますか？",
      options:[{fr:"Oui",jp:"はい、オンライン化する"},{fr:"Non",jp:"いいえ、アナログボードゲームが中心"},{fr:"Coexisteront",jp:"共存する"}] },
    { fr:"10. Vous privilégiez quoi ?", jp:"10. 自由にプレイすること vs ルールを守って協力すること",
      options:[{fr:"La liberté de jouer comme je veux",jp:"自由にプレイすることを重視する"},{fr:"La coopération et le respect des règles",jp:"みんなで協力することを重視する"},{fr:"Équilibre entre les deux",jp:"両方バランスよく重視する"}] }
  ];

  const container = document.querySelector(".questions-wrapper");

  // Génération questions 2→10 sous forme QCM
  questionsData.forEach((q, i) => {
    const number = i + 2;
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
      if(idx===0) input.required = true; // obligatoire de choisir une option

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
  // Slider connecté à l'input number
  // =============================
  const ageSlider  = document.getElementById("ageSlider");
  const ageValue   = document.getElementById("ageValue");
  const ageInput   = document.getElementById("ageInput");

  ageSlider.addEventListener("input", () => {
    ageValue.textContent = ageSlider.value;
    ageInput.value = ageSlider.value;
  });

  ageInput.addEventListener("input", () => {
    ageSlider.value = ageInput.value;
    ageValue.textContent = ageInput.value;
  });

  // =============================
  // Changement langue FR/JP
  // =============================
  const langSelect = document.getElementById("lang");
  langSelect.addEventListener("change", () => {
    const lang = langSelect.value;
    document.querySelectorAll("[data-fr]").forEach(el => {
      if(el.tagName==="TEXTAREA") el.placeholder = el.getAttribute(`data-${lang}`);
      else el.textContent = el.getAttribute(`data-${lang}`);
    });
  });

  // =============================
  // Submit formulaire
  // =============================
  document.getElementById("quizForm").addEventListener("submit", async (e)=>{
    e.preventDefault();

    const answers = {};
    answers.ageSlider = parseInt(ageSlider.value);
    answers.ageExact  = parseInt(ageInput.value);

    questionsData.forEach((q,i)=>{
      const number = i + 2;
      const val = document.querySelector(`input[name="question_${number}"]:checked`);
      answers["question_"+number] = val ? parseInt(val.value) : null;
    });

    answers.otherComment = document.getElementById("otherText").value;

    console.log("Réponses :", answers);

    try {
      await db.collection("responses").add(answers);
      document.getElementById("result").textContent = "Réponse envoyée !";
    } catch(err) {
      console.error(err);
      document.getElementById("result").textContent = "Erreur lors de l'envoi";
    }
  });
});
