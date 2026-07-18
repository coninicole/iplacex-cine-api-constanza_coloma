import { MongoClient, ObjectId as MongoObjectId } from "mongodb";

const uri = "mongodb+srv://conii:Coni123@cluster0.xb0mz1z.mongodb.net/?appName=Cluster0";

const dbName = "cine-db";

let client;
let db;

export async function connectToDatabase() {
    try {
        console.log("Intentando conectar al clúster de MongoDB Atlas")
        client = new MongoClient(uri);
        await client.connect();
        db = client.db(dbName);
        console.log("Conectado exitosamente a MongoDB Atlas en la nube");
    } catch (error) {
        console.error("Error al conectar a MongoDB Atlas:", error.message);
        throw error;
    }
}  

export function getDb() {
    if (!db) {
        throw new Error("No se ha establecido la conexión a la base de datos. Llama a connectToDatabase() primero.");
    }
    return db;
}

export const ObjectId = MongoObjectId;  