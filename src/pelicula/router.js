import { Router } from "express";
import {
    handleInsertPeliculaRequest,
    handleGetPeliculasRequest,
    handleGetPeliculasByIdRequest,
    handleUpdatePeliculasByIdRequest,
    handleDeletePeliculasByIdRequest
    
} from "./pelicula.js";

const peliculaRouter = Router();

peliculaRouter.post("/", handleInsertPeliculaRequest);
peliculaRouter.get("/", handleGetPeliculasRequest);
peliculaRouter.get("/:id", handleGetPeliculasByIdRequest);
peliculaRouter.put("/:id", handleUpdatePeliculasByIdRequest);
peliculaRouter.delete("/:id", handleDeletePeliculasByIdRequest);

export default peliculaRouter;
