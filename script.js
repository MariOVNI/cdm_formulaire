const form = document.getElementById("quizForm");
const resultDiv = document.getElementById("result");
const langSelect = document.getElementById("lang");

// Fonction pour changer la langue
function updateLanguage() {
  const lang = langSelect.value;
  // changer textes des questions
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

// Initialiser la langue
updateLanguage();

// Écoute le changement de langue
langSelect.addEventListener("change", updateLanguage);

// Gestion du formulaire
form.addEventListener("submit", function(e) {
  e.preventDefault();
  let answers = {};
  
  // 10 questions
  for (let i = 1; i <= 10; i++) {
    const radios = form[`q${i}`];
    let value = radios.value;
    if (!value) {
      resultDiv.textContent = langSelect.value === "fr" ? "Veuillez répondre à toutes les questions." : "すべての質問に答えてください。";
      resultDiv.style.color = "red";
      return;
    }
    answers[`q${i}`] = value;
  }
  
  // Champ "Autres"
  answers["autres"] = document.getElementById("others").value;
  
  resultDiv.innerHTML = "<pre>" + JSON.stringify(answers, null, 2) + "</pre>";
  resultDiv.style.color = "green";
});
