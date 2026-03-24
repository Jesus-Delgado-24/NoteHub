import { MongoClient } from 'mongodb';

const client = new MongoClient("mongodb://localhost:27017/");

export async function connectDB() {
    try {
        await client.connect();
        console.log("Conectado a MongoDB");
        return client.db('NoteHub');
    } catch (error) {
        console.error("Error conectando a MongoDB:", error);
        throw error;
    }
}

export const db = client.db('NoteHub');