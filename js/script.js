const statusEl = document.getElementById("status");

/* ===== VOZ ===== */
function speak(text) {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "es-ES";
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
}

/* ===== RECONOCIMIENTO ===== */
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = "es-ES";
recognition.continuous = true;

let activo = false;

/* ===== INICIO ===== */
function startSystem() {
    speak("Sistema activado");
    statusEl.textContent = "Escuchando...";
    recognition.start();
}

/* ===== ESCUCHA ===== */
recognition.onresult = (event) => {
    const texto = event.results[event.results.length - 1][0].transcript.toLowerCase();
    statusEl.textContent = "Escuchado: " + texto;

    if (texto.includes("ok jarvis")) {
        activo = true;
        speak("Te escucho");
        return;
    }

    if (activo) {
        ejecutar(texto);
        activo = false;
    }
};

/* ===== COMANDOS ===== */
function ejecutar(t) {

    if (t.includes("hora")) {
        speak("La hora es " + new Date().toLocaleTimeString());
    }

    else if (t.includes("youtube")) {
        speak("Abriendo YouTube");
        window.open("https://www.youtube.com");
    }

    else if (t.includes("google")) {
        speak("Abriendo Google");
        window.open("https://www.google.com");
    }

    else if (t.includes("buscar")) {
        let q = t.replace("buscar", "");
        speak("Buscando " + q);
        window.open("https://www.google.com/search?q=" + q);
    }

    else {
        speak("No entendí el comando");
    }
}

/* ===== REINICIO ===== */
recognition.onend = () => recognition.start();
