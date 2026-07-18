import { ObjectId } from "mongodb";
import { getDb } from "../common/db.js";

export const PeliculaSchema = {
    _id: "ObjectId",
    titulo: "string",
    genero: "array",
    anioEstreno: "int"
};

const getCollection = () => getDb().collection("peliculaCollection"); 

export const handleInsertPeliculaRequest = async (req, res) => {
    const { nombre, genero, anioEstreno } = req.body;

    const nuevaPelicula = {
        nombre: String(nombre),
        genero: Array.isArray(genero) ? genero : [genero],
        anioEstreno: parseInt(anioEstreno)
    };

    getCollection().insertOne(nuevaPelicula)
    .then(result => res.status(201).json({ _id: result.insertedId, ...nuevaPelicula }))
    .catch(error => res.status(500).json({ error: "Error al insertar la película en la base de datos", details: error.message }));
};

export const handleGetPeliculasRequest = async (req, res) => {
    getCollection().find({}).toArray()
    .then(peliculas => res.status(200).json(peliculas))
    .catch(error => res.status(500).json({ error: "Error al obtener las películas de la base de datos", details: error.message }));
};

export const handleGetPeliculasByIdRequest = async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);

        getCollection().findOne({ _id: id })
        .then(pelicula => {
            if (!pelicula) return res.status(404).json({ error: "Película no encontrada" });
            res.status(200).json(pelicula);
        })
        .catch(error => res.status(500).json({ error: "Error al buscar la película en la base de datos", details: error.message }));
    } catch (error) {
        return res.status(400).json({ error: "ID de película inválido", details: error.message });
    }
};

export const handleUpdatePeliculasByIdRequest = async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const { nombre, genero, anioEstreno } = req.body;

        const updateData = {};
        if (nombre) updateData.nombre = String(nombre);
        if (genero) updateData.genero = Array.isArray(genero) ? genero : [genero];
        if (anioEstreno) updateData.anioEstreno = parseInt(anioEstreno);

        getCollection().updateOne({ _id: id }, { $set: updateData })
        .then(result => {
            if (result.matchedCount === 0) return res.status(404).json({ error: "Película no encontrada" });
            res.status(200).json({ message: "Película actualizada exitosamente" });
        })
        .catch(error => res.status(500).json({ error: "Error al actualizar la película en la base de datos", details: error.message }));

    } catch (error) {
        return res.status(400).json({ error: "ID de película inválido", details: error.message });
    }
};

export const handleDeletePeliculasByIdRequest = async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);

        getCollection().deleteOne({ _id: id })
        .then(result => {
            if (result.deletedCount === 0) return res.status(404).json({ error: "Película no encontrada" });
            res.status(200).json({ message: "Película eliminada exitosamente" });
        })
        .catch(error => res.status(500).json({ error: "Error al eliminar la película en la base de datos", details: error.message }));

    } catch (error) {
        return res.status(400).json({ error: "ID de película inválido", details: error.message });
    }   
};
