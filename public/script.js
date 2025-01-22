// Variables de estadísticas
let stats = {
    teamA: { goals: 0, passes: 0, shots: 0, possession: 0, shotsTimes: [], goalsTimes: [] },
    teamB: { goals: 0, passes: 0, shots: 0, possession: 0, shotsTimes: [], goalsTimes: [] }
};

// Variables para cronómetros
let timerInterval, pausedInterval;
let timerSeconds = 0;
let pausedSeconds = 0;
let possessionTimerA = 0;
let possessionTimerB = 0;
let possessionIntervalA = null;
let possessionIntervalB = null;

// Función para formatear tiempo
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

// Actualizar cronómetros principales
function updateMainTimers() {
    document.getElementById("main-timer").textContent = formatTime(timerSeconds);
    document.getElementById("paused-timer").textContent = formatTime(pausedSeconds);
}

// Actualizar cronómetros de posesión
function updatePossessionTimers() {
    document.getElementById("possession-timer-a").textContent = formatTime(possessionTimerA);
    document.getElementById("possession-timer-b").textContent = formatTime(possessionTimerB);
}

// Actualizar contadores de goles, pases, tiros y posesión
function updateStats() {
    document.getElementById("counter-goals-a").textContent = stats.teamA.goals;
    document.getElementById("counter-goals-b").textContent = stats.teamB.goals;
    document.getElementById("counter-passes-a").textContent = stats.teamA.passes;
    document.getElementById("counter-passes-b").textContent = stats.teamB.passes;
    document.getElementById("counter-shots-a").textContent = stats.teamA.shots;
    document.getElementById("counter-shots-b").textContent = stats.teamB.shots;
}

// Funciones para el cronómetro principal
function startMainTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            timerSeconds++;
            updateMainTimers();
        }, 1000);
    }
}

function resetAll() {
    clearInterval(timerInterval);
    clearInterval(pausedInterval);
    clearInterval(possessionIntervalA);
    clearInterval(possessionIntervalB);
    timerInterval = null;
    pausedInterval = null;
    possessionIntervalA = null;
    possessionIntervalB = null;

    timerSeconds = 0;
    pausedSeconds = 0;
    possessionTimerA = 0;
    possessionTimerB = 0;
    stats = {
        teamA: { goals: 0, passes: 0, shots: 0, possession: 0 },
        teamB: { goals: 0, passes: 0, shots: 0, possession: 0 }
    };

    updateMainTimers();
    updatePossessionTimers();
    updateStats();
}

// Funciones para el tiempo pausado
function startPausedTimer() {
    if (!pausedInterval) { // Solo iniciar si no está ya corriendo
        console.log("Iniciando cronómetro de tiempo pausado.");
        pausedInterval = setInterval(() => {
            pausedSeconds++;
            updateMainTimers(); // Actualizar el tiempo pausado en pantalla
        }, 1000);
    } else {
        console.log("El cronómetro de tiempo pausado ya está en marcha.");
    }
}

document.getElementById("pause-game").addEventListener("click", pauseAll);


function pauseAll() {
    console.log("Pausar juego: Deteniendo cronómetros de posesión e iniciando tiempo pausado.");
    // Pausar los cronómetros de posesión
    clearInterval(possessionIntervalA);
    clearInterval(possessionIntervalB);
    possessionIntervalA = null;
    possessionIntervalB = null;

    // Iniciar el cronómetro de tiempo pausado
    startPausedTimer();
}


