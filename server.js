import express from "express";
import cors from "cors";
import { connectToDatabase } from "./src/common/db.js";
import peliculaRouter from "./src/pelicula/router.js";
import actorRouter from "./src/actor/router.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("API de Cine Iplacex ejecutándose correctamente");
});

app.use("/peliculas", peliculaRouter);
app.use(actorRouter);

connectToDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor corriendo exitosamente en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error al conectar a la base de datos:", error);
    });