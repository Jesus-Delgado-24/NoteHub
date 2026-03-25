import { db } from '$lib/server/db';
import { json } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

export async function POST({request, cookies}) {
    try{
        const { title, content } = await request.json();
    
        // Validar campos
        if (!title || !content) {
            return json({ error: "Título y contenido son obligatorios" }, { status: 400 });
        }

        // Verificar sesión
        const sessionId = cookies.get('session_id');
        if (!sessionId) {
            return json({ error: "No autenticado" }, { status: 400 });
        }

        // Guardar nota en la base de datos
        await db.collection('Notes').insertOne({
            user_id: sessionId,
            title,
            content,
            created_at: new Date(),
            fav: false
        });

        return json({ message: "Nota creada exitosamente" }, { status: 200 });
    }catch (error) {
        console.error("Error en la creación de nota:", error);
        return json({ error: "Error interno" }, { status: 500 });
    }
}

export async function GET({cookies}) {
    try{
        const sessionId = cookies.get('session_id');
        if (!sessionId) {
            return json({ error: "Usuario no autenticado" }, { status: 400 });
        }

        const notes = await db.collection('Notes').find({user_id: sessionId}).sort({created_at: -1}).toArray();

        return json(notes);
    }catch (error){
        return json({error: "Error interno"}, {status: 500});
    }
}

export async function PUT({ request }) {
    try {
        const data = await request.json();
        const { _id, ...fields } = data;

        const updateData = {
            ...fields,
            created_at: new Date(fields.created_at) 
        };
        
        if (!_id) {
            return json({ error: "ID no proporcionado" }, { status: 400 });
        }

        const result = await db.collection('Notes').updateOne(
            { _id: new ObjectId(_id) },
            { $set: updateData }
        );

        if (result.modifiedCount === 0) {
            return json({ error: "No se realizaron cambios" }, { status: 404 });
        }

        return json({ message: "Nota reemplazada con éxito" });

    } catch (error) {
        return json({ error: "Error al procesar la actualización" }, { status: 500 });
    }
}

export async function DELETE({request}) {
    try{
        const data = await request.json();

        if (!data._id) {
            return json({ error: "ID no proporcionado" }, { status: 400 });
        }

        const result = await db.collection('Notes').deleteOne({_id: new ObjectId(data._id)});

        if(result.deletedCount === 0){
            return json({ error: "Ninguna nota eliminada"}, { status: 400 });
        }

        return json({message: "Nota eliminada correctamente"}, { status:200 });

    }catch(error){
        return json({error: "Error interno"}, {status: 500})
    }
}