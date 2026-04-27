/* ===== VOZ ===== */
function speak(text) {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "es-ES";
    u.rate = 1;

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

/* ===== INICIAR AUTOMÁTICO ===== */
function iniciarSistema() {
    try {
        recognition.start();
        speak("Asistente activado");
    } catch (e) {
        console.log("Ya está activo");
    }
}

/* ===== ESCUCHA CONTINUA ===== */
recognition.onresult = (event) => {
    const texto = event.results[event.results.length - 1][0].transcript.toLowerCase();
    console.log("Escuchado:", texto);

    ejecutar(texto);
};

/* ===== COMANDOS ===== */
function ejecutar(t) {

    // SALUDO
    if (t.includes("hola")) {
        speak("Hola Kevin");
    }

    // HORA
    else if (t.includes("hora")) {
        const hora = new Date().toLocaleTimeString();
        speak("La hora es " + hora);
    }

    // FECHA
    else if (t.includes("fecha")) {
        const fecha = new Date().toLocaleDateString();
        speak("Hoy es " + fecha);
    }

    // ABRIR GOOGLE
    else if (t.includes("abre google")) {
        speak("Abriendo Google");
        window.open("https://www.google.com");
    }

    // BUSCAR EN GOOGLE
    else if (t.includes("buscar")) {
        const busqueda = t.replace("buscar", "").trim();
        speak("Buscando " + busqueda);
        window.open("https://www.google.com/search?q=" + encodeURIComponent(busqueda));
    }

    // YOUTUBE
    else if (t.includes("abre youtube")) {
        speak("Abriendo YouTube");
        window.open("https://www.youtube.com");
    }

    // NÚCLEO
    else if (t.includes("activar núcleo") || t.includes("activar nucleo")) {
        toggleCore();
        speak("Núcleo activado");
    }

    // APAGAR
    else if (t.includes("apagar asistente")) {
        speak("Apagando asistente");
        recognition.stop();
    }

    else {
        console.log("No reconocido");
    }
}

/* ===== REINICIO AUTOMÁTICO ===== */
recognition.onend = () => {
    recognition.start();
};

/* ===== AUTO INICIO ===== */
window.onload = iniciarSistema;
