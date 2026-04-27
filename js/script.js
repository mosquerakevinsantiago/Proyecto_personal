/* ===== VOZ ===== */
function speak(text) {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "es-ES";

    const voices = speechSynthesis.getVoices();
    const voz = voices.find(v => v.lang.includes("es"));
    if (voz) u.voice = voz;

    speechSynthesis.cancel();
    speechSynthesis.speak(u);
}

/* ===== RECONOCIMIENTO ===== */
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = "es-ES";
recognition.continuous = true;
recognition.interimResults = false;

/* ===== ESTADO ===== */
let activo = false;

/* ===== INICIAR ===== */
function iniciar() {
    try {
        recognition.start();
        console.log("Escuchando...");
    } catch (e) {}
}

/* ===== ESCUCHA ===== */
recognition.onresult = (event) => {
    const texto = event.results[event.results.length - 1][0].transcript.toLowerCase();
    console.log("Escuchado:", texto);

    // ACTIVACIÓN
    if (texto.includes("ok jarvis")) {
        activo = true;
        speak("Te escucho");
        return;
    }

    // SI ESTÁ ACTIVO, EJECUTA
    if (activo) {
        ejecutar(texto);
        activo = false; // vuelve a esperar
    }
};

/* ===== COMANDOS ===== */
function ejecutar(t) {

    if (t.includes("hola")) {
        speak("Hola Kevin");
    }

    else if (t.includes("hora")) {
        const hora = new Date().toLocaleTimeString();
        speak("La hora es " + hora);
    }

    else if (t.includes("fecha")) {
        const fecha = new Date().toLocaleDateString();
        speak("Hoy es " + fecha);
    }

    else if (t.includes("buscar")) {
        const busqueda = t.replace("buscar", "").trim();
        speak("Buscando " + busqueda);
        window.open("https://www.google.com/search?q=" + encodeURIComponent(busqueda));
    }

    else if (t.includes("youtube")) {
        speak("Abriendo YouTube");
        window.open("https://www.youtube.com");
    }

    else if (t.includes("google")) {
        speak("Abriendo Google");
        window.open("https://www.google.com");
    }

    else if (t.includes("activar núcleo") || t.includes("activar nucleo")) {
        toggleCore();
        speak("Núcleo activado");
    }

    else if (t.includes("apagar sistema")) {
        speak("Apagando sistema");
        recognition.stop();
    }

    else {
        speak("No entendí el comando");
    }
}

/* ===== AUTO REINICIO ===== */
recognition.onend = () => {
    recognition.start();
};

/* ===== INICIO AUTOMÁTICO ===== */
window.onload = iniciar;
