const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Ruta directa a "dist"
const publicPath = __dirname;

// Sirve los archivos estáticos desde "dist"
app.use(express.static(publicPath));

// Redirige cualquier ruta desconocida a "index.html"
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});
// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
