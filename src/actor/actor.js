import {ObjectId} from "mongodb";
import {getDb} from "../common/db.js";

export const ActorSchema = {
    _id: "ObjectId",
    idPelicula: "string",
    nombre: "string",
    edad: "int",
    estaRetirado: "boolean",
    premios: "array"
};

const getCollection = () => getDb().collection("actorCollection");

export const handleInsertActorRequest = async (req, res) => {
    const { nombrePelicula, nombre, edad, estaRetirado, premios } = req.body;

    getDb().collection("peliculaCollection").findOne({ nombre: String(nombrePelicula) })
        .then(peliculaEncontrada => {
            if (!peliculaEncontrada) {
                return res.status(404).json({ error: "La película '${nombrePelicula}' no fue encontrada" });
            }

            const nuevoActor = {
                idPelicula: peliculaEncontrada._id.toString(),
                nombre: String(nombre),
                edad: parseInt(edad),
                estaRetirado: Boolean(estaRetirado),
                premios: Array.isArray(premios) ? premios : [premios]
            };

            return getCollection().insertOne(nuevoActor)
                .then(result => res.status(201).json({ _id: result.insertedId, ...nuevoActor }))
        })
        .catch(error => res.status(500).json({ error: "Error al insertar el actor", details: error.message }));
    };

    export const handleGetActoresRequest = async (req, res) => {
    getCollection().find().toArray()
        .then(actors => res.status(200).json(actors))
        .catch(error => res.status(500).json({ error: "Error al obtener los actores", details: error.message }));
    };

    export const handleGetActorByIdRequest = async (req, res) => {
        try {
            const id = new ObjectId(req.params.id);

            getCollection().findOne({ _id: id })
                .then(actor => {
                    if (!actor) return res.status(404).json({ error: "Actor no encontrado" });
                    res.status(200).json(actor);
                })
                .catch(error => res.status(500).json({ error: "Error al obtener el actor", details: error.message }));
        } catch (error) {
            return res.status(400).json({ error: "ID de actor inválido", details: error.message });
        }
    };

    export const handleGetActoresByPeliculaIdRequest = async (req, res) => {
        const peliculaIdStr = req.params.pelicula;

        getCollection().find({ idPelicula: peliculaIdStr }).toArray()
            .then(actores => res.status(200).json(actores))
            .catch(error => res.status(500).json({ error: "Error al filtrar los actores por película", details: error.message }));
    }