// Funciones para la posesión
function startPossessionA() {
    console.log("Iniciar posesión del Equipo Azul");
    // Pausar la posesión del Equipo Rojo
    pausePossessionB();

    // Detener el cronómetro de tiempo pausado, si está activo
    clearInterval(pausedInterval);
    pausedInterval = null;

    // Iniciar el cronómetro de posesión del Equipo Azul
    if (!possessionIntervalA) {
        console.log("Iniciando cronómetro de posesión del Equipo Azul");
        startMainTimer(); // Asegura que el cronómetro principal esté corriendo
        possessionIntervalA = setInterval(() => {
            possessionTimerA++;
            stats.teamA.possession++;
            console.log(`Tiempo de posesión Equipo Azul: ${possessionTimerA}s`);
            updatePossessionTimers();
            updateStats();
        }, 1000);
    } else {
        console.log("El cronómetro de posesión del Equipo Azul ya está en marcha.");
    }
}


function pausePossessionA() {
    clearInterval(possessionIntervalA);
    possessionIntervalA = null;
}

function startPossessionB() {
    console.log("Iniciar posesión del Equipo Rojo");
    pausePossessionA();

    clearInterval(pausedInterval);
    pausedInterval = null;

    if (!possessionIntervalB) {
        console.log("Iniciando cronómetro de posesión del Equipo Rojo");
        startMainTimer();
        possessionIntervalB = setInterval(() => {
            possessionTimerB++;
            stats.teamB.possession++;
            console.log(`Tiempo de posesión Equipo Rojo: ${possessionTimerB}s`);
            updatePossessionTimers();
            updateStats();
        }, 1000);
    } else {
        console.log("El cronómetro de posesión del Equipo Rojo ya está en marcha.");
    }
}

function pausePossessionB() {
    console.log("Pausar posesión del Equipo Rojo");
    clearInterval(possessionIntervalB);
    possessionIntervalB = null;
}


// Eventos para goles, pases y tiros
document.getElementById("goalA").addEventListener("click", () => {
    stats.teamA.goals++;
    stats.teamA.goalsTimes.push(formatTime(timerSeconds)); // Guardar el tiempo
    updateStats();
});
document.getElementById("goalB").addEventListener("click", () => {
    stats.teamB.goals++;
    stats.teamB.goalsTimes.push(formatTime(timerSeconds)); // Guardar el tiempo
    updateStats();
});
document.getElementById("passA").addEventListener("click", () => {
    stats.teamA.passes++;
    updateStats();
});
document.getElementById("passB").addEventListener("click", () => {
    stats.teamB.passes++;
    updateStats();
});
document.getElementById("shotA").addEventListener("click", () => {
    stats.teamA.shots++;
    stats.teamA.shotsTimes.push(formatTime(timerSeconds)); // Guardar el tiempo
    updateStats();
});
document.getElementById("shotB").addEventListener("click", () => {
    stats.teamB.shots++;
    stats.teamB.shotsTimes.push(formatTime(timerSeconds)); // Guardar el tiempo
    updateStats();
});

// Eventos para posesión
document.getElementById("start-possession-a").addEventListener("click", startPossessionA);
document.getElementById("start-possession-b").addEventListener("click", startPossessionB);

// Eventos para cronómetros principales
document.getElementById("reset-all").addEventListener("click", resetAll);

async function exportCSV() {
    try {
        const response = await fetch("https://futbol7.onrender.com", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ stats })
        });


        if (!response.ok) {
            throw new Error("Error al exportar los datos.");
        }

        const blob = await response.blob();

         // Detectar el dispositivo y navegador
         const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

         if (isMobile) {

        // Crear un enlace para descargar el archivo
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "stats_export.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Liberar el objeto URL
        window.URL.revokeObjectURL(url);
    } else {
// Manejo estándar para escritorio
const url = window.URL.createObjectURL(blob);
const a = document.createElement("a");
a.href = url;
a.download = "stats_export.csv";
document.body.appendChild(a);
a.click();
a.remove();
}

alert("Archivo CSV exportado exitosamente.");
} catch (error) {
console.error("Error al exportar los datos:", error);
alert("Error al exportar los datos. Por favor, intenta nuevamente.");
}
}
    
// Conectar el botón al evento
document.getElementById("export-csv").addEventListener("click", exportCSV);
