import { db } from '$lib/server/db';
import { json } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

export async function POST(events) {
    try{
        const { request } = events;

        const { username, email, email_confirm, password, password_confirm } = await request.json();

        // Validar todos los campos
        if (!username || !email || !email_confirm || !password || !password_confirm) {
            return json({ error: "Todos los campos son obligatorios" }, { status: 400 });
        }

        // Verificar que los correos electrónicos coincidan
        if (email !== email_confirm) {
            return json({ error: "Los correos electrónicos no coinciden" }, { status: 400 });
        }

        // Verificar que las contraseñas coincidan
        if (password !== password_confirm) {
            return json({ error: "Las contraseñas no coinciden" }, { status: 400 });
        }

        // Verificar si el usuario ya existe
        const existingUser = await db.collection('Users').findOne({ email });
        if (existingUser) {
            return json({ error: "El usuario ya existe" }, { status: 400 });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        const lowerEmail = email.toLowerCase();

        // Guardado de usuario en la base de datos
        await db.collection('Users').insertOne({
            username,
            email: lowerEmail,
            password: hashedPassword,
        });
        

        return json({ message: "Usuario registrado exitosamente" }, { status: 200 });
    } catch (error) {
        console.error("Error en el registro:", error);
        return json({ error: "Error interno" }, { status: 500 });
    }
}