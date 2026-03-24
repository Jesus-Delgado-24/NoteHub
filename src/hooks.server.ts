import { db } from '$lib/server/db';
import bcrypt from 'bcrypt';

async function seedUser() {
    try {
        const usersCollection = db.collection('Users');
        
        const count = await usersCollection.countDocuments();
        
        if (count === 0) {            
            const hashedPassword = await bcrypt.hash('admin123', 10);
            
            await usersCollection.insertOne({
                username: 'AdminNoteHub',
                email: 'admin@notehub.com',
                password: hashedPassword
            });
            
            console.log("Usuario de semilla creado: admin@notehub.com / admin123");
        }
    } catch (error) {
        console.error("Error en el seeding:", error);
    }
}

seedUser();

export async function handle({ event, resolve }) {
    return await resolve(event);
}