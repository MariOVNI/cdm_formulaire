document.addEventListener("DOMContentLoaded", () => {

  const container = document.querySelector(".questions-wrapper");

  const questionsData = [
    { fr:"2. Quel est votre genre ?", jp:"2. 性別を教えてください。",
      options:[
        { fr:"Homme", jp:"男性" },
        { fr:"Femme", jp:"女性" },
        { fr:"Autre", jp:"その他" }
      ]
    },
    { fr:"3. Vous jouez aux jeux de société avec qui ?", jp:"3. ボードゲームをするときは誰としますか？",
      options:[
        { fr:"Avec des connaissances", jp:"知り合いと" },
        { fr:"Seul(e)", jp:"一人で" },
        { fr:"Avec n’importe qui", jp:"誰とでも" }
      ]
    }
    // … questions 4→10 idem
  ];

  // Génération dynamique des questions
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
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "question_" + number;
      input.value = idx;
      if(idx===0) input.required = true;
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

  // Slider
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

  // Changement langue
  const langSelect = document.getElementById("lang");
  langSelect.addEventListener("change", () => {
    const lang = langSelect.value;
    document.querySelectorAll("[data-fr]").forEach(el => {
      if(el.tagName==="TEXTAREA") el.placeholder = el.getAttribute(`data-${lang}`);
      else el.textContent = el.getAttribute(`data-${lang}`);
    });
  });

  // Submit formulaire (Firebase)
  document.getElementById("quizForm").addEventListener("submit", async (e)=>{
    e.preventDefault();

    const answers = {};
    answers.ageSlider = parseInt(ageSlider.value);
    answers.ageExact = parseInt(ageInput.value);

    questionsData.forEach((q,i)=>{
      const number = i + 2;
      const val = document.querySelector(`input[name="question_${number}"]:checked`);
      answers["question_"+number] = val ? parseInt(val.value) : null;
    });

    const otherText = document.getElementById("otherText").value;
    answers.otherComment = otherText;

    console.log(answers);

    // Firebase
    // await db.collection("responses").add(answers);
    alert("Réponse envoyée !");
  });
});
