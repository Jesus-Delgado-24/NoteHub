import { db } from '$lib/server/db';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

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
    const sessionId = event.cookies.get('session_id');

    if (sessionId) {
        try {
            // Busca directamente en MongoDB
            const user = await db.collection('Users').findOne({ 
                _id: new ObjectId(sessionId) 
            });

            if (user) {
                event.locals.user = {
                    id: user._id.toString(),
                    username: user.username,
                    color: user.color || '#E9ECFF'
                };
            }
        } catch (error) {
            console.error("Error al validar sesión:", error);
        }
    }

    return await resolve(event);
}