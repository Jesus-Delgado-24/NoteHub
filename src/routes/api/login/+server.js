import { db } from '$lib/server/db';
import { json } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

export async function POST(events) {
    try {
        const { request } = events;

        const { email, password } = await request.json();

        // Validar campos
        if (!email || !password) {
            return json({ error: "Email y contraseña son obligatorios" }, { status: 400 });
        }

        // Buscar usuario por email
        const user = await db.collection('Users').findOne({ email: email.toLowerCase() });
        if (!user) {
            return json({ error: "Usuario no encontrado" }, { status: 400 });
        }

        // Verificar contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return json({ error: "Contraseña incorrecta" }, { status: 400 });
        }

        return json({ message: "Logueo exitosamente" }, { status: 200 });
    }catch (error) {
        console.error("Error en el login:", error);
        return json({ error: "Error interno" }, { status: 500 });
    }
    
}