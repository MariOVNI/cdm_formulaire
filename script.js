// === Firebase Import ===
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// === Config Firebase (remplace avec tes infos) ===
const firebaseConfig = {
  apiKey: "TA_CLE_API",
  authDomain: "TON_PROJET.firebaseapp.com",
  projectId: "TON_PROJET",
  storageBucket: "TON_PROJET.appspot.com",
  messagingSenderId: "XXX",
  appId: "XXX"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// === Gestion de la langue ===
const langSelect = document.getElementById("lang");
langSelect.addEventListener("change", () => {
  let lang = langSelect.value;
  document.querySelectorAll("[data-fr]").forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });
});

// === Gestion du formulaire ===
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  let status = document.getElementById("status");

  try {
    await addDoc(collection(db, "messages"), {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
      lang: document.getElementById("lang").value,
      date: new Date()
    });
    status.textContent = "✅ Message sauvegardé (保存されました)";
    status.style.color = "green";
    e.target.reset();
  } catch (err) {
    console.error(err);
    status.textContent = "❌ Erreur (エラー)";
    status.style.color = "red";
  }
});
