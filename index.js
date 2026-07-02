import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onValue, set, update } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyApukhtdMEAtF2O3k-3AHVcfp6-snHUZ4U",
  authDomain: "gym-app-89adb.firebaseapp.com",
  databaseURL: "https://gym-app-89adb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gym-app-89adb",
  storageBucket: "gym-app-89adb.firebasestorage.app",
  messagingSenderId: "516462874734",
  appId: "1:516462874734:web:f20f353e2fd0589836d67f"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let USER = "";
const CORRECT_CODE = "Aura=Avinavh";

// Lista di frasi motivazionali Hardcore in Inglese
const gymQuotes = [
  "NEVER GIVE UP! Focus on your goals and push harder!",
  "The body achieves what the mind believes. Stay focused!",
  "Consistency beats talent every single day. Keep grinding!",
  "Don't count the days, make the days count. Crush it!",
  "Today do what others won't, so tomorrow you can do what others can't.",
  "Your sweat today is your success tomorrow. No excuses!"
];

// LOGIN
window.login = function () {
  const name = document.getElementById("name").value.trim();
  const codeInput = document.getElementById("code").value.trim();

  if (name && codeInput === CORRECT_CODE) {
    USER = name;

    document.getElementById("login").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
    document.getElementById("gym-sidebar").classList.remove("hidden"); // Mostra la barra laterale
    document.getElementById("user").innerText = USER;
    document.getElementById("status").innerText = "🟢 im Gym";

    // Estrae una frase hardcore casuale in inglese a ogni accesso
    const randomQuote = gymQuotes[Math.floor(Math.random() * gymQuotes.length)];
    document.getElementById("motivation-quote").innerText = randomQuote;

    set(ref(db, "status/" + USER), { state: "🟢 im Gym" });

    listen();
  } else {
    alert("Falscher Code oder Name fehlt");
  }
};

// HELPER FOR DATE AND TIME
function getFormattedTimestamp() {
  const now = new Date();
  const dateStr = now.toLocaleDateString([], { day: '2-digit', month: '2-digit' }); 
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); 
  return `${dateStr} um ${timeStr}`;
}

// POST WORKOUT
 window.post = function () {
   const trainingInput = document.getElementById("training");
   if (!trainingInput.value.trim()) return alert("Bitte trag dein Training ein!");

   push(ref(db, "posts"), {
     name: USER,
     training: trainingInput.value,
     shower: document.getElementById("shower").value,
     sauna: document.getElementById("sauna").value,
     timestamp: getFormattedTimestamp(),
     likes: 0
   });

   trainingInput.value = ""; 
 };

// LIKE WORKOUT
window.likePost = function (postId, currentLikes) {
  const updates = {};
  updates[`posts/${postId}/likes`] = (currentLikes || 0) + 1;
  update(ref(db), updates);
};

// CHAT
window.send = function () {
  const msgInput = document.getElementById("msg");
  if (!msgInput.value.trim()) return;

  push(ref(db, "chat"), {
    name: USER,
    text: msgInput.value,
    timestamp: getFormattedTimestamp()
  });

  msgInput.value = ""; 
};

// LIVE DATA
function listen() {
  onValue(ref(db, "posts"), (snap) => {
    const data = snap.val() || {};
    document.getElementById("feed").innerHTML =
      Object.entries(data).reverse().map(([id, p]) => `
        <div class="post">
          <b>${p.name}</b><br>
          🏋️‍♂️ ${p.training}<br>
          🚿 ${p.shower} | 🧖 ${p.sauna}<br>
          <small style="opacity:0.6;">📅 ${p.timestamp || p.time || ''}</small><br>
          <button class="like" onclick="likePost('${id}', ${p.likes || 0})">❤️ ${p.likes || 0}</button>
        </div>
      `).join("");
  });

  onValue(ref(db, "chat"), (snap) => {
    const data = snap.val() || {};
    document.getElementById("chat").innerHTML =
      Object.values(data).reverse().map(c => `
        <div class="card">
          <b>${c.name}:</b> ${c.text} <br><small style="opacity:0.4;">📅 ${c.timestamp || c.time || ''}</small>
        </div>
      `).join("");
  });
}



function login (){ 

  console.log('zzzz')

}
