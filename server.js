const express = require("express");
const { exec } = require("child_process");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

// Endpoint para pegar estatísticas do sistema
app.get("/api/stats", (req, res) => {
  // Comando para pegar uso de CPU/memória e top 5 processos por uso de CPU/memória
  const cmd = `top -b -n1 | head -n 12 && ps -eo pid,comm,%cpu,%mem --sort=-%cpu | head -n 6`;
  exec(cmd, (err, stdout, stderr) => {
    if (err)
      return res.status(500).json({ error: "Erro ao obter dados do sistema" });
    res.json({ raw: stdout });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
