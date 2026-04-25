/* ===== VOZ (Hablar) ===== */
function speak(msg) {
    try {
        const u = new SpeechSynthesisUtterance(msg);
        u.lang = "es-ES";
        u.rate = 1;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(u);
    } catch (e) {
        console.error("Error en síntesis de voz", e);
    }
}

/* ===== CONTROL DEL NÚCLEO ===== */
let on = false;
const root = document.documentElement;
const card = document.getElementById("card");
const statusEl = document.getElementById("status");

function setStatus(t) {
    statusEl.textContent = t;
}

function toggleCore() {
    on = !on;
    root.style.setProperty("--on", on ? "1" : "0");
    card.classList.toggle("active", on);
    setStatus(on ? "Núcleo activo" : "Núcleo en reposo");
    speak(on ? "Núcleo activado" : "Núcleo desactivado");
}

/* ===== VALIDACIÓN DE ACCESO ===== */
function enter() {
    const e = document.getElementById("email").value.trim();
    const p = document.getElementById("password").value.trim();
    const error = document.getElementById("error");

    // Credenciales
    if (e === "mosqueraperea496@gmail.com" && p === "1234") {
        setStatus("Acceso concedido");
        speak("Acceso concedido. Bienvenido Kevin.");
        document.getElementById("login").style.display = "none";
        document.getElementById("cv").style.display = "block";
        document.body.style.overflow = "auto";
    } else {
        error.textContent = "ACCESS DENIED";
        setStatus("Acceso denegado");
        speak("Acceso denegado");
    }
}

/* ===== RECONOCIMIENTO DE VOZ ===== */
let recognition = null;
let micOn = false;
const micState = document.getElementById("micState");

function toggleMic() {
    if (!('webkitSpeechRecognition' in window)) {
        setStatus("Navegador no compatible con voz");
        return;
    }

    if (!recognition) {
        recognition = new webkitSpeechRecognition();
        recognition.lang = "es-ES";
        recognition.continuous = true;
        recognition.interimResults = false;

        recognition.onresult = (e) => {
            const t = e.results[e.results.length - 1][0].transcript.toLowerCase();
            setStatus("Comando: " + t);

            if (t.includes("activar núcleo") || t.includes("activar nucleo")) toggleCore();
            if (t.includes("entrar")) enter();
            if (t.includes("cerrar sesión") || t.includes("salir")) location.reload();
        };

        recognition.onend = () => { if (micOn) recognition.start(); };
    }

    micOn = !micOn;
    micState.textContent = micOn ? "MIC: ON" : "MIC: OFF";
    setStatus(micOn ? "Micrófono activo" : "Micrófono apagado");

    if (micOn) {
        try { recognition.start(); speak("Micrófono activado"); } catch (e) {}
    } else {
        try { recognition.stop(); speak("Micrófono desactivado"); } catch (e) {}
    }
}

/* ===== RASTRO DE PARTÍCULAS ===== */
document.addEventListener("mousemove", e => {
    const p = document.createElement("div");
    p.className = "p";
    p.style.left = e.clientX + "px";
    p.style.top = e.clientY + "px";
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 400);
});

/* ===== SECUENCIA DE ARRANQUE (BOOT) ===== */
(function boot() {
    const seq = [
        "Inicializando módulos…",
        "Cargando interfaz HUD…",
        "Sincronizando sensores…",
        "Sistema listo."
    ];
    let i = 0;
    function next() {
        if (i < seq.length) {
            setStatus(seq[i++]);
            setTimeout(next, 900);
        } else {
            speak("Sistema listo.");
        }
    }
    next();
})();
