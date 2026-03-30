import { db } from '$lib/server/db';
import { json } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

export async function PUT({request, cookies}) {
    try{
        const data = await request.json();
        const id = await cookies.get('session_id');

        const {password, new_password, password_confirm, ...dataUpdate} = data;

        const cleanData = Object.fromEntries(Object.entries(dataUpdate).filter(([_, value]) => value !== ""));

        if(!id){
            return json({ error: "No autenticado" }, { status: 400 });
        }

        if(password){
            const user = await db.collection('Users').findOne({ _id: new ObjectId(id)});
            if (!user) {
                return json({ error: "Usuario no encontrado" }, { status: 400 });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return json({ error: "Contraseña incorrecta" }, { status: 400 });
            }

            if (new_password || password_confirm) {
                if (new_password !== password_confirm || new_password === "") {
                    return json({ error: "Las nuevas contraseñas no coinciden o están vacías" }, { status: 400 });
                }

                const hashedPassword = await bcrypt.hash(new_password, 10);
                cleanData.password = hashedPassword;
            }

            const result = await db.collection('Users').updateOne(
                {_id: new ObjectId(id)},
                { $set: cleanData}
            );

            if (result.matchedCount === 0) {
                return json({ error: "No se encontró el usuario para actualizar" }, { status: 404 });
            }

            return json({message: "Información actualizada"}, {status: 200});
        }        
        
        const result = await db.collection('Users').updateOne(
            { _id: new ObjectId(id)},
            { $set: cleanData}
        );

        if (result.matchedCount === 0) {
            return json({ error: "No se encontró el usuario para actualizar" }, { status: 404 });
        }

        return json({message: "Información actualizada"}, {status: 200});

    }catch(error){
        return json({error: "Error interno"}, {status: 500});
    }
}

export async function GET({cookies}) {
    try{
        const sessionId = cookies.get('session_id');
        if (!sessionId) {
            return json({ error: "Usuario no autenticado" }, { status: 400 });
        }

        const user = await db.collection('Users').findOne({_id: new ObjectId(sessionId)}, {projection: {password: 0}});
        if (!user) {
            return json({ error: "Usuario no encontrado" }, { status: 404 });
        }

        return json({ user });
    }catch(error){
        return json({error: "Error interno"}, {status: 500});
    }
}