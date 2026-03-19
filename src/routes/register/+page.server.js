import { fail } from '@sveltejs/kit';

export const actions = {
    create: async ({ request }) => {
        const data = await request.formData();

        const username = data.get('username');
        const email = data.get('email');
        const email_confirm = data.get('email_confirm');
        const password = data.get('password');
        const password_confirm = data.get('password_confirm');

        if (email !== email_confirm){
            return fail(400, {message: 'Los correos no coinciden'});
        }

        if (password !== password_confirm){
            return fail(400, {message: 'Las contraseñas no coinciden'});
        }

        // Guardar a la base de datos

        return { success: true };
    }
};