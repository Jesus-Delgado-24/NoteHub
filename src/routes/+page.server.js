import { fail } from '@sveltejs/kit';

export const actions = {
    create: async ({ request }) =>{
        const data = await request.formData();

        const title = data.get('title');
        const description = data.get('description');

        if(title === '' || description === ''){
            return fail(400, { message: 'Todos los campos son obligatorios' });
        }

        // Guardar la nota en la base de datos
    },
    edit: async ({ request }) =>{
        const data = await request.formData();

        const title = data.get('title');
        const description = data.get('description');

        if(title === '' || description === ''){
            return fail(400, { message: 'Todos los campos son obligatorios' });
        }

        // Guardar la nota en la base de datos
    },
    delete: async ({ request }) =>{
        const data = await request.formData();

        const id = data.get('id');
    }
};