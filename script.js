const form = document.getElementById("quizForm");
const resultDiv = document.getElementById("result");
const langSelect = document.getElementById("lang");

// Stockage des résultats globaux
let votes = {};
for (let i = 1; i <= 10; i++) {
  votes[`q${i}`] = { "Exemple 1": 0, "Exemple 2": 0, "Exemple 3": 0 };
}

// Fonction pour mettre à jour la langue
function updateLanguage() {
  const lang = langSelect.value;
  document.querySelectorAll("[data-fr]").forEach(el => {
    if (el.tagName === "P" || el.tagName === "BUTTON") {
      el.textContent = el.getAttribute(`data-${lang}`);
    } else if (el.tagName === "LABEL") {
      // La deuxième partie du label (texte) est le 2ème node
      el.childNodes[1].textContent = " " + el.getAttribute(`data-${lang}`);
    } else if (el.tagName === "TEXTAREA") {
      el.placeholder = el.getAttribute(`data-${lang}`);
    }
  });
}
updateLanguage();
langSelect.addEventListener("change", updateLanguage);

// Soumission du formulaire
form.addEventListener("submit", function(e) {
  e.preventDefault();
  let answers = {};
  // Vérifier toutes les questions
  for (let i = 1; i <= 10; i++) {
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

  // Réinitialiser le formulaire
  form.reset();
});
