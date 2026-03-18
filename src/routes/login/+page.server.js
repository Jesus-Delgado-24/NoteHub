import { fail } from '@sveltejs/kit';

export const actions = {
    login: async ({ request }) => {
        const data = await request.formData();

        const email = data.get('email');
        const password = data.get('password');

        // Validar el usuario

        return { success: true };
    }
};