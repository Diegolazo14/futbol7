const fs = require("fs");
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Ruta para exportar estadísticas como CSV
app.post("/export-csv", (req, res) => {
    const stats = req.body.stats;

    // Crear encabezado y datos del archivo CSV
    const csvHeaders = "Equipo,Goles,Pases,Tiros,Posesión (s),Tiempos de Tiros,Tiempos de Goles\n";
    const csvData = [
        `Equipo Azul,${stats.teamA.goals},${stats.teamA.passes},${stats.teamA.shots},${stats.teamA.possession},"${stats.teamA.shotsTimes.join(", ")}","${stats.teamA.goalsTimes.join(", ")}"`,
        `Equipo Rojo,${stats.teamB.goals},${stats.teamB.passes},${stats.teamB.shots},${stats.teamB.possession},"${stats.teamB.shotsTimes.join(", ")}","${stats.teamB.goalsTimes.join(", ")}"`
    ].join("\n");

    // Guardar archivo CSV temporal
    const filePath = "stats_export.csv";
    fs.writeFileSync(filePath, csvHeaders + csvData);

    // Enviar archivo al cliente
    res.download(filePath, "stats_export.csv", (err) => {
        if (err) {
            console.error("Error al descargar el archivo:", err);
            res.status(500).send("Error al exportar el archivo.");
        }

        // Eliminar el archivo temporal
        fs.unlinkSync(filePath);
    });
});

// Servir archivos estáticos del frontend
const publicPath = path.join(__dirname, "public"); // Cambia "public" si los archivos están en otra carpeta
app.use(express.static(publicPath));

// Ruta para la raíz
app.get("/", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});


// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
