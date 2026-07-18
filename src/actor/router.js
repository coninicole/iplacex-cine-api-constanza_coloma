import { Router } from "express";
import {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaIdRequest
} from './actor.js';

const actorRouter = Router();

actorRouter.post("/actor", handleInsertActorRequest);
actorRouter.get("/actores", handleGetActoresRequest);
actorRouter.get("/actor/:id", handleGetActorByIdRequest);
actorRouter.get("/actor/pelicula/:pelicula", handleGetActoresByPeliculaIdRequest);

export default actorRouter;