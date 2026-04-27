/* ===== VOZ (RESPUESTA) ===== */
function speak(text) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "es-ES";
    utter.rate = 1;

    const voices = speechSynthesis.getVoices();
    const voz = voices.find(v => v.lang.includes("es"));
    if (voz) utter.voice = voz;

    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
}

/* ===== RECONOCIMIENTO DE VOZ ===== */
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = "es-ES";
recognition.continuous = true;
recognition.interimResults = false;

/* ===== ENCENDER MIC ===== */
function startListening() {
    recognition.start();
    speak("Sistema de voz activado");
}

/* ===== CUANDO ESCUCHA ===== */
recognition.onresult = (event) => {
    const texto = event.results[event.results.length - 1][0].transcript.toLowerCase();
    console.log("Escuchado:", texto);

    procesarComando(texto);
};

/* ===== PROCESAR COMANDOS ===== */
function procesarComando(t) {

    if (t.includes("hola")) {
        speak("Hola Kevin, ¿en qué puedo ayudarte?");
    }

    else if (t.includes("hora")) {
        const hora = new Date().toLocaleTimeString();
        speak("La hora es " + hora);
    }

    else if (t.includes("fecha")) {
        const fecha = new Date().toLocaleDateString();
        speak("Hoy es " + fecha);
    }

    else if (t.includes("abre google")) {
        speak("Abriendo Google");
        window.open("https://www.google.com");
    }

    else if (t.includes("activar núcleo")) {
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

/* ===== AUTO REINICIO SI SE DETIENE ===== */
recognition.onend = () => {
    recognition.start();
};
